import { DataSource } from "typeorm";
import { Ticket } from "./tickets.entity";

export const ticketProviders = [
    {
        provide: 'TICKETS_REPOSITORY',
        useFactory: (dataSource: DataSource) => dataSource.getRepository(Ticket),
        inject: ['DATA_SOURCE'],
    }
]