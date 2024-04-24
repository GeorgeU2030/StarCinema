import { Module } from '@nestjs/common';
import { ticketProviders } from './tickets.providers';
import { TicketsService } from './tickets.service';
import { TicketsController } from './tickets.controller';
import { DatabaseModule } from '../database/database.module';

@Module({
    imports: [DatabaseModule],
    providers: [
        ...ticketProviders,
        TicketsService,
    ],

    controllers: [TicketsController],
    exports: [TicketsService],
})
export class TicketsModule {}
