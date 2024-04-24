import {
	Body,
	Controller,
	Delete,
	Get,
	HttpCode,
	HttpStatus,
	Param,
	Post,
	Put,
} from '@nestjs/common';
import { Public } from '../decorators/public';
import { Roles } from '../roles/roles.decorator';
import { Role } from '../roles/roles.enum';
import { CreateFunctionDto } from './dto/create-function.dto';
import { UpdateFunctionDto } from './dto/update-function.dto';
import { FunctionsService } from './functions.service';

@Controller('functions')
export class FunctionsController {
	constructor(private readonly functionsService: FunctionsService) {}

	@HttpCode(HttpStatus.OK)
	@Get()
	findAll() {
		return this.functionsService.findAll();
	}

	@HttpCode(HttpStatus.OK)
	@Get(':id')
	findOne(@Param('id') id: number) {
		return this.functionsService.findOne(id);
	}

	@Roles(Role.Admin)
	@HttpCode(HttpStatus.CREATED)
	@Post('create')
	create(@Body() createFunctionDto: CreateFunctionDto) {
		return this.functionsService.create(createFunctionDto);
	}

	@Roles(Role.Admin)
	@HttpCode(HttpStatus.OK)
	@Put(':id')
	update(@Param('id') id: number, @Body() updateFunctionDto: UpdateFunctionDto) {
		return this.functionsService.update(id, updateFunctionDto);
	}

	@Roles(Role.Admin)
	@HttpCode(HttpStatus.OK)
	@Delete(':id')
	delete(@Param('id') id: number) {
		return this.functionsService.remove(id);
	}
}
