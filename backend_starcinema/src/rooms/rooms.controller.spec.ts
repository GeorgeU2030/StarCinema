import { Test, TestingModule } from '@nestjs/testing';
import { RoomsController } from './rooms.controller';
import { RoomsService } from './rooms.service';

describe('RoomsController', () => {
	let controller: RoomsController;
	let service: RoomsService;

	beforeEach(async () => {
		const module: TestingModule = await Test.createTestingModule({
			controllers: [RoomsController],
			providers: [
				{
					provide: RoomsService,
					useValue: {
						create: jest.fn(),
						findAll: jest.fn(),
						findOneById: jest.fn(),
						findOneByName: jest.fn(),
						delete: jest.fn(),
						update: jest.fn(),
					},
				},
			],
		}).compile();

		controller = module.get<RoomsController>(RoomsController);
		service = module.get<RoomsService>(RoomsService);
	});

	afterEach(() => {
		jest.clearAllMocks();
	});

	it('should be defined', () => {
		expect(controller).toBeDefined();
	});

	describe('findAll', () => {
		it('should return an array of rooms', async () => {
			const result = [
				{
					id: 1,
					name: 'Test Room',
					seats: 100,
					isAvailable: true,
					functions: {},
				},
				{
					id: 2,
					name: 'Another Room',
					seats: 200,
					isAvailable: false,
					functions: {},
				},
			];
			jest.spyOn(service, 'findAll').mockResolvedValue(result);

			expect(await controller.findAll()).toBe(result);
			expect(service.findAll).toHaveBeenCalled();
		});

		it('should return an empty array if no rooms are found', async () => {
			jest.spyOn(service, 'findAll').mockResolvedValue([]);
			expect(await controller.findAll()).toEqual([]);
			expect(service.findAll).toHaveBeenCalled();
		});
	});

	describe('findOneById', () => {
		it('should return a room by id', async () => {
			const result = {
				id: 1,
				name: 'Test Room',
				seats: 100,
				isAvailable: true,
				functions: {},
			};
			jest.spyOn(service, 'findOneById').mockResolvedValue(result);

			expect(await controller.findOneById(1)).toBe(result);
			expect(service.findOneById).toHaveBeenCalledWith(1);
		});

		it('should return null if no room is found', async () => {
			jest.spyOn(service, 'findOneById').mockResolvedValue(null);
			expect(await controller.findOneById(1)).toBeNull();
			expect(service.findOneById).toHaveBeenCalledWith(1);
		});
	});

	describe('findOneByName', () => {
		it('should return a room by name', async () => {
			const result = {
				id: 1,
				name: 'Test Room',
				seats: 100,
				isAvailable: true,
				functions: {},
			};
			jest.spyOn(service, 'findOneByName').mockResolvedValue(result);

			expect(await controller.findOneByName('Test Room')).toBe(result);
			expect(service.findOneByName).toHaveBeenCalledWith('Test Room');
		});

		it('should return null if no room is found', async () => {
			jest.spyOn(service, 'findOneByName').mockResolvedValue(null);
			expect(await controller.findOneByName('Test Room')).toBeNull();
			expect(service.findOneByName).toHaveBeenCalledWith('Test Room');
		});
	});

	describe('create', () => {
		it('should create a room', async () => {
			const room = {
				id: 1,
				name: 'Test Room',
				seats: 100,
				isAvailable: true,
				functions: {},
			};
			jest.spyOn(service, 'create').mockResolvedValue(room);

			expect(await controller.create(room)).toBe(room);
			expect(service.create).toHaveBeenCalledWith(room);
		});
	});

	describe('update', () => {
		it('should update a room', async () => {
			const room = {
				id: 1,
				name: 'Test Room',
				seats: 100,
				isAvailable: true,
				functions: {},
			};
			const roomToUpdate = {
				isAvailable: false,
			};
			jest.spyOn(service, 'update').mockResolvedValue(room);

			expect(await controller.update(roomToUpdate, room.id)).toBe(room);
			expect(service.update).toHaveBeenCalledWith(room.id, roomToUpdate);
		});
	});

	describe('delete', () => {
		it('should delete a room', async () => {
			const id = 1;
			const response = 'Room deleted successfully';
			jest.spyOn(service, 'delete').mockResolvedValue(response);

			expect(await controller.delete(id)).toBe(response);
			expect(service.delete).toHaveBeenCalledWith(id);
		});
	});
});
