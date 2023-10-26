import { API_URL, GetBreedsByPetId, GetPetById, GetPetTypes, Pet_URL, PostPet, UpdatePet } from '../Service/PetServices'

import { useState, useEffect } from 'react'
import Dropzone, { useDropzone } from 'react-dropzone'
import 'react-dropzone/examples/theme.css'

import { Formik, Form } from 'formik'
import * as Yup from 'yup'
import { Form as BSForm, Spinner, Button, Card, FormLabel, FormSelect } from 'react-bootstrap-v5'
import FormikControl from '../Components/ReusableFormikComponents/FormikControl'
import axios from 'axios'
// import { useHistory } from 'react-router'
import { useNavigate, useParams } from 'react-router-dom'
import { useAuth } from '../Contexts/AuthContext'

import Select from 'react-select'
import CitySelectComponent from '../Components/widgets/CitySelectComponent'


const AddPet = () => {


    const initialValues = {
        Id: 0,
        NickName: '',
        Price: 0,
        Gender: '',
        Color: '',
        Age: '',
        Group: '',
        TrainingLevel: '',
        EnergyLevel: '',
        GroomingLevel: '',
        Details: '',
        Files: [],
        VideoURL: '',
        PetFor: '',
        PetTypeId: 0,
        PetBreedId: 0,
        TempramentFeatures: [],
        CompatibilityFeatures: [],
        Phone: ''


    }

    const [formValues, setFormValues] = useState(null)




    //------------------------------------------------
    //------------------------------------------------
    //   const [citiesOptions, setCitiesOptions] = useState([])
    const [selectedOption, setselectedOption] = useState(null)
    const [showCityErrorMsg, setshowCityErrorMsg] = useState(false)

    const handleChange = (selectedOption) => {

        if (showCityErrorMsg) {
            setshowCityErrorMsg(false);
        }

        setselectedOption(selectedOption);
    }

    //   useEffect(() => {
    //     PakCitiesList.map((city, index) => {

    //       setCitiesOptions(prevState => [...prevState, { label: `${city.name}`, value: `${city.name}` }]);
    //     })

    //   }, [])

    //------------------------------------------------
    //------------------------------------------------

    //------------------------------------------------
    //------------------------------------------------
    // const [usersOptions, setusersOptions] = useState([])
    // const [selectedUserOption, setselectedUsersOption] = useState(null)
    // const [showUsersErrorMsg, setshowUsersErrorMsg] = useState(false)





    //------------------------------------------------




    //------------------------------------------------

    //-----------------------------------------------------------------

    const [Files, setFiles] = useState([])

    const [selectedFileNames, setSelectedFileNames] = useState([])


    const removeFile = (file) => {
        // let filteredArrayFiles = Files.map(f => f.filter(f => f !== file));
        let filteredArrayFiles = Files.filter(f => f !== file);

        // console.log('fileName in removeFile == ', file.name);


        let filteredURLs = fileURLs.filter(item => item !== `StaticFiles/Files/${file.name}`);
        setFileURLs(filteredURLs);


        setFiles(filteredArrayFiles);
    }


    const removeFileName = (fileName) => {

        let filteredArray = selectedFileNames.filter(item => item !== fileName);

        // console.log('fileName == ', fileName);


        let filteredURLs = fileURLs.filter(item => item !== fileName);
        setFileURLs(filteredURLs);

        setSelectedFileNames(filteredArray);

    }

    const files = Files.map((file, index) => {
        return (
            file &&
            <div key={index} className='m-2  border border-3 ' >

                <div className='bg-light d-flex justify-content-end'>
                    {/* <a
                href={URL.createObjectURL(file)}
                className='link-danger m-2'>
                {file.name.substring(file.name.lastIndexOf('/') + 1, file.name.length)}
              </a> */}



                    <span className='m-2'>  {file.size} bytes</span>

                    <button className="bi bi-x-circle
                           fa-2x  border border-0"
                        style={{ 'backgroundColor': 'white', 'color': 'red' }}
                        type='button'
                        onClick={() => removeFile(file)}
                    ></button>
                </div>

                <div>
                    <img className='' height={200} width={200} src={URL.createObjectURL(file)} />
                </div>

            </div>

        )
    }
    )

    const onDrop = (files) => {

        console.log('files  debuging== ', files);


        if (files.length > 0) {


            const formData = new FormData()

            files
                .map(
                    file => {
                        if (!fileURLs.includes(`StaticFiles/Files/${file.name}`) && !selectedFileNames.includes(`StaticFiles/Files/${file.name}`)) {
                            formData.append(`filesArray`, file)

                        } else {
                            // //toast.warning(`${file.name} already exist In Selected Files`, { position: //toast.POSITION.BOTTOM_RIGHT });
                        }
                    })

            if (formData.get("filesArray") !== null) {

                axios.post(`${Pet_URL}/PostFiles`, formData, { headers: { 'content-type': 'multipart/form-data' } })
                    .then(res => {
                        res.data.map(url => {
                            if (!fileURLs.includes(url)) {
                                setFileURLs(prevState => [...prevState, url])
                            }
                        })
                    })
                    .catch(err => { console.log('Error from PostFiles response', err) })
            }

        }

        // && selectedFileNames.includes(file.name)


        files.map(file => {
            if (!fileURLs.includes(`StaticFiles/Files/${file.name}`) && !selectedFileNames.includes(`StaticFiles/Files/${file.name}`)) {
                // console.log('setting state ---after checking');
                setFiles(prevState => [...prevState, file]);
            }
        })

        // setSelectedFileNames([]);
    }

    const [fileURLs, setFileURLs] = useState([])


    // console.log('selected File Names == ', selectedFileNames);

    //---on selectedFileNames change when Pet is edited
    useEffect(
        () => {



            if (fileURLs.filter)
                selectedFileNames.map(fileName => {

                    if (!fileURLs.includes(fileName)) {

                        setFileURLs(prevState => [...prevState, fileName])
                    }
                })

        }, [selectedFileNames]
    )

    //-----------------------------------------------------------


    const AgeOptions = [
        { key: 'Select Age', value: 'select' },
        { key: 'One', value: '1' },
        { key: 'Two', value: '2' },
        { key: 'Three', value: '3' },
        { key: 'Four', value: '4' },
        { key: 'Five', value: '5' },
        { key: 'Five Plus', value: 'FivePlus' },
    ]

    const TrainingLevelOptions = [
        { key: 'Select Training Level', value: 'select' },
        { key: 'Has Basic Training', value: 'BasicTraining' },
        { key: 'Well Trained', value: 'WellTrained' },
    ]

    const PetForOptions = [
        { key: 'Select PetFor', value: 'select' },
        { key: 'Engage', value: 'Engage' },
        { key: 'Sell', value: 'Sell' },
        { key: 'Both', value: 'Both' }
    ]

    const GroupOptions = [
        { key: 'Select Group', value: 'select' },
        { key: 'Baby', value: 'Baby' },
        { key: 'Young', value: 'Young' },
        { key: 'Adult', value: 'Adult' },
        { key: 'Senior', value: 'Senior' }
    ]

    const GenderOptions = [
        { key: 'Select Gender', value: 'select' },
        { key: 'Male', value: 'Male' },
        { key: 'Female', value: 'Female' },
        { key: 'Pair', value: 'Pair' }
    ]

    const EnergyLevelOptions = [
        { key: 'Select Energy Level', value: 'select' },
        { key: 'Low', value: 'Low' },
        { key: 'Moderate', value: 'Moderate' },
        { key: 'High', value: 'High' }
    ]


    const GroomingLevelOptions = [
        { key: 'Select Grooming Level', value: 'select' },
        { key: 'Low', value: 'Low' },
        { key: 'Moderate', value: 'Moderate' },
        { key: 'High', value: 'High' },
        { key: 'Not Required', value: 'Not Required' }

    ]


    const ColorOptions = [
        { key: 'Select Color', value: 'select' },
        { key: 'Black', value: 'Black' },
        { key: 'Brown', value: 'Brown' },
        { key: 'Grey', value: 'Grey' },
        { key: 'White', value: 'White' },
        { key: 'Yellow', value: 'Yellow' },
        { key: 'Green', value: 'Green' },
        { key: 'Red', value: 'Red' },
        { key: 'Other', value: 'Other' }
    ]





    const { id } = useParams();

    const { UserToken, setUserToken } = useAuth()

    const isAddMode = !id;

    // console.log('isAddMode :  ',isAddMode);
    const [loading, setLoading] = useState(false)
    const [loading2, setLoading2] = useState(false)
    const [hasErrors, setHasErrors] = useState('')


    useEffect(() => {
        (async () => {


            // if (usersOptions.length > 0)
            if (!isAddMode) {
                setLoading2(true);

                await GetPetById(id).then((res => {
                    console.log('response data of Pet by id ----', res.data);


                    initialValues.Id = res.data.id;
                    initialValues.NickName = res.data.nickName;
                    initialValues.Price = res.data.price;
                    initialValues.Gender = res.data.gender;
                    initialValues.Color = res.data.color;
                    initialValues.Age = res.data.age;
                    initialValues.Group = res.data.group;
                    initialValues.TrainingLevel = res.data.trainingLevel;
                    initialValues.EnergyLevel = res.data.energyLevel;
                    initialValues.GroomingLevel = res.data.groomingLevel;
                    initialValues.Details = res.data.details;
                    initialValues.TempramentFeatures = res.data.tempramentFeatures;
                    initialValues.CompatibilityFeatures = res.data.compatibilityFeatures;
                    initialValues.VideoURL = res.data.videoURL;
                    initialValues.Phone = res.data.phone;


                    initialValues.PetFor = res.data.petFor;



                    // console.log('usersOptions == ', usersOptions);
                    // // setselectedUsersOption({label : res.data.ownerName ,value :  res.data.ownerId});

                    // setselectedUsersOption(usersOptions.find(a => a.value === res.data.ownerId));



                    setSelectedFileNames(res.data.files);

                    setpetTypeId(res.data.petTypeId);
                    setpetBreedId(res.data.petBreedId)



                    setpetTypeName(res.data.petTypeName);

                    setPetBreedName(res.data.petBreedName);

                    GetPetBreedsById(res.data.petTypeId);





                    SetSpecialFeatures(res.data.specialFeatures);

                    setFormValues(initialValues);

                    setLoading2(false);

                }))
            } else {
                setFormValues(initialValues);
            }

        })()
    }, []
    )

    // const history = useHistory();

    const validationSchema = Yup.object().shape({

        NickName: Yup.string().required('Required'),
        Phone: Yup.string().required('Required'),

        Price: Yup.string().required('Required'),
        Gender: Yup.string().required('Required'),
        Color: Yup.string().required('Required'),
        Age: Yup.string().required('Required'),
        Group: Yup.string().required('Required'),
        TrainingLevel: Yup.string().required('Required'),
        EnergyLevel: Yup.string().required('Required'),
        GroomingLevel: Yup.string().required('Required'),
        Details: Yup.string().required('Required'),
        // PetTypeId: Yup.string().required('Required'),
        PetBreedId: Yup.string().required('Required'),
        PetFor: Yup.string().required('Required'),
        TempramentFeatures: Yup.array().min(1, 'Required'),
        CompatibilityFeatures: Yup.array().min(1, 'Required'),
        // City: Yup.string().required('Required'),
        // Phone: Yup.string().required('Required')

    })


    const [petTypesOptions, setPetTypesOptions] = useState([{ key: 'Select Type', value: 'select' }])
    const [petBreedsOptions, setPetBreedsOptions] = useState([{ key: 'Select Breed', value: 'select' }])

    const [tempramentFeaturesOptions, setTempramentFeaturesOptions] = useState([])
    const [compatibilityFeaturesOptions, setCompatibilityFeaturesOptions] = useState([])

    const [specialFeatures, SetSpecialFeatures] = useState([])


    const featuresOptions = [
        { key: 'Yes', value: 'true' },
        { key: 'No', value: 'false' },
    ]



    useEffect(() => {

        (async () => {

            await GetPetTypes()
                .then(res => {
                    res.data.map(petType => {
                        setPetTypesOptions(oldValues => [...oldValues.filter(a => a.key !== petType.name), { key: petType.name, value: petType.id }])
                    })
                })
                .catch(err => {
                    console.log('err from GetPet Types ', err);
                })




            await axios.get(`${API_URL}/api/Pet/CreatePet`)
                .then(res => {

                    console.log('res.data == ', res.data);

                    res.data.compatibilityFeatures.map((comptFeature, index) => {

                        setCompatibilityFeaturesOptions(oldValues => [...oldValues, { key: comptFeature, value: comptFeature }]);
                    })

                    res.data.tempramentFeatures.map((temptFeature, index) => {
                        setTempramentFeaturesOptions(oldValues => [...oldValues, { key: temptFeature, value: temptFeature }]);
                    })

                    if (isAddMode) {
                        SetSpecialFeatures(res.data.specialFeatures);
                    }

                }).catch(err => { })


        })()


    }, [])


    const handleFeatureCheck = (featureObj) => {

        var changedFeature = specialFeatures.find(a => a.item1 === featureObj.item1);
        changedFeature.item2 = !changedFeature.item2;

        SetSpecialFeatures([...specialFeatures]);



    }

    const [petTypeId, setpetTypeId] = useState(0)
    const [petBreedId, setpetBreedId] = useState(0)

    const [showpetTypeErrorMsg, setShowpetTypeErrorMsg] = useState(false)

    const [showpetBreedErrorMsg, setShowpetBreedErrorMsg] = useState(false)

    const [petTypeName, setpetTypeName] = useState('')

    const [petBreedName, setPetBreedName] = useState('')



    const handlePetChange = (event) => {


        var SelectedItemId = petTypesOptions.find(a => a.key == event.target.value).value;

        setpetTypeName(event.target.value);

        setpetTypeId(SelectedItemId);

        GetPetBreedsById(SelectedItemId);

        console.log('event.target.value== ', SelectedItemId);

        if (SelectedItemId !== 'select') {
            setShowpetTypeErrorMsg(false);
            if (petBreedName !== 'select') {
                setShowpetBreedErrorMsg(false);
            }

        } else {
            setpetTypeId(0);
            // setpetBreedId(0);
            setShowpetBreedErrorMsg(true);

        }

    }


    const handleBreedChange = (e) => {

        var SelectedItemId = petBreedsOptions.find(a => a.key === e.target.value).value;

        setPetBreedName(e.target.value);

        setpetBreedId(SelectedItemId);

        if (SelectedItemId !== 'select') {
            setShowpetBreedErrorMsg(false);
        } else {
            setpetBreedId(0);
        }


    }



    const GetPetBreedsById = async (SelectedItemId) => {



        setPetBreedsOptions([{ key: 'Select Breed', value: 'select' }]);

        if (SelectedItemId !== 'select') {

            await GetBreedsByPetId(SelectedItemId)
                .then(res => {
                    res.data.map(breed => {
                        // if(petBreedsOptions.find(a => a.key == breed.name) == undefined)
                        setPetBreedsOptions(oldValues => [...oldValues.filter(a => a.key !== breed.name), { key: breed.name, value: breed.id }])
                    })
                })
        }


    }


    const navigate = useNavigate()


    onsubmit = (values) => {


        // if (selectedUserOption == null) {
        //     setshowUsersErrorMsg(true);
        // }
        if (selectedOption == null) {
            setshowCityErrorMsg(true);
        }

        if (petTypeId == 0) {
            setShowpetTypeErrorMsg(true);
        }
        if (petBreedId == 0) {
            setShowpetBreedErrorMsg(true);
        }

        if (selectedOption !== null && petTypeId !== 0 && petBreedId !== 0) {


            values.City = selectedOption.value;


            values.OwnerId = UserToken.userId;

            values.PetTypeId = petTypeId;
            values.PetBreedId = petBreedId;

            values.Files = fileURLs;
            values.SpecialFeatures = specialFeatures;

            console.log('values == ', values);


            if (isAddMode) {
                setLoading(true)

                setTimeout(() => {

                    console.log('values--- ', values);




                    PostPet(values, UserToken.token).then(
                        () => {
                            setLoading(false)
                            //toast.success('Item created successfully', { position: //toast.POSITION.TOP_RIGHT });

                            navigate('/')

                            // history.push('/Pets/AllPets');

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
                }, 1000)

            }
            else {
                setLoading(true)

                setTimeout(() => {


                    UpdatePet(id, values, UserToken.token).then(
                        () => {
                            // setHasErrors(false)
                            setLoading(false)
                            //toast.success('Item updated successfully', { position: //toast.POSITION.TOP_RIGHT });

                            // history.push('/Pets/AllPets');

                        })
                        .catch((error) => {
                            setLoading(false)

                            let Obj = error.toJSON();
                            console.log('1111111');
                            console.log('Obj', Obj);
                            if (Obj.message === 'Network Error') {

                                setHasErrors('API Server is down....');
                            }
                            else {
                                let obj2 = JSON.parse(Obj.message);

                                setHasErrors(obj2.errorMessage);
                                //toast.error(obj2.errorMessage, { position: //toast.POSITION.BOTTOM_RIGHT });

                            }
                        })
                }, 1000)


            }

        } else {
            window.scrollTo(0, 0);
        }


    }


    console.log('formValues : ', formValues);


    return (
        <section id="main">

            {/* ------------------------------------- */}


            {formValues !== null ?
                <Formik
                    initialValues={formValues}
                    validationSchema={validationSchema}
                    onSubmit={onsubmit}
                >
                    {
                        formik => {
                            return (
                                <div className='container'>


                                    <Form
                                        className="add-pet"
                                    // className='m-3'
                                    >

                                        <h3 className="section-heading">
                                            {!isAddMode ? "Update Information About Your pet"
                                                : "Add Information About Your pet"
                                            }
                                        </h3>



                                        {hasErrors ? (
                                            <div className='mb-lg-15 alert alert-danger'>
                                                <div className='alert-text font-weight-bold'>{hasErrors}</div>
                                            </div>
                                        ) : ''}


                                        <div className="pet-info">

                                            <FormikControl
                                                control='input'
                                                type='text'
                                                label='NickName'
                                                name='NickName'
                                                className='form-item'

                                            />

                                            <FormikControl
                                                control='select'
                                                options={PetForOptions}
                                                type='text'
                                                label='PetFor'
                                                name='PetFor'
                                                className='form-item'
                                            />


                                            <FormikControl
                                                control='input'
                                                type='text'
                                                label='Price'
                                                name='Price'
                                                className='form-item'

                                            />

                                            <div className='form-item'>

                                                <h6 className={`${showpetTypeErrorMsg ? 'text-danger' : ''}`} htmlFor={'PetTypeId'}>{'Select Pet Type'}</h6>

                                                <BSForm.Select
                                                    className=''
                                                    name='PetTypeId'
                                                    onChange={handlePetChange}
                                                    value={petTypeName}
                                                >
                                                    {petTypesOptions.map((type) =>
                                                        <option
                                                            key={type.value}
                                                        >
                                                            {type.key}
                                                        </option>
                                                    )}
                                                </BSForm.Select>
                                                {showpetTypeErrorMsg ? (
                                                    <div className='p-1 fs-3 text-danger'>{'Required'}</div>
                                                ) : ''}

                                            </div>

                                            <div className='form-item'>

                                                <h6 className={`${showpetBreedErrorMsg ? 'text-danger' : ''}`} htmlFor={'PetBreedId'}>{'Select Pet Breed'}</h6>

                                                <BSForm.Select
                                                    className=''
                                                    name='PetBreedId'
                                                    onChange={handleBreedChange}
                                                    value={petBreedName}
                                                >
                                                    {petBreedsOptions.map((type) =>
                                                        <option
                                                            key={type.value}
                                                        >
                                                            {type.key}
                                                        </option>
                                                    )}
                                                </BSForm.Select>
                                                {showpetBreedErrorMsg ? (
                                                    <div className='p-1 fs-3 text-danger'>{'Required'}</div>
                                                ) : ''}

                                            </div>


                                            <FormikControl
                                                control='select'
                                                options={GenderOptions}
                                                label='Select Gender'
                                                name='Gender'
                                                className='form-item'

                                            />


                                            <FormikControl
                                                control='select'
                                                options={ColorOptions}
                                                type='text'
                                                label='Select Color'
                                                name='Color'
                                                className='form-item'

                                            />

                                            <FormikControl
                                                control='select'
                                                options={AgeOptions}
                                                type='text'
                                                label='Select Age'
                                                name='Age'
                                                className='form-item'

                                            />


                                            <FormikControl
                                                control='select'
                                                options={GroupOptions}
                                                type='text'
                                                label='Select Group'
                                                name='Group'
                                                className='form-item'

                                            />
                                            <FormikControl
                                                control='select'
                                                options={TrainingLevelOptions}
                                                type='text'
                                                label='Select Training Level'
                                                name='TrainingLevel'
                                                className='form-item'

                                            />



                                            <FormikControl
                                                control='select'
                                                options={EnergyLevelOptions}
                                                type='text'
                                                label='Select Energy Level'
                                                name='EnergyLevel'
                                                className='form-item'

                                            />
                                            <FormikControl
                                                control='select'
                                                options={GroomingLevelOptions}
                                                type='text'
                                                label='Select Grooming Level'
                                                name='GroomingLevel'
                                                className='form-item'

                                            />


                                        </div>


                                        <h3 className="section-heading"> Pet Features</h3>

                                        <FormikControl
                                            control='checkbox'
                                            options={tempramentFeaturesOptions}
                                            label='Temprament'
                                            name='TempramentFeatures'
                                            formGroupClassName=' pet-features'
                                            className='form-check'
                                        />

                                        <FormikControl
                                            control='checkbox'
                                            options={compatibilityFeaturesOptions}
                                            label='Compatibility'
                                            name='CompatibilityFeatures'
                                            formGroupClassName='pet-features'
                                            className='form-check'
                                        />






                                        {/* special features */}

                                        <h3 className="section-heading">Special Pet Features</h3>

                                        <div className=" row pet-features">
                                            {
                                                specialFeatures.map((featureObj, index) => {

                                                    var CheckedOption = featuresOptions.find(a => a.value == (featureObj.item2).toString());


                                                    return (
                                                        <div className='col-12 col-lg-2' key={index}>

                                                            <h4> {featureObj.item1}</h4>

                                                            <div className='d-flex'>
                                                                {featuresOptions.map((option, index) => (

                                                                    <div className="form-check radio" key={index}
                                                                        style={{ marginRight: "-20px" }}
                                                                    >
                                                                        <input
                                                                            className=""
                                                                            type="radio"
                                                                            name={featureObj.item1}
                                                                            onClick={() => handleFeatureCheck(featureObj)}
                                                                            id={featureObj.item1}
                                                                            defaultChecked={CheckedOption.value == 'true' && option.key == 'Yes' || CheckedOption.value == 'false' && option.key == 'No'} value={option.value}
                                                                        />

                                                                        <label className="form-check-label" htmlFor="inlineRadio1">{option.key}</label>
                                                                    </div>
                                                                )
                                                                )}
                                                            </div>
                                                        </div>
                                                    )
                                                })
                                            }
                                        </div>

                                        {/* Details input */}
                                        {/* <div className='m-5'> */}
                                        <h4>More About Your Pet</h4>
                                        <FormikControl
                                            control='textarea'
                                            type='text'
                                            rows={4}
                                            // label='More About Your Pet'
                                            name='Details'
                                        // className='w-100'
                                        />

                                        {/* </div>

                                        <div className='m-5'> */}

                                        {/* <FormikControl
                                            control='input'
                                            type='text'
                                            label='Video URL'
                                            name='VideoURL'
                                            placeholder='Paste Video URL'
                                            inputClassName='text-muted'

                                        /> */}
                                        {/* </div> */}

                                        {/* File selector */}


                                        <Dropzone
                                            onDrop={onDrop}

                                            accept={['.jpg', '.tif', '.tiff', '.jpeg', '.jfif', '.pjpeg', '.pjp', '.png', '.svg', '.webp', '.bmp']}
                                        >
                                            {({ getRootProps, getInputProps }) => (
                                                <section className="container" >
                                                    <div {...getRootProps({ className: 'dropzone' })}>
                                                        {/* <KTSVG path='/media/icons/duotune/files/fil023.svg' className='svg-icon-1' /> */}

                                                        <input {...getInputProps()} />
                                                        <p className='h5 p-3 text-muted'>Drag & Drop files here or click to browser</p>
                                                    </div>
                                                    <aside>
                                                        {/* <h4 className='p-5'>{files.length >= 1 && <span> Selected Files</span>} </h4> */}

                                                        <div className='d-flex flex-wrap'>
                                                            {files}

                                                            {selectedFileNames.map((file, index) => {


                                                                return (
                                                                    file &&
                                                                    <div className='m-3 border border-3' key={index}>


                                                                        <div className='bg-light d-flex justify-content-end'>

                                                                            <button className="bi bi-x-circle fa-2x  border border-0"
                                                                                style={{ 'backgroundColor': 'white' }}
                                                                                type='button'
                                                                                onClick={() => removeFileName(file)}
                                                                            ></button>

                                                                        </div>

                                                                        <div>
                                                                            <img className='' height={200} width={200} src={`${API_URL}/${file}`} />
                                                                        </div>

                                                                    </div>
                                                                )
                                                            }
                                                            )}
                                                        </div>
                                                    </aside>
                                                </section>
                                            )}
                                        </Dropzone>




                                        {/* Owner Details */}

                                        <div className="owner-detail ">
                                            <h3>Pet Owner Details</h3>
                                            <div className="owner-info">
                                                <FormikControl
                                                    control='input'
                                                    type='text'
                                                    label='Phone'
                                                    name='Phone'
                                                    className='form-item input-1'

                                                />

                                                {/* <div className=''>

                                                    <label className={`h6 ${showCityErrorMsg ? 'text-danger' : ''}`}>Select City </label>
                                                    <Select
                                                        // className=''
                                                        value={selectedOption}
                                                        onChange={handleChange}
                                                        options={citiesOptions}
                                                        className="form-item form-control city-select"
                                                        
                                                    // isDisabled={!isAddMode}
                                                    />
                                                    {showCityErrorMsg ? (
                                                        <div className='p-1  text-danger'>{'Required'}</div>
                                                    ) : ''}

                                                </div> */}

                                                <div>
                                                    <CitySelectComponent

                                                        showLabel={true}

                                                        showCityErrorMsg={showCityErrorMsg}
                                                        selectedOption={selectedOption}
                                                        handleChange={handleChange}
                                                        selectControlClassName='form-item form-control city-select'
                                                    />

                                                </div>
                                            </div>
                                        </div>


                                        {/* ------------ */}


                                        {/* Submit Btn */}
                                        <div className='d-flex '>

                                            <Button variant="success" className="submit-button" type='submit'>
                                                <div className='d-flex justify-content-center'>


                                                    {/* {!isAddMode ? <span>Update </span> : <span> Create</span>} */}
                                                    SUBMIT


                                                    {loading && (
                                                        <span className='indicator-progress' style={{ display: 'block' }}>
                                                            <span className='spinner-border spinner-border-sm align-middle ms-2'></span>
                                                        </span>
                                                    )}
                                                </div>
                                            </Button>
                                        </div>





                                    </Form>

                                </div>
                            )
                        }
                    }
                </Formik>
                : ""}





        </section>
    )
}

export default AddPet