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
Object.defineProperty(exports, "__esModule", { value: true });
exports.AdminGaurd = exports.AuthGuard = void 0;
const common_1 = require("@nestjs/common");
const jwt = require("jsonwebtoken");
const Contants_1 = require("../Utils/Contants");
const mysq_service_1 = require("../Utils/mysq.service");
let AuthGuard = class AuthGuard {
    async canActivate(context) {
        const request = context.switchToHttp().getRequest();
        const headers = request.headers;
        const token = headers?.authorization?.split(' ')[1];
        if (!token)
            return false;
        try {
            let isVerified = jwt.verify(token, Contants_1.JWT_KEY);
            request.id = isVerified['id'];
            request.userName = isVerified['userName'];
            request.role = isVerified['role'];
            if (isVerified)
                return true;
        }
        catch (error) {
            return false;
        }
    }
};
exports.AuthGuard = AuthGuard;
exports.AuthGuard = AuthGuard = __decorate([
    (0, common_1.Injectable)()
], AuthGuard);
let AdminGaurd = class AdminGaurd {
    constructor(mysqlService) {
        this.mysqlService = mysqlService;
    }
    async canActivate(context) {
        const request = context.switchToHttp().getRequest();
        const headers = request.headers;
        const token = headers?.authorization?.split(' ')[1];
        if (!token)
            return false;
        try {
            let isVerified = jwt.verify(token, Contants_1.JWT_KEY);
            request.id = isVerified['id'];
            request.userName = isVerified['userName'];
            request.role = isVerified['role'];
            let user = await this.mysqlService.execute(`
            SELECT * FROM users WHERE userID = ? AND role = ?
            `, [isVerified['id'], 'admin']);
            if (user.length === 0)
                return false;
            if (isVerified)
                return true;
        }
        catch (error) {
            return false;
        }
    }
};
exports.AdminGaurd = AdminGaurd;
exports.AdminGaurd = AdminGaurd = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [mysq_service_1.MysqlPoolService])
], AdminGaurd);
//# sourceMappingURL=Auth.gaurd.js.map