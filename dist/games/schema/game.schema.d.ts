import mongoose, { HydratedDocument } from 'mongoose';
import { User } from 'src/users/schema/user.schema';
import { Piece } from './piece.schema';
import { Pit } from './pit.schema';
export declare type GameDocument = HydratedDocument<Game>;
export declare class Game {
    turn: 1 | 2;
    gameEnded: 1 | 2;
    pitCount: number;
    pits: Pit[];
    p1Pit: Piece[];
    p2Pit: Piece[];
    player: User;
}
export declare const GameSchema: mongoose.Schema<Game, mongoose.Model<Game, any, any, any, any>, {}, {}, {}, {}, mongoose.DefaultSchemaOptions, Game>;
