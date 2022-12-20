import { AuthService } from './auth.service';
import { User } from 'src/users/interface/user.interface';
import { Request } from 'express';
export declare class AuthController {
    private authService;
    constructor(authService: AuthService);
    login(req: Request, user: User): Promise<{
        access_token: string;
    }>;
}
