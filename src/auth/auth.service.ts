import { BadRequestException, Injectable } from '@nestjs/common';
import { registerDto } from './dtos/register.dto';
import { InjectModel } from '@nestjs/mongoose';
import { User } from './schemas/user.schema';
import { Model } from 'mongoose';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {

    constructor(@InjectModel(User.name) private UserModel: Model<User>){}

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
            password,    
        });

    }

}
