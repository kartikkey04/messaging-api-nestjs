import { Injectable } from '@nestjs/common';

export type User = {
    name: string;
    email: string;
    password: string;
}

@Injectable()
export class UsersService {}
