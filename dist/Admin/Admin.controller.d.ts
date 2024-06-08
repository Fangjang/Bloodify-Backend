import { AdminService } from "./Admin.service";
import { AddAmbulanceDTO, AddBloodBankDTO, AddBulkBloodDTO, AddCampaignDTO } from "src/Auth/dto/Auth.dto";
export declare class AdminController {
    private readonly adminService;
    constructor(adminService: AdminService);
    dashboard(): Promise<import("src/Auth/dto/Auth.dto").SuccessResponse | import("@nestjs/common").BadRequestException>;
    getUsers(): Promise<import("src/Auth/dto/Auth.dto").SuccessResponse | import("@nestjs/common").BadRequestException>;
    getAllRequest(): Promise<import("src/Auth/dto/Auth.dto").SuccessResponse | import("@nestjs/common").BadRequestException>;
    getAllBloodBanks(): Promise<import("src/Auth/dto/Auth.dto").SuccessResponse | import("@nestjs/common").BadRequestException>;
    addBloodBank(mode: "single" | "bulk", bloodBankDTO: AddBloodBankDTO, bulk: AddBulkBloodDTO[]): Promise<import("src/Auth/dto/Auth.dto").SuccessResponse | import("@nestjs/common").BadRequestException>;
    addCampaign(campaignDTO: AddCampaignDTO): Promise<import("src/Auth/dto/Auth.dto").SuccessResponse | import("@nestjs/common").BadRequestException>;
    addPastCampaigns(campaignDTO: AddCampaignDTO): Promise<import("src/Auth/dto/Auth.dto").SuccessResponse | import("@nestjs/common").BadRequestException>;
    getAllCampaigns(): Promise<import("src/Auth/dto/Auth.dto").SuccessResponse | import("@nestjs/common").BadRequestException>;
    getAmbulances(): Promise<import("src/Auth/dto/Auth.dto").SuccessResponse | import("@nestjs/common").BadRequestException>;
    addAmbulance(ambulanceDTO: AddAmbulanceDTO): Promise<import("src/Auth/dto/Auth.dto").SuccessResponse | import("@nestjs/common").BadRequestException>;
    deleteAmbulance(id: string): Promise<import("src/Auth/dto/Auth.dto").SuccessResponse | import("@nestjs/common").BadRequestException>;
}
