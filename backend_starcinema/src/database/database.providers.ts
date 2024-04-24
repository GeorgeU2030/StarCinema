import { DataSource } from 'typeorm';

export const databaseProviders = [
  {
    provide: 'DATA_SOURCE',
    useFactory: async () => {
      const dataSource = new DataSource({
        type: 'postgres',
        host: process.env.HOST,
        port: Number(process.env.PORTDB),
        username: process.env.USER,
        password: process.env.PASSWORD,
        database: process.env.DATABASE,
        entities: [
            __dirname + '/../**/*.entity{.ts,.js}',
        ],
      });
      return dataSource.initialize();
    },
    // 
  },
];