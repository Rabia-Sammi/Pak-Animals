import React, { useState, useEffect } from 'react'
import new_parrot from "../Assets/Images/new-parrot.jpg";
import { Formik, Form } from 'formik'
import * as Yup from 'yup'
import { Form as BSForm, Spinner, Button, Card, FormLabel, FormSelect } from 'react-bootstrap-v5'
import FormikControl from '../Components/ReusableFormikComponents/FormikControl'
import axios from 'axios'
import { register } from '../Service/AuthServices';
import { Link, useLocation, useNavigate } from 'react-router-dom';

const Register = () => {


    const location = useLocation()

    const urlParams = new URLSearchParams(location.search)

    const [returnUri, setReturnUri] = useState("")

    useEffect(() => {

        if (!!location.search)
            setReturnUri(location.search)

    }, [location.search])




    const initialValues = {
        fullName: '',
        email: '',
        password: '',
        confirmPassword: '',
        phoneNumber: '',
    }


    const validationSchema = Yup.object().shape({
        fullName: Yup.string().required('Required'),
        email: Yup.string().required('Required').email(),
        phoneNumber: Yup.string().required('Required').min(9).max(12),
        password: Yup.string().min(6, 'Minimum 6 symbols')
            .max(50, 'Maximum 50 symbols')
            .required('password is required'),
        confirmPassword: Yup.string()
            .required('password confirmation is required')
            .when('password', {
                is: (val) => (val && val.length > 0 ? true : false),
                then: () => Yup.string().oneOf([Yup.ref('password')], "password and Confirm password didn't match"),
            })


    })

    const navigate = useNavigate()



    const [loading, setLoading] = useState(false)
    const [hasErrors, setHasErrors] = useState('')



    onsubmit = (values) => {

        console.log('return URI : ', returnUri);




        setHasErrors('');

        window.scrollTo(0, 0);
        // values.CreatedBy = UserToken.LoggedInUserId;




        setLoading(true)

        console.log('values***--- ', values);

        register(values).then(
            () => {
                setLoading(false)


                if (!!returnUri) {
                    console.log('returnUri : ', returnUri);

                    navigate(`/login${returnUri}`)
                } else {
                    navigate('/login')
                }


                // toast.success('User created successfully', { position: toast.POSITION.TOP_RIGHT });

                // history.push('/users/AllUsers');

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

                    console.log('Obj.message : ', Obj.message);
                    console.log('type of Obj.message , ', typeof Obj.message);
                    let obj2 = JSON.parse(Obj.message);

                    setHasErrors(obj2.errorMessage);

                    // toast.error(obj2.errorMessage, { position: toast.POSITION.TOP_RIGHT });

                }

            })


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
                <div className="reg">
                    <div className="row">
                        <div className="col col-12 col-lg-6">
                            <img src={
                                new_parrot

                            } />
                        </div>
                        <div className="col col-12 col-lg-6 ">

                            <Formik
                                initialValues={initialValues}
                                validationSchema={validationSchema}
                                onSubmit={onsubmit}
                            >
                                {
                                    formik => {
                                        return (
                                            <Form className='reg-form form-large'>


                                                <h2>SIGN UP</h2>


                                                <FormikControl
                                                    control='input'
                                                    type='text'
                                                    placeholder='Name'
                                                    name='fullName'
                                                    className='form-item'
                                                />


                                                <FormikControl
                                                    control='input'
                                                    type='text'
                                                    placeholder='Email'
                                                    name='email'
                                                    className='form-item  large'
                                                />

                                                <FormikControl
                                                    control='input'
                                                    type='text'
                                                    placeholder='PhoneNumber'
                                                    name='phoneNumber'
                                                    className='form-item  large'
                                                />

                                                <FormikControl
                                                    control='input'
                                                    type='password'
                                                    placeholder='Password'
                                                    name='password'
                                                    className='form-item  large'
                                                />

                                                <FormikControl
                                                    control='input'
                                                    type='password'
                                                    placeholder='Confirm password'
                                                    name='confirmPassword'
                                                    className='form-item large'


                                                />



                                                <div className="form-check">
                                                    <input type="checkbox" id="updates" name="uadates" value="updates" />
                                                    <label htmlFor="t1">Send me updates and relevent news</label>
                                                </div>
                                                <button type="submit">

                                                    <div className='d-flex justify-content-center'>

                                                        CREATE ACCOUNT

                                                        {loading && (
                                                            <span className='indicator-progress' style={{ display: 'block' }}>
                                                                <span className='spinner-border spinner-border-sm align-middle m-1 mb-2'></span>
                                                            </span>
                                                        )}
                                                    </div>


                                                </button>
                                                <p>By clicking the button above, you are agreeing to our Terms of Use</p>
                                                <p>Already have an account? <span><Link to={'/login'} className=''>Login</Link></span></p>






                                            </Form>
                                        )
                                    }}

                            </Formik>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default Register