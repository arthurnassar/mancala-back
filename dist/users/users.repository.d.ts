import { Model } from 'mongoose';
import { CreateUserDto } from './dto/create-user.dto';
import { User } from './interface/user.interface';
import { User as UserSchema, UserDocument } from './schema/user.schema';
export declare class UsersRepository {
    private userModel;
    constructor(userModel: Model<UserDocument>);
    create(createUserDto: CreateUserDto): Promise<UserSchema>;
    findAll(): Promise<UserSchema[]>;
    findByEmail(userEmail: string): Promise<UserSchema | null>;
    findOne(user: User): Promise<UserSchema | null>;
}
