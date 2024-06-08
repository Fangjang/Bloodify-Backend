import { BadRequestException } from "@nestjs/common";
import { CreateUserDTO, LoginDTO, SuccessResponse } from "./dto/Auth.dto";
import { MysqlPoolService } from "src/Utils/mysq.service";
import { reqDTO } from "src/Main/dto/Main.dto";
export declare class AuthService {
    private readonly mysqlService;
    constructor(mysqlService: MysqlPoolService);
    CreateUser(user: CreateUserDTO): Promise<SuccessResponse | BadRequestException>;
    Login(user: LoginDTO): Promise<SuccessResponse | BadRequestException>;
    Ping(req: reqDTO): Promise<{
        role: string;
        serverTime: Date;
        userName: string;
    } | BadRequestException>;
}
