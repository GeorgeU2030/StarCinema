import { Entity, Column, OneToMany } from 'typeorm';
import { User } from '../users/users.entity';
import { Ticket } from '../tickets/tickets.entity';

@Entity()
export class Customer extends User {

    @Column()
    name: string;
  
    @Column()
    lastname: string;

    @Column()
    location: string;

    @OneToMany(() => Ticket, ticket => ticket.customer)
    tickets: Ticket[];

    constructor() {
        super();
        this.role = 'customer';
    }
}