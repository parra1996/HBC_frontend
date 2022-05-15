
import React from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { Button } from 'react-bootstrap';
import Alert from 'react-bootstrap/Alert'


import { useNotifications, updateNotification } from '@mantine/notifications';

import './Adquirir.css';

const Adquirir = (props) => {

    const notification = useNotifications();


    let navigate = useNavigate();

    const alquilar = async () => {

        let body = {
            recetaID: props.id,
            usuarioId: props.idUser,
        }
        console.log(body);

        let config = {
            headers: { Authorization: `Bearer ${props.token}` }
        };

        try {

            let res = await axios.post("https://jppl-hbc-back.herokuapp.com/receta_adquirida", body, config);

            if (res) {

                notification.showNotification({
                    message: 'Has adquirido la receta con exito!',
                    color: "green",
                    autoClose: 2000,
                })
                setTimeout(() => {
                    navigate('/');
                }, 3000);
            } else {
                notification.showNotification({
                    message: 'Hubo un problema al adquirir la receta',
                    color: "red",
                    autoClose: 2000,
                })
                setTimeout(() => {
                    navigate('/');
                }, 3000);
            }

        } catch (error) {
            console.log(error)
        }
    }

    return (
        <div className="" >
            <Button variant="success" onClick={() => alquilar()}>Adquirir</Button>
        </div>
    )
}

export default Adquirir;