import React from 'react'

const Rank = ({ entries }) => {
    return (
        <div className="rank">
            {`Your current entry count is....#${entries}`}
        </div>
    )
}

export default Rank
