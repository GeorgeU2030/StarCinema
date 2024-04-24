import { IsDate, IsNotEmpty, IsNumber, IsString, IsUUID } from 'class-validator';

export class CreateTicketDto {
    @IsDate()
    @IsNotEmpty()
    readonly purchaseDate: Date;

    @IsDate()
    @IsNotEmpty()
    readonly functionDate: Date;

    @IsNotEmpty()
    readonly movieId: string;  

    @IsNotEmpty()
    readonly roomId: string; 

    @IsString()
    @IsNotEmpty()
    readonly seat: string;

    @IsNumber()
    @IsNotEmpty()
    readonly price: number;

    @IsString()
    @IsNotEmpty()
    readonly format: string;

    @IsNotEmpty()
    readonly customerId: string; 
}
