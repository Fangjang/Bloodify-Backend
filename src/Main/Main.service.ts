import { BadRequestException, Injectable } from "@nestjs/common";
import { MysqlPoolService } from "src/Utils/mysq.service";
import { reqDTO, RequestBloodDTO, SearchBloodDTO } from "./dto/Main.dto";
import { SuccessResponse } from "src/Auth/dto/Auth.dto";

@Injectable()
export class MainService {

    constructor(
        private readonly mysqlService: MysqlPoolService
    ) { }


    async RequestBlood(
        rb: RequestBloodDTO,
        req: reqDTO
    ): Promise<SuccessResponse | BadRequestException> {
        try {
            if (!rb.patientName || !rb.bloodGroup || !rb.District || !rb.Hospital || !rb.contactNumber || !rb.details) {
                throw new BadRequestException("Please provide all the required fields")
            }
            if (rb.details.length < 5) throw new BadRequestException("Details must be at least 5 characters long")
            if (rb.details.length > 500) throw new BadRequestException("Details must be at most 500 characters long")

            if (rb.patientName.length < 3) throw new BadRequestException("Patient name must be at least 3 characters long")
            if (rb.patientName.length > 100) throw new BadRequestException("Patient name must be at most 100 characters long")

            await this.mysqlService.execute(`
            INSERT INTO bloodRequests (patientName, bloodGroup, District, Hospital, contactNumber, details, reqestedUser,requestedDate)
            VALUES (?, ?, ?, ?, ?, ?, ?,?)
            `, [rb.patientName, rb.bloodGroup, rb.District, rb.Hospital, rb.contactNumber, rb.details, req.id, rb.requestedDate]
            ).catch((error) => {
                throw error
            })
            return new SuccessResponse("Request created successfully")
        } catch (error) {
            throw error
        }
    }

    async getBloodRequests(): Promise<SuccessResponse | BadRequestException> {
        try {
            // sort by requested date
            const requests = await this.mysqlService.execute(`
            SELECT patientName, bloodGroup, District, Hospital, contactNumber, details,requestedDate ,reqID
            FROM bloodRequests
            ORDER BY requestedDate ASC
        `).catch((error) => {
                throw error
            })
            return new SuccessResponse(requests, "Requests fetched successfully")
        } catch (error) {
            throw error
        }
    }

    async SearchBlood(
        sb: SearchBloodDTO,
        req: reqDTO
    ): Promise<SuccessResponse | BadRequestException> {
        try {
            if (!sb.bloodType || !sb.district) {
                throw new BadRequestException("Please provide all the required fields")
            }

            const requests = await this.mysqlService.execute(`
            SELECT fullName, phone,bloodType, district, fullAddress
            FROM users
            WHERE bloodType = ? AND district = ? AND userName !=  ?
            `, [sb.bloodType, sb.district, req.userName])

            if (requests.length === 0) throw new BadRequestException("No donors found")
            return new SuccessResponse(requests, "Donors fetched successfully")
        } catch (error) {
            throw error
        }
    }

    async SearchAmbulance(
        sa: { district: string }
    ): Promise<SuccessResponse | BadRequestException> {
        try {
            if (!sa.district) {
                throw new BadRequestException("Please provide all the required fields")
            }
            let a = await this.mysqlService.execute(`
            SELECT * from ambulances
            WHERE ambulanceDistrict = ?
            `, [sa.district])
            if (a.length === 0) throw new BadRequestException("No ambulances found")
            return new SuccessResponse(a, "Ambulances fetched successfully")

        } catch (error) {
            throw error
        }
    }

    async SearchBloodBank(
        sbb: { district: string }
    ): Promise<SuccessResponse | BadRequestException> {
        try {
            if (!sbb.district) {
                throw new BadRequestException("Please provide all the required fields")
            }
            let a = await this.mysqlService.execute(`
            SELECT * from bloodbank
            WHERE bankDistrict = ?
            `, [sbb.district])
            if (a.length === 0) throw new BadRequestException("No blood banks found")
            return new SuccessResponse(a, "Blood banks fetched successfully")

        } catch (error) {
            throw error
        }
    }

    async getCampaigns(): Promise<SuccessResponse | BadRequestException> {
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
            `)
            if (a.length === 0) throw new BadRequestException("No campaigns found")
            return new SuccessResponse(a, "Campaigns fetched successfully")

        } catch (error) {
            throw error
        }
    }


}