import { Module } from "@nestjs/common";
import { MysqlPoolService } from "src/Utils/mysq.service";
import { MainController } from "./Main.controller";
import { MainService } from "./Main.service";

@Module({
    imports: [],
    controllers: [
        MainController
    ],
    providers: [
        MysqlPoolService,
        MainService
    ]
})
export class MainModule { }