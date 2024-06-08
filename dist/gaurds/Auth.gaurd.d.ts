import { CanActivate, ExecutionContext } from "@nestjs/common";
import { MysqlPoolService } from "src/Utils/mysq.service";
export declare class AuthGuard implements CanActivate {
    canActivate(context: ExecutionContext): Promise<boolean>;
}
export declare class AdminGaurd implements CanActivate {
    private readonly mysqlService;
    constructor(mysqlService: MysqlPoolService);
    canActivate(context: ExecutionContext): Promise<boolean>;
}
