import React from 'react'

const CurrentTemp = ({ temp }) => {
    return (
        <div>
            <div className="info">
                <h2 className="temp">{Math.ceil(temp)}°C</h2>
                <img src="https://www.pngmart.com/files/20/Summer-Sun-PNG.png" alt="" />
            </div>
        </div>
    )
}

export default CurrentTemp