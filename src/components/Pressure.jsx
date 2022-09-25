import React from 'react'

const Pressure = ({ pressure, humidity }) => {
    return (
        <div>
            <div className='p_and_h'>
                <div className='boxboreder'>
                    <b>Pressure</b>
                    <div> {pressure}{" "}hpa</div>
                </div>
                <div className='boxboreder'>
                    <b>Humidity</b>
                    <div> {humidity}{" "}%</div>
                </div>
            </div></div>
    )
}

export default Pressure