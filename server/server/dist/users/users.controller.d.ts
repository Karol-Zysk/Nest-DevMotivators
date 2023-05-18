import { User } from 'src/entities';
import { UsersService } from './users.service';
import { UpdateUserDto } from './dto';
export declare class UsersController {
    private readonly usersService;
    constructor(usersService: UsersService);
    getMe(user: User): User;
    updatetMe(user: User, dto: UpdateUserDto): Promise<User>;
    deletetMe(user: User): Promise<void>;
    getMyMotivators(user: User): Promise<import("src/entities").Motivator[]>;
    getUserMotivators(id: string): Promise<import("src/entities").Motivator[]>;
}
