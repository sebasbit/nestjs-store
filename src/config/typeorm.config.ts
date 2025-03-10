import { DataSource } from 'typeorm';
import { config } from 'dotenv';
import databaseConfig from './database.config';

config();
const db = databaseConfig();

export default new DataSource({
  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
  type: db.type,
  host: db.host,
  port: db.port,
  username: db.username,
  password: db.password,
  database: db.database,
  synchronize: false,
  logging: true,
  migrationsRun: false,
  entities: [__dirname + '/../**/*.entity.ts'],
  migrations: [__dirname + '/../database/migrations/*.ts'],
  migrationsTableName: 'migrations',
});
