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
exports.UsersService = void 0;
const common_1 = require("@nestjs/common");
const users_repository_1 = require("./users.repository");
let UsersService = class UsersService {
    constructor(usersRepository) {
        this.users = [];
        this.usersRepository = usersRepository;
    }
    async authenticate(user) {
        const dbUser = await this.usersRepository.findOne(user);
        console.log(dbUser);
        const userExists = !!dbUser;
        const emailMatches = dbUser.email === user.email;
        const passwordMatches = dbUser.password === user.password;
        if (!userExists || !emailMatches || !passwordMatches) {
            throw new common_1.HttpException('Email ou senha invalido', common_1.HttpStatus.FORBIDDEN);
        }
        return dbUser;
    }
    async findAllUsers() {
        return await this.usersRepository.findAll();
    }
    async createUser(createUserDto) {
        const dbUser = await this.usersRepository.findByEmail(createUserDto.email);
        if (dbUser)
            throw new common_1.HttpException('Este email está em uso', common_1.HttpStatus.CONFLICT);
        const createdUser = await this.usersRepository.create(createUserDto);
        return createdUser;
    }
};
UsersService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [users_repository_1.UsersRepository])
], UsersService);
exports.UsersService = UsersService;
//# sourceMappingURL=users.service.js.map