import React, { useState } from 'react'
import './WeatherApp.css'

import search_icon from '../Assets/search.png';
import clear_icon from '../Assets/clear.png';
import clouds_icon from '../Assets/clouds.png';
import drizzle_icon from '../Assets/drizzle.png';
import humidity_icon from '../Assets/humidity.png';
//import mist_icon from '../Assets/mist.png';
import rain_icon from '../Assets/rain.png';
import snow_icon from '../Assets/snow.png';
import wind_icon from '../Assets/wind.png';
import mist2_icon from '../Assets/mist2 (1).png';
import error_icon from '../Assets/404.png';
//import haze_icon from '../Assets/haze (1).png';
//import fog_icon from '../Assets/fog.png';

export const WeatherApp = () => {
  
  let api_key= "d893cc6542c9eb2047ac7153b6fbca2b";

  const [wicon,setWicon] = useState(clouds_icon);

  const search = async () => {
    const element = document.getElementsByClassName("cityInput");
    if(element[0].value === "")
    {
      return 0;
    }
    let url = `https://api.openweathermap.org/data/2.5/weather?q=${element[0].value}&units=Metric&appid=${api_key}`;

    let response = await fetch(url);
    let data = await response.json();
    const humidity = document.getElementsByClassName("humidity-percent");
    const wind = document.getElementsByClassName("wind-rate");
    const temperature = document.getElementsByClassName("weather-temp");
    const location = document.getElementsByClassName("weather-location");

    if(data.message === "city not found" || data.cod === '404')
    {
      setWicon(error_icon);
      humidity[0].innerHTML = "Not Found";
      wind[0].innerHTML = "Not Found";
      temperature[0].innerHTML = "Null";
      location[0].innerHTML = data.cod + " " + data.message;
      return;
    }

    humidity[0].innerHTML = data.main.humidity+" %";
    wind[0].innerHTML = data.wind.speed+" km/h";
    temperature[0].innerHTML = data.main.temp+"°c";
    location[0].innerHTML = data.name + ", " + data.sys.country + ", " + data.weather[0].description;

    if(data.weather[0].icon==='01d' || data.weather[0].icon==='01n')
    {
      setWicon(clear_icon);
    }
    else if(data.weather[0].icon==='02d' || data.weather[0].icon==='02n')
    {
      setWicon(clouds_icon);
    }
    else if(data.weather[0].icon==='03d' || data.weather[0].icon==='03n')
    {
      setWicon(drizzle_icon);
    }
    else if(data.weather[0].icon==='04d' || data.weather[0].icon==='04n')
    {
      setWicon(drizzle_icon);
    }
    else if(data.weather[0].icon==='09d' || data.weather[0].icon==='09n')
    {
      setWicon(rain_icon);
    }
    else if(data.weather[0].icon==='10d' || data.weather[0].icon==='10n')
    {
      setWicon(rain_icon);
    }
    else if(data.weather[0].icon==='13d' || data.weather[0].icon==='13n')
    {
      setWicon(snow_icon);
    }
    else if(data.weather[0].icon==='50d' || data.weather[0].icon==='50n')
    {
      setWicon(mist2_icon);
    }
    /*else if(data.message === "city not found" || data.cod === '404')
    {
      setWicon(error_icon);
    }*/
    else{
      setWicon(clear_icon);
    }
  }


  return (
    <div className='container'>
      <div className='top-bar'>
        <input type='text' className='cityInput' placeholder='Search' />
        <div className='search-icon' onClick={()=>{search()}}>
          <img src={search_icon} alt="" />
        </div>
      </div>
      <div className='weather-image' >
        <img src={wicon} alt="" />
      </div>
      <div className='weather-temp'>24°C</div>
      <div className='weather-location'>London</div>
      <div className='data-container'>
        <div className='element'>
          <img src={humidity_icon} alt='' className='icon' />
          <div className='data'>
            <div className='humidity-percent'>64%</div>
            <div className='text'>Humidity</div>
          </div>
        </div>
        <div className='element'>
          <img src={wind_icon} alt='' className='icon' />
          <div className='data'>
            <div className='wind-rate'>18 km/h</div>
            <div className='text'>Wind Speed</div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default WeatherApp
