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
    { pits, pieces, userId }: { pits: number; pieces: number; userId: string },
  ): Promise<GameSchema> {
    return this.gamesService.createGame(pits, pieces, userId);
  }

  // GET GAME BY ID
  @UseGuards(JwtAuthGuard)
  @Get('game/:gameId')
  async getGameById(@Param('gameId') gameId: string): Promise<GameSchema> {
    return await this.gamesService.findGameById(gameId);
  }

  // GET GAME THAT BELONGS TO THE USER ID
  @UseGuards(JwtAuthGuard)
  @Get('games/:userId')
  async getAllGames(@Param('userId') userId: string): Promise<GameSchema[]> {
    return await this.gamesService.findAllGames(userId);
  }

  // // MAKE MOVE SELECTING THE PIT
  @UseGuards(JwtAuthGuard)
  @Post('move')
  moveGamePiece(
    @Body()
    { gameId, pit }: { gameId: string; pit: number },
  ): Promise<GameSchema[] | string> {
    return this.gamesService.movePiece(gameId, pit);
  }
}
