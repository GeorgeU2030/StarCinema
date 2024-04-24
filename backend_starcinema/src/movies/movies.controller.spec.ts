import { Test, TestingModule } from '@nestjs/testing';
import { MoviesController } from './movies.controller';
import { MoviesService } from './movies.service';

describe('MoviesController', () => {
	let controller: MoviesController;
	let service: MoviesService;

	beforeEach(async () => {
		const module: TestingModule = await Test.createTestingModule({
			controllers: [MoviesController],
			providers: [
				{
					provide: MoviesService,
					useValue: {
						create: jest.fn(),
						findAll: jest.fn(),
						findOneById: jest.fn(),
						findOneByTitle: jest.fn(),
						delete: jest.fn(),
					},
				},
			],
		}).compile();

		controller = module.get<MoviesController>(MoviesController);
		service = module.get<MoviesService>(MoviesService);
	});

	afterEach(() => {
		jest.clearAllMocks();
	});

	it('should be defined', () => {
		expect(controller).toBeDefined();
	});

	describe('findAll', () => {
		it('should return an array of movies', async () => {
			const result = [
				{
					id: 1,
					title: 'Test Movie',
					year: 2021,
					duration: 120,
					genres: ['Action'],
					functions: {},
				},
				{
					id: 2,
					title: 'Test Movie 2',
					year: 2021,
					duration: 120,
					genres: ['Action'],
					functions: {},
				},
			];
			jest.spyOn(service, 'findAll').mockResolvedValue(result);
		});
	});

	describe('findOneByTitle', () => {
		it('should return a movie by title', async () => {
			const title = 'Test Movie';
			const result = {
				id: 1,
				title: 'Test Movie',
				year: 2021,
				duration: 120,
				genres: ['Action'],
				functions: {},
			};
			jest.spyOn(service, 'findOneByTitle').mockResolvedValue(result);

			expect(await controller.findOneByTitle(title)).toBe(result);
		});
	});

	describe('findOneById', () => {
		it('should return a movie by id', async () => {
			const id = 1;
			const result = {
				id,
				title: 'Test Movie',
				year: 2021,
				duration: 120,
				genres: ['Action'],
				functions: {},
			};
			jest.spyOn(service, 'findOneById').mockResolvedValue(result);

			expect(await controller.findOneById(id)).toBe(result);
		});
	});

	describe('create', () => {
		it('should create a movie', async () => {
			const movie = {
				title: 'Test Movie',
				year: 2021,
				duration: 120,
				genres: ['Action'],
				functions: {},
			};
			const result = { id: 1, ...movie };
			jest.spyOn(service, 'create').mockResolvedValue(result);

			expect(await controller.create(movie)).toBe(result);
		});
	});

	describe('delete', () => {
		it('should delete a movie', async () => {
			const id = 1;
			const result = 'Movie deleted successfully';
			jest.spyOn(service, 'delete').mockResolvedValue(result);

			expect(await controller.delete(id)).toBe(result);
		});
	});
});
