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
          <div className="col">
            {currentUser ? (
              <>
                <div className="btn btn-outline-secondary mx-2 disabled">
                  {currentUser.email}
                </div>
                <div
                  onClick={() => logout()}
                  className="btn btn-outline-secondary mx-2"
                >
                  Logout
                </div>
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

