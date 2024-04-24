import { DataSource } from 'typeorm';
import { config } from 'dotenv';
config();

export const connectionSource = new DataSource({
	migrationsTableName: 'migrations',
	type: 'postgres',
	host: process.env.HOST,
	port: parseInt(process.env.PORTDB),
	username: process.env.USER,
	password: process.env.PASSWORD,
	database: process.env.DATABASE,
	logging: false,
	synchronize: false,
	name: 'default',
	entities: ['src/**/**.entity{.ts,.js}'],
	migrations: ['src/migrations/**/*{.ts,.js}'],
});
