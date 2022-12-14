import { Piece } from '../interface/piece.interface';
import { Pit } from '../interface/game.interface';

export class CreateGameDto {
  turn: 1 | 2;
  gameEnded?: 1 | 2;
  pitCount: number;
  pits: Pit[];
  p1Pit: Piece[];
  p2Pit: Piece[];
  player: string;
}
