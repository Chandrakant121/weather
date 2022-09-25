import React from 'react'
import { useEffect, useState } from 'react'
const Weather = () => {
    const [search, setSearch] = useState("pune");
    const [latitude, setLat] = useState([]);
    const [longitude, setLong] = useState([]);
    const [current, setCurrent] = useState("");
    const [city, setCity] = useState("");
    const [hourly, setHourly] = useState("");
    const [daily, setDaily] = useState("");
    const [data, setData] = useState(null);

    // const key = "4b662484c866d9490cda4b971b86dea4"


    useEffect(() => {
        navigator.geolocation.getCurrentPosition(function (position) {
            setLat(position.coords.latitude);
            setLong(position.coords.longitude);
        });

        console.log("Latitude is:", latitude)
        console.log("Longitude is:", longitude)
    }, [latitude, longitude]);

    useEffect(() => {
        const fetchApi = async () => {
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
            } else {
                setData(false);
            }
        };
        fetchApi();
    }, [search]);



    return (

        <div>
           
        </div>
    )
}

export default Weather