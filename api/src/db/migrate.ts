#!/usr/bin/env node

import { runMigrations } from './connection';

const main = async () => {
  try {
    await runMigrations();
    console.log('Migration completed successfully!');
    process.exit(0);
  } catch (error) {
    console.error('Migration failed:', error);
    process.exit(1);
  }
};

main();
