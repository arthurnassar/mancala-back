import { AppService } from './app.service';
import { Game } from './interfaces/game.interface';
export declare class AppController {
    private readonly appService;
    constructor(appService: AppService);
    createGame({ pits, pieces, userId }: {
        pits: number;
        pieces: number;
        userId: number;
    }): Game;
    getGameById(gameId: number): Game;
    getAllGames(userId: string): Game[] | void;
    moveGamePiece({ gameId, player, pit }: {
        gameId: number;
        player: 1 | 2;
        pit: number;
    }): Game[] | string;
}
