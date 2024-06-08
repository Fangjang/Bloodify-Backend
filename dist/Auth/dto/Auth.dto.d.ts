export declare class SuccessResponse {
    constructor(data?: any, message?: string);
    data?: any;
    statusCode?: number;
    message?: string;
}
export interface LoginDTO {
    username: string;
    password: string;
}
export interface CreateUserDTO {
    userName: string;
    fullName: string;
    phone: string;
    district: string | any;
    fullAddress: string;
    bloodType: string;
    password: string;
}
export interface AddBloodBankDTO {
    BankName: string;
    Location: string;
    Contact: string;
    District: string;
}
export interface AddBulkBloodDTO {
    BankName: string;
    Location: string;
    Contact: string;
    District: string;
}
export interface AddCampaignDTO {
    campaignID: string;
    campaignName: string;
    campaignStartDate: string;
    campaignEndDate: string;
    campaignOrganizer: string;
    description: string;
    isFinished: boolean;
    doners?: [
        {
            donerID: string;
            donerFullName: string;
            donerLocation: string;
            donerContact: string;
            donerCampaignID: string;
        }
    ];
}
export interface AddAmbulanceDTO {
    ambulanceProvider: string;
    ambulanceLocation: string;
    ambulanceContact: string;
    ambulanceDistrict: string;
}
