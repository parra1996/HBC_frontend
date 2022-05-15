import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

//REDUX...
import { connect } from 'react-redux';
import { LOGIN } from '../../redux/types';

import { Form } from 'react-bootstrap';


import { Input } from '@mantine/core';
import { Button } from '@mantine/core';



import './Login.css';

const Login = (props) => {

    let navigate = useNavigate();

    //1-Hooks (equivalen al estado en los componentes de clase)
    const [datosUsuario, setDatosUsuario] = useState({ email: "", contrasena: "" });
    // const [msgError, setMsgError] = useState("");
    const [msgError2, setMsgError2] = useState("");



    //Funciones handlers
    const rellenarDatos = (e) => {
        setDatosUsuario({ ...datosUsuario, [e.target.name]: e.target.value })
    };

    //Funciones locales

    const login = async () => {

        try {

            let body = {
                email: datosUsuario.email,
                contrasena: datosUsuario.contrasena
            }
            let resultado = await axios.post("https://jppl-hbc-back.herokuapp.com/users/login", body);

            console.log(resultado.data)

            if (resultado.data === "Usuario o contraseña inválido") {
                setMsgError2("Usuario o contraseña inválido")
            } else {

                props.dispatch({ type: LOGIN, payload: resultado.data });
                navigate("/");
            }

        } catch (error) {
            console.log(error)
        }
    };

    return (

        <div className='login'>
            <div className="designFormulario">
                <div className="form">
                    <Input type="email" name="email" id="email" placeholder="email" onChange={(e) => { rellenarDatos(e) }} /> <br />
                    <Input type="password" name="contrasena" id="contrasena" title="contrasena" placeholder="contrasena" autoComplete="off" onChange={(e) => { rellenarDatos(e); }} />
                    {/* {msgError} */}
                    {msgError2}
                </div><br />
                <div className="bott">
                    <Button color="teal" onClick={() => { login() }} >
                        Login
                    </Button>
                </div>
            </div>
        </div>
    );

};


export default connect()(Login);