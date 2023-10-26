import React, { useContext, useEffect, useState } from 'react'
import { Modal, OverlayTrigger, Popover } from "react-bootstrap";
import Logo from '../../Assets/Images/logo.png';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBars, faX } from '@fortawesome/free-solid-svg-icons';

import { useAuth } from '../../Contexts/AuthContext';

import avatar from '../../Assets/Images/kitty1.jpg'
import 'smartmenus/dist/css/sm-core-css.css'
import 'smartmenus/dist/css/sm-clean/sm-clean.css'


const Header = () => {

    const { UserToken, setUserToken } = useAuth()



    const handleLogout = () => {


        setUserToken('', '', '', '', '', '')

    }


    return (
        <div className="header">


            <div className="container">
                <div className="row">
                    <div className="col-6 col-lg-2">
                        <div className="logo">
                            <Link to='/home'><img src={Logo} /></Link>

                        </div>
                    </div>
                    <div className="col-6 col-lg-6">

                        <nav className="navbar">
                            <ul id="main-menu" className="sm sm-menu">
                                <li><Link to="/">Home</Link></li>
                                <li><Link to="/pet-search">Buy/Sell</Link> </li>
                                <li><Link to={''} className='with-sub'>Pet Store
                                    <span className="sub-arrow"></span>
                                </Link>
                                    <ul className="sub-menu">

                                        <li><Link to="/">item 1</Link></li>
                                        <li><Link to="/">item 2</Link></li>
                                        <li><Link to="/">item 3</Link></li>
                                        <li><Link to="/">item 4</Link></li>

                                    </ul>
                                </li>

                                <li><Link to="/">How it works</Link>
                                </li>
                                <li><Link to="/">Contact Us</Link></li>

                            </ul>
                        </nav>

                        {/* <!-- Offcanvas Menu --> */}
                        <div className="nav-mob">
                            <button className="btn btn-primary" type="button" data-bs-toggle="offcanvas"
                                data-bs-target="#offcanvas" aria-controls="offcanvas">
                                <span><i><FontAwesomeIcon icon={faBars} /></i></span>
                            </button>

                            <div className="offcanvas offcanvas-end" tabIndex={-1} id="offcanvas"
                                aria-labelledby="offcanvasExampleLabel"
                                data-bs-backdrop="false"
                            >
                                <div className="offcanvas-header">
                                    <h2>MENU</h2>
                                    <button type="button" className="" data-bs-dismiss="offcanvas" aria-label="Close">
                                        <span><i><FontAwesomeIcon icon={faX} /></i></span>



                                    </button>
                                </div>
                                <div className="offcanvas-body">
                                    <ul id="mob-menu" className="sm sm-menu">


                                        <li><span><a href="/">Home</a></span></li>
                                        <li><Link to="/pet-search">Buy/Sell</Link> </li>
                                        <li><Link to={''} className='with-sub'>Pet Store
                                            <span className="sub-arrow"></span>
                                        </Link>
                                            <ul className="sub-menu">

                                                <li><Link to="/">item 1</Link></li>
                                                <li><Link to="/">item 2</Link></li>
                                                <li><Link to="/">item 3</Link></li>
                                                <li><Link to="/">item 4</Link></li>

                                            </ul>
                                        </li>
                                        <li><Link to="/">How it works</Link>
                                        </li>
                                        <li><Link to="/">Contact Us</Link></li>

                                        {!UserToken.email ?
                                            <>
                                                <li>
                                                    <Link to={'/login'} className='mx-1'>Login</Link>
                                                </li>
                                                <li>
                                                    <Link to={'/register'} className='mx-1'>Register</Link>
                                                </li>
                                            </>
                                            :
                                            <>
                                                <li>
                                                    <Link to={'/'} onClick={handleLogout} className='mx-1'>Logout</Link>
                                                </li>

                                                <span><Link className="btn-blue" to={'/'}>ADD PETS</Link></span>

                                            </>

                                        }

                                    </ul>
                                </div>
                            </div>
                        </div>

                        {/* // <!-- End Offcanvas --> */}
                    </div>
                    <div className="col-6 col-lg-4 ">
                        <div className="header-right">

                            {!UserToken.email ?
                                <>
                                    <span><Link to={'/login'} className='mx-1'>Login</Link></span>
                                    <span>/</span>
                                    <span><Link to={'/register'} className='mx-1'>Register</Link></span>
                                </>
                                :
                                <>
                                    <Link className="btn-blue" to={'/add-pet'}>ADD PETS</Link>
                                    <span><Link to={'/'} onClick={handleLogout} className='mx-1'>Logout</Link></span>
                                </>
                            }
                        </div>

                    </div>
                </div>
            </div>
        </div >
    );
}

export default Header;