import React from 'react'


const Hourdata = ({ data }) => {
    // console.log(data)

    let settimes = function (timeNum) {
        var hour = new Array(47);
        var date = new Date();
        var hours = date.getHours() > 12 ? date.getHours() - 12 : date.getHours();
        var am_pm = date.getHours() >= 12 ? "pm" : "am";
        // time conversion function 
        function nexthourtime(hour, ampm) {
            let nexthour, nextampm;
            if (hour === 11) {
                nexthour = 12;
                if (ampm === "am") {
                    nextampm = "pm";
                } else {
                    nextampm = "am";
                }
            }
            else if (hour === 12) {
                nexthour = 1;
                if (ampm === "am") {
                    nextampm = "am";
                } else {
                    nextampm = "pm";
                }
            }
            else {
                nexthour = hour + 1;
                nextampm = ampm;
            }
            return [nexthour, nextampm];
        }

        hour[0] = nexthourtime(hours, am_pm);
        for (let i = 1; i < 48; i++) {
            hour[i] = nexthourtime(hour[i - 1][0], hour[i - 1][1])
        }
        return hour[timeNum];
    };

    return (
        <div> <div className="hourly">

            <ol>
                {
                    data.slice[0].map((x, key) => (
                        <div className="card" key={key}>
                            <b>{Math.ceil(x.temp)}°<span className="celcius">C</span></b>
                            <br />
                            {settimes(key)}
                        </div>
                    ))}
            </ol>
        </div></div>
    )
}

export default Hourdata