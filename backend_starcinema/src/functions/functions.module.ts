import { Module } from '@nestjs/common';
import { DatabaseModule } from '../database/database.module';
import { FunctionsController } from './functions.controller';
import { FunctionsService } from './functions.service';
import { functionProviders } from './functions.providers';

@Module({
	imports: [DatabaseModule],
	controllers: [FunctionsController],
	providers: [...functionProviders, FunctionsService],
	exports: [FunctionsService]
})
export class FunctionModule {}
