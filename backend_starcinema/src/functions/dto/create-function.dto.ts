import { IsDate, IsDateString, IsNotEmpty, IsNumber } from 'class-validator';

export class CreateFunctionDto {
    @IsNotEmpty()
    @IsDateString()
    startTime: Date;

    @IsNotEmpty()
    @IsDateString()
    endTime: Date;

    @IsNotEmpty()
    @IsNumber()
    movieId: number;

    @IsNotEmpty()
    @IsNumber()
    roomId: number;
}
