import { useEffect, useState } from 'react'
import CardWeather from './components/CardWeather'
import WeatherCityName from './components/WeatherCityName'

function App() {
  const [coords, setCoords] = useState()


  useEffect(() => {
    const success = pos => {
      const latLon = {
        lat: pos.coords.latitude,
        lon: pos.coords.longitude
      }
      setCoords(latLon)
    }
    navigator.geolocation.getCurrentPosition(success)
  }, [])
 
  return (
    <div  className="App">
      <CardWeather lat={coords?.lat} lon={coords?.lon} />
      <WeatherCityName />
    </div>
  )
}

export default App
