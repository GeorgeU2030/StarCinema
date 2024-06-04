import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { Repository, Between, LessThanOrEqual, MoreThanOrEqual, In, Not} from 'typeorm';
import { Function } from './functions.entity';
import { CreateFunctionDto } from './dto/create-function.dto';
import { UpdateFunctionDto } from './dto/update-function.dto';
import { Room } from '../rooms/rooms.entity';
import { Movie } from '../movies/movies.entity';

@Injectable()
export class FunctionsService {
    constructor(
        @Inject('FUNCTIONS_REPOSITORY')
        private functionRepository: Repository<Function>,

        @Inject('ROOMS_REPOSITORY')
        private roomsRepository: Repository<Room>,

        @Inject('MOVIES_REPOSITORY')
        private moviesRepository: Repository<Movie>,
    ) {}

    async create(createFunctionDto: CreateFunctionDto): Promise<Function> {
        const newFunction = new Function();
        newFunction.startTime = createFunctionDto.startTime;
        newFunction.endTime = createFunctionDto.endTime;

        newFunction.movie = await this.moviesRepository.findOne(
            {
                where: { id: createFunctionDto.movieId }
            }
        );
        newFunction.room = await this.roomsRepository.findOne({
            where: { id: createFunctionDto.roomId }
        });
        return this.functionRepository.save(newFunction);
    }

    async findAll(): Promise<Function[]> {
        return this.functionRepository.find({
            relations: ['movie', 'room']
        });
    }

    async findOne(id: number): Promise<Function> {
        const functionEntity = await this.functionRepository.findOne({
            where: { id },
            relations: ['movie', 'room']
        });
        if (!functionEntity) {
            throw new NotFoundException(`Function with ID ${id} not found.`);
        }
        return functionEntity;
    }

    

    async findAvailableRooms(dateString: string): Promise<Room[]> {
        const dateTime = new Date(dateString);

        const scheduledFunctions = await this.functionRepository.find({
            where: {
                startTime: LessThanOrEqual(dateTime),
                endTime: MoreThanOrEqual(dateTime)
            },
            relations: ['room']
        });

        const reservedRoomIds = scheduledFunctions.map(func => func.room.id);

        const availableRooms = await this.roomsRepository.find({
            where: {
                id: Not(In(reservedRoomIds))
            }
        });

        return availableRooms;
        
    }
    

    async update(id: number, updateFunctionDto: UpdateFunctionDto): Promise<Function> {
        const functionEntity = await this.findOne(id);
        this.functionRepository.merge(functionEntity, updateFunctionDto);
        return this.functionRepository.save(functionEntity);
    }

    async remove(id: number): Promise<void> {
        const result = await this.functionRepository.delete(id);
        if (result.affected === 0) {
            throw new NotFoundException(`Function with ID ${id} not found.`);
        }
    }


}
