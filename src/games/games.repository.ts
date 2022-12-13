import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateGameDto } from './dto/create-game.dto';
import { UpdateGameDto } from './dto/update-game.dto';
import { Game as GameSchema, GameDocument } from './schema/game.schema';

@Injectable()
export class GamesRepository {

  constructor(@InjectModel(GameSchema.name) private gameModel: Model<GameDocument>) {}

  async create(createGameDto: CreateGameDto): Promise<GameSchema> {
    const createdGame = new this.gameModel(createGameDto);
    return await createdGame.save()
  }

  findOne(): void {
    
  }

  findByUser(): void {

  }

  updateOne() {

  }

  findAll(): void {
    
  }

}
