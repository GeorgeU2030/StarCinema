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
import { CreateRoomDto } from './dto/create-room.dto';
import { UpdateRoomDto } from './dto/update-room.dto';
import { RoomsService } from './rooms.service';
import { Roles } from '../roles/roles.decorator';
import { Role } from '../roles/roles.enum';

@Controller('rooms')
export class RoomsController {
	constructor(private readonly roomsService: RoomsService) {}

	@HttpCode(HttpStatus.OK)
	@Get()
	findAll() {
		return this.roomsService.findAll();
	}

	@HttpCode(HttpStatus.OK)
	@Get(':name')
	findOneByName(@Param('name') name: string) {
		return this.roomsService.findOneByName(name);
	}

	@HttpCode(HttpStatus.OK)
	@Get(':id')
	findOneById(@Param('id') id: number) {
		return this.roomsService.findOneById(id);
	}

	@Roles(Role.Admin)
	@HttpCode(HttpStatus.CREATED)
	@Post('create')
	create(@Body() room: CreateRoomDto) {
		return this.roomsService.create(room);
	}

	@Roles(Role.Admin)
	@HttpCode(HttpStatus.OK)
	@Put(':id')
	update(@Body() room: UpdateRoomDto, @Param('id') id: number) {
		return this.roomsService.update(id, room);
	}

	@Roles(Role.Admin)
	@HttpCode(HttpStatus.OK)
	@Delete(':id')
	delete(@Param('id') id: number) {
		return this.roomsService.delete(id);
	}
}
