import React, { useEffect, useState } from 'react'
import kitty1 from "../Assets/Images/kitty1.jpg";
import kitty2 from "../Assets/Images/kitty2.jpg";
import kitty3 from "../Assets/Images/kitty3.jpg";
import p1 from "../Assets/Images/p1.jpg";
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from 'react-responsive-carousel';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faClock, faDroplet, faCircleCheck, faGreaterThan, faLessThan, faLocationDot, faPhone, faShieldDog, faTag, faVenusMars, faShareNodes, faPrint, faArrowRightArrowLeft, faHeart } from '@fortawesome/free-solid-svg-icons';
import { faWhatsapp } from '@fortawesome/free-brands-svg-icons';
import { PetDetailsTYpe } from '../types/PetDetailsType';
import { string } from 'yup';
import { Link, useParams, useNavigate, useLocation } from 'react-router-dom';
import { useQuery } from 'react-query';
import { API_URL, AddPetToFavorite, GetPetDetailsByName, GetRelatedPets, RemovePetFromFavorite } from '../Service/PetServices';
import GridListing from '../Components/widgets/GridListing';
import { faCircleXmark } from '@fortawesome/free-regular-svg-icons';
import FeaturedPetsComponent from '../Components/widgets/FeaturedPetsComponent';
import SocailShare from '../Components/widgets/socailShare';
import { useAuth } from '../Contexts/AuthContext';
import { PostMessage } from '../Service/MessagesServices';
import { onHeartClick } from '../types/HeartIconClickFunc';
// import { onHeartClick } from './Landing Page';

