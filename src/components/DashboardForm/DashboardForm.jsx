import {useEffect, useState} from 'react';
import provinciasJSON from '../../provincias-espanolas.json'
import "./DashboardFormStyle.css"
import {Link} from "react-router-dom";
import { generatePath } from "react-router";

const getItemFromLocalStorage = (cities) => {
    return JSON.parse(localStorage.getItem(cities))
}

const getCityIndex = (lat, long) => {
    return btoa(`${lat}, ${long}`)
}

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
    /*console.log(`before: ${allCities[cityIndex]}`)*/
    allCities[cityIndex].fav = allCities[cityIndex].fav === "0" ? "1" : "0"
    localStorage.setItem('cities', JSON.stringify(allCities))

    /*const allCities2 = getItemFromLocalStorage("cities")
    console.log(`after: ${allCities2[cityIndex]}`)*/
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
    localStorage.setItem('cities', JSON.stringify(allCities))
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
    /*console.log(`Hey ${getItemFromLocalStorage()[index].last_visit}`)*/
    return (
        <tr key={index}>
            <td onClick={(event) => {
                const new_date_time = new Date().toJSON()
                console.log(new_date_time)    
                setLastVisit(new_date_time);
                updateLocalStorage(getCityIndex(lat, long), "last_visit", new_date_time)
            }}>
                <Link
                    to={generatePath("/city_info/:name/:ar/:lat/:long", {
                        name: provincia,
                        ar: comunidadAutonoma,
                        lat: lat,
                        long: long
                    })}
                > {provincia} </Link>
            </td>
            <td style={{cursor:'pointer'}} onClick={(event) => {
                console.log("new_date_time")
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
            <td></td>
        </tr>
    )
}

/*function Test (){
    const provincias = provinciasJSON.map((p, index) => {
       /!* return <Provincia
            provinciaInfo={p}
            index={index} />*!/
        return (
            <tr key={index}>
                <td>h</td>
                <td>e</td>
                <td>l</td>
                <td>l</td>
                <td>o</td>
                <td>w</td>
            </tr>
        )
    })}*/


/*const Row = (props) => {
    const {provincia, latitud, longitud} = props
    return (
        <tr>
            <td>{provincia}</td>
            <td>{latitud}</td>
            <td>{longitud}</td>
        </tr>
    )
}

const Table = (props) => {
    const {data} = props
    return (
        <table>
            <tbody>
            {data.map(row =>
                <Row provincia={row.fields.provincia} latitud={row.fields.geo_point_2d[0]} longitud={row.fields.geo_point_2d[1]}/>
            )}
            </tbody>
        </table>
    )
}*/

const initializeLocalStorage = () => {
    const cities = {}
    provinciasJSON.forEach((p) => {
        cities[getCityIndex(p.fields.geo_point_2d[0], p.fields.geo_point_2d[1])] = {
            "fav" : "0",
            "temp" : "",
            "last_visit" : ""
        }
    })
    localStorage.cities = JSON.stringify(cities)
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