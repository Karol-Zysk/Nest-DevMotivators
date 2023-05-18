import { Model, Types } from 'mongoose';
import { Motivator, MotivatorDocument, User, UserDocument } from 'src/entities';
import { UpdateUserDto } from './dto';
export declare class UsersService {
    private readonly userModel;
    private readonly motivatorModel;
    constructor(userModel: Model<UserDocument>, motivatorModel: Model<MotivatorDocument>);
    getMe(user: User): User;
    updateMe(userId: Types.ObjectId, dto: UpdateUserDto): Promise<User>;
    deleteMe(userId: Types.ObjectId): Promise<void>;
    getMyMotivators(userId: string): Promise<Motivator[]>;
    getUserMotivators(userId: string): Promise<Motivator[]>;
}
