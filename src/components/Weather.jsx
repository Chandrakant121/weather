import React from 'react'
import { useEffect, useState } from 'react'
import CurrentTemp from './CurrentTemp';
import Hourdata from './Hourdata';
import Pressure from './Pressure';
import RiseSet from './RiseSet';
import "./Style.css";
import SunImg from './SunImg';
import { FaLocationArrow, FaSearch } from 'react-icons/fa';

const Weather = () => {
    const [search, setSearch] = useState("pune");
    const [latitude, setLat] = useState({ latitude: 18.519479 });
    const [longitude, setLong] = useState({ longitude: 73.870703 });
    const [current, setCurrent] = useState("");
    const [city, setCity] = useState("");
    const [hourly, setHourly] = useState("");
    const [daily, setDaily] = useState("");
    const [data, setData] = useState([]);
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
            const API_KEY = "4b662484c866d9490cda4b971b86dea4";
            const olduri = `http://api.positionstack.com/v1/forward?access_key=fab80d93ef21989e45e301fbf8f51ca2&query=${search}`;
            const res = await fetch(olduri);
            const alldata = await res.json()
            console.log(alldata)

            if (alldata?.data && alldata.data.length > 0) {
                const { latitude, longitude, name = "no data" } = alldata?.data[0];
                setCity(name);
                const uri = `https://api.openweathermap.org/data/2.5/onecall?units=metric&lat=${latitude}&lon=${longitude}&exclude=minutely,alerts&appid=${API_KEY}`;
                const weatherres = await fetch(uri);
                const data = await weatherres.json();

                console.log(data.hourly[0].temp)
                setData(data.daily);
                // setHourly(data.hourly.temp)
                setCurrent(data.current);
                setHourly(data.hourly);
                setDaily(data.daily);
                setHumidity(data.current.humidity)
                setPressure(data.current.pressure)
                setSunrise(data.current.sunrise)
                setSunset(data.current.sunset)
            } else {
                setData([...data]);
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





    return (
        <div >
            <div className="mainConatainer">
                <div />
                <div className="box">
                    {/* Search bar */}
                    <div className="input_search">
                        <FaLocationArrow style={{ margin: 10 }} />
                        <div className="input">
                            <input
                                type="Search"
                                value={search}
                                placeholder="Enter name of city"
                                onChange={(e) => {
                                    setSearch(e.target.value);
                                }} />
                        </div>
                        <FaSearch style={{ margin: 10 }} />
                    </div>

                    <div className="daily">
                        <ol>
                            {
                                data.map((y, key) => (
                                    <div className="card" key={key}>
                                        <div>
                                            {dayOfWeek(key)}
                                        </div>

                                        {y.temp.day}°
                                        <span className="celcius">C</span> <br />
                                        <img src={setimg(y.weather[0].main)} alt="" />
                                        {y.weather[0].main}
                                    </div>
                                ))}
                        </ol>
                    </div>

                    <CurrentTemp temp={current.temp} />
                    {/* Add bar chart herer */}

                    {/* Hour data */}
                    {/* <Hourdata data={hourly} /> */}
                    {/* Pressure and Humidity */}
                    <Pressure pressure={pressure} humidity={humidity} />
                    {/* sunrise and sunset */}
                    <RiseSet sunrise={sunrise} sunset={sunset} />
                    {/* Added Img  */}
                    <SunImg />


                </div>
            </div>

        </div >
    )
}

export default Weather




let dayOfWeek = function (dayNum) {
    var days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    var d = new Date();
    var s = (d.getDay() + 1 + dayNum) % 7;
    return days[s];
};
