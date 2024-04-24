import { Test, TestingModule } from '@nestjs/testing';
import { TicketsController } from './tickets.controller';
import { TicketsService } from './tickets.service';
import { Movie } from 'src/movies/movies.entity';
import { Room } from 'src/rooms/rooms.entity';
import { Customer } from 'src/roles/customer.entity';

describe('TicketsController', () => {
	let controller: TicketsController;
	let service: TicketsService;

	beforeEach(async () => {
		const module: TestingModule = await Test.createTestingModule({
			controllers: [TicketsController],
			providers: [
				{
					provide: TicketsService,
					useValue: {
						create: jest.fn(),
						findAll: jest.fn(),
						findAllTicketsByCustomer: jest.fn(),
						findLastOneByCustomer: jest.fn(),
						findOneById: jest.fn(),
						delete: jest.fn(),
					},
				},
			],
		}).compile();

		controller = module.get<TicketsController>(TicketsController);
		service = module.get<TicketsService>(TicketsService);
	});

	afterEach(() => {
		jest.clearAllMocks();
	});

	it('should be defined', () => {
		expect(controller).toBeDefined();
	});

	describe('findAll', () => {
		it('should return an array of tickets', async () => {
			const result = [
				{
					id: 1,
					purchaseDate: new Date(),
					functionDate: new Date(),
					movie: {} as Movie,
					room: {} as Room,
					seat: 'A1',
					price: 10,
					format: '2D',
					customer: {} as Customer,
				},
			];
			jest.spyOn(service, 'findAll').mockResolvedValue(result);

			expect(await controller.findAll()).toBe(result);
			expect(service.findAll).toHaveBeenCalled();
		});
	});

	describe('findAllTicketsByCustomer', () => {
		it('should return an array of tickets', async () => {
			const result = [
				{
					id: 1,
					purchaseDate: new Date(),
					functionDate: new Date(),
					movie: {} as Movie,
					room: {} as Room,
					seat: 'A1',
					price: 10,
					format: '2D',
					customer: {} as Customer,
				},
			];
			jest.spyOn(service, 'findAllTicketsByCustomer').mockResolvedValue(
				result,
			);

			expect(await controller.findAllTicketsByCustomer(1)).toBe(result);
			expect(service.findAllTicketsByCustomer).toHaveBeenCalled();
		});
	});

	describe('findOneByCustomer', () => {
		it('should return a ticket by customer', async () => {
			const customerId = 1;
			const result = {
				id: 1,
				purchaseDate: new Date(),
				functionDate: new Date(),
				movie: {} as Movie,
				room: {} as Room,
				seat: 'A1',
				price: 10,
				format: '2D',
				customer: {} as Customer,
			};
			jest.spyOn(service, 'findLastOneByCustomer').mockResolvedValue(
				result,
			);

			expect(await controller.findOneByCustomer(customerId)).toBe(result);
			expect(service.findLastOneByCustomer).toHaveBeenCalled();
		});
	});

	describe('findOneById', () => {
		it('should return a ticket by id', async () => {
			const result = {
				id: 1,
				purchaseDate: new Date(),
				functionDate: new Date(),
				movie: {} as Movie,
				room: {} as Room,
				seat: 'A1',
				price: 10,
				format: '2D',
				customer: {} as Customer,
			};
			jest.spyOn(service, 'findOneById').mockResolvedValue(result);

			expect(await controller.findOneById(1)).toBe(result);
			expect(service.findOneById).toHaveBeenCalled();
		});
	});

	describe('create', () => {
		it('should create a ticket', async () => {
			const newTicket = {
				purchaseDate: new Date(),
				functionDate: new Date(),
				movieId: '1',
				roomId: '1',
				seat: 'A1',
				price: 10,
				format: '2D',
				customerId: '1',
			};
			const result = {
				id: 1,
				purchaseDate: new Date(),
				functionDate: new Date(),
				movie: {} as Movie,
				room: {} as Room,
				seat: 'A1',
				price: 10,
				format: '2D',
				customer: {} as Customer,
			};
			jest.spyOn(service, 'create').mockResolvedValue(result);

			expect(await controller.create(newTicket)).toBe(result);
			expect(service.create).toHaveBeenCalled();
		});
	});

	describe('delete', () => {
		it('should delete a ticket', async () => {
			const ticketId = 1;
			const response = 'Ticket deleted successfully';
			jest.spyOn(service, 'delete').mockResolvedValue(response);

			expect(await controller.delete(ticketId)).toEqual(response);
			expect(service.delete).toHaveBeenCalled();
		});
	});
});
