import { Game, GameDocument } from "../schema/game.schema";
import { Pit } from "../schema/pit.schema";
export declare class GameClass {
    private game;
    private gamesArray;
    private isFirstMove;
    constructor(game: GameDocument);
    movePiece(pit: number): Game[] | string;
    _checkPlayerLastPit(player: 1 | 2, pitCount: number): number;
    _getPit(pit: number): Pit;
    _startPlayerMovement(pit: number): Game[] | string;
}
