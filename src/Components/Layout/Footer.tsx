
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
// import { faTwitter, faInstagram, faYoutube, faPinterestP, faFacebookF } from '@fortawesome/free-brands-svg-icons';
// import { faBars, faSearch, faShoppingCart } from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom';

const Footer = () => {
    return (
        <>
            {/* <div className="footer">
                <div className="container">
                    <div className="row">
                        <div className="col-12 col-lg-6">
                            <nav>
                                <ul>
                                    <li><Link to="/home">Home</Link></li>
                                    <li><Link to="/internal">Coworking</Link></li>
                                    <li><Link to="/">Membership Plan</Link></li>
                                    <li><Link to="/contact">Contact Us</Link></li>
                                </ul>
                            </nav>

                        </div>
                        <div className="col-12 col-lg-6">
                            <nav className="icons">
                                <ul>
                                    <li><span><i><FontAwesomeIcon icon={faFacebookF} /></i></span></li>
                                    <li><span><i><FontAwesomeIcon icon={faTwitter} /></i></span></li>
                                    <li><span><i><FontAwesomeIcon icon={faInstagram} /></i></span></li>
                                    <li><span><i><FontAwesomeIcon icon={faYoutube} /></i></span></li>
                                    <li><span><i><FontAwesomeIcon icon={faPinterestP} /></i></span></li>
                                </ul>
                            </nav>
                        </div>
                    </div>

                    <div className="copy-right">
                        <p> All Rights Reserves - Cooffice.pk Copyright © 2022</p>

                    </div>
                </div>
            </div> */}


            <div className="footer">
                <div className="container">
                    <div className="row">
                        <div className="col-6 col-lg-4">
                            <h2>Contact Us</h2>
                            <ul>
                                <li><span></span>Bahria Town,Islamabad</li>
                                <li><span></span>Call Us (+92) 800 990 8877 </li>
                                <li><span></span>info@pakanimal.com</li>
                            </ul>
                        </div>
                        <div className="col-6 col-lg-4">
                            <h2>Quick Links</h2>
                            <div className="row">
                                <div className="col-4 col-lg-6">
                                    <ul>

                                        <li><Link to="/">Dog</Link></li>
                                        <li><Link to="/">Cat</Link></li>
                                        <li><Link to="/">Bird</Link></li>
                                        <li><Link to="/">Cow</Link></li>

                                        {/* <li><a href="#">Dog</a></li>
                                        <li><a href="#">Cat</a></li>
                                        <li><a href="#">Bird</a></li>
                                        <li><a href="#">Cow</a></li>
 */}
                                    </ul>
                                </div>
                                <div className="col-8 col-lg-6">
                                    <ul>
                                        <li><a href="#">Rawalpindi</a></li>
                                        <li><a href="#">Lahore</a></li>
                                        <li><a href="#">Karachi</a></li>
                                        <li><a href="#">Islamabad</a></li>

                                    </ul>
                                </div>
                            </div>
                        </div>
                        <div className="col-12 col-lg-4 news-letter">
                            <h2>NewsLetter</h2>
                            <p>Subscribe to our newsletter and we will inform you about newest projects and promotions</p>
                            <form>
                                <input type="text" onChange={() => {}} value="Enter your Email" />
                                <button type="submit">SUBMIT</button>
                            </form>

                            <ul className="social-links">
                                <li><a href="#"><svg xmlns="http://www.w3.org/2000/svg" height="1em"
                                    viewBox="0 0 320 512">
                                    <path
                                        d="M279.14 288l14.22-92.66h-88.91v-60.13c0-25.35 12.42-50.06 52.24-50.06h40.42V6.26S260.43 0 225.36 0c-73.22 0-121.08 44.38-121.08 124.72v70.62H22.89V288h81.39v224h100.17V288z" />
                                </svg></a></li>
                                <li> <a href="#">
                                    <svg xmlns="http://www.w3.org/2000/svg" height="1em"
                                        viewBox="0 0 448 512">
                                        <path
                                            d="M224.1 141c-63.6 0-114.9 51.3-114.9 114.9s51.3 114.9 114.9 114.9S339 319.5 339 255.9 287.7 141 224.1 141zm0 189.6c-41.1 0-74.7-33.5-74.7-74.7s33.5-74.7 74.7-74.7 74.7 33.5 74.7 74.7-33.6 74.7-74.7 74.7zm146.4-194.3c0 14.9-12 26.8-26.8 26.8-14.9 0-26.8-12-26.8-26.8s12-26.8 26.8-26.8 26.8 12 26.8 26.8zm76.1 27.2c-1.7-35.9-9.9-67.7-36.2-93.9-26.2-26.2-58-34.4-93.9-36.2-37-2.1-147.9-2.1-184.9 0-35.8 1.7-67.6 9.9-93.9 36.1s-34.4 58-36.2 93.9c-2.1 37-2.1 147.9 0 184.9 1.7 35.9 9.9 67.7 36.2 93.9s58 34.4 93.9 36.2c37 2.1 147.9 2.1 184.9 0 35.9-1.7 67.7-9.9 93.9-36.2 26.2-26.2 34.4-58 36.2-93.9 2.1-37 2.1-147.8 0-184.8zM398.8 388c-7.8 19.6-22.9 34.7-42.6 42.6-29.5 11.7-99.5 9-132.1 9s-102.7 2.6-132.1-9c-19.6-7.8-34.7-22.9-42.6-42.6-11.7-29.5-9-99.5-9-132.1s-2.6-102.7 9-132.1c7.8-19.6 22.9-34.7 42.6-42.6 29.5-11.7 99.5-9 132.1-9s102.7-2.6 132.1 9c19.6 7.8 34.7 22.9 42.6 42.6 11.7 29.5 9 99.5 9 132.1s2.7 102.7-9 132.1z" />
                                    </svg>
                                </a></li>

                                <li><a href="#"><svg xmlns="http://www.w3.org/2000/svg" height="1em" viewBox="0 0 576 512">

                                    <path d="M549.655 124.083c-6.281-23.65-24.787-42.276-48.284-48.597C458.781 64 288 64 288 64S117.22 64 74.629 75.486c-23.497 6.322-42.003 24.947-48.284 48.597-11.412 42.867-11.412 132.305-11.412 132.305s0 89.438 11.412 132.305c6.281 23.65 24.787 41.5 48.284 47.821C117.22 448 288 448 288 448s170.78 0 213.371-11.486c23.497-6.321 42.003-24.171 48.284-47.821 11.412-42.867 11.412-132.305 11.412-132.305s0-89.438-11.412-132.305zm-317.51 213.508V175.185l142.739 81.205-142.739 81.201z" /></svg></a></li>

                                <li>
                                    <a href="#">
                                        <svg
                                            xmlns="http://www.w3.org/2000/svg" height="1em"
                                            viewBox="0 0 512 512">

                                            <path
                                                d="M459.37 151.716c.325 4.548.325 9.097.325 13.645 0 138.72-105.583 298.558-298.558 298.558-59.452 0-114.68-17.219-161.137-47.106 8.447.974 16.568 1.299 25.34 1.299 49.055 0 94.213-16.568 130.274-44.832-46.132-.975-84.792-31.188-98.112-72.772 6.498.974 12.995 1.624 19.818 1.624 9.421 0 18.843-1.3 27.614-3.573-48.081-9.747-84.143-51.98-84.143-102.985v-1.299c13.969 7.797 30.214 12.67 47.431 13.319-28.264-18.843-46.781-51.005-46.781-87.391 0-19.492 5.197-37.36 14.294-52.954 51.655 63.675 129.3 105.258 216.365 109.807-1.624-7.797-2.599-15.918-2.599-24.04 0-57.828 46.782-104.934 104.934-104.934 30.213 0 57.502 12.67 76.67 33.137 23.715-4.548 46.456-13.32 66.599-25.34-7.798 24.366-24.366 44.833-46.132 57.827 21.117-2.273 41.584-8.122 60.426-16.243-14.292 20.791-32.161 39.308-52.628 54.253z" />
                                        </svg>
                                    </a>
                                </li>
                                <li>
                                    <a href="#">
                                        <svg xmlns="http://www.w3.org/2000/svg" height="1em" viewBox="0 0 448 512">
                                            <path d="M448 80v352c0 26.5-21.5 48-48 48H154.4c9.8-16.4 22.4-40 27.4-59.3 3-11.5 15.3-58.4 15.3-58.4 8 15.3 31.4 28.2 56.3 28.2 74.1 0 127.4-68.1 127.4-152.7 0-81.1-66.2-141.8-151.4-141.8-106 0-162.2 71.1-162.2 148.6 0 36 19.2 80.8 49.8 95.1 4.7 2.2 7.1 1.2 8.2-3.3.8-3.4 5-20.1 6.8-27.8.6-2.5.3-4.6-1.7-7-10.1-12.3-18.3-34.9-18.3-56 0-54.2 41-106.6 110.9-106.6 60.3 0 102.6 41.1 102.6 99.9 0 66.4-33.5 112.4-77.2 112.4-24.1 0-42.1-19.9-36.4-44.4 6.9-29.2 20.3-60.7 20.3-81.8 0-53-75.5-45.7-75.5 25 0 21.7 7.3 36.5 7.3 36.5-31.4 132.8-36.1 134.5-29.6 192.6l2.2.8H48c-26.5 0-48-21.5-48-48V80c0-26.5 21.5-48 48-48h352c26.5 0 48 21.5 48 48z" /></svg>
                                    </a>
                                </li>



                                <li className="socialLinks-item socialLinks-item--pinterest"><a className="icon" href="https://www.pinterest.com/swordsswords/"><svg
                                    xmlns="http://www.w3.org/2000/svg" height="1em"
                                    viewBox="0 0 496 512">
                                    <path
                                        d="M496 256c0 137-111 248-248 248-25.6 0-50.2-3.9-73.4-11.1 10.1-16.5 25.2-43.5 30.8-65 3-11.6 15.4-59 15.4-59 8.1 15.4 31.7 28.5 56.8 28.5 74.8 0 128.7-68.8 128.7-154.3 0-81.9-66.9-143.2-152.9-143.2-107 0-163.9 71.8-163.9 150.1 0 36.4 19.4 81.7 50.3 96.1 4.7 2.2 7.2 1.2 8.3-3.3.8-3.4 5-20.3 6.9-28.1.6-2.5.3-4.7-1.7-7.1-10.1-12.5-18.3-35.3-18.3-56.6 0-54.7 41.4-107.6 112-107.6 60.9 0 103.6 41.5 103.6 100.9 0 67.1-33.9 113.6-78 113.6-24.3 0-42.6-20.1-36.7-44.8 7-29.5 20.5-61.3 20.5-82.6 0-19-10.2-34.9-31.4-34.9-24.9 0-44.9 25.7-44.9 60.2 0 22 7.4 36.8 7.4 36.8s-24.5 103.8-29 123.2c-5 21.4-3 51.6-.9 71.2C65.4 450.9 0 361.1 0 256 0 119 111 8 248 8s248 111 248 248z" />
                                </svg>
                                </a>
                                </li>

                            </ul>


                        </div>
                    </div>
                </div>
                <div className="copy-right">
                    <div className="container">
                        <p>© 2023 Pak Animals. All right reserved</p>
                    </div>
                </div>
            </div>


        </>
    );
}

export default Footer;