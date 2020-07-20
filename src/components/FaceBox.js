import React from 'react'

const FaceBox = ({ face }) => {
    return (
        <div className="face-box" style={{ top: face.topCord, bottom: face.bottomCord, left: face.leftCord, right: face.rightCord }}></div>
    )
}

export default FaceBox
