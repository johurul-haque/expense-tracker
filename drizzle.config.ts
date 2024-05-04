import 'dotenv/config';
import type { Config } from 'drizzle-kit';
import { env } from './server/src/config/env';

export default {
  schema: './server/db/schema/*.schema.ts',
  out: './server/db/migrations',
  driver: 'pg',
  dbCredentials: {
    connectionString: env.DATABASE_URL,
  },
} satisfies Config;
