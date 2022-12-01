import "./LoginFormStyle.css"
import {useState} from "react";
import { useNavigate } from "react-router-dom";



function remember(username, password){
    return true
}
const doLogin = (username, password, navigate, remember_me = false) => {
    const defaultUsername = "pepito"
    const defaultPassword = "123"


    if(remember_me){
        remember()
    }
    if(username == defaultUsername && password == defaultPassword){
        navigate("/dashboard");
        return true
    }
    navigate("/nopage");
    return false
}


function LoginForm(){

    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")
    const navigate = useNavigate();

    return (
        <div id="login">
            <h3 className="text-center text-white pt-5">Login form</h3>
            <div className="container">
                <div id="login-row" className="row justify-content-center align-items-center">
                    <div id="login-column" className="col-md-6">
                        <div id="login-box" className="col-md-12">
                            <form id="login-form" className="form container-fluid" action="" method="post">
                                <h3 className="text-center text-info">Login</h3>
                                <div className="row">
                                    <div className="form-group col-12">
                                        <label htmlFor="username" className="text-info">Username:</label><br/>
                                        <input type="text" name="username" id="username" className="form-control" onChange = {(event) => setUsername(event.target.value)}/>
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="form-group col-12">
                                        <label htmlFor="password" className="text-info">Password:</label><br/>
                                        <input type="text" name="password" id="password" className="form-control" onChange = {(event) => setPassword(event.target.value)}/>
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="form-group col-12">
                                        <label htmlFor="remember-me" className="text-info"><span>Remember me</span> <span><input
                                            id="remember-me" name="remember-me" type="checkbox"/></span></label><br/>
                                        <button type="button" className="btn btn-info btn-md" onClick = {(event) => doLogin(username, password, navigate)}>
                                            Enviar
                                        </button>
                                    </div>
                                </div>
                                <div className="row">
                                    <div id="register-link" className="text-right">
                                        <a href="#" className="text-info">Register here</a>
                                    </div>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
export default LoginForm

