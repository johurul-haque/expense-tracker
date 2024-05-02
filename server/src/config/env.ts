import 'dotenv/config';
import { z } from 'zod';

export const env = z
  .object({
    PORT: z.number().default(3000),
  })
  .parse(process.env);
