import React from 'react';
import './Header.css';
import { Link } from "react-router-dom";
import { useStateValue } from './StateProvider';
//import { auth } from './firebase';


function Header() {
    const [{ cart, user }, dispatch] = useStateValue();

    // will be used to display the username if logged in or guest if not logged in
    let account = 'Guest';
    if( user && user?.email !== 'Guest' )
    {
        account = user?.email;
    }

    

    const handleAuthentication = () => {
        if( user && user?.email !== 'Guest' ) 
        {
//            auth.signOut();
            //user = null;
            dispatch({
                type: 'SET_USER',
                user: null
              })
            //dispatch({
                //type: 'SET_USER',
                //user: {
                  //  ID: 0,
                //  email: 'Guest',
                //},
             // });
        }
        
    }

  return (
    <div className='header'>
        <Link to='/'>
            <img
                className="header__logo" 
                src="./images/ibuy.png"
            />
        </Link>

        <div className="header__search">
                <input className="header__searchInput" type="text" />
                <button><img className="header__searchButton" src="./images/search.png"/></button>
        </div>

        <div className="header__nav">
            <Link to="/login">
                <div onClick={handleAuthentication} className='header__option'>
                    <span
                        className='header__optionLineOne'>Hello, {account}
                    </span>
                    <span
                        className='header__optionLineTwo'>{user && user?.email !== 'Guest' ? 'Sign Out' : 'Sign In'}
                    </span>
                </div>
            </Link>

            <div className='header__option'>
                <span
                    className='header__optionLineOne'>Account
                </span>
                <span
                    className='header__optionLineTwo'>Settings
                </span>
            </div>
            
            <Link to='/checkout'>
                <div className="header__optionCart">
                    <img className="header__cartButton" src="./images/cart.png" />
                    <span className="header__optionLineTwo header__cartCount">{cart?.length}</span>
                </div>
            </Link>

        </div>
    </div>
  )
}

export default Header