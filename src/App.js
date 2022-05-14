import './App.css';

import {BrowserRouter, Routes, Route} from 'react-router-dom';

import Home from './Containers/Home/Home';
import Login from './Containers/Login/Login';
import Register from './Containers/Register/Register';
import Recetas from './Containers/Recetas/Recetas';
import Receta_especifica from './Containers/Receta_especifica/Receta_especifica';
import Perfil from './Containers/Perfil/Perfil';
import Header from './Components/Header/Header';
import Footer from './Components/Footer/Footer';
import Admin from './Containers/Admin/Admin';

function App() {
  return (
    <div className="App">
        <BrowserRouter>
       <Header/>
            <Routes> 
                <Route path="/" element={<Home/>} />
                <Route path="/login" element={<Login/>} />
                <Route path="/register" element={<Register/>} />
                <Route path="/recetas" element={<Recetas/>} />
                <Route path="/receta_especifica" element={<Receta_especifica/>} />
                <Route path="/perfil" element={<Perfil/>} />
                <Route path="/admin" element={<Admin/>} />
            </Routes>
                <Footer/>
        
        </BrowserRouter>
    </div>
  );
}

export default App;
