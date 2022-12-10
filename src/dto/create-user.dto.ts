import { IsEmail } from 'class-validator';

export class CreateUserDto {
  id: number;

  @IsEmail()
  email: string;

  password: string;
}
