import "./LoginFormStyle.css"
import {useEffect, useState} from "react";
import { useNavigate } from "react-router-dom";
import {
    decryptWithAES,
    encryptWithAES, hmacSHA256,
    setItemToLocalStorage, sha256
} from "../../utils/utils";

function getRemMeFromLocalStorage(){
    return decryptWithAES(localStorage.getItem("user"),"123")
}

const doLogin = (username, password, navigate, rememberMe = false) => {
    const pepitoHash = "TILl5oINmC5RST+Pbv2wY4iu9G/Gy74WwnxU1rUeV64="
    const pwHash = "PK/kD5K+asd9J5K0smfC2hHj8wh7k7sZxsUTN4aYS0Q="

    if(hmacSHA256(username) === pepitoHash && hmacSHA256(password) === pwHash){
        if(rememberMe){
            localStorage.setItem("user", encryptWithAES(`${username}, ${password}`, "123" ))
        }
        navigate("/dashboard");
        return true
    }
    alert("Invalid credentials!")
    return false
}

function LoginForm(){
    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")
    const [remMe, setRemMe] = useState(false)
    const navigate = useNavigate()

    useEffect(() => {
        //Check local storage
        if(localStorage.getItem("rem") == null){
            localStorage.setItem("rem", "0")
        }
        setRemMe(localStorage.getItem("rem") === "1" ? true : false)
        if(localStorage.getItem("rem") === "1" ? true : false){
            const decryptedCreds = getRemMeFromLocalStorage()
            if(decryptedCreds != ""){
                const parts = decryptedCreds.split(",")
                setUsername(parts[0])
                setPassword(parts[1])
            }
        }

    }, [])

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
                                        <input type="text" name="username" id="username" value={username} className="form-control" onChange = {(event) => setUsername(event.target.value)}/>
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="form-group col-12">
                                        <label htmlFor="password" className="text-info">Password:</label><br/>
                                        <input type="password" name="password" id="password" value={password} className="form-control" onChange = {(event) => setPassword(event.target.value)}/>
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="form-group col-12">
                                        <label htmlFor="remember-me" className="text-info"><span>Remember me</span> <span><input
                                            id="remember-me" name="remember-me" type="checkbox"  checked={remMe} onChange = {(event) => {
                                                setRemMe(event.target.checked)
                                                localStorage.setItem("rem", event.target.checked ? "1": "0")
                                            }} /></span></label><br/>
                                        <button type="button" className="btn btn-info btn-md" onClick = {(event) => doLogin(username, password, navigate, {remMe})}>
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

