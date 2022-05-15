
import React from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { Button } from 'react-bootstrap';
import Alert from 'react-bootstrap/Alert'

import './Adquirir.css';

const Adquirir = (props) => {

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

                <Alert variant="success">
                <Alert.Heading>has adquirido tu receta con exito</Alert.Heading>
                </Alert>
                setTimeout(() => {
                    navigate('/');
                }, 3000);
            } else {
                <Alert variant="danger">
                <Alert.Heading>no has podido adquirir esta receta</Alert.Heading>
                </Alert>
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