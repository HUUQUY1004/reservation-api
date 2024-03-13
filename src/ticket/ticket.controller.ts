import { Body, Controller, Post } from '@nestjs/common';
import { TicketService } from './ticket.service';
import { TicketDTO } from './dto/ticket.dto';

@Controller('ticket')
export class TicketController {
    constructor(
        private ticketService : TicketService
    ){}
    @Post('add-ticket')
    add(@Body() ticketDTO : TicketDTO){
        return this.ticketService

    }
    @Post('update-ticket')
    update(@Body() ticketDTO  : TicketDTO){
        return this.ticketService
    }
}
