export interface RequestBloodDTO {
    patientName: string;
    bloodGroup: string;
    District: string;
    Hospital: string;
    contactNumber: string;
    reqestedUser: string;
    requestedDate: string;
    details: string;
}

export interface SearchBloodDTO {
    district: string;
    bloodType: string;
}

export interface reqDTO {
    id,
    userName,
    role

}
