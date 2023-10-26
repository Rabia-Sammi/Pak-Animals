export interface PetDetailsTYpe {
    id: number,
    nickName: string,
    petFor: string,
    price: number,
    gender: string,
    isFavorite : boolean,
    color: string,
    productNumber : number,
    age: string,
    group: string,
    trainingLevel: string,
    energyLevel: string,
    groomingLevel: string,
    details: string,
    files: [string],
    petTypeId: number,
    petTypeName: string,
    petBreedName: string,
    petBreedId: number,
    tempramentFeatures: [string],
    compatibilityFeatures: [string],
    specialFeatures: [
        {
            item1: string,
            item2: true
        }
    ],
    city: string,
    phone: string,
    ownerName: string,
    isFeatured: boolean,
    videoURL: string,
    updatedStatus: string,
    ownerId: string
}