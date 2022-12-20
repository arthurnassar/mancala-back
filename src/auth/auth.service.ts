import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { User } from 'src/users/interface/user.interface';
import { UsersRepository } from 'src/users/users.repository';

@Injectable()
export class AuthService {
  constructor(
    private usersRepository: UsersRepository,
    private jwtService: JwtService
  ) {}

  async validateUser(user: User): Promise<any> {
    const dbUser = await this.usersRepository.findOne(user);
    if (dbUser && dbUser.password === user.password) {
      const { password, ...result } = dbUser;
      return result;
    }
    
    throw new HttpException('Email ou senha invalido', HttpStatus.FORBIDDEN);    
  }

  async login(user: User) {
    const {_doc} = await this.validateUser(user)
    const dbUser = _doc
    console.log()
    
    const payload = { email: dbUser.email, sub: dbUser._id };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }
}