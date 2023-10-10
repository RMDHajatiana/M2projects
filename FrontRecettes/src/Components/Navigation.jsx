import React from 'react';
import { Route, Routes } from 'react-router-dom';
import Login from '../Pages/Login';
import Dashbord from '../Pages/Dashbord';
import Reservation from '../Pages/Reservation';
import Vol from '../Pages/Vol';
import Recettes from '../Pages/Recettes';
import Classe from '../Pages/Classe';
import Passagers from '../Pages/Passagers';
import Historique from '../Pages/Historique';
import Avion from '../Pages/Avion';
import About from '../Pages/About';

const Navigation = () => {
    return ( 
        <Routes>
            <Route path="/" element = { <Login/> } />
            <Route path="/Tableau_de_bord" element = { <Dashbord/> } />
            <Route path="/Vente" element = { <Reservation/> } />
            <Route path="/Vols" element = { <Vol/> } />
            <Route path="/Recettes" element = { <Recettes/> } />
            <Route path="/Avion" element = { <Avion/> } />
            <Route path="/Classe_de_Service" element = { <Classe/> } />
            <Route path="/Passager" element = { <Passagers/> } />
            <Route path="/Historique" element = { <Historique/> } />
            <Route path="/a_propos" element = { <About/> } />
      </Routes>
    );
};

export default Navigation;