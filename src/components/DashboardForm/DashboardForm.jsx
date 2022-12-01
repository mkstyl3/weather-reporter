import { useState } from 'react';
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
    if (allCities[cityIndex] === undefined){
        allCities[cityIndex] = '0'
    }
    return allCities[cityIndex] === '1'

}
const toggleFavoriteCity = (lat, long) => {
    const allCities = getItemFromLocalStorage("cities")
    const cityIndex = getCityIndex(lat,long)
    if (allCities[cityIndex] === undefined){
        allCities[cityIndex] = '0'
    }
    console.log(`before: ${allCities[cityIndex]}`)
    allCities[cityIndex] = allCities[cityIndex] === "0" ? "1" : "0"
    localStorage.setItem('cities', JSON.stringify(allCities))


    const allCities2 = getItemFromLocalStorage("cities")

    console.log(`after: ${allCities2[cityIndex]}`)
}

function Provincia(props){
    const p = props.provinciaInfo;
    const index = props.index;
    const lat = p.fields.geo_point_2d[0];
    const long = p.fields.geo_point_2d[1];
    const provincia = p.fields.provincia;
    const comunidadAutonoma = p.fields.ccaa;
    const [isFavorite, setIsFavorite] = useState(isAFavoriteCity(lat, long))
    return (
        <tr key={index}>
            <td>
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
            {/*<td>{(JSON.parse(localStorage.getItem("cities")) || '{}')[index].temp}</td>*/}
            <td></td>
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

function DashboardForm(){

    const [rows, setRows] = useState(provinciasJSON)

    // create dict with keys from lat/long
    const cities = {}
    rows.forEach((p) => {
        cities[getCityIndex(p.fields.geo_point_2d[0], p.fields.geo_point_2d[1])] = "0"
    })
    localStorage.cities = JSON.stringify(cities)

    const provincias = rows.map((p, index) => {
        return <Provincia
            provinciaInfo={p}
            index={index}/>
    })

    /*console.log(provinciasJSON)
    const provincias = provinciasJSON.map((p, index) => {

    return <Test/>
    })*/


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
                {/*<Table data={rows}/>*/}
            </div>
        </div>
    )
}

export default DashboardForm