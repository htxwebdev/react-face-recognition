import React from 'react'
import { CSSTransition } from 'react-transition-group'

const ErrorMessage = ({ valid, message }) => {
    return (
        <div>
            <CSSTransition in={!valid && !null} timeout={200} classNames="animate">
                <div className="error">{message}</div>
            </CSSTransition>
        </div>
    )
}

export default ErrorMessage
