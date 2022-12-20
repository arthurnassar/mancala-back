import { GamesService } from './games.service';
import { Game as GameSchema } from './schema/game.schema';
export declare class GamesController {
    private readonly gamesService;
    constructor(gamesService: GamesService);
    createGame({ pits, pieces, userId }: {
        pits: number;
        pieces: number;
        userId: string;
    }): Promise<GameSchema>;
    getGameById(gameId: string): Promise<GameSchema>;
    getAllGames(userId: string): Promise<GameSchema[]>;
    moveGamePiece({ gameId, pit }: {
        gameId: string;
        pit: number;
    }): Promise<GameSchema[] | string>;
}
