import { useParams } from "react-router-dom"
import { useEffect, useState } from "react"
import { useLocation } from "react-router-dom";
import TimeAndLocation from "../TimeAndLocation/TimeAndLocation";
import TemperatureAndDetails from "../TemperatureAndDetails/TemperatureAndDetails"
import ForecastForm from "../HourlyForecastForm/ForecastForm"
import wmoWeatherInterpretationCodes from "../../wmo-weather-interpretation-codes.json"
import {getCityIndex, getItemFromLocalStorage, setItemToLocalStorage} from "../../utils/utils";

const buildCurrentDateTimeHeader = () => {
    let today=new Date();
    const h = today.toString().split(' ')
    return `${h[0]}, ${h[2]} ${h[1]} ${h[3]} | Localtime: ${h[4].slice(0,5)} h`
}

const formatCurrentWeather = (data) => {
    const currentDateTime =  buildCurrentDateTimeHeader()
    console.log(data.current_weather.weathercode)

    const currentWeather = wmoWeatherInterpretationCodes.find(({code}) => code===data.current_weather.weathercode)
    const currentWeatherStatus = currentWeather.description
    const sunrise = new Date(data.daily.sunrise[0])
    let today=new Date();
    const weatherImg = sunrise > today ? currentWeather.picture_night : currentWeather.picture_day
    const currentTemp = `${data.current_weather.temperature}º`

    const hourOfToday = today.getHours()
    const realFeel = `${data.hourly.apparent_temperature[hourOfToday]}º`
    const humidity = `${data.hourly.relativehumidity_2m[hourOfToday]}%`
    const windspeed = `${data.current_weather.windspeed} Km/h`

    const sunriseString= `${sunrise.toString().split(' ')[4].slice(0,5)} h`
    const sunsetString = `${new Date(data.daily.sunset[0]).toString().split(' ')[4].slice(0,5)} h`
    const today_max_temperature = `${data.daily.temperature_2m_max[0]}º`
    const today_min_temperature = `${data.daily.temperature_2m_min[0]}º`

    const todayMl = today.getTime()
    const todayMin = today.getMinutes()

    const substractMl = todayMin  * 60000
    const hourInMl = 60 * 60000
    const firstHourlyForecastString = `${new Date(todayMl - substractMl + hourInMl).toString().split(' ')[4].slice(0,5)} h`
    const secondHourlyForecastString = `${new Date((todayMl - substractMl) + hourInMl * 2).toString().split(' ')[4].slice(0,5)} h`
    const thirdHourlyForecastString = `${new Date((todayMl - substractMl) + hourInMl * 3).toString().split(' ')[4].slice(0,5)} h`
    const fourthHourlyForecastString = `${new Date((todayMl - substractMl) + hourInMl * 4).toString().split(' ')[4].slice(0,5)} h`
    const fifthHourlyForecastString = `${new Date((todayMl - substractMl) + hourInMl * 5).toString().split(' ')[4].slice(0,5)} h`

    const wc1 = data.hourly.weathercode[hourOfToday + 1]
    const wc2 = data.hourly.weathercode[hourOfToday + 2]
    const wc3 = data.hourly.weathercode[hourOfToday + 3]
    const wc4 = data.hourly.weathercode[hourOfToday + 4]
    const wc5 = data.hourly.weathercode[hourOfToday + 5]

    const hourlyForecastFirstImg = sunrise > firstHourlyForecastString ? wmoWeatherInterpretationCodes.find((c) => c.code===wc1).picture_night : wmoWeatherInterpretationCodes.find((c) => c.code===wc1).picture_day
    const hourlyForecastSecondImg = sunrise > secondHourlyForecastString ? wmoWeatherInterpretationCodes.find((c) => c.code===wc2).picture_night : wmoWeatherInterpretationCodes.find((c) => c.code===wc2).picture_day
    const hourlyForecastThirdImg = sunrise > thirdHourlyForecastString ? wmoWeatherInterpretationCodes.find((c) => c.code===wc3).picture_night : wmoWeatherInterpretationCodes.find((c) => c.code===wc3).picture_day
    const hourlyForecastFourthImg = sunrise > fourthHourlyForecastString ? wmoWeatherInterpretationCodes.find((c) => c.code===wc4).picture_night : wmoWeatherInterpretationCodes.find((c) => c.code===wc4).picture_day
    const hourlyForecastFifthImg = sunrise > fifthHourlyForecastString ? wmoWeatherInterpretationCodes.find((c) => c.code===wc5).picture_night : wmoWeatherInterpretationCodes.find((c) => c.code===wc5).picture_day

    const hourlyForecastFirstTemp = `${data.hourly.temperature_2m[hourOfToday + 1]}º`
    const hourlyForecastSecondTemp = `${data.hourly.temperature_2m[hourOfToday + 2]}º`
    const hourlyForecastThirdTemp = `${data.hourly.temperature_2m[hourOfToday + 3]}º`
    const hourlyForecastFourthTemp = `${data.hourly.temperature_2m[hourOfToday + 4]}º`
    const hourlyForecastFifthTemp = `${data.hourly.temperature_2m[hourOfToday + 5]}º`

    // Daily forecast
    const [firstDayOfTheWeek,secondDayOfTheWeek,thirdDayOfTheWeek,fourthDayOfTheWeek,fifthDayOfTheWeek] = nextFiveDaysOfTheWeek()
    const dailyWeatherCodes = data.daily.weathercode.slice(0,5)

    const [dailyForecastFirstImg,dailyForecastSecondImg,dailyForecastThirdImg,dailyForecastFourthImg,dailyForecastFifthImg] = dailyWeatherCodes.map((code) => wmoWeatherInterpretationCodes.find((c) => c.code===code).picture_day)

    const dailyTempFirst = `${Math.round(average(data.daily.temperature_2m_max[1],data.daily.temperature_2m_min[1]))}º`
    const dailyTempSecond = `${Math.round(average(data.daily.temperature_2m_max[2],data.daily.temperature_2m_min[2]))}º`
    const dailyTempThird = `${Math.round(average(data.daily.temperature_2m_max[3],data.daily.temperature_2m_min[3]))}º`
    const dailyTempFourth = `${Math.round(average(data.daily.temperature_2m_max[4],data.daily.temperature_2m_min[4]))}º`
    const dailyTempFifth = `${Math.round(average(data.daily.temperature_2m_max[5],data.daily.temperature_2m_min[5]))}º`


    return {
        currentDateTime, currentWeatherStatus, weatherImg, currentTemp, realFeel, humidity, windspeed, sunriseString, sunsetString, today_max_temperature,
        today_min_temperature, firstHourlyForecastString, secondHourlyForecastString, thirdHourlyForecastString, fourthHourlyForecastString,
        fifthHourlyForecastString,hourlyForecastFirstImg, hourlyForecastSecondImg, hourlyForecastThirdImg, hourlyForecastFourthImg, hourlyForecastFifthImg,
        hourlyForecastFirstTemp, hourlyForecastSecondTemp, hourlyForecastThirdTemp, hourlyForecastFourthTemp, hourlyForecastFifthTemp,
        firstDayOfTheWeek,secondDayOfTheWeek, thirdDayOfTheWeek, fourthDayOfTheWeek, fifthDayOfTheWeek, dailyForecastFirstImg, dailyForecastSecondImg,
        dailyForecastThirdImg, dailyForecastFourthImg, dailyForecastFifthImg, dailyTempFirst, dailyTempSecond, dailyTempThird, dailyTempFourth, dailyTempFifth
    }
}

