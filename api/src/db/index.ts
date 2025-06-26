// Database connection
export { db } from './connection';

// Database schemas
export { patients } from './schemas';

// Database utilities
export {
  testConnection,
  getAllPatients,
  getPatientById,
  createPatient,
  updatePatient,
  deletePatient,
} from './utils';
