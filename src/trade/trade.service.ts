import { ForbiddenException, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { TradeDTO } from './dto/insert.dto';

@Injectable()
export class TradeService {
    constructor(
        private prismaService : PrismaService
    ){}
    async getAllTrade(){
        const trades = this.prismaService.tradeMark.findMany()
        return trades
    }
    async addTrade(tradeDTO : TradeDTO){
        const  trade = await this.prismaService.tradeMark.create(
            {
                data:{
                    name: tradeDTO.name,
                    description: tradeDTO.description,
                    numChair: +tradeDTO.numChair
                }
            }
        )
        return trade
    }
    async updateTrade(tradeDTO : TradeDTO, id: number){
        const trade = await this.prismaService.tradeMark.findUnique(
            {
                where: {
                    id: +id
                }
            }
        )
        if(!trade){
            return  new ForbiddenException('No-trade')
        }
        
        return this.prismaService.tradeMark.update({
            where:{
                id: +id
            },
            data:{
                ...tradeDTO
            }
        })
    }
    async deleteTrade(id : number){
        const trade = await this.prismaService.tradeMark.findUnique(
            {
                where: {
                    id: +id
                }
            }
        )
        if(!trade){
            return  new ForbiddenException('No-trade')
        }
        return this.prismaService.tradeMark.delete({
            where: {
                id : +id
            }
        })
    }
}
