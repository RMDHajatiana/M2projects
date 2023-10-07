import React from 'react';
import * as BiIcons from 'react-icons/bi';

const Appfooter = () => {
    return (
        <div className="Appfooter">
            <p>Gestion de Recettes Commerciales Passagers d'une compagnie Aérienne</p>
            <div className='copyright'>
                 <p> <BiIcons.BiCopyright/> copiryght YSALOSIS 2023</p>
                <p> Développé par ANDRIANANTENAINA Hajatiana Fenohasina </p>
            </div>
        </div>
    );
};

export default Appfooter;