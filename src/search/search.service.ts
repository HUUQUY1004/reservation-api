import { ForbiddenException, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { SearchDTO } from './dto/search.dto';
import { parse } from 'date-fns';

@Injectable()
export class SearchService {
    private static  DateFormat = 'dd-MM-yyyy'
    constructor(
        private prismaService: PrismaService
    ){
    }
    get(searchDTO: SearchDTO){
        // Preprocessing
        let filterData = Object.fromEntries(Object.entries(searchDTO).filter(([key, value]) => value !== undefined && value !==''))
        console.log(filterData.date);
        
        if(filterData['date']){
            const parseDate = parse(filterData['date'], SearchService.DateFormat, new Date())
            filterData = {...filterData,date: parseDate}
            console.log(parseDate);
            
        }
        const vehicles = this.prismaService.vehicle.findMany({
            where: {
               ...filterData
            }
        })
        
        return vehicles
        
    }
}
