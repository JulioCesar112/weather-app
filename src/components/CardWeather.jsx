import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import Loading from './Loading'

const CardWeather = ({ lat, lon, }) => {
  const [weather, setWeather] = useState()
  const [temperature, setTemperature] = useState()
  const [isCelsius, setIsCelsius] = useState(true)
  const [isLoading, setIsLoading] = useState(true)
  const APIKey = useSelector(state => state.apiKey)


  useEffect(() => {

    if (lon) {
      const URL = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${APIKey}`
      axios.get(URL)
        .then(res => {
          setWeather(res.data)
          const temp = {
            celsius: `${Math.round(res.data.main.temp - 273.15)} °`,
            farenheit: `${Math.round((res.data.main.temp) - 273.15 * 9 / 5 - 32)} °`
          }
          setTemperature(temp)
          setIsLoading(false)
        })
        .catch(err => console.log(err))
    }

  }, [lat, lon])


  const handleClick = () => setIsCelsius(!isCelsius)

  if (isLoading) {
    return <Loading />
  } else {
    return (
      <article className='card'>
        <div className='card__country'>
          <h2 className='card__name'>{`${weather?.name}`}</h2>
          <div className='card__info'>
            <h2 className='card__temperature'>{isCelsius ? temperature?.celsius : temperature?.farenheit}</h2>
            <img className='card__icon' src={weather && `http://openweathermap.org/img/wn/${weather?.weather[0].icon}@4x.png`} alt="" />
          </div>
          <a className='handle-temp' onClick={handleClick}>{isCelsius ? "°C" : "°F"}</a>
          <h3 className='card__description'>{weather?.weather[0].description}</h3>
          <ul className='card__container'>
            <li><span>Wind Speed: </span>{weather?.wind.speed} m/s</li>
            <li><span>Clouds: </span>{weather?.clouds.all}%</li>
            <li><span>Pressure: </span>{weather?.main.pressure} hPa</li>
          </ul>
        </div>
      </article>
    )

  }

}

export default CardWeather
