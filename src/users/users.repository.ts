import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateUserDto } from './dto/create-user.dto';
import { User } from './interface/user.interface';
import { User as UserSchema, UserDocument } from './schema/user.schema';

@Injectable()
export class UsersRepository {

  constructor(@InjectModel(UserSchema.name) private userModel: Model<UserDocument>) {}

  // TODO CREATE AUTHENTICATION SERVICE WITH PASSPORT AND JWT TOKEN
  async create(createUserDto: CreateUserDto): Promise<UserSchema> {
    console.log(createUserDto)
    const createdUser = new this.userModel(createUserDto);
    
    return createdUser.save()
  }

  async findAll(): Promise<UserSchema[]>{
    return await this.userModel.find()
  }
  
    async findByEmail(userEmail: string): Promise<UserSchema | null> {
      const dbUser = await this.userModel.findOne({ email: userEmail })
      return dbUser
    }
  
    async findOne(user: User): Promise<UserSchema | null> {
      const dbUser = await this.userModel.findOne({ email: user.email, password: user.password}).exec()
      return dbUser
    }
  
}
