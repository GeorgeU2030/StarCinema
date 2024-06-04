import { DataSource } from 'typeorm';
import { Function } from './functions.entity';
import { Room } from '../rooms/rooms.entity';
import { Movie } from '../movies/movies.entity';

export const functionProviders = [
	{
		provide: 'FUNCTIONS_REPOSITORY',
		useFactory: (dataSource: DataSource) => dataSource.getRepository(Function),
		inject: ['DATA_SOURCE'],
	},
	{
		provide: 'ROOMS_REPOSITORY',
		useFactory: (dataSource: DataSource) => dataSource.getRepository(Room),
		inject: ['DATA_SOURCE'],
	},
	{
		provide : 'MOVIES_REPOSITORY',
		useFactory: (dataSource: DataSource) => dataSource.getRepository(Movie),
		inject: ['DATA_SOURCE']
	}
];