"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GameClass = void 0;
const common_1 = require("@nestjs/common");
const lodash_1 = require("lodash");
class GameClass {
    constructor(game) {
        this.game = game.toObject();
        this.gamesArray = [];
        this.isFirstMove = true;
    }
    movePiece(pit) {
        const halfPits = this.game.pitCount / 2;
        const p1AllowedPits = pit <= halfPits;
        const p2AllowedPits = pit > halfPits;
        const pitNumberExists = pit > 0 && pit <= this.game.pitCount;
        if (!pitNumberExists)
            return `O pit selecionado nao existe`;
        switch (this.game.turn) {
            case 1:
                if (!p1AllowedPits && this.isFirstMove) {
                    throw new common_1.HttpException('O player 1 nao pode selecionar este buraco', common_1.HttpStatus.BAD_REQUEST);
                }
                this.isFirstMove = false;
                let gameResults = this._startPlayerMovement(pit);
                if (typeof gameResults === 'string') {
                    return gameResults;
                }
                let temp = [...gameResults];
                let gameEnded = temp.pop().pits.reduce((acc, item) => {
                    if (item.pitNumber <= (this.game.pitCount / 2) && item.pieces.length !== 0) {
                        acc = false;
                    }
                    return acc;
                }, true);
                if (gameEnded) {
                    gameResults[gameResults.length - 1].gameEnded = this.game.turn;
                }
                return gameResults;
            case 2:
                if (!p2AllowedPits && this.isFirstMove) {
                    throw new common_1.HttpException('O player 2 nao pode selecionar este buraco', common_1.HttpStatus.BAD_REQUEST);
                }
                this.isFirstMove = false;
                const anotherGameResults = this._startPlayerMovement(pit);
                if (typeof anotherGameResults === 'string') {
                    return anotherGameResults;
                }
                const anotherTemp = [...anotherGameResults];
                const anotherGameEnded = anotherTemp.pop().pits.reduce((acc, item) => {
                    if (item.pitNumber > (this.game.pitCount / 2) && item.pieces.length !== 0) {
                        acc = false;
                    }
                    return acc;
                }, true);
                if (anotherGameEnded) {
                    anotherGameResults[anotherGameResults.length - 1].gameEnded = this.game.turn;
                }
                return anotherGameResults;
            default:
                throw new common_1.HttpException('Este jogador nao existe', common_1.HttpStatus.BAD_REQUEST);
        }
    }
    _checkPlayerLastPit(player, pitCount) {
        if (player === 1) {
            return pitCount / 2;
        }
        return pitCount;
    }
    _getPit(pit) {
        return this.game.pits.find((element) => {
            return element.pitNumber === pit;
        });
    }
    _startPlayerMovement(pit) {
        let chosenPit = this._getPit(pit);
        if (chosenPit.pieces.length === 0) {
            throw new common_1.HttpException('O pit escolhido esta vazio', common_1.HttpStatus.BAD_REQUEST);
        }
        const playerMovementPieces = {
            count: chosenPit.pieces.length,
            pieces: chosenPit.pieces,
        };
        chosenPit.pieces = [];
        let lastPit = chosenPit;
        for (let i = 0; i < playerMovementPieces.count; i++) {
            const p1LastPit = this.game.pitCount / 2;
            const p2LastPit = this.game.pitCount;
            const p2FirstPit = this.game.pitCount / 2 + 1;
            if (lastPit.pitNumber === 88) {
                chosenPit = this._getPit(p2FirstPit);
            }
            else if (lastPit.pitNumber === 99) {
                chosenPit = this._getPit(1);
            }
            else if (lastPit.pitNumber === p1LastPit) {
                if (this.game.turn === 1) {
                    chosenPit = {
                        pitNumber: 88,
                        pieces: this.game.p1Pit,
                    };
                }
                else {
                    chosenPit = this._getPit(p2FirstPit);
                }
            }
            else if (lastPit.pitNumber === p2LastPit) {
                if (this.game.turn === 2) {
                    chosenPit = {
                        pitNumber: 99,
                        pieces: this.game.p2Pit,
                    };
                }
                else {
                    chosenPit = this._getPit(1);
                }
            }
            else {
                chosenPit = this._getPit(lastPit.pitNumber + 1);
            }
            const selectOnePiece = playerMovementPieces.pieces.pop();
            chosenPit.pieces.push(selectOnePiece);
            lastPit = chosenPit;
        }
        const lastPitIsPlayerPit = lastPit.pitNumber === 88 || lastPit.pitNumber === 99;
        if (lastPitIsPlayerPit) {
            const result = (0, lodash_1.cloneDeep)(this.game);
            this.gamesArray.push(result);
            return this.gamesArray;
        }
        if (!lastPitIsPlayerPit && lastPit.pieces.length > 1) {
            const result = (0, lodash_1.cloneDeep)(this.game);
            this.gamesArray.push(result);
            return this.movePiece(lastPit.pitNumber);
        }
        this.game.turn === 2 ? this.game.turn = 1 : this.game.turn = 2;
        const result = (0, lodash_1.cloneDeep)(this.game);
        this.gamesArray.push(result);
        return this.gamesArray;
    }
}
exports.GameClass = GameClass;
//# sourceMappingURL=game.class.js.map