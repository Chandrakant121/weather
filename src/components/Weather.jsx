import React from 'react'
import { useEffect, useState } from 'react'
import "./Style.css";

const Weather = () => {
    const [search, setSearch] = useState("pune");
    const [latitude, setLat] = useState([]);
    const [longitude, setLong] = useState([]);
    const [current, setCurrent] = useState("");
    const [city, setCity] = useState("");
    const [hourly, setHourly] = useState("");
    const [daily, setDaily] = useState("");
    const [data, setData] = useState(null);
    const [pressure, setPressure] = useState("");
    const [humidity, setHumidity] = useState("");
    const [sunset, setSunset] = useState("");
    const [sunrise, setSunrise] = useState("");


    // location 
    useEffect(() => {
        navigator.geolocation.getCurrentPosition(function (position) {
            setLat(position.coords.latitude);
            setLong(position.coords.longitude);
        });
        // console.log("Latitude is:", latitude)
        // console.log("Longitude is:", longitude)
    }, [latitude, longitude]);


    useEffect(() => {
        const fetchApi = async () => {
            // const key = "4b662484c866d9490cda4b971b86dea4" 
            const API_KEY = "2935c91cbd3fb88da8e19646f93fbbbd";
            const uri = `http://api.positionstack.com/v1/forward?access_key=fab80d93ef21989e45e301fbf8f51ca2&query=${search}`;


            const res = await fetch(uri);
            const alldata = await res.json()

            if (alldata?.data && alldata.data.length > 0) {
                const { latitude = 0, longitude, name = "no data" } = alldata?.data[0];
                setCity(name);
                const uri = `https://api.openweathermap.org/data/2.5/onecall?units=metric&lat=${latitude}&lon=${longitude}&exclude=minutely,alerts&appid=${API_KEY}`;
                const weatherres = await fetch(uri);
                const data = await weatherres.json();

                console.log(data)
                setData(data);
                setCurrent(data.current);
                setHourly(data.hourly);
                setDaily(data.daily);
                setHumidity(data.current.humidity)
                setPressure(data.current.pressure)
                setSunrise(data.current.sunrise)
                setSunset(data.current.sunset)
            } else {
                setData(false);
            }
        };
        fetchApi();
    }, [search]);

    // img changes according to weather condition

    function setimg(day) {
        var src
        if (day == "Rain") {
            src = "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQiGZKEkpEVGF12T-0j_Y808gG-HORK2ME_gA&usqp=CAU"
        }
        else if (day == "Clouds") {
            src = "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT4JFYacuTD29Lx--J3gOu-D4hfW1fdVBjqW-IXqaKGObHYXBjp1ZrUZmNHa2PXmmhYGbE&usqp=CAU"
        }
        else if (day == "Clear") {
            src = "https://www.freeiconspng.com/thumbs/weather-icon-png/weather-icon-png-8.png"
        }
        return src
    }


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
        <div >
            <div className="mainConatainer">
                <div />
                <div className="box">
                    {/* Search bar */}
                    <div className="input_search">
                        <div className="input">
                            <input
                                type="Search"
                                value={search}
                                placeholder="Enter name of city"
                                onChange={(e) => {
                                    setSearch(e.target.value);
                                }} />
                        </div>
                    </div>
                    {
                        !data ? (<><h2>Loading</h2> <img src="https://www.freeiconspng.com/thumbs/weather-icon-png/weather-icon-png-8.png" alt="" /></>) : (
                            <>
                                <div className="daily">
                                    <ol>
                                        {
                                            data.daily.slice(1).map((y, key) => (
                                                <div className="card">
                                                    <div>
                                                        {dayOfWeek(key)}
                                                    </div>
                                                    {y.temp.day}°
                                                    <span className="celcius">C</span> <br />

                                                    {/* <img src="https://www.freeiconspng.com/thumbs/weather-icon-png/weather-icon-png-8.png" alt="" /> */}
                                                    <img src={setimg(y.weather[0].main)} alt="" />
                                                    {y.weather[0].main}
                                                </div>
                                            ))}
                                    </ol>
                                </div>


                                <div className="info">
                                    <h2 className="temp">{Math.ceil(current?.temp)}°C</h2>
                                    <img src="https://www.pngmart.com/files/20/Summer-Sun-PNG.png" alt="" />
                                </div>


                                {/* Add bar chart herer */}



                                <div className="hourly">
                                    <ol>
                                        {data.hourly.map((x, key) => (
                                            <div className="card">
                                                <b>{Math.ceil(x.temp)}°<span className="celcius">C</span></b>
                                                <br />
                                                {settimes(key)}
                                            </div>
                                        ))}
                                    </ol>
                                </div>


                                {/* Pressure and Humidity */}
                                <div className='p_and_h'>
                                    <div className='boxboreder'>
                                        <b>Pressure</b>
                                        <div> {pressure}{" "}hpa</div>
                                    </div>
                                    <div className='boxboreder'>
                                        <b>Humidity</b>
                                        <div> {humidity}{" "}%</div>
                                    </div>
                                </div>

                                {/* sunrise and sunset */}

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

                                    <div className='rise_set_img'>
                                        <img src="https://static.vecteezy.com/system/resources/thumbnails/006/923/031/small/day-cycle-line-icon-sun-position-changing-movement-path-sun-clock-with-the-time-of-day-natural-phenomenon-sunshine-sunrise-sunset-illustration-vector.jpg" alt="" />
                                    </div>
                                    <div className='imgtime'>
                                        <div>6{" "}am</div>
                                        <div>1{" "}pm</div>
                                        <div>8{" "}pm</div>
                                    </div>
                                </div>

                            </>
                        )}

                </div>
            </div>

        </div >
    )
}

export default Weather



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


let dayOfWeek = function (dayNum) {
    var days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    var d = new Date();
    var s = (d.getDay() + 1 + dayNum) % 7;
    return days[s];
};
