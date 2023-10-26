import React from 'react'
import { BeatLoader } from 'react-spinners'

const LoaderAnimation = () => {
    return (
        <div
            className='fp-container'
            style={{ zIndex: "10" }}
        >

            <BeatLoader
                className='fp-loader'
                color='#00c194' />
        </div>
    )
}

export default LoaderAnimation