import React, { useState, useEffect } from 'react'
import new_parrot from "../Assets/Images/new-parrot.jpg";
import { Formik, Form } from 'formik'
import * as Yup from 'yup'
import { Form as BSForm, Spinner, Button, Card, FormLabel, FormSelect } from 'react-bootstrap-v5'
import FormikControl from '../Components/ReusableFormikComponents/FormikControl'
import axios from 'axios'
import { login, register } from '../Service/AuthServices';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../Contexts/AuthContext';

const Login = () => {

    const { UserToken, setUserToken } = useAuth()
    const location = useLocation()

    const navigate = useNavigate()

    const urlParams = new URLSearchParams(location.search)

    const [returnUri, setReturnUri] = useState("")

    useEffect(() => {

        if (!!location.search)
            setReturnUri(location.search.replace("?returnUri=", "").replace("&&", "?"))

    }, [location.search])

    //    console.log('url : ',url);
    const initialValues = {
        email: '',
        password: ''
    }


    const validationSchema = Yup.object().shape({
        email: Yup.string().required('Required').email(),
        password: Yup.string().min(6, 'Minimum 6 symbols')
            .max(50, 'Maximum 50 symbols')
            .required('password is required'),


    })




    const [loading, setLoading] = useState(false)
    const [hasErrors, setHasErrors] = useState('')



    onsubmit = (values) => {

        console.log('returnUri : ', returnUri);

        setHasErrors('');

        window.scrollTo(0, 0);
        // values.CreatedBy = UserToken.LoggedInUserId;




        setLoading(true)

        console.log('values***--- ', values);

        login(values).then(
            (response) => {
                setLoading(false)


                setUserToken(
                    response.data.accessToken,
                    response.data.expiresIn,
                    response.data.name,
                    response.data.email,
                    response.data.phoneNumber,
                    response.data.loggedInUserId,
                );


                if (!!returnUri) {
                    console.log('returnUri : ', returnUri);
                    navigate(returnUri)
                } else {
                    navigate('/')
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


                                                <h2>LOGIN</h2>

                                                <FormikControl
                                                    control='input'
                                                    type='text'
                                                    placeholder='Email'
                                                    name='email'
                                                    className='form-item  large'
                                                />

                                                <FormikControl
                                                    control='input'
                                                    type='password'
                                                    placeholder='Password'
                                                    name='password'
                                                    className='form-item  large'
                                                />



                                                <button type="submit">
                                                    <div className='d-flex justify-content-center'>

                                                        SIGN IN

                                                        {loading && (
                                                            <span className='indicator-progress' style={{ display: 'block' }}>
                                                                <span className='spinner-border spinner-border-sm align-middle m-1 mb-2'></span>
                                                            </span>
                                                        )}
                                                    </div>
                                                </button>


                                                <p>Dont have an account?
                                                    <span>
                                                        <Link to={`/register${returnUri ? `?returnUri=${returnUri}` : ""}`} className=''>
                                                            Register
                                                        </Link>
                                                    </span>
                                                </p>






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

export default Login