import axios from 'axios'
import { API_URL } from './PetServices'


export const GET_USER_BY_ACCESSTOKEN_URL = `${API_URL}/api/Account/GetUserByToken`

export const LOGIN_URL = `${API_URL}/api/Account/Login`
export const REGISTER_URL = `${API_URL}/api/Account/SignUp`
export const REQUEST_PASSWORD_URL = `${API_URL}/api/Account/forgotPassword`
export const CONFIRM_EMAIL_URL = `${API_URL}/api/Account/ConfirmEmail`

// Server should return AuthModel
export function login( model : any) {
  
  console.log('Login URL --- ',LOGIN_URL);
  
  return axios.post(LOGIN_URL, model)
}

// Server should return AuthModel
export function register(model : any) {

  return axios.post(REGISTER_URL, model)
}

//-----------------------------------------
export function confirmEmail(model : any) {
  console.log(
    'in confirm Email Function---- at line 34--- AuthCURD---model---',
     model
    );
  
  return axios.post(CONFIRM_EMAIL_URL, model)
}

// Server should return object => { result: boolean } (Is Email in DB)
export function requestPassword(email: string) {
  return axios.post<{result: boolean}>(REQUEST_PASSWORD_URL, {email})
}

export function getUserByToken() {
  // Authorization head should be fulfilled in interceptor.
  // Check common redux folder => setupAxios
  return axios.get(GET_USER_BY_ACCESSTOKEN_URL)
}
