import { db } from './connection';
import { patients } from './schemas';
import { eq, sql } from 'drizzle-orm';

// Test database connection
export const testConnection = async (): Promise<boolean> => {
  try {
    // Simple query to test connection - just select 1
    await db.execute(sql`SELECT 1`);
    return true;
  } catch (error) {
    console.error('Database connection test failed:', error);
    return false;
  }
};

// Get all patients
export const getAllPatients = async () => {
  return await db.select().from(patients).orderBy(patients.createdAt);
};

// Get patient by ID
export const getPatientById = async (id: number) => {
  const result = await db.select().from(patients).where(eq(patients.id, id));
  return result[0] || null;
};

// Create new patient
export const createPatient = async (patientData: {
  name: string;
  email: string;
  phone: any; // JSONB type
  imagePath?: string;
}) => {
  const result = await db.insert(patients).values(patientData).returning();
  return result[0];
};

// Update patient
export const updatePatient = async (
  id: number,
  patientData: Partial<{
    name: string;
    email: string;
    phone: any;
    imagePath: string;
  }>,
) => {
  const result = await db
    .update(patients)
    .set({ ...patientData, updatedAt: new Date() })
    .where(eq(patients.id, id))
    .returning();
  return result[0] || null;
};

// Delete patient
export const deletePatient = async (id: number) => {
  const result = await db.delete(patients).where(eq(patients.id, id)).returning();
  return result[0] || null;
};
