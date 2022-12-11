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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UsersService = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
const user_schema_1 = require("./schema/user.schema");
let UsersService = class UsersService {
    constructor(userModel) {
        this.userModel = userModel;
        this.users = [];
    }
    authenticate(user) {
        const userExists = this.users.find((item) => {
            return item.email === user.email;
        });
        const passwordExists = this.users.find((item) => {
            return item.password === user.password;
        });
        if (userExists && passwordExists) {
            const result = this.users.find((item) => {
                return item.email === user.email && item.password === user.password;
            });
            return result;
        }
        throw new common_1.HttpException('Email ou senha invalido', common_1.HttpStatus.FORBIDDEN);
    }
    async findAllUsers() {
        return await this.userModel.find({});
    }
    async createUser(createUserDto) {
        const dbUser = await this.userModel.find({ email: createUserDto.email }).exec();
        const createdUser = new this.userModel(createUserDto);
        const emailExists = dbUser.length !== 0;
        if (emailExists)
            throw new common_1.HttpException('Este email está em uso', common_1.HttpStatus.CONFLICT);
        return createdUser.save();
    }
};
UsersService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)(user_schema_1.User.name)),
    __metadata("design:paramtypes", [mongoose_2.Model])
], UsersService);
exports.UsersService = UsersService;
//# sourceMappingURL=users.service.js.map