import { BadRequestException } from "@nestjs/common";
import { AddAmbulanceDTO, AddBloodBankDTO, AddBulkBloodDTO, AddCampaignDTO, SuccessResponse } from "src/Auth/dto/Auth.dto";
import { MysqlPoolService } from "src/Utils/mysq.service";
export declare class AdminService {
    private readonly mysqlService;
    constructor(mysqlService: MysqlPoolService);
    dashboard(): Promise<SuccessResponse | BadRequestException>;
    getAllUsers(): Promise<SuccessResponse | BadRequestException>;
    getBloodRequest(): Promise<SuccessResponse | BadRequestException>;
    getBloodBanks(): Promise<SuccessResponse | BadRequestException>;
    addBloodBank(dto: AddBloodBankDTO, mode: "single" | "bulk", bulkdto: AddBulkBloodDTO[]): Promise<SuccessResponse | BadRequestException>;
    addCampaign(campaignDTO: AddCampaignDTO): Promise<SuccessResponse | BadRequestException>;
    addPastCampaigns(campaignDTO: AddCampaignDTO): Promise<SuccessResponse | BadRequestException>;
    getAllCampaigns(): Promise<SuccessResponse | BadRequestException>;
    getAmbulances(): Promise<SuccessResponse | BadRequestException>;
    addAmbulance(ambulanceDTO: AddAmbulanceDTO): Promise<SuccessResponse | BadRequestException>;
    deleteAmbulance(id: string): Promise<SuccessResponse | BadRequestException>;
}
