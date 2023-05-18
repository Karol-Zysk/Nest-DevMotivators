import { CanActivate, ExecutionContext } from '@nestjs/common';
import { MotivatorsService } from '../motivators.service';
export declare class VotingGuard implements CanActivate {
    private readonly motivatorService;
    constructor(motivatorService: MotivatorsService);
    canActivate(context: ExecutionContext): Promise<boolean>;
}
