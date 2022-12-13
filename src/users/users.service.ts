import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './interface/user.interface';
import { User as UserSchema, UserDocument } from './schema/user.schema';
import { UsersRepository } from './users.repository';

@Injectable()
export class UsersService {
  usersRepository: UsersRepository
  constructor(usersRepository: UsersRepository) {
    this.usersRepository = usersRepository
  }
  
  private readonly users: User[] = [];

  // TODO CREATE AUTHENTICATION SERVICE WITH PASSPORT AND JWT TOKEN
  async authenticate(user: User): Promise<User | HttpException> {
    const dbUser = await this.usersRepository.findOne(user);
    console.log(dbUser)
    const userExists = !!dbUser
    const emailMatches = dbUser.email === user.email
    const passwordMatches = dbUser.password === user.password
    if (!userExists || !emailMatches || !passwordMatches) {
      throw new HttpException('Email ou senha invalido', HttpStatus.FORBIDDEN);
    }


    return dbUser;

  }

  async findAllUsers(): Promise<User[]> {
    return await this.usersRepository.findAll()
  }

  async createUser(createUserDto: CreateUserDto): Promise<User | HttpException> {
    const dbUser = await this.usersRepository.findByEmail(createUserDto.email)
    if(dbUser) throw new HttpException('Este email está em uso', HttpStatus.CONFLICT)
    
    const createdUser = await this.usersRepository.create(createUserDto);
    return createdUser
  }
  
}
