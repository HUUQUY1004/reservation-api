import { Body, Controller, Delete, Get, Param, Post, Query } from '@nestjs/common';
import { VehicleService } from './vehicle.service';
import { InsertVehicleDTO } from './dto/insert.dto';

@Controller('vehicle')
export class VehicleController {
    constructor(
        private vehicleService : VehicleService
    ){}
    @Get('all')
    get(@Query('page') page : number){
        return this.vehicleService.getAll(page)
    }
    // insert
    @Post('add-vehicle')
    add(@Body() insertDTO: InsertVehicleDTO ){
        return this.vehicleService.addVehicle(insertDTO)
    }

    @Post('update-vehicle/:id')
    update(@Body()  insertDTO : InsertVehicleDTO, @Param('id') id : number){
        return this.vehicleService.updateVehicle(insertDTO, id)
    }

    @Delete('/:id')
    delete(@Param('id') id : number){
        return this.vehicleService.deleteVehicle(id)
    }
}
