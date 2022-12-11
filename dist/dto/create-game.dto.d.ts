import { Piece } from 'src/interfaces/piece.interface';
export interface Pit {
    pitNumber: number;
    pieces: Piece[];
}
export declare class CreateGameDto {
    id: number;
    pitCount: number;
    pits: Pit[];
    p1Pit: Piece[];
    p2Pit: Piece[];
    pieces?: Piece[];
    player: number;
}
