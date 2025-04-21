import { IsEmail, IsNotEmpty, IsString, Matches } from "@nestjs/class-validator";

export class registerDto{

    @IsString()
    name: string;

    @IsEmail()
    email: string;

    @IsString()
    @Matches(/^(?=.*[0-9])/, {message: "Password must contain atleast a number"})
    password: string;
}