import React from 'react';
import * as BsIcons from 'react-icons/bs';

const Appfooter = () => {
    return (
        <div className="Appfooter">
            <p style={ { fontFamily:'"Poppins", cursive, "open-sans"', marginTop:'0.5%', textAlign:'center', fontSize:'19px'}}>Gestion de Recettes Commerciales Passagers d'une compagnie Aérienne</p>
            <div className="contact">
              <div className='image'>
                    <img style={{ width:'25%' }} src="./logoIsalosys.png" alt="logoisalosys" />
             </div>
             <div className='copyright'>
                <p>{<BsIcons.BsFacebook size={16}/>} {<BsIcons.BsTwitter size={16} />} {<BsIcons.BsInstagram size={16} />}</p>
             </div>
             </div>
                        {/* <p>{ <BiIcons.BiCopyright/>} copiryght YSALOSIS 2023</p>             */}
                        {/* <p> Développé par ANDRIANANTENAINA Hajatiana Fenohasina </p> */}
        </div>
    );
};

export default Appfooter