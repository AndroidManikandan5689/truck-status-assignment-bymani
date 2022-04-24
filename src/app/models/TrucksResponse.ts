//https://qa2.gim.com.bd/ejogajogAdminAPI/api/v1/admin/master/truckstands
//Truckstand api Data Model
export class TrucksResponse{
    data:         Trucks[];
    success:      boolean;
    message:      any;
    errorCode:    null;
    responseCode: number;
    debugMessage: null;
}

export interface Trucks {
    id:          number;
    name:        string;
    nameBn:      null | string;
    latitude:    number | null;
    longitude:   number | null;
    truckCounts: TruckCount[];
}

export interface TruckCount {
    truckType: TruckType;
    count:     number;
}

export enum TruckType {
    ConcreteMixer = "Concrete Mixer",
    CoveredTruck = "Covered Truck",
    DumpTruckTipper = "Dump Truck/Tipper",
    OpenCoveredTruck = "Open/Covered truck",
    OpenTruck = "Open Truck",
    PetroleumTanker = "Petroleum Tanker",
    RefrigeratedVan = "Refrigerated Van",
    SpecialPurposeVehicle = "Special Purpose Vehicle",
    Trailer = "Trailer",
}