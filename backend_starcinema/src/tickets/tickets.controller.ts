import {
    Body,
    Controller,
    Delete,
    Get,
    HttpCode,
    HttpStatus,
    Param,
    Post,
} from '@nestjs/common';
import { TicketsService } from './tickets.service';
import { CreateTicketDto } from './dto/create-ticket.dto';
import { Roles } from '../roles/roles.decorator';
import { Role } from '../roles/roles.enum';

@Controller('tickets')
export class TicketsController {
    constructor(private readonly ticketsService: TicketsService) {}

    @HttpCode(HttpStatus.OK)
    @Get()
    findAll() {
        return this.ticketsService.findAll();
    }

    @HttpCode(HttpStatus.OK)
    @Get('customer/:customerId')
    findAllTicketsByCustomer(@Param('customerId') customerId: number) {
        return this.ticketsService.findAllTicketsByCustomer(customerId);
    }

    @HttpCode(HttpStatus.OK)
    @Get('customer/:customerId/last')
    findOneByCustomer(@Param('customerId') customerId: number) {
        return this.ticketsService.findLastOneByCustomer(customerId);
    }

    @HttpCode(HttpStatus.OK)
    @Get(':id')
    findOneById(@Param('id') id: number) {
        return this.ticketsService.findOneById(id);
    }

    @Roles(Role.Employee)
    @HttpCode(HttpStatus.CREATED)
    @Post('create')
    create(@Body() createTicketDto: CreateTicketDto) {
        return this.ticketsService.create(createTicketDto);
    }

    @Roles(Role.Admin)
    @HttpCode(HttpStatus.OK)
    @Delete(':id')
    delete(@Param('id') id: number) {
        return this.ticketsService.delete(id);
    }
}
