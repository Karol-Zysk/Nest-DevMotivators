import { CanActivate, ExecutionContext } from '@nestjs/common';
import { MotivatorsService } from '../motivators.service';
export declare class AuthorizeGuard implements CanActivate {
    private readonly motivatorsService;
    constructor(motivatorsService: MotivatorsService);
    canActivate(context: ExecutionContext): Promise<boolean>;
}
