import React, { useState } from 'react'
import ErrorMessage from './ErrorMessage'

const Register = ({ updateRoute, updateUser }) => {
    const [name, setName] = useState({
        input: '',
        isValid: Boolean,
        errorMsg: 'Must be at least 3 characters'
    });

    const [email, setEmail] = useState({
        input: '',
        isValid: Boolean,
        errorMsg: 'Invalid email format'
    });

    const [password, setPassword] = useState({
        input: '',
        isValid: Boolean,
        errorMsg: 'Password must be at least 6 characters long'
    });

    const nameText = (event) => {
        if (event.target.value.length < 3) {
            setName({
                ...name,
                input: event.target.value,
                isValid: false
            })
        } else {
            setName({
                ...name,
                input: event.target.value,
                isValid: true
            })
        }
    }

    const emailText = (event) => {
        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(event.target.value)) {
            setEmail({
                ...email,
                input: event.target.value,
                isValid: false
            })
        } else {
            setEmail({
                ...email,
                input: event.target.value,
                isValid: true
            })
        }
    }

    const passwordText = (event) => {
        if (event.target.value.length < 6) {
            setPassword({
                ...password,
                input: event.target.value,
                isValid: false
            })
        } else {
            setPassword({
                ...password,
                input: event.target.value,
                isValid: true
            })
        }
    }

    const submitRegister = () => {
        fetch('https://warm-sands-37521.herokuapp.com/register', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                name: name.input,
                email: email.input,
                password: password.input
            })
        })
            .then(response => {
                if (response.status === 200) {
                    return response.json()
                } else {
                    throw new Error(response.status)
                }
            })
            .then(user => {
                updateUser(user);
                updateRoute('home');
            })
            .catch(error => {
                console.log(error)
            })
    }

    const isFormValid = () => {
        if (name.isValid && email.isValid && password.isValid) {
            submitRegister();
        }
    }
    return (
        <div>
            <div className="form register">
                <label htmlFor="name">
                    <input id="name" type="text" className="red" onChange={nameText} placeholder="Name" />
                    <ErrorMessage valid={name.isValid} message={name.errorMsg} />
                </label>
                <label htmlFor="email">
                    <input id="email" type="text" className="red" onChange={emailText} placeholder="Email address" />
                    <ErrorMessage valid={email.isValid} message={email.errorMsg} />
                </label>
                <label htmlFor="password">
                    <input id="password" type="text" className="red" onChange={passwordText} placeholder="Password" />
                    <ErrorMessage valid={password.isValid} message={password.errorMsg} />
                </label>
                <button onClick={() => isFormValid()}>Register</button>
            </div>
        </div>
    )
}

export default Register
