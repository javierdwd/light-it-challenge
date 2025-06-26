import { Router, Request, Response } from 'express';
import { upload } from '@/middleware/upload';
import { getAllPatients, getPatientById, createPatient, updatePatient, deletePatient } from '@/db';
import { Type } from '@sinclair/typebox';

import { validateRequest } from '@/middleware/validation';
// import { PatientSchema, type PatientType } from '@/schemas/patient';

const router = Router();

// GET /api/patients - Get all patients
router.get('/', async (_req: Request, res: Response): Promise<void> => {
  try {
    const patients = await getAllPatients();

    res.json({
      data: patients,
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
      id: Type.Number(),
    }),
  }),
  async (req: Request<{ id: string }>, res: Response): Promise<void> => {
    try {
      const id = parseInt(req.params.id);
      const patient = await getPatientById(id);
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

    const newPatient = await createPatient(patientData);
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
      id: Type.Number(),
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

      const updatedPatient = await updatePatient(id, updateData);
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
      id: Type.Number(),
    }),
  }),
  async (req: Request, res: Response): Promise<void> => {
    try {
      const id = parseInt(req.params['id']!);
      const deletedPatient = await deletePatient(id);
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
