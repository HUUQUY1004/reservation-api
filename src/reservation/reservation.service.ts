import { ForbiddenException, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class ReservationService {
    constructor (
        private prismaService : PrismaService
    ){}

    async buy(userId: number , ticketId : number) {
        const ticket  = await this.prismaService.ticket.findUnique({
            where: {
                id : +ticketId
            }

        })
        if(ticket.isBougth) {
            return new ForbiddenException("Vé này đã được sở hữu")
        }
        else{
            return this.prismaService.ticket.update({
                where: {
                    id: +ticketId
                },
                 data :{
                    userId: +userId,
                    isBougth: true
                  }
            })
        }
    }
}
