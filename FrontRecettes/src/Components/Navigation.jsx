import React from 'react';
import { Route, Routes } from 'react-router-dom';
import Dashbord from '../Pages/Dashbord';
import Reservation from '../Pages/Reservation';
import Vol from '../Pages/Vol';
import Recettes from '../Pages/Recettes';
import Classe from '../Pages/Classe';
import Passagers from '../Pages/Passagers';
import Historique from '../Pages/Historique';
import Avion from '../Pages/Avion';

const Navigation = () => {
    return ( 
        <Routes>
            <Route path="/" element = { <Dashbord/> } />
            <Route path="/Vente" element = { <Reservation/> } />
            <Route path="/Vols" element = { <Vol/> } />
            <Route path="/Recettes" element = { <Recettes/> } />
            <Route path="/Avion" element = { <Avion/> } />
            <Route path="/Classe_de_Service" element = { <Classe/> } />
            <Route path="/Passager" element = { <Passagers/> } />
            <Route path="/Historique" element = { <Historique/> } />
      </Routes>
    );
};

export default Navigation;