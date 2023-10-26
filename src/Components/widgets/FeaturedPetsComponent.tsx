import React from 'react'
import { useQuery } from 'react-query';
import { GetFeaturedPets } from '../../Service/PetServices';
import FeaturedPetsCarousol from './FeaturedPetsCarousol';

const FeaturedPetsComponent = () => {

    const {
        isLoading: FeaturedPetsLoading,
        data: FeaturedPets,
        isError: isFeaturedPetsError,
        error: FeaturedPetsError,
        refetch: refetchFeaturedPets,
        isRefetching: isRefetchingFeaturedPets
    }
        = useQuery('FeaturedPets', () => {
            return GetFeaturedPets()
        },
            {
                // enabled: !!UserToken.UserDetailsId,
                refetchOnMount: false,
                refetchOnWindowFocus: false,
                staleTime: 30000,
                // refetchInterval : 
                // retry: false,
                onSuccess: (res) => {
                    console.log('Success of GetFeatured Pets :  ', res);

                },
                onError: (err) => {
                    // let Obj /* : ErrorResponseModel */ = err;
                }

            }



        )

    return (
        <div className="featured">
            {/* <div className="container"> */}
            <h1>FEATURED PETS</h1>
            <p>Find an extensive list of every possible pet available world wide</p>
            {/* <div className="owl-carousel owl-theme"> */}

            {FeaturedPets?.data.length! > 0 &&
                <FeaturedPetsCarousol items={FeaturedPets?.data!} />
            }


            {/* </div> */}
        </div>
    )
}

export default FeaturedPetsComponent