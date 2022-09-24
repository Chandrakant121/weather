import React from 'react'
import { useEffect, useState } from 'react'

const Weather = () => {
    const [data, setData] = useState([])
    const [searchTerm, setSearchTerm] = useState("pune")
    var longitude;
    var latitude;
    // const key = "4b662484c866d9490cda4b971b86dea4"

    const getWeatherData = async (searchTerm) => {

        try {
            let wedata = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${searchTerm}&units=metric&exclude=hourly,minutely&appid=2935c91cbd3fb88da8e19646f93fbbbd`)
            let data = await wedata.json();
            longitude = data.coord.lon
            latitude = data.coord.lat
            weekly(longitude, latitude)
            console.log(data)
            console.log(longitude, latitude)
        }
        catch (err) {
            console.log("error:", err);
        }
    }

    useEffect(() => {
        getWeatherData(searchTerm)
    }, [longitude, latitude])

    const handleOnsubmit = (e) => {
        e.preventDefault();
        if (searchTerm) {
            fetch(`https://api.openweathermap.org/data/2.5/weather?q=${searchTerm}&units=metric&exclude=hourly,minutely&appid=2935c91cbd3fb88da8e19646f93fbbbd`)
                .then((res) => res.json())
                .then((data) => {
                    setData(data)
                    console.log(data)
                    getWeatherData(searchTerm)
                })
            setSearchTerm("")
        }
    }

    const handleOnChange = (e) => {
        setSearchTerm(e.target.value);
    }

    async function weekly() {
        try {
            let res = await fetch(`https://api.openweathermap.org/data/2.5/onecall?lat=${latitude}&lon=${longitude}&appid=2935c91cbd3fb88da8e19646f93fbbbd`);
            let data = await res.json()
            console.log('data: ', data);
        }
        catch (err) {
            console.log(' error  : ', err);

        }
    }


    return (

        <div>
            <form onSubmit={handleOnsubmit}>
                <input type="search" className="search" placeholder="search" value={searchTerm}
                    onChange={handleOnChange} />
            </form>
        </div>
    )
}

export default Weather