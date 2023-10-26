import { Fragment } from 'react';
import Header from './Header';
import Footer from './Footer';

type PropsType = {
  children : React.ReactNode
}

const Layout = (props : PropsType) => {
    return (
        <Fragment>
            <Header></Header>
            <main>{props.children}</main>
            <Footer></Footer>
        </Fragment>
    );
};

export default Layout;