function average(a, b) {
    // force the input as numbers *1
    return ((a*1 + b*1) /2);
}

const nextFiveDaysOfTheWeek = () => {
    const weekday = ["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"];
    const d = new Date();
    const tomorrowDigit = d.getDay();
    let result = []
    for(let i=0; i < 5; i++){
        if (tomorrowDigit + i >= weekday.length) {
            let diff = (tomorrowDigit + i) - weekday.length
            result.push(weekday[diff])
        }else{
            result.push(weekday[tomorrowDigit + i])
        }
    }
    return result
}

const buildQuery = (lat, long) => {
    return `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${long}&daily=weathercode&timezone=Europe/Madrid&hourly=temperature_2m&hourly=cloudcover&hourly =windspeed_10m&hourly=winddirection_10m&hourly=precipitation&hourly=snow_depth&current_weather=true&daily=sunrise&daily=sunset&hourly=apparent_temperature&hourly=relativehumidity_2m&daily=temperature_2m_max&daily=temperature_2m_min&hourly=weathercode`
}

const storeLastViewedTemp = (temp, lat, long) => {
    const allCities = getItemFromLocalStorage("cities")
    const cityIndex =  getCityIndex(lat,long)
    allCities[cityIndex].temp = temp
    console.log("hllo")
    setItemToLocalStorage("cities", allCities)
}

