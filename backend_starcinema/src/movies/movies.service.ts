import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { Repository, Like } from 'typeorm';
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
		const movie = await this.moviesRepository.findOne({
			where: { id: id },
		})
		if (!movie) {
			throw new NotFoundException('Movie not found');
		}
    	return movie;
	}

	async findOneByTitle(title: string): Promise<Movie> {
		return this.moviesRepository.findOne({
			where: { title: Like(title + '%') },
		});
	}

	async findOneByTitleMovie(title: string): Promise<Movie> {
		return this.moviesRepository.findOne({
			where: { title: Like(title + '%'),
			isprox: false
			},
		});
	}

	async getMoviesWithFunctions(): Promise<any> {
		const movies = await this.moviesRepository.find({
			where: { isprox: false },
			relations: ["functions"] });
		return movies;
	}

	async getMoviesWithFunctionsId(id:number,date:string): Promise<any> {
		const functions = await this.moviesRepository.createQueryBuilder("movie")
        .leftJoinAndSelect("movie.functions", "function")
        .where("movie.id = :id", { id: id })
        .andWhere("DATE(function.startTime) = DATE(:date)", { date: date })
        .getMany();

    	return functions.map(movie => movie.functions);
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
