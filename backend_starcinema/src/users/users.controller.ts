import { Controller, Get, Query } from '@nestjs/common';
import { UsersService } from './users.service';
import { Public } from 'src/decorators/public';

@Controller('users')
export class UsersController {
    constructor(
        private usersService: UsersService,
    ){}
    

    @Public()
    @Get('exist_email')
    async getByEmail(@Query('email') email: string) {
        return await this.usersService.findOne(email);
    }

    
}
