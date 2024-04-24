import {
	Body,
	Controller,
	Delete,
	Get,
	HttpCode,
	HttpStatus,
	Param,
	Post,
} from '@nestjs/common';
import { Public } from '../decorators/public';
import { Roles } from '../roles/roles.decorator';
import { Role } from '../roles/roles.enum';
import { CreateMovieDto } from './dto/create-movie.dto';
import { MoviesService } from './movies.service';

@Controller('movies')
export class MoviesController {
	constructor(private readonly moviesService: MoviesService) {}

	@Public()
	@HttpCode(HttpStatus.OK)
	@Get()
	findAll() {
		return this.moviesService.findAll();
	}

	@Public()
	@HttpCode(HttpStatus.OK)
	@Get(':title')
	findOneByTitle(@Param('title') title: string) {
		return this.moviesService.findOneByTitle(title);
	}

	@Roles(Role.Admin)
	@HttpCode(HttpStatus.OK)
	@Get(':id')
	findOneById(@Param('id') id: number) {
		return this.moviesService.findOneById(id);
	}

	@Roles(Role.Admin)
	@HttpCode(HttpStatus.CREATED)
	@Post('create')
	create(@Body() movie: CreateMovieDto) {
		return this.moviesService.create(movie);
	}

	@Roles(Role.Admin)
	@HttpCode(HttpStatus.OK)
	@Delete(':id')
	delete(@Param('id') id: number) {
		return this.moviesService.delete(id);
	}
}
