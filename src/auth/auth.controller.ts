import { Body, Controller, Post } from '@nestjs/common';
import { registerDto } from './dtos/register.dto';
import { AuthService } from './auth.service';
import { loginDto } from './dtos/login.dto';

@Controller('auth')
export class AuthController {

    constructor(private readonly authService: AuthService){}
    @Post('register')
    async registerUser(@Body() registerData: registerDto){
        return this.authService.registerUser(registerData);  
    }

    @Post('login')
    async loginUser(@Body() Credentials: loginDto){
        return this.authService.loginUser(Credentials);
    }

    @Post('me')
    async getMe(@Body() Credentials: loginDto){
        return this.authService.loginUser(Credentials);
    }
}
