import { Router, Request, Response } from 'express';
import { upload } from '@/middleware/upload';
import { db, patients } from '@/db';
import { eq } from 'drizzle-orm';
import { Type } from '@sinclair/typebox';

import parsePhoneNumber from 'libphonenumber-js';

import { validateRequest } from '@/middleware/validation';
import { CreatePatientSchema } from '@/schemas/patient';
import { TypeNumericId } from '@/db/utils';

const router = Router();

// GET /api/patients - Get all patients
router.get('/', async (_req: Request, res: Response): Promise<void> => {
  try {
    const allPatients = await db.select().from(patients).orderBy(patients.created_at);

    res.json({
      data: allPatients,
    });
  } catch (error) {
    console.error('Error fetching patients:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// GET /api/patients/:id - Get patient by ID
router.get(
  '/:id',
  validateRequest({
    params: Type.Object({
      id: TypeNumericId,
    }),
  }),
  async (req: Request<{ id: string }>, res: Response): Promise<void> => {
    try {
      const id = parseInt(req.params.id);
      const result = await db.select().from(patients).where(eq(patients.id, id));
      const patient = result[0] || null;
      if (!patient) {
        res.status(404).json({ error: 'Patient not found' });
        return;
      }
      res.json({ patient });
    } catch (error) {
      console.error('Error fetching patient:', error);
      res.status(500).json({ error: 'Internal server error' });
    }
  },
);

// POST /api/patients - Create new patient
router.post(
  '/',
  upload.single('image'),
  validateRequest({
    body: CreatePatientSchema,
  }),
  async (req: Request, res: Response): Promise<void> => {
    try {
      let { name, email, dial_code, country_code, phone_number } = req.body;
      const imagePath = req.file?.filename;

      // Does the email already exist?
      const existingPatient = await db.select().from(patients).where(eq(patients.email, email));

      if (existingPatient.length > 0) {
        res.status(422).json({
          message: 'The email is already in use',
        });
      }

      // Does the user load an image?
      if (!imagePath) {
        res.status(422).json({
          message: 'Image is required',
        });
        return;
      }

      // Does the provide a valid phone number?
      const phoneNumber = `${dial_code}${phone_number}`;
      const parsedPhoneNumber = parsePhoneNumber(phoneNumber, country_code);

      if (!parsedPhoneNumber?.isValid()) {
        res.status(422).json({
          message: 'Please, provide a valid phone number',
        });
        return;
      }

      const patientData = {
        name,
        email,
        phone: {
          dial_code,
          country_code,
          phone_number: parsedPhoneNumber.formatNational(),
        },
        image_path: imagePath,
      };

      const result = await db.insert(patients).values(patientData).returning();
      const newPatient = result[0];
      res.status(201).json({
        message: 'Patient created successfully',
        patient: newPatient,
      });
    } catch (error) {
      console.error('Error creating patient:', error);
      res.status(500).json({ error: 'Internal server error' });
    }
  },
);

// PUT /api/patients/:id - Update patient
router.put(
  '/:id',
  upload.single('image'),
  validateRequest({
    params: Type.Object({
      id: TypeNumericId,
    }),
  }),
  async (req: Request, res: Response): Promise<void> => {
    try {
      const id = parseInt(req.params['id']!);

      const { name, email, phone } = req.body;
      const imagePath = req.file?.filename;

      const updateData: any = { name, email, phone: JSON.parse(phone) };
      if (imagePath) {
        updateData.imagePath = imagePath;
      }

      const result = await db
        .update(patients)
        .set({ ...updateData, updatedAt: new Date() })
        .where(eq(patients.id, id))
        .returning();
      const updatedPatient = result[0] || null;
      if (!updatedPatient) {
        res.status(404).json({ error: 'Patient not found' });
        return;
      }

      res.json({
        message: 'Patient updated successfully',
        patient: updatedPatient,
      });
    } catch (error) {
      console.error('Error updating patient:', error);
      res.status(500).json({ error: 'Internal server error' });
    }
  },
);

// DELETE /api/patients/:id - Delete patient
router.delete(
  '/:id',
  validateRequest({
    params: Type.Object({
      id: TypeNumericId,
    }),
  }),
  async (req: Request, res: Response): Promise<void> => {
    try {
      const id = parseInt(req.params['id']!);
      const result = await db.delete(patients).where(eq(patients.id, id)).returning();
      const deletedPatient = result[0] || null;

      if (!deletedPatient) {
        res.status(404).json({ error: 'Patient not found' });
        return;
      }

      res.json({
        message: 'Patient deleted successfully',
        patient: deletedPatient,
      });
    } catch (error) {
      console.error('Error deleting patient:', error);
      res.status(500).json({ error: 'Internal server error' });
    }
  },
);

export default router;
