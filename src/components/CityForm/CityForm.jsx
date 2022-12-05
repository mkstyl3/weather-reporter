import { useParams } from "react-router-dom"
import { useEffect, useState } from "react"
import { useLocation } from "react-router-dom";
import TimeAndLocation from "../TimeAndLocation/TimeAndLocation";
import TemperatureAndDetails from "../TemperatureAndDetails/TemperatureAndDetails"
import ForecastForm from "../HourlyForecastForm/ForecastForm"
import provinciasJSON from '../../provincias-espanolas.json'

const getWeather = async (lat,long) => {
    const res = await fetch(buildQuery(lat,long))
    const weather = await res.json()
    return weather
}

const formatCurrentWeather = (data) => {
    const dateTimeOfToday = new Date().toLocaleString() +

    const {

    }
}

const getFormattedWeather = async (lat,long) => {
    return await getWeather(lat,long)
        .then(formatCurrentWeather);



}

const getCoordsOfCityFromJSON = (city) => {
    return provinciasJSON["fields"]
}

const buildQuery = (lat, long) => {
    return `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${long}&daily=weathercode&timezone=Europe/Madrid&hourly=temperature_2m&hourly=cloudcover&hourly =windspeed_10m&hourly=winddirection_10m&hourly=precipitation&hourly=snow_depth&current_weather=true`
}

function CityForm(props){
    /*const {name, ar, long, lat} = useParams()*/
    const [weather, setWeather] = useState("")
    const {name, ar, long, lat} = useLocation().state.data


    useEffect(() => {
        // El use effect es muy util para hacer llamadas a APIS de terceros para popular los datos de la vista
        /*getWeather(lat,long).then((info) => setWeather(info))*/

        const fetchWeather = async () => {

            setWeather(weather)
        };

/*
        getWeather(lat,long).then((info) => setWeather(info))
*/
        // desglosamos los parametros que necesitamos de la llamada
        /*const provincia = name*/
/*
        const currentTemp = weather.current_weather
*/
        /*console.log(`currentTemp: ${currentTemp}`)*/

        /*setState("40º")*/

    },[])

    return (
        <div id="city" className="py-5 bg-gradient-primary text-white" >
            {weather && (
                <div>
                    <TimeAndLocation/>
                    <TemperatureAndDetails/>
                    <ForecastForm title="HOURLY FORECAST"/>
                    <ForecastForm title="DAILY FORECAST"/>
                </div>
                )
            }}
        </div>
    )
}

export default CityForm