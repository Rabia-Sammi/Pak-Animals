import React, { useState } from 'react'
import PropTypes from 'prop-types'
import new_parrot from "../../Assets/Images/new-parrot.jpg";
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart, faHeartCircleBolt, faLocation, faLocationDot, faShareNodes } from '@fortawesome/free-solid-svg-icons';
import { PetObjTYpe } from '../../types/PetObjType';
import { Button, Dropdown } from 'react-bootstrap';
import { API_URL } from '../../Service/PetServices';
import SocailShare from './socailShare';
import { useAuth } from '../../Contexts/AuthContext';
import { onHeartClick } from '../../types/HeartIconClickFunc';

type PropsType = {
    PetObj: PetObjTYpe,
    refetch: () => {}
    // onClick(PetObj: PetObjTYpe, userId: string, ) : void
}
const PetCard = (props: PropsType) => {

    const { UserToken, setUserToken } = useAuth()


    var PetObj = props.PetObj;

    var encodedPetName = encodeURI(PetObj.nickName);

    // console.log('on click in PetCard : ', props.onClick);






    return (

        <div className="card">
            <div className="card-header border-0">
                <h3>PKR {PetObj.price}</h3>
                <div className="icons">




                    {!!UserToken.email &&
                        <div className='ShareDropDown'>
                            <Button className='btn-success'
                                onClick={() =>
                                    onHeartClick(PetObj, UserToken.userId, props.refetch)
                                }>
                                <FontAwesomeIcon
                                    icon={faHeart}
                                    className={`${PetObj?.isFavorite ? 'icon-active' : 'text-muted'}  pointer-cursor`}
                                />
                            </Button>
                        </div>
                    }

                    <SocailShare uri={`${API_URL}/details/${encodedPetName}`} />


                    {/* <Dropdown className='ShareDropDown'>
                        <Dropdown.Toggle variant="success"

                            id="dropdown-basic">
                            <FontAwesomeIcon
                                onClick={() => setShowShareIcons(true)}
                                className='text-muted pointer-cursor'
                                icon={faShareNodes}
                            />
                        </Dropdown.Toggle>

                        <Dropdown.Menu>

                            <FacebookShareButton
                                url={`http://192.168.100.35:3000/details/${encodedPetName}`}
                                quote={""}
                                hashtag={""}
                                className=""
                            >
                                <FacebookIcon size={32} round />
                            </FacebookShareButton>

                            <TwitterShareButton
                                url={`http://192.168.100.35:3000/details/${encodedPetName}`}
                                // quote={""}
                                // hashtag={""}
                                className=""
                            >
                                <TwitterIcon size={32} round />
                            </TwitterShareButton>

                            <WhatsappShareButton
                                url={`http://192.168.100.35:3000/details/${encodedPetName}`}
                                // quote={""}
                                // hashtag={""}
                                className=""
                            >
                                <WhatsappIcon size={32} round />
                            </WhatsappShareButton>


                        </Dropdown.Menu>
                    </Dropdown> */}






                    {/* <span><a href="#"><i className="fa-regular fa-heart"></i></a></span>
                        <span><a href=""><i className="fa-solid fa-share-nodes"></i></a></span> */}
                </div>
            </div>
            <Link to={`/details/${PetObj.nickName}`}>
                <img className="card-img-top" src={`${API_URL}/${PetObj.files[0]}`} alt="Card image cap" /> </Link>
            <div className="card-body">
                <h2>{PetObj.nickName}</h2>


                <FontAwesomeIcon
                    className='text-secondary mx-1'
                    icon={faLocationDot}

                />

                <span>{PetObj.city}</span>
            </div>
            <div className="card-footer">
                <li>
                    <h2>Pet:</h2>
                    <p>{PetObj.petTypeName}</p>
                </li>
                <li>
                    <h2>Breed:</h2>
                    <p>{PetObj.petBreedName}</p>
                </li>
                <li>
                    <h2>Gender:</h2>
                    <p>{PetObj.gender}</p>
                </li>
            </div>
        </div>

    )
}



export default PetCard