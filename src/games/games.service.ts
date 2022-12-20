import { Injectable } from '@nestjs/common';
import { CreateGameDto } from './dto/create-game.dto';
import { GamesRepository } from './games.repository';
import { Pit } from './interface/game.interface';
import { Game as GameSchema, GameDocument } from './schema/game.schema';
import { GameClass } from './types/game.class';

@Injectable()
export class GamesService {
  gamesRepository: GamesRepository
  constructor(gamesRepository: GamesRepository) {
    this.gamesRepository = gamesRepository
  }

  createGame(pits: number, pieces: number, userId: string): Promise<GameSchema> {
    // CREATE GAME BASE FORMAT
    const game: CreateGameDto = {
      turn: 1,
      pitCount: pits * 2,
      pits: [],
      p1Pit: [],
      p2Pit: [],
      player: userId,
    };

    // CREATE PIECES AND ASSIGN THEM TO RESPECTIVE PIT BASED ON DATA RECEIVED
    let piecesCounter = 1;
    for (let i = 1; i <= game.pitCount; i++) {
      const pit: Pit = { pitNumber: i, pieces: [] };
      for (let j = 0; j < pieces; j++) {
        pit.pieces.push({ pieceNumber: piecesCounter });
        piecesCounter++; 
      }
      game.pits.push(pit);
    }

    const createdGame = this.gamesRepository.create(game);
    //PUSH GAME OBJECT TO THE CLASS PROPERTY

    // return the game created
    return createdGame
  }

  findAllGames(userId: string): Promise<GameSchema[]> {
    return this.gamesRepository.findAll(userId)
  }

  findGameById(gameId: string): Promise<GameDocument> {
    return this.gamesRepository.findOne(gameId)
  }

  async movePiece(gameId: string, pit: number): Promise<GameSchema[] | string> {
    // Get game from DB
    const dbGame = await this.findGameById(gameId);

    const game = new GameClass(dbGame)

    const moveResults = game.movePiece(pit)

    const lastMoveResults: GameDocument = [...moveResults].pop() as GameDocument

    await this.gamesRepository.updateOne(lastMoveResults)
    return moveResults
  }


  
}
