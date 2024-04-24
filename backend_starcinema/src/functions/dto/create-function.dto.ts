import { IsDate, IsNotEmpty, IsNumber } from 'class-validator';

export class CreateFunctionDto {
    @IsNotEmpty()
    @IsDate()
    startTime: Date;

    @IsNotEmpty()
    @IsDate()
    endTime: Date;

    @IsNotEmpty()
    @IsNumber()
    movieId: number;

    @IsNotEmpty()
    @IsNumber()
    roomId: number;
}
