import React, { useEffect, useState } from 'react'

import PakCitiesList from '../../Assets/data/Pakcities.json'
import Select from 'react-select'

type CitySelectPropsType = {
    showLabel: boolean,
    showCityErrorMsg: boolean,
    selectedOption: { label: string, value: string }
    selectControlClassName: string
    handleChange: (selectedOption: any) => void

}

const CitySelectComponent = (props: CitySelectPropsType) => {

    const [citiesOptions, setCitiesOptions] = useState<{ label: string, value: string }[]>([])




    useEffect(() => {
        PakCitiesList.map((city, index) => {

            setCitiesOptions(prevState => [...prevState, { label: `${city.name}`, value: `${city.name}` }]);
        })

    }, [])

    return (
        <>

            {props.showLabel &&
                <label className={`h6 ${props.showCityErrorMsg ? 'text-danger' : ''}`}>Select City </label>
            }
            <Select
                // className=''
                value={props.selectedOption}
                onChange={props.handleChange}
                options={citiesOptions}
                className={props.selectControlClassName}
                placeholder="Search City..."

            // isDisabled={!isAddMode}
            />
            {props.showCityErrorMsg ? (
                <div className='p-1  text-danger'>{'Required'}</div>
            ) : ''}




        </>
    )
}

export default CitySelectComponent