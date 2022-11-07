export = {
  type: 'mysql',
  host: 'localhost',
  port: 3306,
  username: 'root',
  password: 'LaDecima2014',
  database: 'shop',
  entities: [__dirname + '/**/*.entity{.ts,.js}'],
  synchronize: true,
};
