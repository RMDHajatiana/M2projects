import React, { useEffect } from 'react';

const Dashbord = () => {
    useEffect(()=>{
        document.title = "Tableau de bord"
    })
    return (
        <div className='conteneur'>
            Tableau de bord
        </div>
    );
};

export default Dashbord;