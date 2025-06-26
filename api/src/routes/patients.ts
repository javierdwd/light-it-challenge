import { Router, Request, Response } from 'express';
import { upload } from '@/middleware/upload';
import { db, patients } from '@/db';
import { eq } from 'drizzle-orm';
import { Type } from '@sinclair/typebox';

import { validateRequest } from '@/middleware/validation';
import { TypeNumericId } from '@/db/utils';

const router = Router();

// GET /api/patients - Get all patients
router.get('/', async (_req: Request, res: Response): Promise<void> => {
  try {
    const allPatients = await db.select().from(patients).orderBy(patients.createdAt);

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
router.post('/', upload.single('image'), async (req: Request, res: Response): Promise<void> => {
  try {
    const { name, email, phone } = req.body;
    const imagePath = req.file?.filename;

    const patientData = {
      name,
      email,
      phone: JSON.parse(phone), // Parse JSONB phone data
      ...(imagePath && { imagePath }), // Only include if imagePath exists
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
});

// PUT /api/patients/:id - Update patient
router.put(
  '/:id',
  validateRequest({
    params: Type.Object({
      id: TypeNumericId,
    }),
  }),
  upload.single('image'),
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
