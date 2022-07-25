import React, {useState} from 'react';
import "./Login.css";
import { Link, useNavigate } from "react-router-dom";
import { auth } from "./firebase";


function Login() {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const signIn = e => {
    e.preventDefault(); // prevents default browser refresh

    auth
      .signInWithEmailAndPassword(email, password)
      .then((auth) => {
        navigate('/');
      })

      .catch(error => alert(error.message))

  }

  const register = e => {
    e.preventDefault(); // prevents default browser refresh
    auth
      .createUserWithEmailAndPassword(email,password)
      .then((auth) => { 
        // Success with creating new user w/ email and PW
        console.log(auth);
        // if success, redirect to homepage
        if( auth )
        {
          navigate('/')
        }
      })
      .catch(error => alert(error.message))

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