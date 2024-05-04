import 'dotenv/config';
import { z } from 'zod';

export const env = z
  .object({
    PORT: z.coerce.number().default(3000),
    KINDE_DOMAIN: z.string().url(),
    KINDE_CLIENT_ID: z.string(),
    KINDE_CLIENT_SECRET: z.string(),
    KINDE_REDIRECT_URI: z.string().url(),
    KINDE_LOGOUT_REDIRECT_URI: z.string().url(),
  })
  .parse(process.env);
