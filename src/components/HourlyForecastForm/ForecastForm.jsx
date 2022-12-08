import "./ForecastFormStyle.css"

function ForecastForm(props){
    return (
        <div className="container mt-3">
            <div className="d-flex row text-start ">
                <p className="fs-6 fw-light text-uppercase m-0"> {props.title} </p>
            </div>
            <hr className="my-2 m-0"/>
            <div className="row text-center">
                <div className="col">
                    <p className="fw-light fs-6 mb-0">{props.weather.firstForecastString}</p>
                    <img width={60}
                        src={props.weather.forecastFirstImg}
                        alt=""
                        className=""
                    />
                    <p className="fw-light fs-6 fw-bold">{props.weather.forecastFirstTemp}</p>
                </div>
                <div className="col ">
                    <p className="fw-light fs-6 mb-0">{props.weather.secondForecastString}</p>
                    <img width={60}
                        src={props.weather.forecastSecondImg}
                        alt=""
                        className=""
                    />
                    <p className="fw-light fs-6 fw-bold">{props.weather.forecastSecondTemp}</p>
                </div>
                <div className="col ">
                    <p className="fw-light fs-6 mb-0">{props.weather.thirdForecastString}</p>
                    <img width={60}
                        src={props.weather.forecastThirdImg}
                        alt=""
                        className=""
                    />
                    <p className="fw-light fs-6 fw-bold">{props.weather.forecastThirdTemp}</p>
                </div>
                <div className="col"><p className="fw-light fs-6 mb-0">{props.weather.fourthForecastString}</p>
                    <img width={60}
                        src={props.weather.forecastFourthImg}
                        alt=""
                        className=""
                    />
                    <p className="fw-light fs-6 fw-bold">{props.weather.forecastFourthTemp}</p></div>

                <div className="col"><p className="fw-light fs-6 mb-0">{props.weather.fifthForecastString}</p>
                    <img width={60}
                        src={props.weather.forecastFifthImg}
                        alt=""
                        className=""
                    />
                    <p className="fw-light fs-6 fw-bold">{props.weather.forecastFifthTemp}</p></div>

            </div>
        </div>
    )
}

export default ForecastForm