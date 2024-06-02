import { HttpException, HttpStatus, Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { createCustomerDto } from '../users/dto/create-customer-dto';
import { createEmployeeDto } from '../users/dto/create-employee-dto';
import { UsersService } from '../users/users.service';
import * as bcrypt from 'bcrypt';
import { OAuth2Client } from 'google-auth-library';

@Injectable()
export class AuthService {
	constructor(
		private usersService: UsersService,
		private jwtService: JwtService,
	) {
		
	}

	async signIn(
		email: string,
		pass: string,
	): Promise<{ access_token: string }> {
		const user = await this.usersService.findOne(email);

		if (!user) {
			throw new NotFoundException('User not found');
		}

		let passwordsMatch = false

		if(pass.startsWith('$2b$')){
			passwordsMatch = (pass == user?.password)
		}
		else  {
			passwordsMatch = await bcrypt.compare(pass, user.password);
		}

		if (!passwordsMatch) {
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
		const existingUser = await this.usersService.findOne(signUpDto.email);
		if (existingUser) {
			throw new HttpException('Email already in use', HttpStatus.BAD_REQUEST);
		}

		try {
			const user = await this.usersService.create_customer(signUpDto);
			return user;
		} catch (error) {
			throw new HttpException('Error creating user', HttpStatus.INTERNAL_SERVER_ERROR);
		}
	}

	async signUpEmployee(
		signUpDto: createEmployeeDto,
	): Promise<createEmployeeDto> {
		try {
			const user = await this.usersService.create_employee(signUpDto);
			return user;
		}catch (error) {
			throw new HttpException('Error creating user', HttpStatus.INTERNAL_SERVER_ERROR);
		}
	}

}
