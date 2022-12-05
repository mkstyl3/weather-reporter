import { useParams } from "react-router-dom"
import { useEffect, useState } from "react"
import { useLocation } from "react-router-dom";
import TimeAndLocation from "../TimeAndLocation/TimeAndLocation";
import TemperatureAndDetails from "../TemperatureAndDetails/TemperatureAndDetails"

async function getWeather(){
    const url = "https://api.open-meteo.com/v1/forecast?latitude=52.52&longitude=13.41"
    const res = await fetch(url)
    const weather = await res.json()
    return weather
}



function CityForm(props){
    console.log(`props: ${props.state}`)

    /*const {name, ar, long, lat} = useParams()*/
    const [weather, setWeather] = useState("")
    const {name, ar, long, lat} = useLocation().state.data
    console.log(useLocation().state.data.name)

    useEffect(() => {

    })

    useEffect(() => {
        getWeather().then((info) => setWeather(info))
        /*setState("40º")*/

    },[])

    return (
        <div id="city" className="py-5 bg-gradient-primary text-white" >
            <TimeAndLocation/>
            <TemperatureAndDetails/>
        </div>
    )
}

export default CityForm