import React from 'react';
import Header from '../Header/Header';
import Footer from '../Footer/Footer';
import Routers from '../../routers/Routers';
import { AuthProvider } from '../../context/AuthContext';




const Layout = () => {

  return (
    <>
      <Header />
      <AuthProvider> <div>
        <Routers />
      </div></AuthProvider>
     
      <Footer />
      
    </>
  );
};

export default Layout;