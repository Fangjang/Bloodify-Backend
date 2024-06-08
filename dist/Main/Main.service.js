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
exports.MainService = void 0;
const common_1 = require("@nestjs/common");
const mysq_service_1 = require("../Utils/mysq.service");
const Auth_dto_1 = require("../Auth/dto/Auth.dto");
let MainService = class MainService {
    constructor(mysqlService) {
        this.mysqlService = mysqlService;
    }
    async RequestBlood(rb, req) {
        try {
            if (!rb.patientName || !rb.bloodGroup || !rb.District || !rb.Hospital || !rb.contactNumber || !rb.details) {
                throw new common_1.BadRequestException("Please provide all the required fields");
            }
            if (rb.details.length < 5)
                throw new common_1.BadRequestException("Details must be at least 5 characters long");
            if (rb.details.length > 500)
                throw new common_1.BadRequestException("Details must be at most 500 characters long");
            if (rb.patientName.length < 3)
                throw new common_1.BadRequestException("Patient name must be at least 3 characters long");
            if (rb.patientName.length > 100)
                throw new common_1.BadRequestException("Patient name must be at most 100 characters long");
            await this.mysqlService.execute(`
            INSERT INTO bloodRequests (patientName, bloodGroup, District, Hospital, contactNumber, details, reqestedUser,requestedDate)
            VALUES (?, ?, ?, ?, ?, ?, ?,?)
            `, [rb.patientName, rb.bloodGroup, rb.District, rb.Hospital, rb.contactNumber, rb.details, req.id, rb.requestedDate]).catch((error) => {
                throw error;
            });
            return new Auth_dto_1.SuccessResponse("Request created successfully");
        }
        catch (error) {
            throw error;
        }
    }
    async getBloodRequests() {
        try {
            const requests = await this.mysqlService.execute(`
            SELECT patientName, bloodGroup, District, Hospital, contactNumber, details,requestedDate ,reqID
            FROM bloodRequests
            ORDER BY requestedDate ASC
        `).catch((error) => {
                throw error;
            });
            return new Auth_dto_1.SuccessResponse(requests, "Requests fetched successfully");
        }
        catch (error) {
            throw error;
        }
    }
    async SearchBlood(sb, req) {
        try {
            if (!sb.bloodType || !sb.district) {
                throw new common_1.BadRequestException("Please provide all the required fields");
            }
            const requests = await this.mysqlService.execute(`
            SELECT fullName, phone,bloodType, district, fullAddress
            FROM users
            WHERE bloodType = ? AND district = ? AND userName !=  ?
            `, [sb.bloodType, sb.district, req.userName]);
            if (requests.length === 0)
                throw new common_1.BadRequestException("No donors found");
            return new Auth_dto_1.SuccessResponse(requests, "Donors fetched successfully");
        }
        catch (error) {
            throw error;
        }
    }
    async SearchAmbulance(sa) {
        try {
            if (!sa.district) {
                throw new common_1.BadRequestException("Please provide all the required fields");
            }
            let a = await this.mysqlService.execute(`
            SELECT * from ambulances
            WHERE ambulanceDistrict = ?
            `, [sa.district]);
            if (a.length === 0)
                throw new common_1.BadRequestException("No ambulances found");
            return new Auth_dto_1.SuccessResponse(a, "Ambulances fetched successfully");
        }
        catch (error) {
            throw error;
        }
    }
    async SearchBloodBank(sbb) {
        try {
            if (!sbb.district) {
                throw new common_1.BadRequestException("Please provide all the required fields");
            }
            let a = await this.mysqlService.execute(`
            SELECT * from bloodbank
            WHERE bankDistrict = ?
            `, [sbb.district]);
            if (a.length === 0)
                throw new common_1.BadRequestException("No blood banks found");
            return new Auth_dto_1.SuccessResponse(a, "Blood banks fetched successfully");
        }
        catch (error) {
            throw error;
        }
    }
    async getCampaigns() {
        try {
            let a = await this.mysqlService.execute(`
            SELECT
            c.campaignID,
            c.campaignName,
            c.campaignStartDate,
            c.campaignEndDate,
            c.campaignOrganizer,
            c.description,
            c.isFinished,
            CASE
                WHEN COUNT(d.donerID) = 0 THEN NULL
                ELSE JSON_ARRAYAGG(JSON_OBJECT(
                    'donerID', d.donerID,
                    'donerFullName', d.donerFullName,
                    'donerLocation', d.donerLocation,
                    'donerContact', d.donerContact
                ))
            END AS doners
        FROM
            campaigns c
        LEFT JOIN
            campaignDoners d ON c.campaignID = d.donerCampaignID
        GROUP BY
            c.campaignID;
            `);
            if (a.length === 0)
                throw new common_1.BadRequestException("No campaigns found");
            return new Auth_dto_1.SuccessResponse(a, "Campaigns fetched successfully");
        }
        catch (error) {
            throw error;
        }
    }
};
exports.MainService = MainService;
exports.MainService = MainService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [mysq_service_1.MysqlPoolService])
], MainService);
//# sourceMappingURL=Main.service.js.map