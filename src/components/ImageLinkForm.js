import React from 'react'

const ImageLinkForm = ({ input, onInputChange, onButtonSubmit }) => {
    return (
        <div className="image-link-form">
            <div className="segment">
                <h4>Provide an image link below to detect any faces</h4>
            </div>
            <div className="form">
                <label htmlFor="searchimage">
                    <input id="searchimage" type="text" className="red" value={input} onChange={onInputChange} />
                </label>
                <button onClick={onButtonSubmit}>Detect</button>
            </div>
        </div>
    )
}

export default ImageLinkForm
