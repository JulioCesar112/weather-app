import axios from 'axios'
import React, { useEffect, useState } from 'react'
import Loading from './Loading'

const CardWeather = ({lat,lon}) => {

  const [weather, setWeather] = useState()
  const [temperature, setTemperature] = useState()
  const [isCelsius, setIsCelsius] = useState(true)
  const [isLoading, setIsLoading] = useState(true)


  useEffect(() => {

    if (lon) {
      const APIKey = '4d869182c90c457d02197c23d8e9c33e'
      const URL = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${APIKey}`

      axios.get(URL)
      .then(res => {
        setWeather(res.data)
        const temp = {
          celsius: `${Math.round(res.data.main.temp - 273.15)} °C`,
          farenheit: `${Math.round((res.data.main.temp ) - 273.15 * 9 / 5 -32)} °F`
        }
        setTemperature(temp)
        setIsLoading(false)
      })
      .catch(err => console.log(err))
    }
    
  }, [lat,lon])
  

  const handleClick = () => setIsCelsius(!isCelsius)
  if (isLoading) {
    return <Loading/>
  } else {

    return (
      <article className='card'>
            <h1>Weather</h1>
        <div className='head'>
            <div className='country'>
              <h2>{`${weather?.name}`}</h2>
              <h2>{`${weather?.sys.country}`}</h2>
            </div>
            <div className='img'>
              <img src={weather && `http://openweathermap.org/img/wn/${weather?.weather[0].icon}@4x.png`} alt="" />
            </div>
        </div>
        <div className='container'>
          <div>
              <h3>&#34;{weather?.weather[0].description}&#34;</h3>
            <ul>
              <li><span>Wind Speed: </span>{weather?.wind.speed} m/s</li>
              <li><span>Clouds: </span>{weather?.clouds.all}%</li>
              <li><span>Pressure: </span>{weather?.main.pressure} hPa</li>
            </ul>
          </div>
            <div className='btn'>
              <h2>{isCelsius ? temperature?.celsius : temperature?.farenheit}</h2>
              <button onClick={handleClick}>{isCelsius ? 'Degrees °C / °F' : 'Degrees °F / °C'}</button>
            </div>
        </div>

      </article>
    )

  }

}

export default CardWeather
