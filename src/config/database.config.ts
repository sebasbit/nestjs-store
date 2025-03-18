import * as process from 'node:process';
import { registerAs } from '@nestjs/config';

export default registerAs('database', () => ({
  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
  type: 'postgres' as any,
  url: process.env.DB_URL,
  synchronize: false,
  autoLoadEntities: true,
}));
