export interface Accommodation{
  //dodati posle ostalo
    id: number,
    description : string,
    minPeople : number,
    maxPeople : number
    status: AccommodationStatus,
    ownerId: number
}


export enum AccommodationStatus {
    CREATED,
    EDITED,
    REJECTED,
    APPROVED
}
