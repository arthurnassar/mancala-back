import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateGameDto } from './dto/create-game.dto';
import { UpdateGameDto } from './dto/update-game.dto';
import { Game, Game as GameSchema, GameDocument } from './schema/game.schema';

@Injectable()
export class GamesRepository {

  constructor(@InjectModel(GameSchema.name) private gameModel: Model<GameDocument>) {}

  async create(createGameDto: CreateGameDto): Promise<GameDocument> {
    const createdGame = new this.gameModel(createGameDto);
    return await createdGame.save()
  }

  async findOne(id: string): Promise<GameDocument> {
    const game = await this.gameModel.findById(id)
    return game
  }

  async findAll(id: string): Promise<Game[]> {
    const games = await this.gameModel.find({ player: id })

    return games
  }

  async updateOne(game: GameDocument) {
    const doc = await this.gameModel.findOneAndUpdate({ _id: game._id }, { "$set": { "turn": game.turn, "pits": game.pits, "p1Pit": game.p1Pit, "p2Pit": game.p2Pit } }, {
      new: true
    })
    console.log(doc)
  }


}
