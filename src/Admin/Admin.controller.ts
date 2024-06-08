import { Body, Controller, Delete, Get, Param, Post, Put, Query, UseGuards } from "@nestjs/common";
import { AdminGaurd } from "src/gaurds/Auth.gaurd";
import { AdminService } from "./Admin.service";
import { MysqlPoolService } from "src/Utils/mysq.service";
import { AddAmbulanceDTO, AddBloodBankDTO, AddBulkBloodDTO, AddCampaignDTO } from "src/Auth/dto/Auth.dto";

@Controller("Admin")
export class AdminController {


    constructor(
        private readonly adminService: AdminService,
    ) { }


    @UseGuards(AdminGaurd)
    @Get("dashboard")
    async dashboard() {

        return this.adminService.dashboard()
    }


    @UseGuards(AdminGaurd)
    @Get("GetAllUsers")
    async getUsers() {
        return this.adminService.getAllUsers()
    }


    @UseGuards(AdminGaurd)
    @Get("GetAllRequests")
    async getAllRequest() {
        return this.adminService.getBloodRequest()
    }


    @UseGuards(AdminGaurd)
    @Get("GetAllBloodBanks")
    async getAllBloodBanks() {
        return this.adminService.getBloodBanks()
    }


    @UseGuards(AdminGaurd)
    @Put("AddBloodBank")
    async addBloodBank(
        @Query("mode") mode: "single" | "bulk",
        @Body() bloodBankDTO: AddBloodBankDTO,
        @Body() bulk: AddBulkBloodDTO[]

    ) {
        return this.adminService.addBloodBank(bloodBankDTO, mode, bulk)
    }


    @UseGuards(AdminGaurd)
    @Post("AddCampaign")
    async addCampaign(
        @Body() campaignDTO: AddCampaignDTO
    ) {
        return this.adminService.addCampaign(campaignDTO)
    }

    @UseGuards(AdminGaurd)
    @Post("AddPastCampaigns")
    async addPastCampaigns(
        @Body() campaignDTO: AddCampaignDTO
    ) {
        return this.adminService.addPastCampaigns(campaignDTO)
    }


    @UseGuards(AdminGaurd)
    @Get("GetAllCampaigns")
    async getAllCampaigns() {
        return this.adminService.getAllCampaigns()
    }


    @UseGuards(AdminGaurd)
    @Get("GetAmbulances")
    async getAmbulances() {
        return this.adminService.getAmbulances()
    }

    @UseGuards(AdminGaurd)
    @Put("AddAmbulance")
    async addAmbulance(
        @Body() ambulanceDTO: AddAmbulanceDTO
    ) {
        return this.adminService.addAmbulance(ambulanceDTO)
    }

    @UseGuards(AdminGaurd)
    @Delete("DeleteAmbulance/:id")
    async deleteAmbulance(
        @Param("id") id: string
    ) {
        return this.adminService.deleteAmbulance(id)
    }





}