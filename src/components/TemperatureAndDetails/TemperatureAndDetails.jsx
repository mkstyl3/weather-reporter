import {
    UilTemperature,
    UilTear,
    UilWind,
    UilSun,
    UilSunset,
} from "@iconscout/react-unicons";

function TemperatureAndDetails(){
    return (
        <div>
            <div className="d-flex justify-content-center my-6 fw-bold text-lisgh">
                <p>Cloudy</p>
            </div>

            <div className="container">
                <div className="row">
                    <div className="col-sm-12 col-xs-12 col-md-8 offset-md-2 col-lg-6 offset-lg-3">
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
                                    <UilTemperature size={18} classname="ml-3"/>
                                    Real feel:
                                    <span className="fw-bold ml-1" >32º</span>
                                </div>

                                <div className="fw-light ">
                                    <UilTear size={18} classname="ml-3"/>
                                    Humidity:
                                    <span className="fw-bold ml-1" >65%</span>
                                </div>

                                <div className="fw-light ">
                                    <UilWind size={18} classname="ml-3"/>
                                    Wind Speed:
                                    <span className="fw-bold ml-1" >32º</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="row text-white py-4">
                    <div className="col-xs-12 text-center text-md-left col-sm-6 col-lg-2 offset-lg-2 align-self-center">
                        <UilSun size={18} />
                        COL-A
                    </div>
                    <div className="col-xs-12 col-sm-6 col-lg-2 text-center text-md-left align-self-center">
                        <p className="fw-light">
                            Rise: <span className="fs-2 ml-1">08:56 AM</span> COL-B
                        </p>
                    </div>
                    <div className="col-sm-2 align-self-center text-center text-md-left col-xs-12 col-sm-6 col-lg-2">
                        <p className="fw-li3ht">
                            Rise: <span className="fs-2 ml-1">08:56 AM</span> COL-C
                        </p>
                    </div>
                    <div className="col-sm-2 align-self-center text-center text-md-left col-xs-12 col-sm-6 col-lg-2">
                        <p className="fw-li3ht">
                            Rise: <span className="fs-2 ml-1">08:56 AM</span> COL-D
                        </p>
                    </div>
                </div>
            </div>







        </div>

    )
}

export default TemperatureAndDetails