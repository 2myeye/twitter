import { authService } from 'fbase';
import React, {useState} from 'react';

const AuthForm = () => {
    const [errorMSG, setErrorMSG] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [newAccount, setNewAccount] = useState(true);

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

    const onChange = (e) => {
        const { name, value } = e.target;
        if (name === 'email') {
            setEmail(value)
        } else if (name === 'password') {
            setPassword(value)
        }
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
            <form onSubmit={onSubmit} className='container'>
                <input
                    name="email"
                    type="email"
                    placeholder="Email"
                    required
                    value={email}
                    onChange={onChange}
                    className='authInput'
                />
                <input
                    name="password"
                    type="password"
                    placeholder="Password"
                    required
                    value={password}
                    onChange={onChange}
                    className='authInput'
                />
                <input
                    type="submit"
                    value={newAccount ? "Create Account" : "LogIn"}
                    onKeyPress={onKeyPress}
                    className='authInput authSubmit'
                />
                {errorMSG && <span className='authError'>{errorMSG}</span>}
            </form>
            <span onClick={toggleAccount} className='authSwitch'>{newAccount ? "Sign In" : "Create Account"}</span>
        </div>
    )
}
export default AuthForm;