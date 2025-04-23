import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import { MongooseModule } from '@nestjs/mongoose';
import { JwtModule } from '@nestjs/jwt';

@Module({
  imports: [
    JwtModule.register({global: true, secret: '123'}),
    MongooseModule.forRoot('mongodb+srv://kartikkey0414:FKEg11imFTxwifDM@cluster0.ieyxdtz.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0'),
    UsersModule, AuthModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
