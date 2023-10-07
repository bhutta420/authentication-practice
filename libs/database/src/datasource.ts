import { DataSource, DataSourceOptions } from "typeorm";
import { SeederOptions } from 'typeorm-extension';
import { config as dotEnvConfig } from 'dotenv';
dotEnvConfig()
const options: DataSourceOptions & SeederOptions = {
  type: 'mysql',
  host: process.env.DB_HOST,
  port: parseInt(process.env.DB_PORT),
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  entities: [
    "libs/database/src/entities/*.entity.ts"
  ],
  migrations: [
    `libs/database/src/migrations/**`
  ],
  migrationsTableName: "migrations",
  seeds: [
    'libs/database/src/seeds/**/*{.ts,.js}'
  ],
  factories: [
    'libs/database/src/factories/**/*{.ts,.js}'
  ]
};
export default new DataSource(options)