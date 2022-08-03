import React, {useState} from 'react';
import "./Login.css";
import { Link, useNavigate } from "react-router-dom";
// import { auth } from "./firebase";
import { useStateValue } from "./StateProvider";
import { UserMatch, UserExists, AddUserToDB, getUserID} from "./DBFunctions";



function Login() {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [{ user }, dispatch] = useStateValue();

  const emailFormat = /^\w+@\w+\.\w+/;

  const signIn = e => {
    e.preventDefault(); // prevents default browser refresh
    // check for valid input
    if( email.match(emailFormat) === null ){
      // display error if invalid input
      console.log("invalid email format");
      return;
    }
     // Verifying if a email + pw combo exists
     UserMatch(email, password).then(accountFound => {
      if (accountFound === null) {
        alert('Could not find an account with the credentials entered.');
        return;
      } 
      
      // JUST FOR TESTING
      else {
        // Printing account to console
        console.log('Logging in...')
        console.log(accountFound);
        navigate('/');
      }
    });
    
    // display error
    // else:
    // get user's unique ID from DB
    dispatch({
      type: 'SET_USER',
      user: {
        ID: getUserID(email),
        email: email,
      },
    });
    navigate('/');


  }

  const register = e => {
    e.preventDefault(); // prevents default browser refresh
        // check for valid input
    if( email.match(emailFormat) === null ){
      console.log("invalid email format")
      return;
    }
    // do DB query with username + pw
    // if match:
    if( UserExists(email) === true ){
      // display error if no username + pw match
      console.log("There is an account registered with that email already")
      return;
    }
    // else:
    // add email + pw to DB
    AddUserToDB(email, password)
    // get user's unique ID from DB
    getUserID(email)
    dispatch({
      type: 'SET_USER',
      user: {
        ID: getUserID(email),
        email: email,
      },
    });
    // add email + pw to DB
    AddUserToDB(email, password)
    // get addy and payment from query result
      
    navigate('/');

  }


  return (
    <div className="login">
        <Link to='/'>
            <img className="login__logo" src="./images/ibuy.png" />
        </Link>

    <div className="login__container">
      <h1>Sign In</h1>

      <form>
        <h5>Email</h5>
        <input type="text" value={email} onChange={e => setEmail(e.target.value)}/>

        <h5>Password</h5>
        <input type="password" value={password} onChange={e => setPassword(e.target.value)}/>

        <button type="submit" onClick={signIn} className='login__signInButton'> Sign In </button>

        <p>
          By signing in, you agree to iBuy's Conditions of Use & Sale. Please see our Privacy Notice, our Cookies Notice and our Interest-Based Ads Notice
        </p>

        <button onClick={register} className='login__registerButton'>Create your iBuy account</button>
      </form>
    </div>

  </div>
  )
}


export default Login