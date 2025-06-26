import { db } from './connection';
import { sql } from 'drizzle-orm';

import { Type } from '@sinclair/typebox';

// Test database connection
export const testConnection = async (): Promise<boolean> => {
  try {
    await db.execute(sql`SELECT 1`);

    return true;
  } catch (error) {
    console.error('Database connection test failed:', error);
    return false;
  }
};

export const TypeNumericId = Type.Transform(
  Type.String({
    pattern: '^[0-9]+$', // Only digits
  }),
)
  .Decode((value) => parseInt(value, 10))
  .Encode((value) => value.toString());