const ItemDetails = () => {

    const location = useLocation()

    const urlParams = new URLSearchParams(location.search)





    const { UserToken, setUserToken } = useAuth()

    console.log('UserToken : in details ', UserToken);
    
    const { name } = useParams<{ name: string }>()

    const navigate = useNavigate()


    const { isLoading, data: PetObj, isError, error, refetch }
        = useQuery(['pet-object', name], () => GetPetDetailsByName(name!, UserToken.userId), {
            //   initialData: () => {
            //     // var featureItem =
            //     //   queryClient
            //     //     .getQueriesData('orders-list')
            //     //     ?.data?.find((obj) => obj.id === parseInt(route.params?.orderId))


            //     // if (featureItem) {
            //     //   return {
            //     //     data: featureItem
            //     //   }
            //     // }
            //     // else {
            //     //   return undefined
            //     // }

            //   },
            // refetchOnMount: true,
            // refetchOnWindowFocus: true,

            // refetchOnReconnect : false,
            enabled: !!name,
            refetchOnWindowFocus: false,
            refetchOnMount: true,

            onSuccess: (res) => {

                console.log('res.data in Details : ', res.data);

                //  FruitObj?.data.fileNames.push(FruitObj?.data.imageURL)


                //      
            }
        })


    const { isLoading: isLoadingRelatedPet, data: RelatedPetObj, isError: isRelatedPetError, error: RelatedPetError }
        = useQuery(['RelatedPets', name], () => GetRelatedPets(PetObj?.data!.petTypeId!,UserToken.userId), {
            enabled: !!PetObj?.data!.petTypeId,
            refetchOnWindowFocus: false,
            refetchOnMount: true,
            onSuccess: (res) => {
                console.log('res.data in RelatedPets : ', res.data);
            }
        })


    const [loading, setLoading] = useState(false)
    const [hasErrors, setHasErrors] = useState('')

    const [message, setMessage] = useState("")

    const [messageError, setMessageError] = useState(false)

    useEffect(() => {
        if (!!location.search) {
            let Msg = urlParams.get("MsgTxt")
            console.log("Msg : ',' ", Msg);
            console.log("Msg :  ", !!Msg);

            if (!!Msg) {
                setMessage(Msg)
            }


        }

    }, [location.search])


    const onMessageSubmit = () => {



        if (!message)
            setMessageError(true)
        else {


            if (!UserToken.email)
                navigate(`/login?returnUri=/details/${PetObj?.data.nickName!}&&MsgTxt=${message}`)
            else {

                setMessageError(false)
                setLoading(true)



                var model = {
                    fromUserId: UserToken.userId,
                    toUserId: PetObj?.data.ownerId!,
                    messageText: message!
                }

                console.log('model : ', model);


                PostMessage(model!, UserToken.token).then(
                    () => {
                        setLoading(false)
                        setMessage("")
                    })
                    .catch((error) => {
                        setLoading(false)

                        let Obj = error.toJSON();
                        console.log('1111111');
                        console.log('Obj', Obj);
                        if (Obj.message === 'Network Error') {

                            var msg = 'API Server is down....';
                            setHasErrors(msg);
                            //toast.error(msg, { position: //toast.POSITION.BOTTOM_RIGHT });

                        }
                        else {
                            let obj2 = JSON.parse(Obj.message);
                            console.log('obj2 : ', obj2);

                            setHasErrors(obj2.ErrorMessage);
                            //toast.error(obj2.ErrorMessage, { position: //toast.POSITION.BOTTOM_RIGHT });

                        }

                    })

            }
        }

    }


    





    return (
        <section id="main">
            <div className="container">
                <div className="breadcrums">
                    <ul>
                        <li><a href="/">Home </a> <span></span></li>
                        <li><a href="#"> Pets </a><span></span></li>
                        <li><a href="#"> Persian Kitten Pair</a></li>
                    </ul>
                </div>

                {/* <!-- Product Detail --> */}
                <div className="product-detail">
                    <div className="heading-sec">
                        <div className="row">
                            <div className="col-12 col-lg-6">
                                <h1>{PetObj?.data!.nickName}</h1>
                                <div className="loc">
                                    <span>
                                        {/* <i className="fa-solid fa-location-dot"></i> */}
                                        <FontAwesomeIcon icon={faLocationDot}
                                            className='text-secondary-light mx-1'
                                        />
                                        {PetObj?.data!.city}
                                    </span>
                                    <span>/</span>
                                    <span>
                                        {/* <i className="fa-regular fa-clock"></i> */}
                                        <FontAwesomeIcon icon={faClock}
                                            className='text-secondary-light mx-1'
                                        />
                                        Last Upated Mar 16, 2023</span>
                                </div>
                            </div>
                            <div className="col-12 col-lg-6 price-sec">
                                <h3>PKR {PetObj?.data!.price}</h3>

                                <ul className="page-header icons">
                                    <li className='social-share'>
                                        <SocailShare uri={`${API_URL}/details/${encodeURI(PetObj?.data.nickName!)}`} />
                                    </li>
                                    {!!UserToken.email &&
                                        <li><FontAwesomeIcon 
                                        className={`${PetObj?.data!.isFavorite ? 'svg-heart' : 'svg'}`}
                                           
                                        icon={faHeart} onClick={() => 
                                            onHeartClick(PetObj?.data!,UserToken.userId, refetch)} /></li>
                                    }
                                    <li><FontAwesomeIcon className='svg' icon={faPrint} /></li>

                                </ul>

                            </div>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-12 col-lg-8">

                            <Carousel showIndicators={false}
                                showStatus={false}
                                infiniteLoop={true}
                                autoPlay={true}
                                autoFocus={true}


                                renderArrowPrev={(onClickHandler, hasPrev, label) =>
                                    // hasPrev && (
                                    <button type="button" onClick={onClickHandler} title={label} style={{ left: 15 }} className='control-arrow'>
                                        <FontAwesomeIcon icon={faLessThan} size='2xs' />
                                    </button>
                                    // )
                                }
                                renderArrowNext={(onClickHandler, hasNext, label) =>
                                    // hasNext && (
                                    <button type="button" onClick={onClickHandler} title={label} style={{ right: 15 }} className='control-arrow'>
                                        <FontAwesomeIcon icon={faGreaterThan} size='2xs' />

                                    </button>
                                    // )
                                }>

                                {PetObj?.data!.files.map(file => (
                                    <div className="prod-slider-item">
                                        <img src={`${API_URL}/${file}`} alt="" />
                                    </div>

                                ))
                                }
                                {/* <div className="prod-slider-item">
                                    <img src={kitty2} alt="" />
                                </div>
                                <div className="prod-slider-item">
                                    <img src={kitty3} alt="" />
                                </div>
                                <div className="prod-slider-item">
                                    <img src={kitty1} alt="" />
                                </div>
                                <div className="prod-slider-item">
                                    <img src={kitty2} alt="" />
                                </div> */}

                            </Carousel>

                            {/* <!-- OverView Sec --> */}
                            <div className="overview-sec">
                                <div className="content">
                                    <h3>Overview</h3>
                                    <div className="prop">
                                        <ul>
                                            <li>
                                                <div className="prop-icon">
                                                    <i>
                                                        <FontAwesomeIcon
                                                            icon={faTag}
                                                        />
                                                    </i>

                                                </div>
                                                <div className="prop-content">
                                                    <p>ID No</p>
                                                    <p>{PetObj?.data!.productNumber}</p>
                                                </div>
                                            </li>
                                            <li>
                                                <div className="prop-icon">
                                                    <i>
                                                        <FontAwesomeIcon
                                                            icon={faShieldDog}
                                                        />
                                                    </i>
                                                </div>
                                                <div className="prop-content">
                                                    <p>Breed</p>
                                                    <p>{PetObj?.data!.petBreedName}</p>
                                                </div>
                                            </li>
                                            <li>
                                                <div className="prop-icon">
                                                    <i>
                                                        <FontAwesomeIcon
                                                            icon={faVenusMars}
                                                        />
                                                    </i>

                                                </div>
                                                <div className="prop-content">
                                                    <p>Gender</p>
                                                    <p>{PetObj?.data!.gender}</p>
                                                </div>
                                            </li>
                                            <li>
                                                <div className="prop-icon">
                                                    <i>
                                                        <FontAwesomeIcon
                                                            icon={faDroplet}
                                                        />
                                                    </i>
                                                </div>
                                                <div className="prop-content">
                                                    <p>Color</p>
                                                    <p>{PetObj?.data!.color}</p>
                                                </div>
                                            </li>
                                        </ul>
                                    </div>
                                </div>
                                <div className="content">
                                    <h3>About This Listing</h3>
                                    <p>{PetObj?.data!.details}</p>
                                </div>
                                <div className="content">
                                    <h3>Features & Behavior</h3>
                                    <div className="row">
                                        <div className="col-12 col-lg-4">

                                            <h5 className="h6">Temperament</h5>
                                            <ul className='feature-list'>
                                                {PetObj?.data!.tempramentFeatures.map((temFeature, index) => (
                                                    <li key={index}>
                                                        <FontAwesomeIcon icon={faCircleCheck} />
                                                        {temFeature}
                                                    </li>
                                                ))}

                                            </ul>

                                            <h5 className="h6">Compatibility</h5>
                                            <ul className='feature-list'>
                                                {PetObj?.data!.compatibilityFeatures.map((feature, index) => (
                                                    <li key={index}>
                                                        <FontAwesomeIcon icon={faCircleCheck} />
                                                        {feature}
                                                    </li>
                                                ))}

                                            </ul>




                                        </div>

                                        <div className="col-12 col-lg-4">
                                            <ul className="feature-list">

                                                <h5 className="h6">General Features</h5>

                                                {PetObj?.data!.specialFeatures.slice(0, 7).map((specialFeature, index) => (
                                                    <li key={index}>
                                                        <span className=''>
                                                            {specialFeature.item2 + '' === 'true'
                                                                ? <FontAwesomeIcon icon={faCircleCheck} />
                                                                : <FontAwesomeIcon icon={faCircleXmark} />}
                                                        </span>
                                                        <span className="" >{specialFeature.item1}</span>

                                                    </li>

                                                ))}
                                            </ul>
                                        </div>

                                        <div className="col-12 col-lg-4">
                                            <ul className='feature-list'>

                                                {PetObj?.data!.specialFeatures.slice(7, 9).map((specialFeature, index) => (
                                                    <li key={index}>
                                                        <span className=''>
                                                            {specialFeature.item2 + '' === 'true'
                                                                ? <FontAwesomeIcon icon={faCircleCheck} />
                                                                : <FontAwesomeIcon icon={faCircleXmark} />}
                                                        </span>
                                                        <span className="" >{specialFeature.item1}</span>

                                                    </li>

                                                ))}
                                                <h5 className="h6">Training</h5>

                                                <li>
                                                    <FontAwesomeIcon icon={faCircleCheck} />
                                                    {PetObj?.data!.trainingLevel}
                                                </li>
                                                <h5 className="h6">Energy</h5>

                                                <li>
                                                    <FontAwesomeIcon icon={faCircleCheck} />
                                                    {PetObj?.data!.energyLevel}
                                                </li>
                                                <h5 className="h6"> Grooming</h5>

                                                <li>
                                                    <FontAwesomeIcon icon={faCircleCheck} />
                                                    {PetObj?.data!.groomingLevel}
                                                </li>


                                            </ul>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            {/* <!-- End Overview Section --> */}
                        </div>
                        <div className="col-lg-4">
                            <div className="contact-sec right-panel">
                                <h3>Contact Listing Owner</h3>
                                <div className="row">
                                    <div className="col-4 contact-img">
                                        <img src={p1} />
                                    </div>
                                    <div className="col-8 contact-detail">
                                        <h3>{PetObj?.data!.ownerName}</h3>
                                        <p>
                                            <FontAwesomeIcon icon={faPhone} className='mx-1' />
                                            +{PetObj?.data!.phone}
                                        </p>
                                        <p>
                                            <FontAwesomeIcon icon={faWhatsapp} className='mx-1' />
                                            +{PetObj?.data!.phone}
                                        </p>
                                    </div>
                                </div>
                                <div className="contact-form">

                                    <form className="form-inline">

                                        <div className="mb-3 message">
                                            <textarea
                                                rows={5}
                                                // placeholder="Message*"
                                                className={`form-control ${messageError && "border-danger"}`}
                                                // id="InputMessage"
                                                // aria-describedby="message"
                                                value={message}
                                                onChange={(event) => setMessage(event.target.value)}
                                            />

                                            {messageError ? (
                                                <div className='p-1  text-danger'>{'Required'}</div>
                                            ) : ''}

                                        </div>

                                        <button className="btn-green " type="button" onClick={onMessageSubmit}>

                                            <div className='d-flex justify-content-center'>
                                                {/* SIGN IN */}
                                                SEND MESSAGE
                                                {loading && (
                                                    <span className='indicator-progress' style={{ display: 'block' }}>
                                                        <span className='spinner-border spinner-border-sm align-middle mx-1 '></span>
                                                    </span>
                                                )}
                                            </div>


                                        </button>

                                    </form>

                                </div>
                            </div>

                            <div className="listing-sec right-panel">
                                <h3>Related Listings</h3>

                                {RelatedPetObj?.data!.length! > 0 &&
                                    <GridListing items={RelatedPetObj?.data!} />
                                }

                            </div>

                        </div>
                    </div>

                </div>
                {/* <!-- End Product Detail --> */}


            </div>
            <FeaturedPetsComponent />

        </section>



    )
}

export default ItemDetails