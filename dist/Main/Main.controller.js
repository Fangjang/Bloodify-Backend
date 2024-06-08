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
exports.MainController = void 0;
const common_1 = require("@nestjs/common");
const Main_service_1 = require("./Main.service");
const Auth_gaurd_1 = require("../gaurds/Auth.gaurd");
let MainController = class MainController {
    constructor(mainService) {
        this.mainService = mainService;
    }
    async RequestBlood(rb, req) {
        return this.mainService.RequestBlood(rb, req);
    }
    async getBloodRequests() {
        return this.mainService.getBloodRequests();
    }
    async SearchBlood(sb, req) {
        return this.mainService.SearchBlood(sb, req);
    }
    async SearchAmbulance(sa) {
        return this.mainService.SearchAmbulance(sa);
    }
    async SearchBloodBank(sbb) {
        return this.mainService.SearchBloodBank(sbb);
    }
    async getCampaigns() {
        return this.mainService.getCampaigns();
    }
};
exports.MainController = MainController;
__decorate([
    (0, common_1.UseGuards)(Auth_gaurd_1.AuthGuard),
    (0, common_1.Put)("RequestBlood"),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], MainController.prototype, "RequestBlood", null);
__decorate([
    (0, common_1.UseGuards)(Auth_gaurd_1.AuthGuard),
    (0, common_1.Get)("getBloodRequests"),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], MainController.prototype, "getBloodRequests", null);
__decorate([
    (0, common_1.UseGuards)(Auth_gaurd_1.AuthGuard),
    (0, common_1.Put)("SearchBlood"),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], MainController.prototype, "SearchBlood", null);
__decorate([
    (0, common_1.UseGuards)(Auth_gaurd_1.AuthGuard),
    (0, common_1.Put)("SearchAmbulance"),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], MainController.prototype, "SearchAmbulance", null);
__decorate([
    (0, common_1.UseGuards)(Auth_gaurd_1.AuthGuard),
    (0, common_1.Put)("SearchBloodBank"),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], MainController.prototype, "SearchBloodBank", null);
__decorate([
    (0, common_1.UseGuards)(Auth_gaurd_1.AuthGuard),
    (0, common_1.Get)("getCampaigns"),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], MainController.prototype, "getCampaigns", null);
exports.MainController = MainController = __decorate([
    (0, common_1.Controller)("Main"),
    __metadata("design:paramtypes", [Main_service_1.MainService])
], MainController);
//# sourceMappingURL=Main.controller.js.map