"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppService = void 0;
const common_1 = require("@nestjs/common");
const lodash_1 = require("lodash");
let AppService = class AppService {
    constructor() {
        this.games = [
            {
                id: 6468045108335139000,
                turn: 1,
                pitCount: 16,
                pits: [
                    {
                        pitNumber: 1,
                        pieces: [
                            { pieceNumber: 1 },
                            { pieceNumber: 2 },
                            { pieceNumber: 3 },
                            { pieceNumber: 4 },
                        ],
                    },
                    {
                        pitNumber: 2,
                        pieces: [
                            { pieceNumber: 5 },
                            { pieceNumber: 6 },
                            { pieceNumber: 7 },
                            { pieceNumber: 8 },
                        ],
                    },
                    {
                        pitNumber: 3,
                        pieces: [
                            { pieceNumber: 9 },
                            { pieceNumber: 10 },
                            { pieceNumber: 11 },
                            { pieceNumber: 12 },
                        ],
                    },
                    {
                        pitNumber: 4,
                        pieces: [
                            { pieceNumber: 13 },
                            { pieceNumber: 14 },
                            { pieceNumber: 15 },
                            { pieceNumber: 16 },
                        ],
                    },
                    {
                        pitNumber: 5,
                        pieces: [
                            { pieceNumber: 17 },
                            { pieceNumber: 18 },
                            { pieceNumber: 19 },
                            { pieceNumber: 20 },
                        ],
                    },
                    {
                        pitNumber: 6,
                        pieces: [
                            { pieceNumber: 21 },
                            { pieceNumber: 22 },
                            { pieceNumber: 23 },
                            { pieceNumber: 24 },
                        ],
                    },
                    {
                        pitNumber: 7,
                        pieces: [
                            { pieceNumber: 25 },
                            { pieceNumber: 28 },
                            { pieceNumber: 27 },
                            { pieceNumber: 28 },
                        ],
                    },
                    {
                        pitNumber: 8,
                        pieces: [
                            { pieceNumber: 29 },
                            { pieceNumber: 30 },
                            { pieceNumber: 31 },
                            { pieceNumber: 32 },
                        ],
                    },
                    {
                        pitNumber: 9,
                        pieces: [
                            { pieceNumber: 33 },
                            { pieceNumber: 34 },
                            { pieceNumber: 35 },
                            { pieceNumber: 36 },
                        ],
                    },
                    {
                        pitNumber: 10,
                        pieces: [
                            { pieceNumber: 37 },
                            { pieceNumber: 38 },
                            { pieceNumber: 39 },
                            { pieceNumber: 40 },
                        ],
                    },
                    {
                        pitNumber: 11,
                        pieces: [
                            { pieceNumber: 41 },
                            { pieceNumber: 42 },
                            { pieceNumber: 43 },
                            { pieceNumber: 44 },
                        ],
                    },
                    {
                        pitNumber: 12,
                        pieces: [
                            { pieceNumber: 45 },
                            { pieceNumber: 48 },
                            { pieceNumber: 47 },
                            { pieceNumber: 48 },
                        ],
                    },
                    {
                        pitNumber: 13,
                        pieces: [
                            { pieceNumber: 49 },
                            { pieceNumber: 50 },
                            { pieceNumber: 51 },
                            { pieceNumber: 52 },
                        ],
                    },
                    {
                        pitNumber: 14,
                        pieces: [
                            { pieceNumber: 53 },
                            { pieceNumber: 54 },
                            { pieceNumber: 55 },
                            { pieceNumber: 56 },
                        ],
                    },
                    {
                        pitNumber: 15,
                        pieces: [
                            { pieceNumber: 57 },
                            { pieceNumber: 58 },
                            { pieceNumber: 59 },
                            { pieceNumber: 60 },
                        ],
                    },
                    {
                        pitNumber: 16,
                        pieces: [
                            { pieceNumber: 61 },
                            { pieceNumber: 62 },
                            { pieceNumber: 63 },
                            { pieceNumber: 64 },
                        ],
                    },
                ],
                p1Pit: [],
                p2Pit: [],
                pieces: [],
                player: 997,
            },
        ];
    }
    createGame(pits, pieces, userId) {
        const game = {
            id: Math.floor(Math.random() * 10000000000000000000),
            turn: 1,
            pitCount: pits * 2,
            pits: [],
            p1Pit: [],
            p2Pit: [],
            pieces: [],
            player: userId,
        };
        let piecesCounter = 1;
        for (let i = 1; i <= game.pitCount; i++) {
            const pit = { pitNumber: i, pieces: [] };
            for (let j = 0; j < pieces; j++) {
                pit.pieces.push({ pieceNumber: piecesCounter });
                piecesCounter++;
            }
            game.pits.push(pit);
        }
        this.games.push(game);
        return game;
    }
    findAllGames(userId) {
        const filteredGames = this.games.filter((game) => {
            return game.player === Number(userId);
        });
        return filteredGames;
    }
    findGameById(gameId) {
        return this.games.reduce((acc, item) => {
            if (item.id === gameId) {
                acc = item;
            }
            return acc;
        });
    }
    movePiece(gameId, pit, isFirstMove = true, gamesArray = []) {
        const game = this.findGameById(gameId);
        const halfPits = game.pitCount / 2;
        const p1AllowedPits = pit <= halfPits;
        const p2AllowedPits = pit > halfPits;
        const pitNumberExists = pit > 0 && pit <= game.pitCount;
        if (!pitNumberExists)
            return `O pit selecionado nao existe`;
        switch (game.turn) {
            case 1:
                if (!p1AllowedPits && isFirstMove) {
                    throw new common_1.HttpException('O player 1 nao pode selecionar este buraco', common_1.HttpStatus.BAD_REQUEST);
                }
                isFirstMove = false;
                let gameResults = this.startPlayerMovement(game, pit, gamesArray);
                if (typeof gameResults === 'string') {
                    return gameResults;
                }
                let temp = [...gameResults];
                let gameEnded = temp.pop().pits.reduce((acc, item) => {
                    if (item.pitNumber <= (game.pitCount / 2) && item.pieces.length !== 0) {
                        acc = false;
                    }
                    return acc;
                }, true);
                if (gameEnded) {
                    gameResults[gameResults.length - 1].gameEnded = game.turn;
                }
                return gameResults;
            case 2:
                if (!p2AllowedPits && isFirstMove) {
                    throw new common_1.HttpException('O player 2 nao pode selecionar este buraco', common_1.HttpStatus.BAD_REQUEST);
                }
                isFirstMove = false;
                const anotherGameResults = this.startPlayerMovement(game, pit, gamesArray);
                if (typeof anotherGameResults === 'string') {
                    return anotherGameResults;
                }
                const anotherTemp = [...anotherGameResults];
                const anotherGameEnded = anotherTemp.pop().pits.reduce((acc, item) => {
                    if (item.pitNumber > (game.pitCount / 2) && item.pieces.length !== 0) {
                        acc = false;
                    }
                    return acc;
                }, true);
                if (anotherGameEnded) {
                    anotherGameResults[anotherGameResults.length - 1].gameEnded = game.turn;
                }
                return anotherGameResults;
            default:
                throw new common_1.HttpException('Este jogador nao existe', common_1.HttpStatus.BAD_REQUEST);
        }
    }
    getPit(game, pit) {
        return game.pits.find((element) => {
            return element.pitNumber === pit;
        });
    }
    startPlayerMovement(game, pit, gamesArray) {
        let chosenPit = this.getPit(game, pit);
        const playerMovementPieces = {
            count: chosenPit.pieces.length,
            pieces: chosenPit.pieces,
        };
        if (chosenPit.pieces.length === 0) {
            throw new common_1.HttpException('O pit escolhido esta vazio', common_1.HttpStatus.BAD_REQUEST);
        }
        chosenPit.pieces = [];
        let lastPit = chosenPit;
        for (let i = 0; i < playerMovementPieces.count; i++) {
            const playerPit = game.turn === 1 ? game.p1Pit : game.p2Pit;
            const p1LastPit = game.pitCount / 2;
            const p2LastPit = game.pitCount;
            const p2FirstPit = game.pitCount / 2 + 1;
            if (lastPit.pitNumber === 88) {
                chosenPit = this.getPit(game, p2FirstPit);
            }
            else if (lastPit.pitNumber === 99) {
                chosenPit = this.getPit(game, 1);
            }
            else if (lastPit.pitNumber === p1LastPit) {
                if (game.turn === 1) {
                    chosenPit = {
                        pitNumber: 88,
                        pieces: playerPit,
                    };
                }
                else {
                    chosenPit = this.getPit(game, p2FirstPit);
                }
            }
            else if (lastPit.pitNumber === p2LastPit) {
                if (game.turn === 2) {
                    chosenPit = {
                        pitNumber: 99,
                        pieces: playerPit,
                    };
                }
                else {
                    chosenPit = this.getPit(game, 1);
                }
            }
            else {
                chosenPit = this.getPit(game, lastPit.pitNumber + 1);
            }
            const selectOnePiece = playerMovementPieces.pieces.pop();
            chosenPit.pieces.push(selectOnePiece);
            lastPit = chosenPit;
        }
        const lastPitIsPlayerPit = lastPit.pitNumber === 88 || lastPit.pitNumber === 99;
        if (lastPitIsPlayerPit) {
            const result = (0, lodash_1.cloneDeep)(game);
            gamesArray.push(result);
            return gamesArray;
        }
        if (!lastPitIsPlayerPit && lastPit.pieces.length > 1) {
            const result = (0, lodash_1.cloneDeep)(game);
            gamesArray.push(result);
            return this.movePiece(game.id, lastPit.pitNumber, false, gamesArray);
        }
        game.turn === 2 ? game.turn = 1 : game.turn = 2;
        const result = (0, lodash_1.cloneDeep)(game);
        gamesArray.push(result);
        return gamesArray;
    }
    checkPlayerLastPit(player, pitCount) {
        if (player === 1) {
            return pitCount / 2;
        }
        return pitCount;
    }
};
AppService = __decorate([
    (0, common_1.Injectable)()
], AppService);
exports.AppService = AppService;
//# sourceMappingURL=app.service.js.map