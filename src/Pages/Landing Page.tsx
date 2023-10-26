import React, { Fragment, useEffect, useState, FormEvent, MouseEventHandler, Suspense, lazy, useRef } from "react";
import FormikControl from '../Components/ReusableFormikComponents/FormikControl'
import { Link, useNavigate } from "react-router-dom";
import new_parrot from "../Assets/Images/new-parrot.jpg";
import stat1 from "../Assets/Images/stat1.png";
import stat2 from "../Assets/Images/stat2.png";
import stat3 from "../Assets/Images/stat3.png";
import { Form as BSForm, Button, Modal, Spinner } from "react-bootstrap";
import NewPet from "../Components/widgets/PetCard";
import FeaturedPetsCarousol from "../Components/widgets/FeaturedPetsCarousol";
import { PetObjTYpe } from "../types/PetObjType";
import {  GetFeaturedPets, GetNewPets } from "../Service/PetServices";
// import EnquiryForm from "../Components/EnquiryForm";
import { useQuery } from 'react-query'
import { AxiosResponse } from "axios";
import PetCard from "../Components/widgets/PetCard";
import FeaturedPetsComponent from "../Components/widgets/FeaturedPetsComponent";
import { useAuth } from "../Contexts/AuthContext";
import PetBreedAndBreedSelects from '../Components/widgets/TypeAndBreedSelectComponent/PetTypeAndBreedSelects'
import CitySelectComponent from "../Components/widgets/CitySelectComponent";




