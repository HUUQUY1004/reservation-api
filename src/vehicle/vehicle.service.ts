import { ForbiddenException, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { InsertVehicleDTO } from './dto/insert.dto';
import {parse,isValid} from  'date-fns'
import { TicketService } from 'src/ticket/ticket.service';
import { TicketDTO } from 'src/ticket/dto/ticket.dto';
import { CT_Ticket } from 'src/ticket/dto/CT.ticket.dto';

@Injectable()
export class VehicleService {
    constructor (
        private prismaService : PrismaService,
        private ticketService : TicketService
        ){}
        private static  DateFormat = 'dd-MM-yyyy'
        private static recordSize =2
        async getAll(page: number){
            const startIndex = (+ page -1) * VehicleService.recordSize
    const vehicles = await this.prismaService.vehicle.findMany({
        skip :startIndex,
        take: VehicleService.recordSize
    })
    return vehicles
    }
    async addVehicle(insertDTO: InsertVehicleDTO){
        const parseDate = parse(insertDTO.date,VehicleService.DateFormat, new Date())
        if(!isValid(parseDate)){
            return new ForbiddenException('Ngày không hợp lệ')
        }
        const vehicle = await this.prismaService.vehicle.create({
            data: {
                licensePlate :  insertDTO.licensePlate,
                time: insertDTO.time,
                date : parseDate,
                departure_location: insertDTO.departure_location,
                destination: insertDTO.destination,
                TradeId: +insertDTO.tradeId
            }
        })
        const numberChair =(await  this.prismaService.tradeMark.findUnique({
            where:{
                id: +insertDTO.tradeId
            }
        })).numChair
        const haft = numberChair/2
        for(let i =1 ; i<= numberChair; i++){
            let ticketDTO : TicketDTO
            if(i <= Number.parseInt(haft.toString(), 10)){
                 ticketDTO= {
                    chair: `A${i}`,
                    name : `Ghế A${i}`,
                    price: 500000,
                    userId: 1,
                    vehicleId : vehicle.id
                }
            }
            else{
                ticketDTO= {
                    chair: `B${i}`,
                    name : `Ghế B${i}`,
                    price: 500000,
                    userId: 1,
                    vehicleId : vehicle.id
                }
            }
             this.ticketService.add(ticketDTO, {departure_time:insertDTO.time,departure_location: insertDTO.departure_location, destination: insertDTO.departure_location }: CT_Ticket)
        }
        return vehicle
    }
    async updateVehicle(updateDTO: InsertVehicleDTO, id: number){
        const parseDate = parse(updateDTO.date , VehicleService.DateFormat, new Date())
        // const data = { ...updateDTO, date : parseDate, tradeId : + updateDTO.tradeId}
        // console.log(data);
        
        const vehicle = await this.prismaService.vehicle.findUnique({
            where:{
                id: + id
            }
        })
        if(! vehicle){
            return new ForbiddenException('No-vehicle')
        }
        return this.prismaService.vehicle.update({
            where: {
                id : + id
            },
            data:{
                licensePlate :  updateDTO.licensePlate,
                time: updateDTO.time,
                date : parseDate,
                departure_location: updateDTO.departure_location,
                destination: updateDTO.destination,
                TradeId: +updateDTO.tradeId
            }
        })
    }
   async deleteVehicle(id : number) {
        const vehicle = await this.prismaService.vehicle.findUnique({
            where:{
                id: + id
            }
        })
        if(! vehicle){
            return new ForbiddenException('No-vehicle')
        }
        return this.prismaService.vehicle.delete({
            where:{
                id: +id
            }
        })
    }
}
