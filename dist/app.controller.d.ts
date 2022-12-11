import { AppService } from './app.service';
import { CreateUserDto } from './dto/create-user.dto';
import { Game } from './interfaces/game.interface';
import { User } from './interfaces/user.interface';
export declare class AppController {
    private readonly appService;
    constructor(appService: AppService);
    authenticate(user: User): User;
    createUser(createUserDto: CreateUserDto): User[];
    findAllUsers(): User[];
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
