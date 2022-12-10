import { Piece } from './piece.interface';

export interface Pit {
  pitNumber: number;
  pieces: Piece[];
}

export interface Game {
  id: number;
  turn: 1 | 2;
  gameEnded?: 1 | 2;
  pitCount: number;
  pits: Pit[];
  p1Pit: Piece[];
  p2Pit: Piece[];
  pieces: Piece[];
  player: number;
}
