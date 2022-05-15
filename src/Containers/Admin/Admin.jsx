import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom'
import { connect } from 'react-redux'

import { List } from '@mantine/core';
import { useNotifications } from '@mantine/notifications';
import { Button } from '@mantine/core';
import { Card, Text } from '@mantine/core';
import { Input } from '@mantine/core';




import './Admin.css'

const Admin = (props) => {

    const notification = useNotifications();

    const [users, setUsers] = useState([]);

    const [datosReceta, setDatosReceta] = useState({
        nombre: "", ingredientes: "", preparacion: "", preparacion_2: "",
        imagen: "",
    });

    useEffect(() => {

        if (props.credentials.usuario.rol !== true) {
            navigate("/");
        }
        traer_usuarios();
    }, [])

    let navigate = useNavigate();



    useEffect(() => {

    })

    const rellenarDatos = (e) => {
        setDatosReceta({
            ...datosReceta,
            [e.target.name]: e.target.value
        })
    };

    const traer_usuarios = async () => {
        try {

            let config = {
                headers: { Authorization: `Bearer ${props.credentials.token}` }
            };

            let res = await axios.get('https://jppl-hbc-back.herokuapp.com/users', config)
            console.log(res.data, "ESTOS SON LOS RESULTADOS");
            setUsers(res.data);

        } catch (err) {
            console.log(err);
        }

    }

    const eliminar_usuario = async (id) => {
        try {
            let config = {
                headers: { Authorization: `Bearer ${props.credentials.token}` }
            };

            console.log(id, "ESTO ES ID");
            let res = await axios.delete(`https://jppl-hbc-back.herokuapp.com/users/${id}`, config)
            if (res) {
                notification.showNotification({
                    message: 'usuario eliminado con exito',
                    color: "red",
                    autoClose: 2000,
                })

                setTimeout(() => {
                    window.location.reload();

                }, 2000);
            }
        } catch (error) {
            console.log("error");
        }
    }

    const agregar_receta = async () => {

        try {
            let body = {
                nombre: datosReceta.nombre,
                ingredientes: datosReceta.ingredientes,
                preparacion: datosReceta.preparacion,
                preparacion_2: datosReceta.preparacion_2,
            }

            let resultado2 = await axios.post("https://jppl-hbc-back.herokuapp.com/recetas", body);
            console.log(resultado2, "ESTO ES RESUTLADOOOOOOO");
            if (resultado2) {
                setDatosReceta(resultado2.data);
            }

        } catch (err) {
            console.log(err);
        }
    }

    if (users.length !== 0) {
        return (
            <div className='admin'>
                <div className="admin_izq">
                    <p>LISTA DE TODOS LOS USUARIOS</p>
                    {
                        users.map(resultado => {
                            return (

                                <div key={resultado.id} className="usuarios1" >
                                    <Card key={resultado._id} color="green">
                                        <Text size="lg" style={{ color: "green" }}>id:{resultado.id}. Nombre: {resultado.nombre},{resultado.apellido} </Text>
                                        <Button color="red" onClick={() => eliminar_usuario(resultado.id)}>
                                            Eliminar
                                        </Button>
                                    </Card> <br/>
                                </div> 
                            )
                        })
                    }
                </div>
                <div className="admin_der">
                    <p>AGREGAR RECETA</p>
                    <Input variant="default" name ="nombre"placeholder="nombre" onChange={(e) => { rellenarDatos(e) }} /><br/>
                    <Input variant="default" name ="ingredientes" placeholder="ingredientes" onChange={(e) => { rellenarDatos(e) }} /><br/>
                    <Input variant="default" name ="preparacion" placeholder="preparacion (max 250 caracteres)" onChange={(e) => { rellenarDatos(e) }} /><br/>
                    <Input variant="default" name ="preparacion_2" placeholder="preparacion" onChange={(e) => { rellenarDatos(e) }} /><br/>
                    <Button color="green" size="md" onClick={()=> agregar_receta()}>
                      Agregar
                    </Button>

                </div>
            </div>
        )
    } else {
        return (
            <div className='loader'>
                <img src={require('../../img/avocado.gif')} />
            </div>
        )
    }
}

export default connect((state) => ({
    credentials: state.credentials
}))(Admin)