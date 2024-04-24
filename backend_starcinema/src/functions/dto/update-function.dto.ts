import { IsDate, IsNumber, IsOptional } from 'class-validator';

export class UpdateFunctionDto {
    @IsOptional()
    @IsDate()
    startTime?: Date;

    @IsOptional()
    @IsDate()
    endTime?: Date;

    @IsOptional()
    @IsNumber()
    movieId?: number;

    @IsOptional()
    @IsNumber()
    roomId?: number;

}
