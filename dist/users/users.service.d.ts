import { HttpException } from '@nestjs/common';
import { Model } from 'mongoose';
import { CreateUserDto } from './dto/create-user.dto';
import { User } from './interface/user.interface';
import { User as UserSchema, UserDocument } from './schema/user.schema';
export declare class UsersService {
    private userModel;
    constructor(userModel: Model<UserDocument>);
    private readonly users;
    authenticate(user: User): User;
    findAllUsers(): Promise<UserSchema[]>;
    createUser(createUserDto: CreateUserDto): Promise<UserSchema | HttpException>;
}
