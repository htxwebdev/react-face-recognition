import React from 'react'
import FaceBox from './FaceBox'

const FaceRecognition = ({ image, boxes }) => {
    const boxDivs = boxes.length && boxes.map((item, index) => {
        return <FaceBox face={item} key={index} />
    })

    if (image.length) {

        return (
            <div className="image-result">
                <div className="bounding-box">
                    <img id="result" src={image} alt="result" />
                    {boxDivs}
                </div>
            </div>
        )
    }
    return <div></div>

}

export default FaceRecognition
