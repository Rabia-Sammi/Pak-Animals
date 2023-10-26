import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css'
import React, { Suspense, useEffect } from 'react';
import { Route, Routes, Navigate } from 'react-router-dom';
// import { Route, Switch,Redirect } from 'react-router-dom';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap-icons/font/bootstrap-icons.css'
import Layout from './Components/Layout/Layout';
import { useAuth } from './Contexts/AuthContext';
import LandingPage from './Pages/Landing Page';
import ItemDetails from './Pages/ItemDetails';
import PetsListing from './Pages/PetsListing';
import AddPet from './Pages/AddPet';
import Register from './Pages/Register';
import Login from './Pages/Login';
import AuthVerify from './common/auth-verify';

function App() {

 
  return (
    <Suspense>
      <Layout>
        <Routes>
          <Route path="/" element={<Navigate replace to="/home" />} />
          <Route path="/home" element={<LandingPage />} />

          <Route path="/add-pet" element={<AddPet />} />


          <Route path="/register" element={<Register />} />

          <Route path="/login" element={<Login />} />

          {/*<Route path='/internal' element={<Internal />} />
      <Route path='/contact' element={<Contact />} />

 */}

          <Route path='/pet-search' element={<PetsListing />} />

          <Route path='/details/:name' element={<ItemDetails />} />
        </Routes>
        
      </Layout>
      <AuthVerify />

    </Suspense>
  );
}

export default App;
