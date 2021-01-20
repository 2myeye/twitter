import AuthForm from 'components/AuthForm';
import { authService, firebaseInstance } from 'fbase';
import React from 'react'

const Auth = () => {
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

    return (
        <div>
            <AuthForm />
            <div>
                <button name="google" onClick={onSocialClick}>Continue with Google</button>
                <button name="github" onClick={onSocialClick}>Continue with Github</button>
            </div>
        </div>
    )
}

export default Auth;