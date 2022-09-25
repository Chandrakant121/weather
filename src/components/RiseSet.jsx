import React from 'react'

const RiseSet = ({ sunrise, sunset }) => {
    function sunsetrise(unix_timestamp) {
        var date = new Date(unix_timestamp * 1000);
        // Hours part from the timestamp
        var hours = date.getHours();
        // Minutes part from the timestamp
        var minutes = "0" + date.getMinutes();
        // Seconds part from the timestamp
        // var seconds = "0" + date.getSeconds();
        // Will display time in 10:30:23 format
        var formattedTime = hours + ':' + minutes.substr(-2)
        return formattedTime
    }
    return (
        <div>
            <div className='rise_set'>
                <div>
                    <b>Sunrise</b>
                    <div>{sunsetrise(sunrise)}{" "}am</div>
                </div>
                <div>
                    <b>Sunset</b>
                    <div>{sunsetrise(sunset)}{" "}pm</div>
                </div>
            </div>
        </div>
    )
}

export default RiseSet