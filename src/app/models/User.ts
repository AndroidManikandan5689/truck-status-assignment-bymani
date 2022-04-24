//https://qa2.gim.com.bd/ejogajog/api/v1/auth/adminLogIn
//Truckstand api Data Model
export class User{
    data:         Data;
    success:      boolean;
    message:      string;
    errorCode:    null;
    responseCode: number;
}

export interface Data {
    name:                     null;
    pic:                      null;
    userRoles:                UserRole[];
    email:                    string;
    token:                    string;
    twoStep:                  boolean;
    roleId:                   number;
    logInAs:                  string;
    roleStatus:               number;
    otpVerified:              boolean;
    driver:                   boolean;
    passwordChangeNeeded:     boolean;
    invoiceActivated:         boolean;
    dob:                      null;
    nationalId:               null;
    nationalIdBackPhoto:      string;
    nationalIdFrontPhoto:     string;
    driverBackPhoto:          null;
    driverFrontPhoto:         null;
    driverLicenseNumber:      null;
    driverLicenseExpiryDate:  null;
    location:                 null;
    lastModified:             number;
    smartphoneStatus:         number;
    popUp:                    boolean;
    partnerAndDriver:         boolean;
    bkashNumber:              null;
    registrationPoint:        null;
    driverRegistrationPoint:  null;
    fleetOwnerDetails:        null;
    fleetOwnerModelList:      null;
    mobileNumber:             null;
    district:                 null;
    active:                   boolean;
    createdOn:                null;
    modifiedOn:               null;
    referrelCode:             null;
    agent:                    boolean;
    enterpriseAdmin:          boolean;
    driverCount:              number;
    truckCount:               number;
    tradeLicenseExpiryDate:   null;
    distributorCompanyName:   null;
    passportNumber:           null;
    passportImage:            null;
    trackerAccess:            boolean;
    otpAttemptsRemaining:     null;
    registrationStatus:       string;
    id:                       number;
    smartphonePromptRequired: boolean;
    approvedDistributor:      boolean;
    agentActive:              boolean;
}

export interface UserRole {
    name:              string;
    enterprise:        boolean;
    applicationStatus: string;
    enterpriseStatus:  null;
    tripInfo:          null;
    adminType:         null;
    id:                number;
}