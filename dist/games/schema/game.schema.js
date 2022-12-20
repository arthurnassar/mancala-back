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
exports.GameSchema = exports.Game = void 0;
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
const user_schema_1 = require("../../users/schema/user.schema");
const piece_schema_1 = require("./piece.schema");
const pit_schema_1 = require("./pit.schema");
let Game = class Game {
};
__decorate([
    (0, mongoose_1.Prop)({ type: Number, enum: [1, 2] }),
    __metadata("design:type", Number)
], Game.prototype, "turn", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: Number, enum: [1, 2] }),
    __metadata("design:type", Number)
], Game.prototype, "gameEnded", void 0);
__decorate([
    (0, mongoose_1.Prop)(),
    __metadata("design:type", Number)
], Game.prototype, "pitCount", void 0);
__decorate([
    (0, mongoose_1.Prop)([pit_schema_1.Pit]),
    __metadata("design:type", Array)
], Game.prototype, "pits", void 0);
__decorate([
    (0, mongoose_1.Prop)([piece_schema_1.Piece]),
    __metadata("design:type", Array)
], Game.prototype, "p1Pit", void 0);
__decorate([
    (0, mongoose_1.Prop)([piece_schema_1.Piece]),
    __metadata("design:type", Array)
], Game.prototype, "p2Pit", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: mongoose_2.default.Schema.Types.ObjectId, ref: 'User' }),
    __metadata("design:type", user_schema_1.User)
], Game.prototype, "player", void 0);
Game = __decorate([
    (0, mongoose_1.Schema)()
], Game);
exports.Game = Game;
exports.GameSchema = mongoose_1.SchemaFactory.createForClass(Game);
//# sourceMappingURL=game.schema.js.map