function CityForm(props){
    /*const {name, ar, long, lat} = useParams()*/
    const [weather, setWeather] = useState("")
    const [hourlyForecastData, setHourlyForecastData] = useState({})
    const [dailyForecastData, setDailyForecastData] = useState({})

    const {name, ar, long, lat} = useLocation().state.data


    useEffect(() => {
        // El use effect es muy util para hacer llamadas a APIS de terceros para popular los datos de la vista
        /*getWeather(lat,long).then((info) => setWeather(info))*/

        fetch(buildQuery(lat,long))
            .then((response) => response.json())
            .then((data) => formatCurrentWeather(data))
            .then((data) => {
                setWeather(data)
                const hourlyForecastData = {
                    firstForecastString: data.firstHourlyForecastString, secondForecastString: data.secondHourlyForecastString, thirdForecastString: data.thirdHourlyForecastString, fourthForecastString: data.fourthHourlyForecastString,
                    fifthForecastString: data.fifthHourlyForecastString, forecastFirstImg: data.hourlyForecastFirstImg,forecastSecondImg: data.hourlyForecastSecondImg, forecastThirdImg: data.hourlyForecastThirdImg, forecastFourthImg: data.hourlyForecastFourthImg,
                    forecastFifthImg: data.hourlyForecastFifthImg, forecastFirstTemp: data.hourlyForecastFirstTemp, forecastSecondTemp: data.hourlyForecastSecondTemp, forecastThirdTemp: data.hourlyForecastThirdTemp, forecastFourthTemp: data.hourlyForecastFourthTemp,
                    forecastFifthTemp: data.hourlyForecastFifthTemp
                }
                setHourlyForecastData(hourlyForecastData)

                const dailyForecastData = {
                    firstForecastString: data.firstDayOfTheWeek, secondForecastString: data.secondDayOfTheWeek, thirdForecastString: data.thirdDayOfTheWeek, fourthForecastString: data.fourthDayOfTheWeek,
                    fifthForecastString: data.fifthDayOfTheWeek, forecastFirstImg: data.dailyForecastFirstImg,forecastSecondImg: data.dailyForecastSecondImg, forecastThirdImg: data.dailyForecastThirdImg, forecastFourthImg: data.dailyForecastFourthImg,
                    forecastFifthImg: data.dailyForecastFifthImg, forecastFirstTemp: data.dailyTempFirst, forecastSecondTemp: data.dailyTempSecond, forecastThirdTemp: data.dailyTempThird, forecastFourthTemp: data.dailyTempFourth,
                    forecastFifthTemp: data.dailyTempFifth
                }

                setDailyForecastData(dailyForecastData)
                storeLastViewedTemp(data.currentTemp,lat,long)
            })
    },[])



    return (
        <div id="city" className="py-5 bg-gradient-primary text-white" >
            {weather && (
                <div>
                    <TimeAndLocation currentDateTime={weather.currentDateTime} provincia={name}/>
                    <TemperatureAndDetails weather={weather}/>
                    <ForecastForm title="HOURLY FORECAST" weather={hourlyForecastData}/>
                    <ForecastForm title="DAILY FORECAST" weather={dailyForecastData}/>
                </div>
                )
            }
        </div>
    )
}

export default CityForm