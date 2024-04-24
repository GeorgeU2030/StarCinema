import { Test, TestingModule } from '@nestjs/testing';
import { FunctionsController } from './functions.controller';
import { FunctionsService } from './functions.service';
import { NotFoundException } from '@nestjs/common';
import { Function } from './functions.entity';

describe('FunctionsController', () => {
	let controller: FunctionsController;
	let service: FunctionsService;

	beforeEach(async () => {
		const module: TestingModule = await Test.createTestingModule({
			controllers: [FunctionsController],
			providers: [
				{
					provide: FunctionsService,
					useValue: {
						create: jest.fn(),
						findAll: jest.fn(),
						findOne: jest.fn(),
						update: jest.fn(),
						remove: jest.fn(),
					},
				},
			],
		}).compile();

		controller = module.get<FunctionsController>(FunctionsController);
		service = module.get<FunctionsService>(FunctionsService);
	});

	afterEach(() => {
		jest.clearAllMocks();
	});

	it('should be defined', () => {
		expect(controller).toBeDefined();
	});

	describe('create', () => {
		it('should create a function', async () => {
			const createFunctionDto = {
                startTime: new Date(),
                endTime: new Date(),
                movieId: 1,
                roomId: 1,
            };
			const expectedResult = {} as Function;
			jest.spyOn(service, 'create').mockResolvedValueOnce(expectedResult);

			const result = await controller.create(createFunctionDto);

			expect(service.create).toHaveBeenCalledWith(createFunctionDto);
			expect(result).toEqual(expectedResult);
		});
	});

	describe('findAll', () => {
		it('should return an array of functions', async () => {
			const expectedResult = []; // Provide expected result for findAll
			jest.spyOn(service, 'findAll').mockResolvedValueOnce(
				expectedResult,
			);

			const result = await controller.findAll();

			expect(service.findAll).toHaveBeenCalled();
			expect(result).toEqual(expectedResult);
		});
	});

	describe('findOne', () => {
		it('should return a function by id', async () => {
			const id = 1;
			const expectedResult = {} as Function;
			jest.spyOn(service, 'findOne').mockResolvedValueOnce(
				expectedResult,
			);

			const result = await controller.findOne(id);

			expect(service.findOne).toHaveBeenCalledWith(id);
			expect(result).toEqual(expectedResult);
		});

		it('should throw NotFoundException when function not found', async () => {
			const id = 999;
			jest.spyOn(service, 'findOne').mockRejectedValueOnce(
				new NotFoundException(),
			);

			await expect(controller.findOne(id)).rejects.toThrow(
				NotFoundException,
			);
		});
	});

	describe('update', () => {
		it('should update a function', async () => {
			const id = 1;
			const updateFunctionDto = {
                startTime: new Date(),
                endTime: new Date(),
                movieId: 1,
                roomId: 1,
            };
			const expectedResult = {} as Function;
			jest.spyOn(service, 'update').mockResolvedValueOnce(expectedResult);

			const result = await controller.update(id, updateFunctionDto);

			expect(service.update).toHaveBeenCalledWith(id, updateFunctionDto);
			expect(result).toEqual(expectedResult);
		});
	});

	describe('delete', () => {
		it('should remove a function', async () => {
			const id = 1;
			jest.spyOn(service, 'remove').mockResolvedValueOnce();

			await controller.delete(id);

			expect(service.remove).toHaveBeenCalledWith(id);
		});
	});
});
