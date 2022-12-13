import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { GamesService } from './games.service';
import { CreateGameDto } from './dto/create-game.dto';
import { UpdateGameDto } from './dto/update-game.dto';
import { Game } from './interface/game.interface';
import { Game as GameSchema } from './schema/game.schema';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';

@Controller()
export class GamesController {
  constructor(private readonly gamesService: GamesService) {}

  // CREATE GAME
  @UseGuards(JwtAuthGuard)
  @Post('game')
  createGame(
    @Body()
    { pits, pieces, userId }: { pits: number; pieces: number; userId: number },
  ): Promise<GameSchema> {
    return this.gamesService.createGame(pits, pieces, userId);
  }

  // GET GAME BY ID
  @UseGuards(JwtAuthGuard)
  @Get('game/:gameId')
  getGameById(@Param('gameId') gameId: number): Game {
    return this.gamesService.findGameById(gameId);
  }

  // GET GAME THAT BELONGS TO THE USER ID
  @UseGuards(JwtAuthGuard)
  @Get('games/:userId')
  getAllGames(@Param('userId') userId: string): Game[] | void {
    return this.gamesService.findAllGames(userId);
  }

  // MAKE MOVE SELECTING THE PIT
  @UseGuards(JwtAuthGuard)
  @Post('move')
  moveGamePiece(
    @Body()
    { gameId, player, pit }: { gameId: number; player: 1 | 2; pit: number },
  ): Game[] | string {
    return this.gamesService.movePiece(gameId, pit);
  }
}
