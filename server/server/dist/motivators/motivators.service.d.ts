import { Model, Types } from 'mongoose';
import { Motivator, MotivatorDocument, User } from '../entities';
import { CreateMotivatorDto } from './dto/create-motivator.dto';
import { UpdateMotivatorDto } from './dto/update-motivator.dto';
import { QueryString } from '../utils/apiFeatures';
import { Place, VoteKind, VoteMethod } from 'src/utils/enums';
export declare class MotivatorsService {
    private readonly motivatorModel;
    constructor(motivatorModel: Model<MotivatorDocument>);
    findAllMotivators(place: Place, queryString: QueryString): Promise<Motivator[]>;
    findMotivatorById(id: string): Promise<Motivator>;
    createMotivator(dto: CreateMotivatorDto, userId: Types.ObjectId): Promise<Motivator>;
    updateMotivator(id: string, updateMotivatorDto: UpdateMotivatorDto): Promise<Motivator>;
    deleteMotivator(id: string): Promise<Motivator>;
    vote(id: string, userId: User, option: VoteKind, method: VoteMethod): Promise<Motivator>;
    acceptToStaging(motivatorId: string): Promise<Motivator>;
}
