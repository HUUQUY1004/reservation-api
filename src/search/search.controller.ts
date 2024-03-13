import { Controller, Get, Param, Query } from '@nestjs/common';
import { SearchService } from './search.service';
import { SearchDTO } from './dto/search.dto';
@Controller('search')
export class SearchController {
    constructor(
        private searchService: SearchService
    ){}
    @Get()
    get(@Query('start') departure_location: string , @Query('dest') destination : string,
        @Query('time') time: string ,@Query('date') date : string
    ){
        // console.log(start);
        
        const data = {...SearchDTO,departure_location, destination, time, date}
        return this.searchService.get(data)
    }
}
