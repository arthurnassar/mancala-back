import { HttpException } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { User } from './interface/user.interface';
export declare class UsersController {
    private readonly usersService;
    constructor(usersService: UsersService);
    authenticate(user: User): User;
    createUser(createUserDto: CreateUserDto): Promise<User | HttpException>;
    findAllUsers(): Promise<User[]>;
}
