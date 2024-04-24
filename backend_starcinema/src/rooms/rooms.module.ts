import { Module } from '@nestjs/common';
import { DatabaseModule } from '../database/database.module';
import { RoomsController } from './rooms.controller';
import { roomsProviders } from './rooms.providers';
import { RoomsService } from './rooms.service';

@Module({
	imports: [DatabaseModule],
	controllers: [RoomsController],
	providers: [...roomsProviders, RoomsService],
})
export class RoomsModule {}
