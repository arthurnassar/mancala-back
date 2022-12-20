import { Document } from 'mongoose';
import { Piece } from './piece.schema';
export declare class Pit extends Document {
    pitNumber: number;
    pieces: Piece[];
}
