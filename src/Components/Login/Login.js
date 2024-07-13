import React from 'react'
import './Login.css'
import db, { auth, googleProvider } from '../../firebase'
import { useNavigate } from 'react-router-dom'



function Login({ setUser }) {

    const navigate = useNavigate();
    const signInWithGoogle = () => {
        auth
        .signInWithPopup(googleProvider)
        .then((result) => {
            const newUser = {
                fullname: result.user.displayName,
                email: result.user.email,
                photoURL: result.user.photoURL,
            };
            navigate("/");
            setUser(newUser);
            
            // Store data in localStorage
            localStorage.setItem('user', JSON.stringify(newUser))
            db.collection("user1").doc(result.user.email).set(newUser);
        })
        .catch((err) => alert(err.message));
    };


    return (
        <div className="login">
            <div className="login-container">
                <img className="login-logo" src="./logo-whatsapp.png" alt="" />
                <p className="login-name">WhatsApp Web</p>
                <button className="login-btn" onClick={signInWithGoogle}>
                    <img src="./Google_logo.png" alt="login with google" />
                    Login with Google
                </button>
            </div>
        </div>
    );
}

export default Login
