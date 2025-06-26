import { pgTable, serial, text, timestamp, jsonb } from 'drizzle-orm/pg-core';

export const patients = pgTable('patients', {
  id: serial('id').primaryKey(),
  name: text('name').notNull(),
  email: text('email').unique().notNull(),
  phone: jsonb('phone').notNull(),
  imagePath: text('image_path'),
  createdAt: timestamp('created_at').defaultNow(),
  updatedAt: timestamp('updated_at').defaultNow(),
});
