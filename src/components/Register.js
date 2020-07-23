import React, { useState } from 'react'

const Register = ({ updateRoute, updateUser }) => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const nameText = (event) => {
        setName(event.target.value)
    }

    const emailText = (event) => {
        setEmail(event.target.value)
    }

    const passwordText = (event) => {
        setPassword(event.target.value)
    }

    const submitRegister = () => {
        fetch('https://warm-sands-37521.herokuapp.com/register', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                name: name,
                email: email,
                password: password
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
    return (
        <div>
            <div className="form register">
                <label htmlFor="name">
                    <input id="name" type="text" className="red" onChange={nameText} placeholder="Name" />
                </label>
                <label htmlFor="email">
                    <input id="email" type="text" className="red" onChange={emailText} placeholder="Email address" />
                </label>
                <label htmlFor="password">
                    <input id="password" type="text" className="red" onChange={passwordText} placeholder="Password" />
                </label>
                <button onClick={() => submitRegister()}>Register</button>
            </div>
        </div>
    )
}

export default Register
