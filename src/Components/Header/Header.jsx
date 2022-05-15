
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { LOGOUT } from '../../redux/types';
import { connect } from 'react-redux';

import { Button } from '@mantine/core';



import './Header.css';

const Header = (props) => {

    let navigate = useNavigate();

    const [nombre, setNombre] = useState("");

    useEffect(() => {
    })

    
    const navegar = (lugar) => {

        setTimeout(() => {
            navigate(lugar);
        }, 200);

    }

    const logOut = () => {
        props.dispatch({ type: LOGOUT });

        setTimeout(() => {
            navigate("/");
        }, 1500);
    }

    const manejador = (ev) => {
        setNombre(ev.target.value);
    }

    
    if (!props.credentials?.token) {
        return (
            <div className='header'>
                <div className="headercitos">
                    <img className='homeButton' style={{pointer:'cursor'}} src={require('../../img/aguacte.png')} onClick={()=>navigate('/')} alt="home" />
                    healthyByC
                </div>
                <div className="headercitos">
                <Button color='teal' style={{pointer:'cursor'}} onClick={() => navegar("/recetas")}>Recetas</Button>&nbsp;
                <Button color='teal' style={{pointer:'cursor'}} onClick={() => navegar("/login")}>Login</Button>&nbsp;
                <Button color='teal' style={{pointer:'cursor'}} onClick={() => navegar("/register")}>Register</Button> 
                </div>
                <div className="headercitos"></div>
            </div>
        )
    }else if(props.credentials.usuario.rol === true){
        return (
            <div className='header'>
                <div className="headercitos">
                    <img className='homeButton'src={require('../../img/aguacte.png')} onClick={()=>navigate('/')} alt="home" />
                    healthyByC
                </div>
                <div className="headercitos">
                <Button color="teal" style={{pointer:'cursor'}} onClick={() => navegar("/perfil")}>{props.credentials?.usuario.nombre} {props.credentials?.usuario.apellido}</Button>&nbsp;
                <Button color="teal" style={{pointer:'cursor'}} onClick={() => navegar("/recetas")}>Recetas</Button>&nbsp;
                <Button color="teal" style={{pointer:'cursor'}} onClick={() => logOut()}>LogOut</Button>&nbsp;
                <Button color="teal" style={{pointer:'cursor'}} onClick={() => navegar('/admin')}>Admin</Button>&nbsp;
                </div>
                <div className="headercitos"></div>
            </div>
        )
    }
     else {
        return (
            <div className='header'>
                <div className="headercitos">
                    <img className='homeButton'src={require('../../img/aguacte.png')} onClick={()=>navigate('/')} alt="home" />
                    healthyByC
                </div>
                <div className="headercitos">
                <Button color="teal" style={{pointer:'cursor'}} onClick={() => navegar("/perfil")}>{props.credentials?.usuario.nombre} {props.credentials?.usuario.apellido}</Button>&nbsp;
                <Button color="teal" style={{pointer:'cursor'}} onClick={() => navegar("/recetas")}>Recetas</Button>&nbsp;
                <Button color="teal" style={{pointer:'cursor'}} onClick={() => logOut()}>LogOut</Button>&nbsp;
                </div>
                <div className="headercitos"></div>
            </div>
        )
    }
}

export default connect((state) => ({
    credentials: state.credentials,
    search: state.search
}))(Header);