import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { createCustomerDto } from '../users/dto/create-customer-dto';
import { createEmployeeDto } from '../users/dto/create-employee-dto';
import { UsersService } from '../users/users.service';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
	constructor(
		private usersService: UsersService,
		private jwtService: JwtService,
	) {}

	async signIn(
		email: string,
		pass: string,
	): Promise<{ access_token: string }> {
		const user = await this.usersService.findOne(email);

		if (!bcrypt.compareSync(pass, user?.password)) {
			throw new UnauthorizedException();
		}
		const payload = {
			sub: user.id,
			username: user.email,
			roles: user.role,
		};
		return {
			access_token: await this.jwtService.signAsync(payload),
		};
	}

	async signUp(signUpDto: createCustomerDto): Promise<createCustomerDto> {
		const user = await this.usersService.create_customer(signUpDto);
		return user;
	}

	async signUpEmployee(
		signUpDto: createEmployeeDto,
	): Promise<createEmployeeDto> {
		const user = await this.usersService.create_employee(signUpDto);
		return user;
	}
}
