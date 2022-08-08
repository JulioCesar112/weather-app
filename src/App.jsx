import { useEffect, useState } from 'react'
import './App.css'
import CardWeather from './components/CardWeather'

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
    <div className="App">
          <CardWeather lat={coords?.lat} lon={coords?.lon}/>
    </div>
  )
}

export default App
