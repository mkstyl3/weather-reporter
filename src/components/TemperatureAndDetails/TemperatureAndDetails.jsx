import {
    UilTemperature,
    UilTear,
    UilWind,
    UilSun,
    UilSunset,
} from "@iconscout/react-unicons";
import "./TemperatureAndDetailsStyle.css"

function TemperatureAndDetails(){
    return (
        <div>
            <div className="d-flex justify-content-center my-6 fw-bold text-lisgh">
                <p>Cloudy</p>
            </div>

            <div className="container">
                <div className="row">
                    <div className="col-xs-12 col-sm-12 col-md-8 col-lg-6 offset-md-2 offset-lg-3">
                        <div className="row">
                            <div className="col-xs-12 col-sm-4 align-self-center text-center">
                                <img
                                    src="http://openweathermap.org/img/wn/01d@2x.png"
                                    alt=""
                                    className=""
                                />
                            </div>

                            <div className="col-xs-12 col-sm-4 align-self-center text-center">
                                <p className="fs-1 my-auto" >34º</p>
                            </div>

                            <div className="col-xs-12 col-sm-4 align-self-center text-center">
                                <div className="fw-light ">
                                    <UilTemperature size={18} classname="icons"/>
                                    Real feel:
                                    <span className="fw-bold ml-1" >32º</span>
                                </div>

                                <div className="fw-light ">
                                    <UilTear size={18} classname="icons"/>
                                    Humidity:
                                    <span className="fw-bold ml-1" >65%</span>
                                </div>

                                <div className="fw-light ">
                                    <UilWind size={18} classname="icons"/>
                                    Wind Speed:
                                    <span className="fw-bold ml-1" >32º</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="row text-white py-4">
                    <div className="text-center align-self-center col-xs-12 col-sm-2 col-sm-6 col-lg-2 offset-lg-2">
                        <p className="fw-light fs-6">
                            <UilSun className="icons" size={22} />
                            Rise: <span className="fs-6 fw-bold">08:56 AM</span>
                        </p>
                    </div>
                    <div className="text-center align-self-center col-xs-12 col-sm-2 col-sm-6 col-lg-2">
                        <p className="fw-light fs-6" >
                            <UilSunset className="icons" size={22} />
                            Set: <span className="fs-6 fw-bold">08:56 AM</span>
                        </p>
                    </div>
                    <div className="text-center align-self-center col-xs-12 col-sm-2 col-sm-6 col-lg-2">
                        <p className="fw-light fs-6">
                            <UilSun className="icons" size={22} />
                            High: <span className="fs-6 fw-bold">08:56 AM</span>
                        </p>
                    </div>
                    <div className="text-center align-self-center col-xs-12 col-sm-2 col-sm-6 col-lg-2">
                        <p className="fw-light fs-6">
                            <UilSun className="icons" size={22} />
                            Low: <span className="fs-6 fw-bold">08:56 AM</span>
                        </p>
                    </div>
                </div>
            </div>







        </div>

    )
}

export default TemperatureAndDetails