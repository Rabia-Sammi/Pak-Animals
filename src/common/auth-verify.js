import React from 'react'
// import { toast } from "react-toastify";
import { useAuth } from '../Contexts/AuthContext';
import { withRouter } from '../hooks/withRouterHook';

const parseJwt = (token) => {
  try {
    return JSON.parse(atob(token.split('.')[1]));
  } catch (error) {
    return null;
  }
}



const AuthVerify = () => {


  // const { Hotel, setHotel } = useHotel()

  const { UserToken, setUserToken } = useAuth();

  const logout = () => {

    setUserToken('', '', '', '', '', '');

  }

  // console.log('hisoty :: ', history);
  console.log('*************&&&&&&F$$$$');

  console.log('UserToken : ', UserToken);

  if (!!UserToken.token) {
    const decodedJwt = parseJwt(UserToken.token);


    console.log((decodedJwt.exp * 1000) > Date.now());

    if (decodedJwt.exp * 1000 < Date.now()) {

      console.log('Session expired log.. ');

      logout()

      // console.log('decodedJwt ', decodedJwt.exp * 1000);
      // console.log('Date.now() ', Date.now());

    }

    return (
      <div></div>
    )
  }
}

export default withRouter(AuthVerify);