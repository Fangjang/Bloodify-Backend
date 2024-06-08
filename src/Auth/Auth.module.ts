import { Module } from "@nestjs/common";
import { AuthController } from "./Auth.controller";
import { AuthService } from "./Auth.service";
import { MysqlPoolService } from "src/Utils/mysq.service";

@Module({
    imports: [],
    controllers: [
        AuthController
    ],
    providers: [
        AuthService,
        MysqlPoolService
    ],
    exports: []
})
export class AuthModule { }