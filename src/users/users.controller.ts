import { Controller, Get, Post, Body, Patch, Param, Delete, HttpException, UseGuards } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User as UserSchema } from './schema/user.schema';
import { User } from './interface/user.interface';
import { create } from 'lodash';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

@Controller()
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  // TODO CREATE AUTHENTICATION SERVICE WITH PASSPORT AND JWT TOKEN
  // @Post('login')
  // authenticate(@Body() user: User): Promise<User | HttpException | void> {
  //   return this.usersService.authenticate(user);
  // }

  @Post('user')
  createUser(@Body() createUserDto: CreateUserDto): Promise<User | HttpException> {
    return this.usersService.createUser(createUserDto);
  }

  @UseGuards(JwtAuthGuard)
  @Get('users')
  findAllUsers(): Promise<User[]> {
    return this.usersService.findAllUsers();
  }
}
