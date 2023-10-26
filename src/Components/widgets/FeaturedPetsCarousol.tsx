import React from 'react'
// import EnquiryForm from "../Components/EnquiryForm";
import Carousel from "react-multi-carousel";
import 'react-multi-carousel/lib/styles.css'
import { PetObjTYpe } from '../../types/PetObjType';
import new_parrot from "../../Assets/Images/new-parrot.jpg";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGroupArrowsRotate, faLayerGroup, faLocationDot, faPalette } from '@fortawesome/free-solid-svg-icons';
import { faObjectGroup } from '@fortawesome/free-regular-svg-icons';
import { API_URL } from '../../Service/PetServices';


type PropsType = {
    items: PetObjTYpe[]
}

const FeaturedPetsCarousol = (props: PropsType) => {

    var CarouselItems = props.items;


    const CustomDot = ({ ...rest }) => {
        const {
            onClick,
            onMove,
            index,
            active,
            carouselState: { currentSlide, deviceType }
        } = rest;


        // onMove means if dragging or swiping in progress.
        // active is provided by this lib for checking if the item is active or not.
        return (
            <span
                className="pointer-cursor"
                onClick={() => onClick()}
            >
                <button
                    className={`carousel-straight-line m-1 rounded border-0 ${active ? "active-straight-line" : ""}`}
                >
                    {React.Children.toArray([])[index]}
                </button>
            </span>

        );
    };

    return (
        <Carousel
            additionalTransfrom={0}
            arrows={false}
            autoPlaySpeed={3000}
            centerMode
            className=""
            // containerClass="container"
            dotListClass=""
            draggable
            focusOnSelect={true}
            infinite
            itemClass=""
            keyBoardControl
            minimumTouchDrag={80}
            pauseOnHover
            renderArrowsWhenDisabled={false}
            renderButtonGroupOutside={false}
            renderDotsOutside={false}
            responsive={{
                desktop: {
                    breakpoint: {
                        max: 3000,
                        min: 1024
                    },
                    items: 2,
                    partialVisibilityGutter: 5


                },
                mobile: {
                    breakpoint: {
                        max: 464,
                        min: 0
                    },
                    items: 1,
                    partialVisibilityGutter: 20
                },
                tablet: {
                    breakpoint: {
                        max: 1024,
                        min: 464
                    },
                    items: 1,
                    partialVisibilityGutter: 20
                }
            }}

            customDot={<CustomDot />}
            rewind={false}
            rewindWithAnimation={false}
            rtl={false}
            shouldResetAutoplay
            showDots={true}
            sliderClass=""
            slidesToSlide={1}
            swipeable
        >

            {CarouselItems.map((featuredPet, index) => (


                <div className="card mx-1 pointer-cursor border-0 bg-light" key={index}>
                    <div className="row">
                        <div className="col-6">
                            <img src={`${API_URL}/${featuredPet.files[0]}`} />
                        </div>
                        <div className="col-6">
                            <div className="card-body">
                                <div className="content">
                                    <h3>PKR {featuredPet.price}</h3>
                                    <h2>{featuredPet.nickName}</h2>

                                    <FontAwesomeIcon
                                        className='text-secondary mx-1'
                                        icon={faLocationDot}
                                    />
                                    <span>{featuredPet.city}</span>
                                    <div className="prop">
                                        <div className="row">
                                            <div className="col-6">
                                                {/* <i className="fa-solid fa-shower"></i> */}

                                                <span><FontAwesomeIcon
                                                    className='icon-theme-color mx-1'
                                                    icon={faLayerGroup}
                                                />
                                                    {featuredPet.petTypeName}</span>
                                            </div>
                                            <div className="col-6">
                                                {/* <i className="fa-solid fa-shower"></i> */}
                                                <span><FontAwesomeIcon
                                                    className='icon-theme-color mx-1'
                                                    icon={faObjectGroup}
                                                />
                                                    {featuredPet.petBreedName}</span>
                                            </div>
                                            <div className="col-6">
                                                {/* <i className="fa-solid fa-shower"></i> */}
                                                <span><FontAwesomeIcon
                                                    className='icon-theme-color mx-1'
                                                    icon={faGroupArrowsRotate}
                                                />
                                                    {featuredPet.gender}</span>
                                            </div>
                                            <div className="col-6">
                                                {/* <i className="fa-solid fa-shower"></i> */}
                                                <span><FontAwesomeIcon
                                                    className='icon-theme-color mx-1'
                                                    icon={faPalette}
                                                />
                                                    {featuredPet.color}</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

            ))}




            {/* </div> */}
        </Carousel>


    )
}

export default FeaturedPetsCarousol