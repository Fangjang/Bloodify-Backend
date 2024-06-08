import { AuthService } from "./Auth.service";
import { CreateUserDTO, LoginDTO } from "./dto/Auth.dto";
import { reqDTO } from "src/Main/dto/Main.dto";
export declare class AuthController {
    private readonly authService;
    constructor(authService: AuthService);
    CreateUser(user: CreateUserDTO): Promise<import("./dto/Auth.dto").SuccessResponse | import("@nestjs/common").BadRequestException>;
    Login(user: LoginDTO): Promise<import("./dto/Auth.dto").SuccessResponse | import("@nestjs/common").BadRequestException>;
    ping(req: reqDTO): Promise<import("@nestjs/common").BadRequestException | {
        role: string;
        serverTime: Date;
        userName: string;
    }>;
}
