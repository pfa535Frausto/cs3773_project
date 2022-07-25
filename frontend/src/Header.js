import React from 'react';
import './Header.css';
import { Link } from "react-router-dom";
import { useStateValue } from './StateProvider';
import { auth } from './firebase';


function Header() {
    const [{ cart, user }, dispatch] = useStateValue();

    // will be used to display the username if logged in or guest if not logged in
    let account = 'Guest';
    if( user )
    {
        account = user?.email;
    }

    

    const handleAuthentication = () => {
        if( user ) 
        {
            auth.signOut();
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
                        className='header__optionLineTwo'>{user ? 'Sign Out' : 'Sign In'}
                    </span>
                </div>
            </Link>

            <div className='header__option'>
                <span
                    className='header__optionLineOne'>Returns
                </span>
                <span
                    className='header__optionLineTwo'>& Orders
                </span>
            </div>

            <div className='header__option'>
                <span
                    className='header__optionLineOne'>Your
                </span>
                <span
                    className='header__optionLineTwo'>Prime
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