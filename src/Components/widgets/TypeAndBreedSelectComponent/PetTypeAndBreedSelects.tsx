import React, { useEffect, useState } from 'react'
import { GetBreedsByPetId, GetPetTypes } from '../../../Service/PetServices';

type PetTypeAndBreedTypes = {
    petTypeId: number,
    petTypeChange: (event: React.ChangeEvent<HTMLSelectElement>) => void
    petBreedId: number,
    petBreedChange: (event: React.ChangeEvent<HTMLSelectElement>) => void
    className: string
    petTypeClassName: string
    petBreedClassName: string
}

const PetBreedAndBreedSelects = (props: PetTypeAndBreedTypes) => {

    const [petTypesOptions, setPetTypesOptions] = useState([{ key: 'Select Type', value: 'select' }])

    const [petBreedsOptions, setPetBreedsOptions] = useState([{ key: 'Select Breed', value: 'select' }])



    const GetPetBreedsById = async (PetId: any) => {

        setPetBreedsOptions([{ key: 'Select Breed', value: 'select' }]);

        if (PetId !== 'select') {

            await GetBreedsByPetId(PetId)
                .then(res => {
                    res.data.map(breed => {
                        // if(petBreedsOptions.find(a => a.key == breed.name) == undefined)
                        setPetBreedsOptions(oldValues => [...oldValues.filter(a => a.key !== breed.name), { key: breed.name, value: breed.id.toString() }])
                    })
                })
        }
    }

    useEffect(() => {
        GetPetBreedsById(props.petTypeId);

    }, [props.petTypeId])


    useEffect(() => {

        (async () => {

            await GetPetTypes()
                .then(res => {
                    res.data.map(petType => {
                        setPetTypesOptions(oldValues => [...oldValues.filter(a => a.key !== petType.name), { key: petType.name, value: petType.id.toString() }])
                    })
                })
                .catch(err => {
                    console.log('err from GetPet Types ', err);
                })


        })()

    }, [])




    return (
        <>
            <div className={props.petTypeClassName}>
                <select name="type" id="ptype" className="form-select"
                    value={props.petTypeId}
                    onChange={props.petTypeChange}

                >
                    {petTypesOptions.map((type) =>
                        <option
                            value={type.value}
                        >
                            {type.key}
                        </option>)}

                </select>
            </div>

            <div className={props.petBreedClassName}>

                <select name="category" id="pcategory" className="form-select"
                    value={props.petBreedId}
                    onChange={props.petBreedChange}
                >
                    {petBreedsOptions.map((type) =>
                        <option
                            value={type.value}
                        >
                            {type.key}
                        </option>
                    )}
                </select>


            </div>
        </>
    )
}

export default PetBreedAndBreedSelects