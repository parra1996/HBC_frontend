import React, { useState, useEffect } from 'react';

import axios from 'axios';

import { useNavigate } from 'react-router-dom';
import { checkError } from '../../tools';



import { Input } from '@mantine/core';
import { Button } from '@mantine/core';


import './Register.css';

const Register = () => {

    let navigate = useNavigate();

    //Hooks

    const [datosUsuario, setDatosUsuario] = useState({
        nombre: "", apellido: "", edad: "", email: "",
        sexo: "", contrasena: "", contrasena2: "", profesion: "",
        fecha_nacimiento: ""
    });

    const [msgError, setMsgError] = useState("");

    useEffect(() => {
    }, []);

    useEffect(() => {

    })

    const rellenarDatos = (e) => {
        setDatosUsuario({
            ...datosUsuario,
            [e.target.name]: e.target.value
        })
    };

    const registrame = async () => {

        //Array de distintos campos

        setMsgError("");
        let error = "";

        let arrayCampos = Object.entries(datosUsuario);


        if (datosUsuario.contrasena !== datosUsuario.contrasena2) {

            return (setMsgError("Los dos contraseñas deben de coincidir"));

        } else {
            setMsgError("");
        }

        for (let elemento of arrayCampos) {
            error = checkError(elemento[0], elemento[1]);

            if (error !== "ok") {
                setMsgError(error);
                return;
            };
        };

        console.log("todo ha ido bien")

        //2construimos el body

        let body = {
            nombre: datosUsuario.nombre,
            apellido: datosUsuario.apellido,
            edad: datosUsuario.edad,
            email: datosUsuario.email,
            sexo: datosUsuario.sexo,
            contrasena: datosUsuario.contrasena,
            profesion: datosUsuario.profesion,
            fecha_nacimiento: datosUsuario.fecha_nacimiento
        }
        console.log(body);
        try {

            let resultado = await axios.post("https://jppl-hbc-back.herokuapp.com/users/register", body);
            console.log(resultado);

            if (resultado.data.error) {
                setMsgError(resultado.data.error);
            }

            setTimeout(() => {
                navigate('/login');
            }, 2000);

        } catch (error) {
            console.log(error);
        }
    }

    return (
        <div className='register'>

            <Input variant="default" style={{padding : '.5em'}} name="nombre" placeholder="nombre" color='teal' onChange={(e) => { rellenarDatos(e) }} />
            <Input variant="default" style={{padding : '.5em'}} name="apellido" placeholder="apellido" color='teal' onChange={(e) => { rellenarDatos(e) }} />
            <Input variant="default" style={{padding : '.5em'}} name="edad" placeholder="edad" color='teal' onChange={(e) => { rellenarDatos(e) }} />
            <Input variant="default" style={{padding : '.5em', width: '12.5em'}} type="date" name="fecha_nacimiento" color='teal' placeholder="fecha de nacimiento" onChange={(e) => { rellenarDatos(e) }} />
            <Input variant="default" style={{padding : '.5em'}} name="email" placeholder="email" color='teal' onChange={(e) => { rellenarDatos(e) }} />
            <Input variant="default" style={{padding : '.5em'}} name="sexo" placeholder="sexo (mujer/hombre)" color='teal' onChange={(e) => { rellenarDatos(e) }} />
            <Input variant="default" style={{padding : '.5em'}} name="profesion" placeholder="profesion" color='teal' onChange={(e) => { rellenarDatos(e) }} />
            <Input variant="default" style={{padding : '.5em'}} type='password' name="contrasena" color='teal' placeholder="contraseña" onChange={(e) => { rellenarDatos(e) }} />
            <Input variant="default" style={{padding : '.5em'}} type="password" name="contrasena2" placeholder="repite contraseña" color='teal' onChange={(e) => { rellenarDatos(e) }} />
            <Button color="teal" radius="md" size="md" onClick={()=> registrame()}>
                registrame
            </Button> <br />
            {msgError}
        </div >
    )
}

export default Register;