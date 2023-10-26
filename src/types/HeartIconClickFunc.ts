import {  AddPetToFavorite, RemovePetFromFavorite } from '../Service/PetServices';
import { PetObjTYpe } from './PetObjType';


export const onHeartClick = (PetObj : PetObjTYpe, userId : string, refetch : () => {} ) => {

    console.log('On HeartClick call ** ');
    
    if(PetObj?.isFavorite){
        
        RemovePetFromFavorite(PetObj?.id!, userId,"")
        .then(res => {
            refetch()

        })
        .catch(err => {

        })

    }else{
        AddPetToFavorite(PetObj?.id!, userId,"")
        .then(res => {
            refetch()
        })
        .catch(err => {
            
        })

    }
}