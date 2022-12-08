import {useEffect, useState} from 'react';
import provinciasJSON from '../../provincias-espanolas.json'
import "./DashboardFormStyle.css"
import {Link, Route, Routes} from "react-router-dom";
import {getCityIndex, getItemFromLocalStorage, setItemToLocalStorage} from "../../utils/utils";

const isAFavoriteCity = (lat, long) => {
    const allCities = getItemFromLocalStorage("cities")
    const cityIndex =  getCityIndex(lat,long)
    if (allCities[cityIndex].fav === undefined){
        allCities[cityIndex].fav = '0'
    }
    return allCities[cityIndex].fav === '1'

}
const toggleFavoriteCity = (lat, long) => {
    const allCities = getItemFromLocalStorage("cities")
    const cityIndex = getCityIndex(lat,long)
    if (allCities[cityIndex].fav === undefined){
        allCities[cityIndex].fav = '0'
    }
    allCities[cityIndex].fav = allCities[cityIndex].fav === "0" ? "1" : "0"
    setItemToLocalStorage("cities", allCities)
}

const updateLocalStorage = (index, key,value) => {
    const allCities = getItemFromLocalStorage("cities")
    switch(key) {
        case "fav":
            allCities[index].fav = value
            break;
        case "last_visit":
            allCities[index].last_visit = value
            break;
        case "temp":
            allCities[index].temp = value
            break;
        default:
            break;
    }
    setItemToLocalStorage("cities", allCities)
}

function Provincia(props){
    const p = props.provinciaInfo;
    const index = props.index;
    const lat = p.fields.geo_point_2d[0];
    const long = p.fields.geo_point_2d[1];
    const provincia = p.fields.provincia;
    const comunidadAutonoma = p.fields.ccaa;
    const [isFavorite, setIsFavorite] = useState(isAFavoriteCity(lat, long))
    const [lastVisit, setLastVisit] = useState(getItemFromLocalStorage("cities")[getCityIndex(lat, long)].last_visit)
    const [lastTemperature, setLastTemperature] = useState(getItemFromLocalStorage("cities")[getCityIndex(lat, long)].temp)

    return (
        <tr key={index}>
            <td onClick={(event) => {
                const new_date_time = new Date().toJSON()
                const formatedDateTime =  new_date_time.split("T")
                const union = `${formatedDateTime[0]} ${formatedDateTime[1].slice(0, -1)}`
                console.log(union)
                setLastVisit(union);
                updateLocalStorage(getCityIndex(lat, long), "last_visit", union)
            }}>
                <Link
                    to="/city_info"
                    state={{ data: {name: provincia, ar: comunidadAutonoma, lat: lat, long: long} }}
                > {provincia} </Link>
            </td>
            <td style={{cursor:'pointer'}} onClick={(event) => {
                setIsFavorite(!isFavorite);
                toggleFavoriteCity(lat, long);
            }}>
                {
                    isAFavoriteCity(lat, long) ? 
                        <i id="solid-heart" className="fa-solid fa-heart cursor"></i> :
                        <i className="fa-regular fa-heart"></i>
                }
            </td>
            <td>{lat}</td>
            <td>{long}</td>
            <td>{lastVisit}</td>
            <td>{lastTemperature}</td>
        </tr>
    )
}

const initializeLocalStorage = () => {
    const cities = {}
    provinciasJSON.forEach((p) => {
        cities[getCityIndex(p.fields.geo_point_2d[0], p.fields.geo_point_2d[1])] = {
            "fav" : "0",
            "temp" : "",
            "last_visit" : ""
        }
    })
    setItemToLocalStorage("cities", cities)
}

function DashboardForm(){
    const [rows, setRows] = useState(getItemFromLocalStorage("cities"))
    if(rows == null){
        initializeLocalStorage()
    }
    const provincias = provinciasJSON.map((p, index) => {
        return <Provincia
            provinciaInfo={p}
            index={index}/>
    })

    return  (
        <div id="dashboard">
            <h3 className="text-center text-white pt-5">Dashboard Form</h3>
            <div className="container">
                <table className="table table-striped table-light">
                    <thead>
                    <tr>
                        <th scope="col">City</th>
                        <th scope="col">Fav</th>
                        <th scope="col">Latitude</th>
                        <th scope="col">Longitude</th>
                        <th scope="col">Last visit</th>
                        <th scope="col">Temperature</th>
                    </tr>
                    </thead>
                    <tbody>
                        {provincias}
                    </tbody>
                </table>
            </div>
        </div>
    )
}

export default DashboardForm