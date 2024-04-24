import { Module } from '@nestjs/common';
import { DatabaseModule } from '../database/database.module';
import { MoviesController } from './movies.controller';
import { MoviesService } from './movies.service';
import { moviesProviders } from './movies.providers';

@Module({
	imports: [DatabaseModule],
	controllers: [MoviesController],
	providers: [...moviesProviders, MoviesService],
})
export class MoviesModule {}
