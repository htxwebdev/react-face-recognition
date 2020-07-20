import React from 'react'
import Logo from './Logo'

const Navigation = ({ isSignedIn, updateRoute, userName }) => {
    return (
        <div className="navigation">
            <Logo />
            <nav>
                {isSignedIn ? <>Welcome {userName} | <button onClick={() => updateRoute('signout')}>Sign Out</button></> : <><button onClick={() => updateRoute('signin')}>Sign in</button> | <button onClick={() => updateRoute('register')}>Register</button></>}
            </nav>
        </div>
    )
}

export default Navigation
