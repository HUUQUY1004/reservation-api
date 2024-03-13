import { Injectable, NestMiddleware } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService, TokenExpiredError } from '@nestjs/jwt';
import { error } from 'console';
import { NextFunction, Request, Response } from 'express';

@Injectable()
export class AdminMiddleware implements NestMiddleware {
  constructor(
    private jwtService : JwtService,
    private configService : ConfigService
  ){

  }
  async use(req: Request, res: Response, next: NextFunction) {
    const authorization  = req.headers.authorization
    console.log(authorization);
    
    if(authorization === null || authorization === undefined){
      return  res.status(403).json({status: 403,message: 'No-token'})
    }
    const token = authorization.split(' ')[1]

    try {
      const user = await this.jwtService.verifyAsync(token, {
        secret: this.configService.get('JWT_SECRET')
      });
      
      if(user.isAdmin){
        return next()
        
      }
      else{
      return  res.status(403).json({status: 403,message: 'Bạn không có quyền'})

      }
      
    } catch (err) {
      if(err instanceof TokenExpiredError){
      return  res.status(403).json({status: 403,message: 'Token hết hạn'})

      }
      console.error(err);
    }
    
    
  }
}
