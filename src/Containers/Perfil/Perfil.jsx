
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { connect } from 'react-redux';
// import { MODIFY_CREDENTIALS } from '../../redux/types';
import axios from 'axios';

import { useNotifications, updateNotification } from '@mantine/notifications';




import Accordion from 'react-bootstrap/Accordion'
import ListGroup from 'react-bootstrap/ListGroup';
import Button from 'react-bootstrap/Button';

import "./Perfil.css";

const Perfil = (props) => {

    let navigate = useNavigate();

    const notification = useNotifications();


    const [recetas_adquiridas, setRecetas_adquiridas] = useState([]);

    const [contrasena, setContrasena] = useState({
        claveAnterior: undefined,
        claveNueva: undefined,
    })

    //Hooks
    const [datosUsuario, setDatosUsuario] = useState({
        newPassword: '',
    });

    const rellenarDatos = (e) => {
        setDatosUsuario({
            ...datosUsuario,
            [e.target.name]: e.target.value
        })
    };

    const rellenarDatos2 = (e) => {
        setContrasena({
            ...contrasena,
            [e.target.name]: e.target.value
        })
    };

    useEffect(() => {
        if (props.credentials.token === '') {
            navigate("/");
        }

        mostrarPedido();
    }, [])

    useEffect(() => {
    }, [props.credentials.usuario])

    const borrar_pedido = async (id) => {

        try {
            let config = {
                headers: { Authorization: `Bearer ${props.credentials.token}` }
            };

            let res = axios.delete(`https://jppl-hbc-back.herokuapp.com/receta_adquirida/${id}`, config)
            if (res) {
                notification.showNotification({
                    message: 'receta eliminada con exito',
                    color: "green",
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

    const mostrarPedido = async () => {

        let config = {
            headers: { Authorization: `Bearer ${props.credentials.token}` }
        };

        let id = props.credentials.usuario.id;

        let res = await axios.get(`https://jppl-hbc-back.herokuapp.com/receta_adquirida/${id}`, config);

        setRecetas_adquiridas(res.data);
    }

    const updateUser = async () => {

        let config = {
            headers: { Authorization: `Bearer ${props.credentials.token}` }
        };

        let body = {
            id: props.credentials.usuario.id,
            oldPassword: props.credentials.usuario.contrasena,
            newPassword: datosUsuario.newPassword,
        }
        try {
            //Hacemos el update en la base de datos
            let res = await axios.put(`https://jppl-hbc-back.herokuapp.com/users/`, body, config);
            if (res) {
                notification.showNotification({
                    message: 'Contraseña cambiada con exito',
                    color: "green",
                    autoClose: 2000,
                })
                setTimeout(() => {
                    window.location.reload();

                }, 2000);
            }
        } catch (error) {
            console.log(error)
        }

    }

    const updatePassword = async () => {
        let body = {
            claveAnterior: contrasena.claveAnterior,
            claveNueva: contrasena.claveNueva
        }

        let config = {
            headers: { Authorization: `Bearer ${props.credentials.token}` }
        };

        try {
            let respuesta = await axios.put(`https://jppl-hbc-back.herokuapp.com/users/${props.credentials.usuario.id}/clave`, body, config);
            if ( respuesta.status === 400 || respuesta.status ===  401) {
                notification.showNotification({
                    message: 'no se pudo actualizar la contraseña',
                    color: "red",
                    autoClose: 2000,
                })

                setTimeout(() => {
                    window.location.reload();

                }, 2000);
            } else {
                notification.showNotification({
                    message: 'contraseña actualizada con exito',
                    color: "green",
                    autoClose: 2000,
                })

                setTimeout(() => {
                    window.location.reload();

                }, 2000);
            }
        } catch (error) {
            console.log(error)
        }
    }



    return (
        <div className="perfil">
            <div className="datos">
                <div className=''>
                    <ListGroup variant="flush">
                        <ListGroup.Item variant='success'><b>Nombre: </b>{props.credentials.usuario.nombre}</ListGroup.Item>
                        <ListGroup.Item variant='success'><b>Apellidos: </b>{props.credentials.usuario.apellido}</ListGroup.Item>
                        <ListGroup.Item variant='success'><b>Email: </b>{props.credentials.usuario.email}</ListGroup.Item>
                        <ListGroup.Item variant='success'><b>Age:</b>{props.credentials.usuario.edad}</ListGroup.Item>
                        <ListGroup.Item variant='success'><b>Contraseña vieja:</b><input className='inp' type="text" name="claveAnterior" id="claveAnterior" title="claveAnterior" placeholder="vieja contraseña" autoComplete="off" onChange={(e) => { rellenarDatos2(e) }} /></ListGroup.Item>
                        <ListGroup.Item variant='success'><b>Contraseña nueva:</b><input className='inp' type="text" name="claveNueva" id="claveNueva" title="claveNueva" placeholder="new pass" autoComplete="off" onChange={(e) => { rellenarDatos2(e) }} /></ListGroup.Item>
                    </ListGroup><br />
                    <Button variant="outline-success" onClick={() => updatePassword()}>Actualizar datos</Button>
                </div>
            </div>
            <div className="recetas_fav">

                <Accordion defaultActiveKey="0" >
                    <Accordion.Item eventKey="0">
                        <Accordion.Header>Lista de tus recetas favorita {props.credentials.usuario.nombre}</Accordion.Header>
                        <Accordion.Body className='acordeon' >
                            {
                                recetas_adquiridas.map(results => {
                                    return (
                                        <div className="pedidos2" key={results.id}>
                                            <img className='cartel3' src={results.imagen} alt=''></img>
                                            <p>
                                                Nombre: {results.nombre}.
                                            </p>
                                            <Button variant="danger" onClick={() => borrar_pedido(results.id)}>borrar receta</Button>
                                            <br /><br />
                                        </div>
                                    )
                                })
                            }

                        </Accordion.Body>
                    </Accordion.Item>
                </Accordion>
            </div>

            <div>

            </div>
        </div>
    )


}

export default connect((state) => ({
    credentials: state.credentials
}))(Perfil);