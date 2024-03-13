import { Body, Controller, Post, Req, UseGuards } from '@nestjs/common';
import { Request } from 'express';
import { MyJwtGuard } from 'src/auth/guard';
import { ReservationService } from './reservation.service';

@Controller('reservation')
export class ReservationController {
    constructor(

        private reservationService: ReservationService
    ){}
    @Post('/')
    @UseGuards(MyJwtGuard)
    reservation(@Req() req : Request){
        const {ticketID , userId} = req.body
        return this.reservationService.buy(userId, ticketID)
    }
}
