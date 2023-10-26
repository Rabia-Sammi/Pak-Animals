import React, { createContext, useContext, useState } from "react";


export const AuthContext = createContext({} as AuthContextType);

type AuthContextProviderProps = {
  children: React.ReactNode
}

type AuthContextType = {

  UserToken: {
    token: string,
    expiry: string,
    name: string,
    email: string,
    phone : string,
    userId : string

  }
  // setHotelId : React.Dispatch<React.SetStateAction<string>>
  setUserToken: (
    token: string,
    expiry: string,
    name: string,
    email: string,
    phone : string,
    userId : string
  ) => void


}


export const AuthProvider = ({ children }: AuthContextProviderProps) => {


        let  token_ = localStorage.getItem('Token');
        let  expiry_ = localStorage.getItem('Expiry');
        let  userId_ = localStorage.getItem('userId');

        
        let  Name_ = localStorage.getItem('name');
        let  email_ = localStorage.getItem('email');
        let  phone_ = localStorage.getItem('phone');



  const [UserToken, setUser_Token] = useState({
    token: token_!,
    expiry: expiry_!,
    name : Name_!,
    email: email_!,
    phone : phone_!,
    userId : userId_!

  })

  const setUserToken = (token: string, expiry: string,
     name: string,
    email: string, phone : string, userId : string) => {

    localStorage.setItem('Token', token);

    localStorage.setItem('Expiry', expiry);

    localStorage.setItem('userId', userId);

    localStorage.setItem('Name', name);
    localStorage.setItem('email', email);
    localStorage.setItem('phone', phone);

    setUser_Token({
      token,
      expiry,
      name,
      email,
      phone,
      userId
    })

  }

  return (
    <AuthContext.Provider value={{ UserToken, setUserToken }}>
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => useContext(AuthContext)

