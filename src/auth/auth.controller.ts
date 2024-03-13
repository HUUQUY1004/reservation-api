import { Body, Controller, Post, Req } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthDTO } from './dto';


@Controller('auth')
export class AuthController {
    constructor(
        private authService: AuthService
    ){
    }
    @Post('register')
    async register(@Body() authDTO : AuthDTO ){
        return this.authService.register(authDTO)
    }

    @Post('login')
    
    async login(@Req() req ){
        const { email , password }= req.body
        
        
        return this.authService.login(email, password)
    }
}
