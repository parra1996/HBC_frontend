
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { connect } from 'react-redux';
import { RECETA_ESPECIFICA } from '../../redux/types';

import { Card } from 'react-bootstrap';
import { Button } from 'react-bootstrap';

import './Recetas.css';

const Recetas = (props) => {

    const [recetas, setRecetas] = useState([]);
    let navigate = useNavigate();

    useEffect(() => {

        trae_recetas();
    }, []);


    useEffect(() => {
        console.log(" films ha cambiado ", recetas);
    }, [recetas]);

    const trae_recetas = async () => {




        try {

            let res = await axios.get("https://jppl-hbc-back.herokuapp.com/recetas");

            setTimeout(() => {

                setRecetas(res.data);
            }, 1000);

        } catch (error) {
            console.log(error);
        }
    };

    const escoge_receta = (receta) => {

        console.log(receta);
        props.dispatch({ type: RECETA_ESPECIFICA, payload: receta });


        navigate("/receta_especifica");
    }
    if (recetas[0]?.id !== undefined) {
        return (
            <div className="recetas">

                {
                    recetas.map((datica) => {
                        return (
                            <div className="cartas" key={datica.id}>
                                <Card style={{ width: '18rem' }}>
                                    <Card.Img variant="top" src={datica.imagen} />
                                    <Card.Body>
                                        <Card.Title>{datica.nombre}</Card.Title>
                                        <Button variant="success" onClick={() => escoge_receta(datica)}>check recet</Button>
                                    </Card.Body>
                                </Card><br/>
                            </div>
                        )
                    })
                }

            </div>
        )
    } else {
        return (
            <div className='recetas'>
                <div className="marginLoader">
                    <img src={require('../../img/avocado.gif')} alt="cargador" />
                </div>
            </div>
        )
    }
}

export default connect()(Recetas);


