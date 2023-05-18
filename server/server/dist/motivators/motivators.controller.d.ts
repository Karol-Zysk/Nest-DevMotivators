import { MotivatorsService } from './motivators.service';
import { CreateMotivatorDto } from './dto/create-motivator.dto';
import { User } from 'src/entities';
import { QueryString } from 'src/utils/apiFeatures';
import { UpdateMotivatorDto } from './dto/update-motivator.dto';
export declare class MotivatorsController {
    private motivatorsService;
    constructor(motivatorsService: MotivatorsService);
    findMotivatorsMain(queryString: QueryString): Promise<import("src/entities").Motivator[]>;
    findMotivatorsStaging(queryString: QueryString): Promise<import("src/entities").Motivator[]>;
    findMotivatorsWaiting(queryString: QueryString): Promise<import("src/entities").Motivator[]>;
    findMotivatorById(id: string): Promise<import("src/entities").Motivator>;
    createMotivator(dto: CreateMotivatorDto, user: User): Promise<import("src/entities").Motivator>;
    updateMotivator(id: string, updateMotivatorDto: UpdateMotivatorDto): Promise<import("src/entities").Motivator>;
    deleteMotivator(id: string): Promise<import("src/entities").Motivator>;
    doLike(id: string, user: User): Promise<import("src/entities").Motivator>;
    undoLike(id: string, user: User): Promise<import("src/entities").Motivator>;
    doUnlike(id: string, user: User): Promise<import("src/entities").Motivator>;
    undoUnlike(id: string, user: User): Promise<import("src/entities").Motivator>;
    acceptToStaging(id: string): Promise<import("src/entities").Motivator>;
}
