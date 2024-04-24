import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { Repository } from 'typeorm';
import { Room } from './rooms.entity';
import { CreateRoomDto } from './dto/create-room.dto';
import { UpdateRoomDto } from './dto/update-room.dto';

@Injectable()
export class RoomsService {
	constructor(
		@Inject('ROOMS_REPOSITORY')
		private roomsRepository: Repository<Room>,
	) {}

	async findAll(): Promise<Room[]> {
		return this.roomsRepository.find();
	}

	async findOneById(id: number): Promise<Room> {
		return this.roomsRepository.findOne({
			where: { id: id },
		});
	}

	async findOneByName(name: string): Promise<Room> {
		return this.roomsRepository.findOne({
			where: { name: name },
		});
	}

	async create(room: CreateRoomDto): Promise<Room> {
		return this.roomsRepository.save(room);
	}

	async update(id: number, room: UpdateRoomDto): Promise<Room> {
		const room_found = await this.findOneById(id);
		if (!room_found) {
			throw new NotFoundException('Room not found');
		}
		await this.roomsRepository.update(id, room);
		return this.findOneById(id);
	}

	async delete(id: number): Promise<string> {
		const room_found = await this.findOneById(id);
		if (!room_found) {
			throw new NotFoundException('Room not found');
		}
		await this.roomsRepository.delete(id);
		return 'Room deleted successfully';
	}
}
