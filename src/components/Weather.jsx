import React, { useEffect, useState, useRef } from 'react'
import './Weather.css'
import search_icon from '../assets/search.png'
import clear_icon from '../assets/clear.png'
import cloud_icon from '../assets/cloud.png'
import wind_icon from '../assets/wind.png'
import rain_icon from '../assets/rain.png'
import drizzle_icon from '../assets/drizzle.png'
import snow_icon from '../assets/snow.png'
import humidity_icon from '../assets/humidity.png'

const Weather = () => {

  const inputRef = useRef();

  const [weatherData, setWeatherData] = useState(false);

  const allIcons = {
    '01d': clear_icon,
    '01n': clear_icon,
    '02d': cloud_icon,
    '02n': cloud_icon,
    '03d': cloud_icon,
    '03n': cloud_icon,
    '04d': cloud_icon,
    '04n': cloud_icon,
    '09d': rain_icon,
    '09n': rain_icon,
    '10d': drizzle_icon,
    '10n': drizzle_icon,
    '11d': rain_icon,
    '11n': rain_icon,
    '13d': snow_icon,
    '13n': snow_icon,
    '50d': humidity_icon,
    '50n': humidity_icon
  }

  const search = async (city) => {

    if (!city) {
      alert('Please enter a city');
      return;
    }

    try {
      const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${import.meta.env.VITE_APP_ID}`

      const response = await fetch(url);
      const data = await response.json();
      console.log(data);

      if(!response.ok){
        alert(data.message);
        return;
      }

      const icon = allIcons[data.weather[0].icon] || clear_icon;
      setWeatherData({
        humidity: data.main.humidity,
        windSpeed: data.wind.speed,
        temperature: Math.floor(data.main.temp),
        location: data.name,
        icon: icon
      });

    } catch (error) {
      setWeatherData(false);
      console.error(error);
    }
  }

  useEffect(() => {
    search('Toronto')
  }, [])

  return (
    <div className='weather'>
      <div className='search-bar'>
        <input
          ref={inputRef}
          type='text'
          placeholder='Search...'
          onChange={(e) => {
            const filteredValue = e.target.value.replace(/[0-9]/g, '');
            e.target.value = filteredValue;
          }}/>
        <img src={search_icon} alt="" onClick={() => search(inputRef.current.value)}></img>
      </div>

      {weatherData ? <>

        <img src={weatherData.icon} alt="" className="weather-icon" />
        <p className="temperature">{weatherData.temperature}°C</p>
        <p className="location">{weatherData.location}</p>
        <div className="weather-data">
          <div className="col">
            <img src={weatherData.icon} alt=""></img>
            <div>
              <p>{weatherData.humidity}</p>
              <span>Humidity</span>
            </div>
          </div>
          <div className="col">
            <img src={weatherData.icon} alt=""></img>
            <div>
              <p>{weatherData.windSpeed}</p>
              <span>Wind Speed</span>
            </div>
          </div>
        </div>

      </> : <></>}

    </div>
  )
}

export default Weather