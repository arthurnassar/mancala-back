import { Controller, Req, Post, UseGuards, Body } from '@nestjs/common';
import { AuthService } from './auth.service';
import { User } from 'src/users/interface/user.interface';
import { Request } from 'express';

@Controller()
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('login')
  async login(@Req() req: Request, @Body() user: User) {
    return this.authService.login(user);
  }
}