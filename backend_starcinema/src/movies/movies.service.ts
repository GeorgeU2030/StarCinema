import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { Repository } from 'typeorm';
import { Movie } from './movies.entity';
import { CreateMovieDto } from './dto/create-movie.dto';

@Injectable()
export class MoviesService {
	constructor(
		@Inject('MOVIES_REPOSITORY')
		private moviesRepository: Repository<Movie>,
	) {}

	async findAll(): Promise<Movie[]> {
		return this.moviesRepository.find();
	}

	async findOneById(id: number): Promise<Movie> {
		return this.moviesRepository.findOne({
			where: { id: id },
		});
	}

	async findOneByTitle(title: string): Promise<Movie> {
		return this.moviesRepository.findOne({
			where: { title: title },
		});
	}

	async create(movie: CreateMovieDto): Promise<Movie> {
		return this.moviesRepository.save(movie);
	}

	async delete(id: number): Promise<string> {
		const movie_found = await this.findOneById(id);
		if (!movie_found) {
			throw new NotFoundException('Movie not found');
		}
		await this.moviesRepository.delete(id);
		return 'Movie deleted successfully';
	}
}
