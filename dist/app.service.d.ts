import { Game, Pit } from './interfaces/game.interface';
import { User } from './interfaces/user.interface';
export declare class AppService {
    private readonly games;
    private readonly users;
    createUser(user: User): User[];
    authenticate(user: User): User;
    findAllUsers(): User[];
    createGame(pits: number, pieces: number, userId: number): Game;
    findAllGames(userId: string): Game[];
    findGameById(gameId: number): Game | any;
    movePiece(gameId: number, pit: number, isFirstMove?: boolean, gamesArray?: any[]): Game[] | string;
    getPit(game: Game, pit: number): Pit;
    startPlayerMovement(game: Game, pit: number, gamesArray: any): Game[] | string;
    checkPlayerLastPit(player: 1 | 2, pitCount: number): number;
}
