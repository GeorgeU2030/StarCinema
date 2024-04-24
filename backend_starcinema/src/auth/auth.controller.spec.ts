import { Test, TestingModule } from '@nestjs/testing';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { createEmployeeDto } from '../users/dto/create-employee-dto';
import { createCustomerDto } from '../users/dto/create-customer-dto';
import * as bcrypt from 'bcrypt';
import { UnauthorizedException } from '@nestjs/common';

describe('AuthController', () => {
	let controller: AuthController;
	let authService: AuthService;

	beforeEach(async () => {
		const module: TestingModule = await Test.createTestingModule({
			controllers: [AuthController],
			providers: [
				{
					provide: AuthService,
					useValue: {
						signIn: jest.fn(),
						signUpEmployee: jest.fn(),
						signUp: jest.fn(),
					},
				},
			],
		}).compile();

		controller = module.get<AuthController>(AuthController);
		authService = module.get<AuthService>(AuthService);
	});

	afterEach(() => {
		jest.clearAllMocks();
	});

	it('should be defined', () => {
		expect(controller).toBeDefined();
	});

	describe('signIn', () => {
		it('should return access token on valid credentials', async () => {
			const email = 'test@example.com';
			const password = 'password123';
			const mockUser = {
				id: 1,
				email,
				password: bcrypt.hashSync(password, 10),
			};
			jest.spyOn(authService, 'signIn').mockResolvedValueOnce({
				access_token: 'fakeAccessToken',
			});

			const result = await controller.signIn({ email, password });

			expect(authService.signIn).toHaveBeenCalledWith(email, password);
			expect(result).toEqual({ access_token: 'fakeAccessToken' });
		});

		it('should throw UnauthorizedException on invalid credentials', async () => {
			const email = 'test@example.com';
			const password = 'password123';
			jest.spyOn(authService, 'signIn').mockRejectedValueOnce(
				new UnauthorizedException(),
			);

			await expect(
				controller.signIn({ email, password }),
			).rejects.toThrow(UnauthorizedException);
		});
	});

	describe('signUpEmployee', () => {
		it('should return the created employee', async () => {
			const signUpDto: createEmployeeDto = {
				email: 'johndoe@gmail.com',
				password: 'password',
				role: 'employee',
				name: 'John',
				lastname: 'Doe',
				location: 'Cali',
				timeContract: 'Full-time',
			};
			const mockCreatedEmployee = {
				id: 1,
				...signUpDto,
			};
			jest.spyOn(authService, 'signUpEmployee').mockResolvedValueOnce(
				mockCreatedEmployee,
			);

			const result = await controller.signUpEmployee(signUpDto);

			expect(authService.signUpEmployee).toHaveBeenCalledWith(signUpDto);
			expect(result).toEqual(mockCreatedEmployee);
		});
	});

	describe('signUpCustomer', () => {
		it('should return the created customer', async () => {
			const signUpDto: createCustomerDto = {
				email: 'marydoe@gmail.com',
				password: 'password',
				role: 'customer',
				name: 'Mary',
				lastname: 'Doe',
				location: 'Cali',
			};
			const mockCreatedCustomer = {
				id: 1,
				...signUpDto,
			};
			jest.spyOn(authService, 'signUp').mockResolvedValueOnce(
				mockCreatedCustomer,
			);

			const result = await controller.signUpCustomer(signUpDto);

			expect(authService.signUp).toHaveBeenCalledWith(signUpDto);
			expect(result).toEqual(mockCreatedCustomer);
		});
	});
});
