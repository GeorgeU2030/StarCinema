import { Controller, HttpStatus, HttpCode, Post,Body, Req, Get } from '@nestjs/common';
import { AuthService } from './auth.service';
import { Public } from '../decorators/public';
import { createEmployeeDto } from '../users/dto/create-employee-dto';
import { Roles } from '../roles/roles.decorator';
import { Role } from '../roles/roles.enum';

@Controller('auth')
export class AuthController {
    constructor(private authService: AuthService) {}

    @Public()
    @HttpCode(HttpStatus.OK)
    @Post('login')
    signIn(@Body() signInDto: Record<string, any>) {
      return this.authService.signIn(signInDto.email, signInDto.password);
    }

    @Roles(Role.Admin)
    @HttpCode(HttpStatus.CREATED)
    @Post('register_employee')
    signUpEmployee(@Body() signUpDto : createEmployeeDto) { 
      signUpDto.role = 'employee';     
      return this.authService.signUpEmployee(signUpDto);
    }

    @Public()
    @HttpCode(HttpStatus.CREATED)
    @Post('register_customer')
    signUpCustomer(@Body() signUpDto) { 
      signUpDto.role = 'customer';     
      return this.authService.signUp(signUpDto);
    }

    
    @Roles(Role.Admin, Role.Employee, Role.Customer)
    @HttpCode(HttpStatus.OK)
    @Get('verify_token')
    verifyToken(@Req() req: Request) {
        return { status: 'success', message: 'Token is valid' };
    }

}
