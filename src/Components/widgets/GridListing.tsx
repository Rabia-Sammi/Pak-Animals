import React from 'react'
import { PetObjTYpe } from '../../types/PetObjType'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faLocationDot } from '@fortawesome/free-solid-svg-icons'
import { API_URL } from '../../Service/PetServices'
import { Link } from 'react-router-dom'

type PropsType = {
    items: PetObjTYpe[]
}

const GridListing = (props: PropsType) => {

    var Items = props.items;


    return (<>
        {Items.map((item, index) => (

            <div className="listing">
                <div className="row">
                    <div className="col-4">

                        <Link to={`/details/${item.nickName}`}>
                            <img src={`${API_URL}/${item.files[0]}`} />
                        </Link>

                    </div>
                    <div className="col-8">
                        <h3>
                            <Link to={`/details/${item.nickName}`}>
                                {item.nickName}
                            </Link>
                        </h3>
                        <p><FontAwesomeIcon icon={faLocationDot} className='text-secondary mx-1' />Lahore</p>
                        <h2>PKR {item.price}</h2>
                    </div>
                </div>
            </div>
        ))}

    </>
    )
}

export default GridListing