import { Body, Controller, Post } from '@nestjs/common';
import { registerDto } from './dtos/register.dto';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {

    constructor(private readonly authService: AuthService){}
    @Post('register')
    async registerUser(@Body() registerData: registerDto){
        return this.authService.registerUser(registerData);  
    }
}
