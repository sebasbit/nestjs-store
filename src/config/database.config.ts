import * as process from 'node:process';
import { registerAs } from '@nestjs/config';

export default registerAs('database', () => ({
  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
  type: 'postgres' as any,
  host: process.env.DB_HOST,
  port: parseInt(process.env.DB_PORT || '5432'),
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  synchronize: false,
  autoLoadEntities: true,
}));
