"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AdminController = void 0;
const common_1 = require("@nestjs/common");
const Auth_gaurd_1 = require("../gaurds/Auth.gaurd");
const Admin_service_1 = require("./Admin.service");
let AdminController = class AdminController {
    constructor(adminService) {
        this.adminService = adminService;
    }
    async dashboard() {
        return this.adminService.dashboard();
    }
    async getUsers() {
        return this.adminService.getAllUsers();
    }
    async getAllRequest() {
        return this.adminService.getBloodRequest();
    }
    async getAllBloodBanks() {
        return this.adminService.getBloodBanks();
    }
    async addBloodBank(mode, bloodBankDTO, bulk) {
        return this.adminService.addBloodBank(bloodBankDTO, mode, bulk);
    }
    async addCampaign(campaignDTO) {
        return this.adminService.addCampaign(campaignDTO);
    }
    async addPastCampaigns(campaignDTO) {
        return this.adminService.addPastCampaigns(campaignDTO);
    }
    async getAllCampaigns() {
        return this.adminService.getAllCampaigns();
    }
    async getAmbulances() {
        return this.adminService.getAmbulances();
    }
    async addAmbulance(ambulanceDTO) {
        return this.adminService.addAmbulance(ambulanceDTO);
    }
    async deleteAmbulance(id) {
        return this.adminService.deleteAmbulance(id);
    }
};
exports.AdminController = AdminController;
__decorate([
    (0, common_1.UseGuards)(Auth_gaurd_1.AdminGaurd),
    (0, common_1.Get)("dashboard"),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], AdminController.prototype, "dashboard", null);
__decorate([
    (0, common_1.UseGuards)(Auth_gaurd_1.AdminGaurd),
    (0, common_1.Get)("GetAllUsers"),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], AdminController.prototype, "getUsers", null);
__decorate([
    (0, common_1.UseGuards)(Auth_gaurd_1.AdminGaurd),
    (0, common_1.Get)("GetAllRequests"),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], AdminController.prototype, "getAllRequest", null);
__decorate([
    (0, common_1.UseGuards)(Auth_gaurd_1.AdminGaurd),
    (0, common_1.Get)("GetAllBloodBanks"),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], AdminController.prototype, "getAllBloodBanks", null);
__decorate([
    (0, common_1.UseGuards)(Auth_gaurd_1.AdminGaurd),
    (0, common_1.Put)("AddBloodBank"),
    __param(0, (0, common_1.Query)("mode")),
    __param(1, (0, common_1.Body)()),
    __param(2, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object, Array]),
    __metadata("design:returntype", Promise)
], AdminController.prototype, "addBloodBank", null);
__decorate([
    (0, common_1.UseGuards)(Auth_gaurd_1.AdminGaurd),
    (0, common_1.Post)("AddCampaign"),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], AdminController.prototype, "addCampaign", null);
__decorate([
    (0, common_1.UseGuards)(Auth_gaurd_1.AdminGaurd),
    (0, common_1.Post)("AddPastCampaigns"),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], AdminController.prototype, "addPastCampaigns", null);
__decorate([
    (0, common_1.UseGuards)(Auth_gaurd_1.AdminGaurd),
    (0, common_1.Get)("GetAllCampaigns"),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], AdminController.prototype, "getAllCampaigns", null);
__decorate([
    (0, common_1.UseGuards)(Auth_gaurd_1.AdminGaurd),
    (0, common_1.Get)("GetAmbulances"),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], AdminController.prototype, "getAmbulances", null);
__decorate([
    (0, common_1.UseGuards)(Auth_gaurd_1.AdminGaurd),
    (0, common_1.Put)("AddAmbulance"),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], AdminController.prototype, "addAmbulance", null);
__decorate([
    (0, common_1.UseGuards)(Auth_gaurd_1.AdminGaurd),
    (0, common_1.Delete)("DeleteAmbulance/:id"),
    __param(0, (0, common_1.Param)("id")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], AdminController.prototype, "deleteAmbulance", null);
exports.AdminController = AdminController = __decorate([
    (0, common_1.Controller)("Admin"),
    __metadata("design:paramtypes", [Admin_service_1.AdminService])
], AdminController);
//# sourceMappingURL=Admin.controller.js.map