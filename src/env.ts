import { createEnv } from '@t3-oss/env-core';
import { z } from 'zod';

export const env = createEnv({
  client: {
    VITE_APP_NAME: z.string().min(1),
  },
  clientPrefix: 'VITE_',
  runtimeEnv: import.meta.env,
  server: {},
});
