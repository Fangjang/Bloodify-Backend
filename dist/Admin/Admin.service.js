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
exports.AdminService = void 0;
const common_1 = require("@nestjs/common");
const Auth_dto_1 = require("../Auth/dto/Auth.dto");
const mysq_service_1 = require("../Utils/mysq.service");
let AdminService = class AdminService {
    constructor(mysqlService) {
        this.mysqlService = mysqlService;
    }
    async dashboard() {
        try {
            let recentBloodRequestscount = await this.mysqlService.execute(`
                SELECT 
                  (SELECT COUNT(*) FROM campaigns WHERE isFinished = ?) AS campaigns_count,
                  (SELECT COUNT(*) FROM ambulances) AS ambulances_count,
                  (SELECT COUNT(*) FROM bloodRequests) AS bloodRequests_count,
                  (SELECT COUNT(*) FROM bloodbank) AS bloodBank_count,
                    (SELECT COUNT(*) FROM users) AS users_count;
                `, ['false']).catch(err => {
                throw new common_1.BadRequestException(err);
            });
            let recentBloodRequests = await this.mysqlService.execute(`
            SELECT bloodRequests.*, users.userName
            FROM bloodRequests
            JOIN users ON bloodRequests.reqestedUser = users.userID
            ORDER BY bloodRequests.requestedDate DESC
            LIMIT 20;
            `);
            let recentUsers = await this.mysqlService.execute(`
            SELECT userID, userName, fullName, phone, district, fullAddress, bloodType, role, joinedOn 
            FROM users
            ORDER BY joinedOn DESC
            LIMIT 20;
          `).catch(err => {
                throw new common_1.BadRequestException(err);
            });
            let data = {
                recentBloodRequestscount: recentBloodRequestscount[0],
                recentBloodRequests: recentBloodRequests,
                recentUsers: recentUsers
            };
            return new Auth_dto_1.SuccessResponse(data, "Dashboard data fetched successfully");
        }
        catch (error) {
            throw error;
        }
    }
    async getAllUsers() {
        try {
            let a = await this.mysqlService.execute(`
            SELECT userID, userName, fullName, phone, district, fullAddress, bloodType, role, joinedOn 
            FROM users
            ORDER BY joinedOn DESC

            `);
            if (a.length == 0)
                return new Auth_dto_1.SuccessResponse([], "No data");
            return new Auth_dto_1.SuccessResponse(a, "Data fetched !");
        }
        catch (error) {
            throw error;
        }
    }
    async getBloodRequest() {
        try {
            let a = await this.mysqlService.execute(`
            SELECT bloodRequests.*, users.userName
            FROM bloodRequests
            JOIN users ON bloodRequests.reqestedUser = users.userID
            ORDER BY bloodRequests.requestedDate DESC
            `);
            if (a.length == 0)
                return new Auth_dto_1.SuccessResponse([]);
            let arr = a.map((e) => {
                let requestedDate = new Date(e.requestedDate);
                let isExpired = requestedDate < new Date();
                return {
                    ...e,
                    isExpired: isExpired
                };
            });
            return new Auth_dto_1.SuccessResponse(arr);
        }
        catch (error) {
        }
    }
    async getBloodBanks() {
        try {
            let a = await this.mysqlService.execute(`
            SELECT * FROM bloodbank
            `);
            return new Auth_dto_1.SuccessResponse(a);
        }
        catch (error) {
        }
    }
    async addBloodBank(dto, mode, bulkdto) {
        try {
            if (mode === 'single') {
                if (!dto.BankName || !dto.Contact || !dto.District || !dto.Location)
                    throw new common_1.BadRequestException("Invalid data");
                if (dto.Contact.length < 10 || dto.Contact.length > 10)
                    throw new common_1.BadRequestException("Invalid contact number");
                let a = await this.mysqlService.execute(`
                INSERT INTO bloodbank (bankName, bankLoaction, bankContact, bankDistrict) VALUES (?,?,?,?)
                `, [dto.BankName, dto.Location, dto.Contact, dto.District]);
                if (a.affectedRows == 0)
                    throw new common_1.BadRequestException("Failed to add blood bank");
                return new Auth_dto_1.SuccessResponse("Blood bank added successfully");
            }
            if (mode === "bulk") {
                if (bulkdto.length == 0)
                    throw new common_1.BadRequestException("Invalid data");
                bulkdto?.map(e => {
                    if (!e.BankName || !e.Contact || !e.District || !e.Location)
                        throw new common_1.BadRequestException("Invalid data");
                    if (e.Contact.length < 10)
                        throw new common_1.BadRequestException("Invalid contact number");
                });
                let successinserts = 0;
                let failedinserts = 0;
                for (let i = 0; i < bulkdto.length; i++) {
                    let e = bulkdto[i];
                    let a = await this.mysqlService.execute(`
                    INSERT INTO bloodbank (bankName, bankLoaction, bankContact, bankDistrict) VALUES (?,?,?,?)
                    `, [e.BankName, e.Location, e.Contact, e.District]);
                    if (a.affectedRows == 0)
                        failedinserts++;
                    else
                        successinserts++;
                }
                return new Auth_dto_1.SuccessResponse(`Bulk insert completed, ${successinserts} successfull, ${failedinserts} failed`);
            }
            throw new common_1.BadRequestException("Invalid mode");
        }
        catch (error) {
            if (error.code == "ER_DUP_ENTRY")
                throw new common_1.BadRequestException("Some data already exists in the database");
            throw error;
        }
    }
    async addCampaign(campaignDTO) {
        try {
            if (!campaignDTO.campaignID || !campaignDTO.campaignName || !campaignDTO.campaignOrganizer || !campaignDTO.campaignStartDate || !campaignDTO.campaignEndDate || !campaignDTO.description)
                throw new common_1.BadRequestException("Invalid data");
            if (campaignDTO.campaignStartDate > campaignDTO.campaignEndDate)
                throw new common_1.BadRequestException("Start date can't be greater than end date");
            let a = await this.mysqlService.execute(`
            INSERT INTO campaigns (campaignID, campaignName, campaignStartDate, campaignEndDate, campaignOrganizer, description, isFinished) VALUES (?,?,?,?,?,?,?)
            `, [campaignDTO.campaignID, campaignDTO.campaignName, campaignDTO.campaignStartDate, campaignDTO.campaignEndDate, campaignDTO.campaignOrganizer, campaignDTO.description, campaignDTO.isFinished]);
            if (a.affectedRows == 0)
                throw new common_1.BadRequestException("Failed to add campaign");
            return new Auth_dto_1.SuccessResponse("Campaign added successfully");
        }
        catch (error) {
            if (error.code == "ER_DUP_ENTRY")
                throw new common_1.BadRequestException("You can't create a campaign with the same ID or some data already exists in the database");
            throw error;
        }
    }
    async addPastCampaigns(campaignDTO) {
        try {
            if (!campaignDTO.campaignID || !campaignDTO.campaignName || !campaignDTO.campaignOrganizer || !campaignDTO.campaignStartDate || !campaignDTO.campaignEndDate || !campaignDTO.description)
                throw new common_1.BadRequestException("Invalid data");
            if (campaignDTO.campaignStartDate > new Date().toISOString())
                throw new common_1.BadRequestException("You can't create a campaign in the future");
            campaignDTO.doners.map(e => {
                if (!e.donerFullName || !e.donerLocation || !e.donerContact)
                    throw new common_1.BadRequestException("Invalid data in one of the doners");
                if (e.donerContact.length < 10)
                    throw new common_1.BadRequestException("Invalid contact number in one of the doners");
            });
            let a = await this.mysqlService.execute(`INSERT INTO campaigns (campaignID, campaignName, campaignStartDate, campaignEndDate, campaignOrganizer, description, isFinished) 
                VALUES (?,?,?,?,?,?,?)`, [
                campaignDTO.campaignID,
                campaignDTO.campaignName,
                campaignDTO.campaignStartDate,
                campaignDTO.campaignEndDate,
                campaignDTO.campaignOrganizer,
                campaignDTO.description,
                true
            ]);
            if (a.affectedRows == 0)
                throw new common_1.BadRequestException("Failed to add campaign");
            let successinserts = 0;
            let failedinserts = 0;
            if (a.affectedRows > 0) {
                for (let i = 0; i < campaignDTO.doners.length; i++) {
                    let e = campaignDTO.doners[i];
                    let p = await this.mysqlService.execute(`INSERT INTO campaignDoners ( donerFullName, donerLocation, donerContact, donerCampaignID) 
                        VALUES (?,?,?,?)`, [
                        e.donerFullName,
                        e.donerLocation,
                        e.donerContact,
                        campaignDTO.campaignID
                    ]);
                    if (p.affectedRows == 0)
                        failedinserts++;
                    else
                        successinserts++;
                    if (p.affectedRows == 0) {
                        await this.mysqlService.execute(`DELETE FROM campaigns WHERE campaignID = ?`, [campaignDTO.campaignID]);
                        throw new common_1.BadRequestException("Failed to add campaign");
                    }
                }
                return new Auth_dto_1.SuccessResponse(`Bulk insert completed, ${successinserts} successfull, ${failedinserts} failed`);
            }
            else {
                throw new common_1.BadRequestException("Failed to add campaign");
            }
        }
        catch (error) {
            if (error.code == "ER_DUP_ENTRY")
                throw new common_1.BadRequestException("Some data already exists in the database");
            throw error;
        }
    }
    async getAllCampaigns() {
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
            if (a.length == 0)
                return new Auth_dto_1.SuccessResponse([], "No data");
            return new Auth_dto_1.SuccessResponse(a);
        }
        catch (error) {
            throw error;
        }
    }
    async getAmbulances() {
        try {
            let a = await this.mysqlService.execute(`
            SELECT * FROM ambulances
            `);
            return new Auth_dto_1.SuccessResponse(a);
        }
        catch (error) {
            throw error;
        }
    }
    async addAmbulance(ambulanceDTO) {
        try {
            if (!ambulanceDTO.ambulanceProvider || !ambulanceDTO.ambulanceLocation || !ambulanceDTO.ambulanceContact || !ambulanceDTO.ambulanceDistrict)
                throw new common_1.BadRequestException("Invalid data");
            let a = await this.mysqlService.execute(`
            INSERT INTO ambulances (ambulanceProvider, ambulanceLocation, ambulanceContact,ambulanceDistrict) VALUES (?,?,?,?)
            `, [ambulanceDTO.ambulanceProvider, ambulanceDTO.ambulanceLocation, ambulanceDTO.ambulanceContact, ambulanceDTO.ambulanceDistrict]);
            if (a.affectedRows == 0)
                throw new common_1.BadRequestException("Failed to add ambulance");
            return new Auth_dto_1.SuccessResponse("Ambulance added successfully");
        }
        catch (error) {
            if (error.code == "ER_DUP_ENTRY")
                throw new common_1.BadRequestException("Some data already exists in the database");
            throw error;
        }
    }
    async deleteAmbulance(id) {
        try {
            let a = await this.mysqlService.execute(`
            DELETE FROM ambulances WHERE ambulanceID = ?
            `, [id]);
            if (a.affectedRows == 0)
                throw new common_1.BadRequestException("Failed to delete ambulance");
            return new Auth_dto_1.SuccessResponse("Ambulance deleted successfully");
        }
        catch (error) {
            throw error;
        }
    }
};
exports.AdminService = AdminService;
exports.AdminService = AdminService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [mysq_service_1.MysqlPoolService])
], AdminService);
//# sourceMappingURL=Admin.service.js.map