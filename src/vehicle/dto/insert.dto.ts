import { IsDate, IsNotEmpty, IsString } from "class-validator";

export class InsertVehicleDTO{
    @IsString()
    @IsNotEmpty()
    licensePlate: string
    
    @IsString()
    @IsNotEmpty()
    time : string

    @IsDate()
    date : string

    @IsNotEmpty()
    @IsString()
    departure_location

    @IsNotEmpty()
    @IsString()
    destination
    
    @IsNotEmpty()
    tradeId: number
}