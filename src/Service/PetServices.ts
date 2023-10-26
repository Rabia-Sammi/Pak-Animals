
import axios from 'axios'
import { PetObjTYpe } from '../types/PetObjType';
import { PetDetailsTYpe } from '../types/PetDetailsType';
import { PetAndBreedCategoryType } from '../types/PetAndBreedCategoryType';
import { PetsListingType } from '../types/PetsListingType';

// export const API_URL = process.env.API_KEY || 'api'
export const API_URL = `https://pakanimals-api.ps-beta.com`


export const Pet_URL = `${API_URL}/api/Pet`


export function GetNewPets(UserId : string) {
  return axios.get<PetObjTYpe[]>(`${Pet_URL}/NewPets?UserId=${UserId}`);
}

export function GetAllPets(
  City : string,
  SearchTerm: string,
  SortBy: string,
  PetTypeId: number,
  PetBreedId: number,
  PriceRange: number,
  MinPriceRange: number,
  MaxPriceRange: number,
  pageNumber: number,
  pageSize: number,
  UserId : string
  ) {
  return axios.get<PetsListingType>
    (`${Pet_URL}?City=${City}&SearchTerm=${SearchTerm}&SortBy=${SortBy}&PetTypeId=${PetTypeId}&PetBreedId=${PetBreedId}&PriceRange=${PriceRange}&MinPriceRange=${MinPriceRange}&MaxPriceRange=${MaxPriceRange}&pageNumber=${pageNumber}&pageSize=${pageSize}&UserId=${UserId}`

    );
}

// }?hotelId=${HotelId}&Month=${month}&Year=${year}&pageNumber=${pageNumber}&pageSize=${pageSize}

export function GetFeaturedPets() {
  return axios.get<PetObjTYpe[]>(`${Pet_URL}/FeaturedPets`);
}


export function GetRelatedPets(petTypeId: number,UserId : string) {
  return axios.get<PetObjTYpe[]>(`${Pet_URL}/RelatedPets/${petTypeId}?UserId=${UserId}`);
}


export function GetPetById(id: number) {

  return axios.get(`${Pet_URL}/${id}`);
}

export function GetPetDetailsByName(name: string,UserId : string) {

  return axios.get<PetDetailsTYpe>(`${Pet_URL}/PetDetails/${name}?UserId=${UserId}`);
}


export function PostPet(model: any, accessToken: string) {
  console.log('model values in PostLinen -- ', model);
  return axios.post(`${Pet_URL}`,
    model, {
    headers: {
      'Authorization': 'Bearer ' + accessToken
    }
  }
  );
}



export function UpdatePet(id: number, model: any, accessToken: string) {
  model.id = id;
  return axios.put(`${Pet_URL}/${id}`, model, {
    headers: {
      'Authorization': 'Bearer ' + accessToken
    }
  });
}

export function DeletePet(id: number, accessToken: string) {
  return axios.delete(`${Pet_URL}/${id}`, {
    headers: {
      'Authorization': 'Bearer ' + accessToken
    }
  });
}




const PetType_URL = `${API_URL}/api/PetType`

export function GetPetTypes() {
  return axios.get<PetAndBreedCategoryType[]>(`${PetType_URL}`);
}


const PetBreed_URL = `${API_URL}/api/PetBreed`

export function GetBreedsByPetId(id: any) {
  return axios.get<PetAndBreedCategoryType[]>(`${PetBreed_URL}/GetBreedsByPetId/${id}`);
}



export function AddPetToFavorite(petId: number, loggedInUserId: string, accessToken: string) {

  return axios.post(`${Pet_URL}/AddToFavorite?id=${petId}&UserId=${loggedInUserId}`,
    {
      headers: {
        'Authorization': 'Bearer ' + accessToken
      }
    }
  );
}


export function RemovePetFromFavorite(petId: number, loggedInUserId: string, accessToken: string) {

  return axios.post(`${Pet_URL}/RemoveFromFavorite?id=${petId}&UserId=${loggedInUserId}`,
    {
      headers: {
        'Authorization': 'Bearer ' + accessToken
      }
    }
  );
}
