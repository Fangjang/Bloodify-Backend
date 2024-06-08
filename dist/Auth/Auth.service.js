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
exports.AuthService = void 0;
const common_1 = require("@nestjs/common");
const Auth_dto_1 = require("./dto/Auth.dto");
const mysq_service_1 = require("../Utils/mysq.service");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const Contants_1 = require("../Utils/Contants");
let AuthService = class AuthService {
    constructor(mysqlService) {
        this.mysqlService = mysqlService;
    }
    async CreateUser(user) {
        try {
            if (!user.userName || !user.fullName || !user.phone || !user.district || !user.fullAddress || !user.bloodType || !user.password) {
                throw new common_1.BadRequestException("Please provide all the required fields");
            }
            if (user.userName.length < 4)
                throw new common_1.BadRequestException("Username must be at least 4 characters long");
            if (user.userName.includes(" "))
                throw new common_1.BadRequestException("Username cannot contain spaces");
            if (user.password.length < 8)
                throw new common_1.BadRequestException("Password must be at least 8 characters long");
            if (user.phone.length !== 10)
                throw new common_1.BadRequestException("Phone number must be 10 characters long");
            if (!["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"].includes(user.bloodType))
                throw new common_1.BadRequestException("Invalid blood type");
            user.password = await bcrypt.hash(user.password, 10);
            await this.mysqlService.execute(`
            INSERT INTO users (userName, fullName, phone, district, fullAddress, bloodType, password)
            VALUES (?, ?, ?, ?, ?, ?,?)
            `, [user.userName.toLowerCase(), user.fullName, user.phone, user.district, user.fullAddress, user.bloodType, user.password]).catch((error) => {
                if (error.code === "ER_DUP_ENTRY") {
                    throw new common_1.BadRequestException("Username or Phone already exists");
                }
                throw error;
            });
            return new Auth_dto_1.SuccessResponse("User created successfully");
        }
        catch (error) {
            throw error;
        }
    }
    async Login(user) {
        try {
            if (!user.username || !user.password)
                throw new common_1.BadRequestException("Please provide username and password");
            const userData = await this.mysqlService.execute(`
            SELECT * FROM users WHERE userName = ?
            `, [user.username]).catch((error) => {
                throw error;
            });
            if (userData.length === 0)
                throw new common_1.BadRequestException("Invalid username or password");
            const userPassword = userData[0].password;
            const isPasswordValid = await bcrypt.compare(user.password, userPassword);
            if (!isPasswordValid)
                throw new common_1.BadRequestException("Invalid username or password");
            const token = jwt.sign({ id: userData[0].userID, userName: userData[0].userName, role: userData[0].role }, Contants_1.JWT_KEY);
            return new Auth_dto_1.SuccessResponse(token, "User login successful");
        }
        catch (error) {
            throw error;
        }
    }
    async Ping(req) {
        try {
            let data = await this.mysqlService.execute(`
                SELECT * FROM users WHERE userID = ?
                `, [req.id]).catch((error) => {
                throw error;
            });
            if (data.length === 0)
                throw new common_1.BadRequestException("User not found");
            let role = data[0].role;
            await new Promise((resolve) => setTimeout(resolve, 100));
            return ({
                role: role,
                serverTime: new Date(),
                userName: data[0].userName
            });
        }
        catch (error) {
            throw error;
        }
    }
};
exports.AuthService = AuthService;
__decorate([
    __param(0, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], AuthService.prototype, "Ping", null);
exports.AuthService = AuthService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [mysq_service_1.MysqlPoolService])
], AuthService);
//# sourceMappingURL=Auth.service.js.map