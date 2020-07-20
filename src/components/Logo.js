import React from 'react'
import Tilt from 'react-tilt'
import brainImg from '../assets/images/brain.png'

const Logo = () => {
    return (
        <div className="logo">
            <Tilt className="Tilt" options={{ max: 50 }} style={{ height: 105, width: 100 }} >
                <div className="Tilt-inner"> <img src={brainImg} alt="logo" style={{ width: '100%' }} /> </div>
            </Tilt>
        </div>
    )
}

export default Logo
