import { BadRequestException, Injectable, UnauthorizedException } from '@nestjs/common';
import { registerDto } from './dtos/register.dto';
import { InjectModel } from '@nestjs/mongoose';
import { User } from './schemas/user.schema';
import { Model } from 'mongoose';
import * as bcrypt from 'bcrypt';
import { loginDto } from './dtos/login.dto';
import { generate } from 'rxjs';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {

    constructor(@InjectModel(User.name) private UserModel: Model<User>,
    private jwtService: JwtService
        ){}

    async registerUser(registerData: registerDto){
        // check if email is in use
        const { name, email, password } = registerData;

        const emailInUse = await this.UserModel.findOne({
            email,
        });

        if(emailInUse)
            throw new BadRequestException('Email already in use');

        // hash password
        const hashedPassword = await bcrypt.hash(password, 10);

        // create user document and save in mongodb
        await this.UserModel.create({
            name,
            email,
            password:hashedPassword,    
        });
    }

    async loginUser(credentials: loginDto){
        const { email, password } = credentials;

        // Find if user exist by email
        const user = await this.UserModel.findOne({email});
        if(!user)
            throw new UnauthorizedException('Wrong Credentials');

        // Compare entered password with existing password
        const passwordMatch = await bcrypt.compare(password, user.password);
        if(!passwordMatch)
            throw new UnauthorizedException('Wrong Credentials');

        // Generate JWT tokens
        return await this.generateUserTokens(user._id);
    }

    async generateUserTokens(userId: any){
        const accessToken = await this.jwtService.sign({ userId }, { expiresIn: '1h'});
        return {
            accessToken,
        };
    }

    }

