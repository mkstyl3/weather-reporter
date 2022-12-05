import "./ForecastFormStyle.css"

function ForecastForm({title}){
    return (
        <div className="container mt-3">
            <div className="d-flex row text-start ">
                <p className="fs-6 fw-light text-uppercase m-0"> {title} </p>
            </div>
            <hr className="my-2 m-0"/>
            <div className="row text-center">
                <div className="col">
                    <p className="fw-light fs-6 mb-0">04:30 PM</p>
                    <img width={60}
                        src="http://openweathermap.org/img/wn/01d@2x.png"
                        alt=""
                        className=""
                    />
                    <p className="fw-light fs-6 fw-bold">22º</p>
                </div>
                <div className="col ">
                    <p className="fw-light fs-6 mb-0">04:30 PM</p>
                    <img width={60}
                        src="http://openweathermap.org/img/wn/01d@2x.png"
                        alt=""
                        className=""
                    />
                    <p className="fw-light fs-6 fw-bold">22º</p>
                </div>
                <div className="col ">
                    <p className="fw-light fs-6 mb-0">04:30 PM</p>
                    <img width={60}
                        src="http://openweathermap.org/img/wn/01d@2x.png"
                        alt=""
                        className=""
                    />
                    <p className="fw-light fs-6 fw-bold">22º</p>
                </div>
                <div className="col"><p className="fw-light fs-6 mb-0">04:30 PM</p>
                    <img width={60}
                        src="http://openweathermap.org/img/wn/01d@2x.png"
                        alt=""
                        className=""
                    />
                    <p className="fw-light fs-6 fw-bold">22º</p></div>

                <div className="col"><p className="fw-light fs-6 mb-0">04:30 PM</p>
                    <img width={60}
                        src="http://openweathermap.org/img/wn/01d@2x.png"
                        alt=""
                        className=""
                    />
                    <p className="fw-light fs-6 fw-bold">22º</p></div>

            </div>
        </div>
    )
}

export default ForecastForm