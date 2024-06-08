import { BadRequestException } from "@nestjs/common";
import { MysqlPoolService } from "src/Utils/mysq.service";
import { reqDTO, RequestBloodDTO, SearchBloodDTO } from "./dto/Main.dto";
import { SuccessResponse } from "src/Auth/dto/Auth.dto";
export declare class MainService {
    private readonly mysqlService;
    constructor(mysqlService: MysqlPoolService);
    RequestBlood(rb: RequestBloodDTO, req: reqDTO): Promise<SuccessResponse | BadRequestException>;
    getBloodRequests(): Promise<SuccessResponse | BadRequestException>;
    SearchBlood(sb: SearchBloodDTO, req: reqDTO): Promise<SuccessResponse | BadRequestException>;
    SearchAmbulance(sa: {
        district: string;
    }): Promise<SuccessResponse | BadRequestException>;
    SearchBloodBank(sbb: {
        district: string;
    }): Promise<SuccessResponse | BadRequestException>;
    getCampaigns(): Promise<SuccessResponse | BadRequestException>;
}
