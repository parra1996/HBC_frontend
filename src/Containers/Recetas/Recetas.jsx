
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

            let res = await axios.get("http://localhost:5000/recetas");

            //Una vez han venido los datos del backend, nosotros, lo siguiente que haremos para que no se pierdan
            //será setear esos datos en el hook, haciendo que las recetas estén disponibles 
            //para los return del componente.

            setTimeout(() => {

                setRecetas(res.data);
            }, 1000);

        } catch (error) {
            console.log(error);
        }
    };

    const escoge_receta = (receta) => {

        console.log(receta);
        //Guardamos la receta escogida en redux
        props.dispatch({ type: RECETA_ESPECIFICA, payload: receta });


        //Redirigimos a movieDetail con navigate
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


