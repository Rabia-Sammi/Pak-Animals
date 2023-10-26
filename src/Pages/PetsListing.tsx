import React, { useEffect, useState } from 'react'
import NewPet from '../Components/widgets/PetCard'
import { useQuery } from 'react-query'
import { GetAllPets, GetBreedsByPetId, GetNewPets, GetPetTypes } from '../Service/PetServices'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowLeftLong, faArrowRightLong, faArrowsRotate, faSearch, faSliders } from '@fortawesome/free-solid-svg-icons'
import MyPagination from '../Components/Pagination/Pagination'
import { Link, useLocation } from 'react-router-dom'
import LoaderAnimation from '../Components/widgets/LoaderAnimation'
import GridListing from '../Components/widgets/GridListing'
import { useAuth } from '../Contexts/AuthContext'
import PetBreedAndBreedSelects from '../Components/widgets/TypeAndBreedSelectComponent/PetTypeAndBreedSelects'
import CitySelectComponent from '../Components/widgets/CitySelectComponent'

const PetsListing = () => {



  const [range, setRange] = useState(0)

  const [petTypeId, setpetTypeId] = useState(0)
  const [petBreedId, setpetBreedId] = useState(0)
  const [search, Setsearch] = useState("")
  const [searchTerm, SetsearchTerm] = useState("")

  const [minPriceRage, setMinPriceRage] = useState(0)
  const [maxPriceRange, setMaxPriceRange] = useState(0)

  const [city, setCity] = useState("")




  const [selectedCityOption, setSelectedCityOption] = useState<{ label: string; value: string; }>()

  const handleChange = (selectedCityOption: any) => {


    setCity(selectedCityOption.value)
    setSelectedCityOption(selectedCityOption)

  }

  const [minPriceTerm, setMinPriceTerm] = useState(0)
  const [maxPriceTerm, setMaxPriceTerm] = useState(0)


  const [sortBy, SetSortBy] = useState("")

  const [currPage, setCurrPage] = React.useState(1);

  const [pageSize, setPageSize] = useState(6)

  const [totalCount, setTotalCount] = useState(0)

  const { UserToken, setUserToken } = useAuth()

  const ResetFilteringAndSearching = () => {

    console.log('*******************');

    setpetTypeId(0);
    setpetBreedId(0);
    setRange(0);
    Setsearch("")
    SetsearchTerm("");
    SetSortBy("");
    setCurrPage(1)
  }





  const {
    isLoading: AllPetsLoading,
    data: AllPets,
    isError: isAllPetsError,
    error: AllPetsError,
    refetch: refetchAllPets,
    isRefetching: isRefetchingAllPets
  }
    = useQuery('AllPets', () => {
      return GetAllPets(city, searchTerm, sortBy, petTypeId, petBreedId, range, minPriceTerm, maxPriceTerm, currPage, pageSize, UserToken.userId)
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


  useEffect(() => {

    refetchAllPets()

  }, [city, searchTerm, sortBy, petTypeId, petBreedId, range, minPriceTerm, maxPriceTerm, currPage, pageSize])


  const location = useLocation()

  const urlParams = new URLSearchParams(location.search)


  useEffect(() => {
    if (!!location.search) {
      let city = urlParams.get("city")
      let petTypeId = urlParams.get("petTypeId")
      let petBreedId = urlParams.get("petBreedId")


      // console.log('city : ', city);
      // console.log('petTypeId : ', petTypeId);
      // console.log('petBreedId : ', petBreedId);


      if (!!city) {
        setCity(city)
        setSelectedCityOption({ label: city!, value: city! })
      }

      if (!!petTypeId)
        setpetTypeId(parseInt(petTypeId!))

      if (petBreedId)
        setpetBreedId(parseInt(petBreedId!))



    }

  }, [location.search])








  useEffect(() => {

    if (AllPets?.data.totalCount !== undefined) {
      setTotalCount(AllPets?.data.totalCount)
    }


  }, [AllPets?.data.totalCount])


  const onPetTypeChange = (event: React.ChangeEvent<HTMLSelectElement>) => {

    if (event.target.value !== 'select') {

      setCurrPage(1)

      setpetTypeId(parseInt(event.target.value));

      // GetPetBreedsById(parseInt(event.target.value));

    } else
      setpetTypeId(0)


  }

  const onPetBreedChange = (event: React.ChangeEvent<HTMLSelectElement>) => {

    if (event.target.value !== 'select') {

      setCurrPage(1)

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
        refetchOnWindowFocus: true,
        staleTime: 30000,
        // refetchInterval : 
        // retry: false,
        onSuccess: (res) => {
          console.log('Success of GetNewPets :  ', res);

        },
        onError: (err) => {
          // let Obj /* : ErrorResponseModel */ = err;
        }

      }



    )




  return (
    <div id="main">

      <div className="container">
        <div className="breadcrums">
          <ul>
            <li><Link to={'/home'}>Home </Link> <span></span></li>
            <li><Link to={'/'}> Pets </Link><span></span></li>
            <li><Link to={'/'}> Persian Kitten Pair</Link></li>
          </ul>
        </div>

        <div>
          <div className="row">
            <div className="col-12 col-lg-4">
              <div className="adv-search side-panel">
                <h3 className="section-heading">Advance Search</h3>

                <div className="search-form">

                  <div className="input-group mb-3">
                    <input
                      type="text"
                      placeholder="Search Pet Name"
                      className="form-control"
                      id="Query" aria-describedby=""
                      value={search} onChange={(event) => {

                        Setsearch(event.target.value)
                      }}
                      onBlur={(event) => {

                        setCurrPage(1)

                        SetsearchTerm(event.target.value)

                      }}
                    />
                    <div className="input-group-append">
                      <button type='button' className="input-group-text mx-0" id="basic-addon2">
                        <FontAwesomeIcon icon={faSearch} />
                      </button>
                    </div>
                  </div>

                  <PetBreedAndBreedSelects
                    petTypeId={petTypeId}
                    petTypeChange={onPetTypeChange}
                    petBreedId={petBreedId}
                    petBreedChange={onPetBreedChange}
                    className=''
                    petTypeClassName='mb-3'
                    petBreedClassName='mb-3'

                  />






                  <div className="mb-3">
                    <CitySelectComponent

                      showLabel={false}

                      showCityErrorMsg={false}
                      selectedOption={selectedCityOption!}
                      handleChange={handleChange}
                      selectControlClassName=''
                    />

                  </div>




                  <div className="mb-3 d-flex">

                    <div className="form-group w-100 m-1">
                      <label htmlFor="minPriceRange">Min Price Range</label>

                      <input
                        id='minPriceRange'
                        type="text"
                        className="form-control m-1"
                        value={minPriceRage}
                        onChange={(event) => {

                          if (Number.isInteger(parseInt(event.target.value))) {
                            setMinPriceRage(parseInt(event.target.value))
                          } else {
                            setMinPriceRage(0)
                          }

                        }}

                        onBlur={(event) => {
                          // setCurrPage(1)
                          if (maxPriceTerm !== 0)
                            setMinPriceTerm(parseInt(event.target.value))
                        }}
                      />
                    </div>

                    <div className="form-group w-100 m-1">
                      <label htmlFor="maxPriceRange">Max Price Range</label>

                      <input
                        type="number"
                        id='maxPriceRange'
                        className="form-control m-1"
                        aria-describedby=""
                        value={maxPriceRange}
                        onChange={(event) => {

                          if (Number.isInteger(parseInt(event.target.value))) {
                            setMaxPriceRange(parseInt(event.target.value))
                          } else {
                            setMaxPriceRange(0)
                          }
                        }}

                        onBlur={(event) => {
                          // setCurrPage(1)
                          setMinPriceTerm(minPriceRage)

                          setMaxPriceTerm(parseInt(event.target.value))
                        }}
                      />
                    </div>

                  </div>


                  <div className="mb-3 range-slider">
                    <div className="tags">
                      <span>Price ({range})</span>
                      <span className="price">RS 0 - RS 100000</span>
                    </div>
                    <input id="" className="slider" type="range" value={range} max="100000" min="0"
                      step="1000" onChange={(event) => setRange(parseInt(event.target.value))
                      } />
                  </div>



                  <button className='mx-1' type='button'>SEARCH</button>
                  <button className='mx-1' type='button' onClick={ResetFilteringAndSearching}>
                    <FontAwesomeIcon icon={faArrowsRotate} />
                    Reset
                  </button>



                </div>

              </div>

              <div className="listing-sec side-panel">
                <h3 className="section-heading">Latest Listings</h3>

                {NewPets?.data!.length! > 0 &&
                  <GridListing items={NewPets?.data!} />
                }




              </div>
            </div>

            <div className="col-12 col-lg-8 results">
              <div className="row ">
                <div className="col-12 col-lg-6">
                  <h5> <span>Showing </span>
                    {((pageSize * currPage) + 1) - pageSize < totalCount
                      ?
                      ((pageSize * currPage) + 1) - pageSize
                      : totalCount}
                    <span> - </span>
                    {(pageSize * currPage) < totalCount ? (pageSize * currPage) : totalCount}
                    <span> of </span>
                    {totalCount}
                    <span> results </span>
                  </h5>
                </div>
                <div className="col-12 col-lg-6 sort">
                  <div className="sort">
                    <span>Sort By:</span>
                    <span>
                      <select name="sort" id="sort" className="form-select"
                        value={sortBy}
                        onChange={(event) => SetSortBy(event.target.value)}
                      >
                        <option value="">Default</option>
                        <option value="Price">By price</option>
                        <option value="Pet">By Pet Name</option>
                        <option value="Breed">By Breed Name</option>
                      </select>
                    </span>
                  </div>

                  {/* <ul className="page-header icons">
                    <li><a href="#"><i className="fa-solid fa-list"></i></a></li>
                    <li><a href="#"><i className="fa-solid fa-border-all"></i></a></li>
                  </ul> */}

                </div>
              </div>

              {(AllPetsLoading || isRefetchingAllPets) &&
                <LoaderAnimation />
              }



              {(!!totalCount) ?
                <MyPagination

                  totPages={Math.ceil(totalCount / pageSize)}
                  currentPage={currPage}
                  pageClicked={(page_number: number) => {
                    // afterPageClicked(ele);
                    setCurrPage(page_number);


                  }}>

                  <div className="product-sec"
                  >
                    <div className="row">


                      {AllPets?.data.petListViewModel.map((petItem, index) => (
                        <div className="col-12 col-lg-6" key={index}>

                          <NewPet PetObj={petItem}
                            //  onClick={() =>  onHeartClick(petItem,UserToken.userId, refetchAllPets)}
                            refetch={refetchAllPets}
                          />
                        </div>

                      )
                      )}



                    </div>
                  </div>


                </MyPagination>
                : ""}


            </div>
          </div>
        </div>
      </div>
    </div>

  )
}

export default PetsListing