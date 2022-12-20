"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.GamesService = void 0;
const common_1 = require("@nestjs/common");
const games_repository_1 = require("./games.repository");
const game_class_1 = require("./types/game.class");
let GamesService = class GamesService {
    constructor(gamesRepository) {
        this.gamesRepository = gamesRepository;
    }
    createGame(pits, pieces, userId) {
        const game = {
            turn: 1,
            pitCount: pits * 2,
            pits: [],
            p1Pit: [],
            p2Pit: [],
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
        const createdGame = this.gamesRepository.create(game);
        return createdGame;
    }
    findAllGames(userId) {
        return this.gamesRepository.findAll(userId);
    }
    findGameById(gameId) {
        return this.gamesRepository.findOne(gameId);
    }
    async movePiece(gameId, pit) {
        const dbGame = await this.findGameById(gameId);
        const game = new game_class_1.GameClass(dbGame);
        const moveResults = game.movePiece(pit);
        const lastMoveResults = [...moveResults].pop();
        await this.gamesRepository.updateOne(lastMoveResults);
        return moveResults;
    }
};
GamesService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [games_repository_1.GamesRepository])
], GamesService);
exports.GamesService = GamesService;
//# sourceMappingURL=games.service.js.map