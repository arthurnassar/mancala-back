import { JwtService } from '@nestjs/jwt';
import { User } from 'src/users/interface/user.interface';
import { UsersRepository } from 'src/users/users.repository';
export declare class AuthService {
    private usersRepository;
    private jwtService;
    constructor(usersRepository: UsersRepository, jwtService: JwtService);
    validateUser(user: User): Promise<any>;
    login(user: User): Promise<{
        access_token: string;
    }>;
}
