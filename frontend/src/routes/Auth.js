import { authService, firebaseInstance } from 'fbase';
import React, { useState } from 'react'

const Auth = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [newAccount, setNewAccount] = useState(true);
    const [errorMSG, setErrorMSG] = useState('');

    const onChange = (e) => {
        const { name, value } = e.target;
        if (name === 'email') {
            setEmail(value)
        } else if (name === 'password') {
            setPassword(value)
        }
    };

    const onSubmit = async (e) => {
        e.preventDefault();
        try {
            if (newAccount) {
                //create account
                await authService.createUserWithEmailAndPassword(email, password);
            } else {
                await authService.signInWithEmailAndPassword(email, password);
            }
        } catch (err) {
            console.log(err);
            setErrorMSG(err.message);
        }
    };

    // when you click social login button
    const onSocialClick = async (e) => {
        const { name } = e.target;
        let provider;
        if (name === "google") {
            provider = new firebaseInstance.auth.GoogleAuthProvider();
        } else if (name === "github") {
            provider = new firebaseInstance.auth.GithubAuthProvider();
        }
        const data = await authService.signInWithPopup(provider);
        console.log(data);
    };

    // when press enter, submit form
    const onKeyPress = (e) => {
        if (e.key === 'Enter') {
            onSubmit();
        }
    }

    const toggleAccount = () => {
        setNewAccount((prev) => {
            return !prev;
        })
    }

    return (
        <div>
            <form onSubmit={onSubmit}>
                <input
                    name="email"
                    type="email"
                    placeholder="Email"
                    required
                    value={email}
                    onChange={onChange}
                />
                <input
                    name="password"
                    type="password"
                    placeholder="Password"
                    required
                    value={password}
                    onChange={onChange}
                />
                <input
                    type="submit"
                    value={newAccount ? "Create Account" : "LogIn"}
                    onKeyPress={onKeyPress}
                />
                {errorMSG}
            </form>
            <span onClick={toggleAccount}>{newAccount ? "Sign In" : "Create Account"}</span>
            <div>
                <button name="google" onClick={onSocialClick}>Continue with Google</button>
                <button name="github" onClick={onSocialClick}>Continue with Github</button>
            </div>
        </div>
    )
}

export default Auth;