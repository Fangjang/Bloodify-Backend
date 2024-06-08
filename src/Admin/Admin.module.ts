import { Module } from "@nestjs/common";
import { AdminService } from "./Admin.service";
import { AdminController } from "./Admin.controller";
import { MysqlPoolService } from "src/Utils/mysq.service";

@Module({
    imports: [

    ],
    providers: [
        AdminService,
        MysqlPoolService
    ],
    exports: [],
    controllers: [
        AdminController
    ]
})
export class AdminModule { }