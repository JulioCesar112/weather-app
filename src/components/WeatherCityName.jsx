import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'

const WeatherCityName = () => {
  const [city, setCity] = useState()
  const [aboutCity, setAboutCity] = useState()
  const APIKey = useSelector(state => state.apiKey)

  useEffect(() => {
    if (city) {
      const URL = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${APIKey}`
      axios.get(URL)
        .then(res => {
          setAboutCity(res.data)
        })
        .catch(err => console.log(err))
    }
  }, [city])


  const handleSubmit = (e) => {
    e.preventDefault()
    setCity(e.target.city.value.trim())
    e.target.reset()
  }

  const temp = Math.floor(aboutCity?.main.temp - 273)

  return (
    <article className='card__search'>
      <form className='form__weather' onSubmit={handleSubmit} >
        <input className='form__input' id='city' type="text" placeholder='Type your City' />
        <button className='form__btn'>Search</button>
      </form>
      <h3 className='card__name'>{aboutCity?.name}</h3>

      <div className='card__info'>
        <h2 className='card__temperature'>{`${temp} °`}</h2>
        <img className='card__icon' src={aboutCity && `http://openweathermap.org/img/wn/${aboutCity?.weather[0].icon}@4x.png`} />
      </div>

      <p className='card__description'>{aboutCity?.weather[0].description}</p>
    </article>
  )
}

export default WeatherCityName