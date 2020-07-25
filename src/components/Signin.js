import React, { useState } from 'react'
import ErrorMessage from './ErrorMessage'

const Signin = ({ updateRoute, updateUser }) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [submitValid, setSubmitValid] = useState({
        isValid: Boolean,
        errorMsg: 'User/Password combination not found'
    });

    const emailText = (event) => {
        setEmail(event.target.value)
    }

    const passwordText = (event) => {
        setPassword(event.target.value)
    }

    const submitSignIn = () => {
        fetch('https://warm-sands-37521.herokuapp.com/signin', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                email: email,
                password: password
            })
        })
            .then(response => {
                if (response.status === 200) {
                    setSubmitValid({
                        ...submitValid,
                        isValid: true
                    });
                    return response.json()
                } else {
                    setSubmitValid({
                        ...submitValid,
                        isValid: false
                    });
                    throw new Error(response.status)
                }
            })
            .then(data => {
                console.log(data);
                updateUser(data);
                updateRoute('home');
            })
            .catch(error => {
                console.log(error);
            })
    }
    return (
        <div>

            <div className="form signin">
                <label htmlFor="email">
                    <input id="email" type="text" className="red" onChange={emailText} placeholder="Email address" />
                </label>
                <label htmlFor="password">
                    <input id="password" type="text" className="red" onChange={passwordText} placeholder="Password" />
                </label>
                <ErrorMessage valid={submitValid.isValid} message={submitValid.errorMsg} />
                <button onClick={() => submitSignIn()}>Sign in</button>

            </div>

        </div>
    )
}

export default Signin
