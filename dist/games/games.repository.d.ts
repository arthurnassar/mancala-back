import { Model } from 'mongoose';
import { CreateGameDto } from './dto/create-game.dto';
import { Game, GameDocument } from './schema/game.schema';
export declare class GamesRepository {
    private gameModel;
    constructor(gameModel: Model<GameDocument>);
    create(createGameDto: CreateGameDto): Promise<GameDocument>;
    findOne(id: string): Promise<GameDocument>;
    findAll(id: string): Promise<Game[]>;
    updateOne(game: GameDocument): Promise<void>;
}
