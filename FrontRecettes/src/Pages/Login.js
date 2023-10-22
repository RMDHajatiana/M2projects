import React, { useEffect } from 'react';
import "../Styles/login.css";
import { useState } from "react"
import { useNavigate } from "react-router-dom"
import axios from 'axios';
import { Button, ConfigProvider } from 'antd';

const Login = () => {

    localStorage.removeItem("email_user")

    const [email, setEmail] = useState("")
    const [mdp, setMdp] = useState("")
    const [auth, setAuth] = useState(false)
    const [mailError, setMailError] = useState(null)
    const [errorMdp, setErrorMdp] = useState(null)

    const navigate = useNavigate()
    const authentification = async () => {
        setAuth(true)
        let data = {
            "email_user": email,
            "mdp_user": mdp
        }

        let resultat = await axios.post("http://localhost:5160/api/Utulisateurs/login", data)

        if (resultat.data["authentificated"] === false) {
            setMailError(resultat.data["email_user"])
            setErrorMdp(resultat.data["mdp_user"])
        }
        else if(resultat.data["authentificated"] === true){
            localStorage.setItem("email_user",email)
            navigate("/Tableau_de_bord")
        }
        setAuth(false)
    }
    
    useEffect(()=>{
        document.title = "Login"
    })
    // <div className="login" style={{ backgroundImage: 'url("' + image + '")' }}>
    return (
        <div>
            <div className="login" >
            <div className="login-content">
                <div className="login-body">
                    <div className="label-login">
                        <i className="fa fa-user"></i><label htmlFor="">E-mail :</label>
                    </div>
                    <input value={email} onChange={(e) => { setEmail(e.target.value) }} style={mailError === false ?
                        {borderColor : "red",
                        boxShadow: "inset 0 1px 1px rgba(0, 0, 0, .075), 0 0 8px red"} : {} } className="input-login" type="text" />
                    {mailError === false && <div className="error"> Utilisateur inéxistant  </div>}
                    <div className="label-login">
                        <i className="fa fa-lock"></i><label htmlFor="">Mot de passe :</label>
                    </div>
                    <input value={mdp} onChange={(e) => { setMdp(e.target.value) }} style={ errorMdp === false ?
                        {borderColor : "red",
                        boxShadow: "inset 0 1px 1px rgba(0, 0, 0, .075), 0 0 8px red"} : {}} className="input-login" type="password" />
                    {errorMdp === false && <div className="error"> Mot de passe incorrect </div>}
                </div>
                <div className="login-footer">
                <ConfigProvider theme={{
                    components : {
                        Button : {
                            textHoverBg:'white'
                        }
                    }
                }}>
                    <Button  style={{
                        fontSize: 14,
                        fontFamily:' "Poppins", Cursive, "Open-sans" ',
                        height: '40px'
                        
                    }} onClick= {()=> { authentification ()}} className="btn-login"> {auth ? <i className="fa fa-spin fa-circle-o-notch"></i> : <i className="fa fa-sign-in"></i>}  Se connecter</Button>
                </ConfigProvider>
                </div>
            </div>
        </div>
        </div>
    )
}

export default Login