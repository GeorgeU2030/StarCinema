import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { Repository } from 'typeorm';
import { Function } from './functions.entity';
import { CreateFunctionDto } from './dto/create-function.dto';
import { UpdateFunctionDto } from './dto/update-function.dto';

@Injectable()
export class FunctionsService {
    constructor(
        @Inject('FUNCTIONS_REPOSITORY')
        private functionRepository: Repository<Function>,
    ) {}

    async create(createFunctionDto: CreateFunctionDto): Promise<Function> {
        const newFunction = this.functionRepository.create(createFunctionDto);
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
