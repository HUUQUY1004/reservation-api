import { IsNotEmpty } from "class-validator";

export class TicketDTO{
    @IsNotEmpty()
    chair : string
    name: string
    price: number
    userId: number
    vehicleId: number
}