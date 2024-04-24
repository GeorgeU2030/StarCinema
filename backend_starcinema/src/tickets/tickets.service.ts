import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { Repository } from 'typeorm';
import { Ticket } from './tickets.entity';
import { Customer } from '../roles/customer.entity';
import { CreateTicketDto } from './dto/create-ticket.dto';

@Injectable()
export class TicketsService {
	constructor(
		@Inject('TICKETS_REPOSITORY')
		private ticketsRepository: Repository<Ticket>,
	) {}

	async findAll(): Promise<Ticket[]> {
		return this.ticketsRepository.find();    
	}

    async findOneById(id: number): Promise<Ticket> {
        const ticket = await this.ticketsRepository.findOne({
            where: { id: id },
        });
        if (!ticket) {
            throw new NotFoundException(`Ticket with ID ${id} not found`);
        }
        return ticket;
    }
    

	async findLastOneByCustomer(customerId: number): Promise<Ticket> {
		return this.ticketsRepository.findOne({
			where: { customer: {id: customerId} },
            order: { purchaseDate: 'DESC'},
		});
	}

    async findAllTicketsByCustomer(customerId: number): Promise<Ticket[]> {
        return this.ticketsRepository.find({
            where: { customer: { id: customerId } },
            order: { purchaseDate: 'DESC' }, 
        });
    }

	async create(ticket: CreateTicketDto): Promise<Ticket> {
		return this.ticketsRepository.save(ticket);
	}

	async delete(id: number): Promise<string> {
		const ticket_found = await this.findOneById(id);
		if (!ticket_found) {
			throw new NotFoundException('Ticket not found');
		}
		await this.ticketsRepository.delete(id);
		return 'Ticket deleted successfully';
	}
}