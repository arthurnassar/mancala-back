import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MongooseModule } from '@nestjs/mongoose';
import { UsersModule } from './users/users.module';
import { GamesModule } from './games/games.module';

@Module({
  // TODO PREPARE TO USE ANOTHER DATABASE ON PRODUCTION
  imports: [MongooseModule.forRoot('mongodb://localhost/nest'), UsersModule, GamesModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
