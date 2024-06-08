import { MainService } from "./Main.service";
import { reqDTO, RequestBloodDTO, SearchBloodDTO } from "./dto/Main.dto";
export declare class MainController {
    private readonly mainService;
    constructor(mainService: MainService);
    RequestBlood(rb: RequestBloodDTO, req: reqDTO): Promise<import("../Auth/dto/Auth.dto").SuccessResponse | import("@nestjs/common").BadRequestException>;
    getBloodRequests(): Promise<import("../Auth/dto/Auth.dto").SuccessResponse | import("@nestjs/common").BadRequestException>;
    SearchBlood(sb: SearchBloodDTO, req: reqDTO): Promise<import("../Auth/dto/Auth.dto").SuccessResponse | import("@nestjs/common").BadRequestException>;
    SearchAmbulance(sa: {
        district: string;
    }): Promise<import("../Auth/dto/Auth.dto").SuccessResponse | import("@nestjs/common").BadRequestException>;
    SearchBloodBank(sbb: {
        district: string;
    }): Promise<import("../Auth/dto/Auth.dto").SuccessResponse | import("@nestjs/common").BadRequestException>;
    getCampaigns(): Promise<import("../Auth/dto/Auth.dto").SuccessResponse | import("@nestjs/common").BadRequestException>;
}