const LandingPage = () => {


    const { UserToken, setUserToken } = useAuth()

    const navigate = useNavigate()


    // const div1Ref = useRef<HTMLDivElement>(null)


    // useEffect(() => {
    //     const observer = new IntersectionObserver((entries, observer) => {
    //         const entry = entries[0];
    //         // console.log('entry', entry);
    //         console.log('entry.isIntersecting', entry.isIntersecting);

    //         if (!!entry.isIntersecting) {
    //             console.log('Fetch data ** ');
    //             setLoadNewPets(true)

    //         }
    //     });

    //     observer.observe(div1Ref.current!);



    // }, []);





    const [petTypeId, setpetTypeId] = useState(0)
    const [petBreedId, setpetBreedId] = useState(0)
    const [city, SetCity] = useState("")



    const [selectedOption, setselectedOption] = useState(null)

    const handleChange = (selectedOption: any) => {


        setselectedOption(selectedOption)
        SetCity(selectedOption.value)
    }


    const onPetTypeChange = (event: React.ChangeEvent<HTMLSelectElement>) => {

        console.log('event.target : ',event.target.selectedOptions[0].text);
        

        if (event.target.value !== 'select') {

            setpetTypeId(parseInt(event.target.value))

        } else
            setpetTypeId(0)


    }

    const onPetBreedChange = (event: React.ChangeEvent<HTMLSelectElement>) => {

        if (event.target.value !== 'select') {

            setpetBreedId(parseInt(event.target.value));

        }
        else
            setpetBreedId(0)

    }





    const {
        isLoading: NewPetsLoading,
        data: NewPets,
        isError: isNewPetsError,
        error: NewPetsError,
        refetch: refetchNewPets,
        isRefetching: isRefetchingNewPets
    }
        = useQuery('NewPets', () => {
            return GetNewPets(UserToken.userId)
        },
            {
                // enabled: !!UserToken.UserDetailsId,
                refetchOnMount: false,
                refetchOnWindowFocus: false,
                staleTime: 30000,
                // refetchInterval : 
                // retry: false,
                onSuccess: (res) => {
                    // console.log('Success of AllPets :  ', res);

                },
                onError: (err) => {
                    // let Obj /* : ErrorResponseModel */ = err;
                }

            }
        )













    return (
        <Fragment>

            {/* <!-- Banner Sec --> */}

            <div className="banner">
                <div className="container">
                    <div className="row">
                        <div className="col-12 col-md-6">
                            <h1>The best way to find your pets</h1>
                        </div>
                    </div>
                </div>
            </div>


            <div className="container">
                <div className="search-bar">
                    <div className="row">

                        <div className="col-12 col-md-6 col-lg-3">
                            <CitySelectComponent

                                showLabel={false}

                                showCityErrorMsg={false}
                                selectedOption={selectedOption!}
                                handleChange={handleChange}
                                selectControlClassName='mb-3'
                            />


                        </div>

                        <PetBreedAndBreedSelects
                            petTypeId={petTypeId}
                            petTypeChange={onPetTypeChange}
                            petBreedId={petBreedId}
                            petBreedChange={onPetBreedChange}
                            className=''
                            petTypeClassName='col-12 col-md-6 col-lg-3'
                            petBreedClassName='col-12 col-md-6 col-lg-3'

                        />




                        <div className="col-12 col-md-6 col-lg-3">
                            <button type="button" className="rounded"
                                onClick={() =>
                                    navigate(`/pet-search?city=${city}&petTypeId=${petTypeId}&petBreedId=${petBreedId}`)
                                }
                            >

                                SEARCH</button>
                            <span><a href="#">Advance</a></span>
                        </div>
                    </div>
                </div>
            </div>
            {/* <!-- End Banner Sec --> */}

            {/* <!-- New pet sec --> */}

            <div className="container"
            // ref={div1Ref}

            >
                <div className="newpet-sec">
                    <h1> NEWLY ADDED PET</h1>
                    <p>
                        With ove 10,0000 active listing, We have great largest inventory
                    </p>

                    <div className="card-sec">
                        <div className="row">



                            {NewPets?.data!.map((petItem, index) =>
                            (
                                <div className="col-12 col-lg-4" key={index}>

                                    <PetCard PetObj={petItem}
                                        refetch={refetchNewPets}


                                    // onClick={() => onHeartClick(petItem,UserToken.userId, refetchNewPets)}
                                    />

                                </div>
                            )
                            )}
                        </div>
                    </div>
                </div>
            </div>


            {/* <!-- End new pet section --> */}

            {/* <!-- Stats Sec --> */}
            <div className="stats">
                <div className="container">
                    <div className="row">
                        <div className="col-6 col-lg-3">
                            <img src={stat1} />
                            <h3>385K</h3>
                            <p>Post Submitted</p>
                        </div>
                        <div className="col-6 col-lg-3">
                            <img src={stat2} />
                            <h3>12</h3>
                            <p>Professional Agents</p>
                        </div>
                        <div className="col-6 col-lg-3">
                            <img src={stat1} />
                            <h3>235K</h3>
                            <p>Sucess Stories</p>
                        </div>
                        <div className="col-6 col-lg-3">
                            <img src={stat3} />
                            <h3>496K</h3>
                            <p>Happy Customers</p>
                        </div>
                    </div>
                </div>
            </div>

            {/* <!-- End Stat Section --> */}

            {/* <!-- Collage section --> */}
            <div className="collage-sec">
                <h1>BUY PET FOOD AND ACCESORIES</h1>
                <div className="container">
                    <div className="row">
                        <div className="col-12 col-md-4">
                            <div className="img-full">
                                <img src={new_parrot} />
                                <h3>PET FOOD</h3>
                            </div>
                        </div>
                        <div className="col-12 col-md-4 multi-img">
                            <div className="img-half">
                                <img src={new_parrot} />
                                <h3>PET ACCESORIES</h3>
                            </div>
                            <div className="img-half">
                                <img src={new_parrot} />
                                <h3>PET CLINIC</h3>
                            </div>
                        </div>
                        <div className="col-12 col-md-4">
                            <div className="img-full">
                                <img src={new_parrot} />
                                <h3>EXPLORE PETS</h3>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            {/* <!-- End Colage Section --> */}

            {/* <!-- Featured Section --> */}
            <FeaturedPetsComponent />




        </Fragment >


    );
}

export default LandingPage;