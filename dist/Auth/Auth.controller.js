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
exports.AuthController = void 0;
const common_1 = require("@nestjs/common");
const Auth_service_1 = require("./Auth.service");
const Auth_gaurd_1 = require("../gaurds/Auth.gaurd");
let AuthController = class AuthController {
    constructor(authService) {
        this.authService = authService;
    }
    async CreateUser(user) {
        return this.authService.CreateUser(user);
    }
    async Login(user) {
        return this.authService.Login(user);
    }
    async ping(req) {
        return this.authService.Ping(req);
    }
};
exports.AuthController = AuthController;
__decorate([
    (0, common_1.Put)("CreateUser"),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "CreateUser", null);
__decorate([
    (0, common_1.Put)("Login"),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "Login", null);
__decorate([
    (0, common_1.UseGuards)(Auth_gaurd_1.AuthGuard),
    (0, common_1.Get)("ping"),
    __param(0, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "ping", null);
exports.AuthController = AuthController = __decorate([
    (0, common_1.Controller)("Auth"),
    __metadata("design:paramtypes", [Auth_service_1.AuthService])
], AuthController);
//# sourceMappingURL=Auth.controller.js.map