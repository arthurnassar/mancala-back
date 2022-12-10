import { Body, Controller, Get, Param, Patch, Post } from '@nestjs/common';
import { AppService } from './app.service';
import { CreateGameDto } from './dto/create-game.dto';
import { CreateUserDto } from './dto/create-user.dto';
import { Game } from './interfaces/game.interface';
import { User } from './interfaces/user.interface';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Post('login')
  authenticate(@Body() user: User): User {
    return this.appService.authenticate(user);
  }

  @Post('user')
  createUser(@Body() createUserDto: CreateUserDto): User[] {
    return this.appService.createUser(createUserDto);
  }

  @Get('users')
  findAllUsers(): User[] {
    return this.appService.findAllUsers();
  }

  // CREATE GAME
  @Post('game')
  createGame(
    @Body()
    { pits, pieces, userId }: { pits: number; pieces: number; userId: number },
  ): Game {
    return this.appService.createGame(pits, pieces, userId);
  }

  // GET GAME BY ID
  @Get('game/:gameId')
  getGameById(@Param('gameId') gameId: number): Game {
    return this.appService.findGameById(gameId);
  }

  // GET GAME THAT BELONGS TO THE USER ID
  @Get('games/:userId')
  getAllGames(@Param('userId') userId: string): Game[] | void {
    return this.appService.findAllGames(userId);
  }

  // MAKE MOVE SELECTING THE PIT
  @Post('move')
  moveGamePiece(
    @Body()
    { gameId, player, pit }: { gameId: number; player: 1 | 2; pit: number },
  ): Game[] | string {
    return this.appService.movePiece(gameId, pit);
  }
}
