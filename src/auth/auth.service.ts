import { ForbiddenException, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { PrismaService } from 'src/prisma/prisma.service';
import { AuthDTO } from './dto';
import * as argon from 'argon2'
import { Prisma } from '@prisma/client';
@Injectable()
export class AuthService {
    constructor(
        private prismaService : PrismaService,
        private jwtService : JwtService,
        private configService : ConfigService
    ){}


    async register(authDTO : AuthDTO){

        // check email exist
        const checkEmailExist = await this.prismaService.user.findUnique({
            where:{
                email: authDTO.email
            }
        })
        if(checkEmailExist){
             throw new ForbiddenException('Email đã tồn tại')
             return;
        }

        const hashedPassword = await argon.hash(authDTO.password)
        const user = await this.prismaService.user.create({
            data : {
                email : authDTO.email,
                username: authDTO.username,
                hashedPassword
            }
        
        })
        delete user.hashedPassword
        return this.signJwtString(user.id, user.email,user.isAdmin)
    }

    async login(email: string , password: string){
        const user= await  this.prismaService.user.findUnique({
            where :{
                email
            }
        })
        if(!user){
            throw new ForbiddenException(
                "Email not found"
            )
        }
        const passwordMatched = await argon.verify(
            user.hashedPassword,
            password
        )
        if(!passwordMatched) {
            throw new ForbiddenException("InCorrect Password")
        }
        delete user.hashedPassword
        const accessToken = await this.signJwtString(user.id, user.email, user.isAdmin)
        return {
            status: 200,
            accessToken,
            user
        }

    }
    async signJwtString(userId: number , email: string, isAdmin : boolean):Promise<{
        accessToken: string
    }>{
        const pạyload = {
            sub: userId,
            email,
            isAdmin
        }
        const jwtString = await this.jwtService.signAsync(pạyload,{
            expiresIn: "10m",
            secret: this.configService.get("JWT_SECRET")
        })
        return {
            accessToken: jwtString
        }
    }
}
