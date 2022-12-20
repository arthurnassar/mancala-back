import { GamesRepository } from './games.repository';
import { Game as GameSchema, GameDocument } from './schema/game.schema';
export declare class GamesService {
    gamesRepository: GamesRepository;
    constructor(gamesRepository: GamesRepository);
    createGame(pits: number, pieces: number, userId: string): Promise<GameSchema>;
    findAllGames(userId: string): Promise<GameSchema[]>;
    findGameById(gameId: string): Promise<GameDocument>;
    movePiece(gameId: string, pit: number): Promise<GameSchema[] | string>;
}
