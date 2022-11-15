import { DataSource, DataSourceOptions } from 'typeorm';

export const dataSourceOptions: DataSourceOptions = {
  name: 'default',
  type: 'mysql',
  host: 'localhost',
  port: 3306,
  username: 'root',
  password: 'LaDecima2014',
  database: 'shop',
  entities: ['dist/**/*.entity{.ts,.js}'],
  synchronize: true,
  dropSchema: false,
  migrationsRun: true,
  migrations: ['dist/db/migrations/**/*{.ts,.js}'],
  // cli: {
  //   migrationsDir: 'src/db/migrations',
  // },
  // migrations: ['src/migrations/*.{js,ts}'],
  subscribers: [__dirname + '/db/subscribers/**/*{.ts,.js}'],
};

const dataSource = new DataSource(dataSourceOptions);
dataSource.initialize();

export default dataSource;
