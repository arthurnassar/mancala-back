import { HttpException } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { User } from './interface/user.interface';
import { UsersRepository } from './users.repository';
export declare class UsersService {
    usersRepository: UsersRepository;
    constructor(usersRepository: UsersRepository);
    private readonly users;
    authenticate(user: User): Promise<User | HttpException>;
    findAllUsers(): Promise<User[]>;
    createUser(createUserDto: CreateUserDto): Promise<User | HttpException>;
}
