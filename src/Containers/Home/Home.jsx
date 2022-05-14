import React from 'react';
import './Home.css';

// import Button from 'react-bootstrap/Button';

import Carousel from 'react-bootstrap/Carousel';

const Home = () => {



  
    return (
        <div className='home'>
            <div className="home_izq">
                <div className="home_izq_somos">
                    <p className='text'>Quien soy ?</p>
                    <div className='quien_soy'>
                        <p className="quien_soy2">Detras de la cuenta de instagram @healthyByC, Despues de muchos años llevando un estilo de vida saludable
                            y pasando por ambos extremos, quiero demostrar que comer saludable no tiene porque ser aburrido ni desabrido.
                            Toda comida y plato tiene su version saludable.
                            En esta página encontraras varias recetas saludables para comenzar a crear un estilo de vida saludable y te animes a llevar una 
                            alimentacion mas balanceada.
                        </p>
                    </div>
                </div>
                <div className="home_izq_dieta"></div>
            </div>
            <div className="home_der">
                <Carousel>
                    <Carousel.Item interval={3500} >
                        <img
                            style={{height : '37em'}}
                            className="d-block w-100"
                            src={require('../../img/pasta.png')}
                            alt="First slide"
                        />
                    </Carousel.Item>
                    <Carousel.Item interval={3500}>
                        <img
                            style={{height : '37em'}}
                            className="d-block w-100"
                            src={require('../../img/pasta.png')}
                            alt="Second slide"
                        />
                    </Carousel.Item>
                    <Carousel.Item interval={3500}>
                        <img
                            style={{height : '37em'}}
                            className="d-block w-100"
                            src={require('../../img/pasta.png')}
                            alt="Third slide"
                        />
                    </Carousel.Item>
                    <Carousel.Item interval={3500}>
                        <img
                            style={{height : '37em'}}
                            className="d-block w-100"
                            src={require('../../img/pasta.png')}
                            alt="Third slide"
                        />
                    </Carousel.Item>
                    <Carousel.Item interval={3500}>
                        <img
                            style={{height : '37em'}}
                            className="d-block w-100"
                            src={require('../../img/pasta.png')}
                            alt="Third slide"
                        />
                    </Carousel.Item>
                    <Carousel.Item interval={3500}>
                        <img
                            style={{height : '37em'}}
                            className="d-block w-100"
                            src={require('../../img/pasta.png')}
                            alt="Third slide"
                        />
                    </Carousel.Item>
                </Carousel>
            </div>
        </div>
    )
}
export default Home;