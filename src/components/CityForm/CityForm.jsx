import { useParams } from "react-router-dom"
function CityForm(){
    const {name, ar, long, lat} = useParams()
    return (
        <div id="dashboard">
            <h3 className="text-center text-white pt-5">City Form</h3>
            <div className="container">
                {name}
                <br/>
                {ar}
                <br/>
                {long}
                <br/>
                {lat}                
            </div>
        </div>
    )
}

export default CityForm