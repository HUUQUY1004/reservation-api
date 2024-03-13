import { Controller, Get, Req, UseGuards } from '@nestjs/common';
import { UserService } from './user.service';
import { MyJwtGuard } from 'src/auth/guard';
import { Request } from 'express';
import { AdminMiddleware } from './user.middleware';

@Controller('user')
export class UserController {
    constructor(
        private userService : UserService
    ){}

    @UseGuards(MyJwtGuard)
    @Get('me')
    me(@Req() request : Request){
        
        return  request['user']
    }

    @UseGuards(MyJwtGuard)
    @Get('all')
     getAllUser(){
        return  this.userService.getAllUser()
    }
}
