function TimeAndLocation(props) {
    return(
        <div>
            <div className="d-flex justify-content-center align-items-center">
                <p className="text-white fs-5 fw-light my-3">
                    {props.currentDateTime}
                </p>
            </div>

            <div className="d-flex justify-content-center my-3">
                <p className="text-white fs-3 fw-bolder">
                    {props.provincia}
                </p>
            </div>
        </div>
    )
}

export default TimeAndLocation