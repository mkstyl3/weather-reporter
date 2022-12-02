import { useParams } from "react-router-dom"
import { useEffect, useState } from "react"
async function getWeather(){
    const url = "https://api.open-meteo.com/v1/forecast?latitude=52.52&longitude=13.41"
    const res = await fetch(url)
    const weather = await res.json()
    return weather
}


function CityForm(){
    const {name, ar, long, lat} = useParams()
    const [weather, setWeather] = useState("")

    useEffect(() => {
        getWeather().then((info) => setWeather(info))
    },[])

    return (
        <div id="city">
            <h3 className="text-center text-white pt-5">City Form</h3>
            <div className="container">
                {name}
                <br/>
                {ar}
                <br/>
                {long}
                <br/>
                {lat} 
                <br/>
                {JSON.stringify(weather)}
            </div>
        </div>
    )
}

export default CityForm