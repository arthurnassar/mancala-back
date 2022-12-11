import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './interface/user.interface';
import { User as UserSchema, UserDocument } from './schema/user.schema';

@Injectable()
export class UsersService {

  constructor(@InjectModel(UserSchema.name) private userModel: Model<UserDocument>) {}
  private readonly users: User[] = [];

  // TODO CREATE AUTHENTICATION SERVICE WITH PASSPORT AND JWT TOKEN
  authenticate(user: User): User {
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

    throw new HttpException('Email ou senha invalido', HttpStatus.FORBIDDEN);
  }

  async findAllUsers(): Promise<UserSchema[]> {
    return await this.userModel.find({});
  }

  async createUser(createUserDto: CreateUserDto): Promise<UserSchema | HttpException> {
    const dbUser = await this.userModel.find({ email: createUserDto.email}).exec()
    const createdUser = new this.userModel(createUserDto);
    const emailExists = dbUser.length !== 0
    if(emailExists) throw new HttpException('Este email está em uso', HttpStatus.CONFLICT)
    
    return createdUser.save()
  }
  
}
