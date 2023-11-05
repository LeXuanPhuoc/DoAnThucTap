import React, { useContext } from 'react';

import { AuthContext} from'./../context/AuthContext.js'
import Login from './Login';
import Register from './Regiter';


export const NavComp = () => {
  const { currentUser, logout } = useContext(AuthContext);

  return (
    <nav className="container navbar sticky-top navbar-light ">
      <div className="container-fluid">
        <div className="d-flex">
          <div className="col flex ">
            {currentUser ? (
              <>
                <div className="btn btn-outline-secondary mx-2 disabled">
                  {currentUser.email}
                </div>
                <button
                  onClick={() => logout()}
                  className="w-[100px] bg-[#b41712] h-[50px]  flex items-center justify-center rounded-xl cursor-pointer relative overflow-hidden transition-all duration-500 ease-in-out shadow-md hover:scale-105 hover:shadow-lg before:absolute before:top-0 before:-left-full before:w-full before:h-full before:bg-gradient-to-r before:from-[#b41712] before:to-[#ff9264] before:transition-all before:duration-500 before:ease-in-out before:z-[-1] before:rounded-xl hover:before:left-0 text-[#fff]">
                
                  Logout
                </button>
              </>
            ) : (
              <>
                <Login/>
              </>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

