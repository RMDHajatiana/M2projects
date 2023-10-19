import { Card } from 'antd';
import React, { useEffect } from 'react';


const Recettes = () => {
    const {Meta} = Card
    useEffect(()=> {
        document.title  = "Recettes"
    })
    return (
        <div  className='conteneur'>
            < Card
                title= "Recettes"
                style={{   width: '100% ',  height: '88vh', marginLeft:'40px', maxWidth:'94%', fontFamily : '"Poppins", cursive, "open-sans"'   }}
                className='cardBorder'
                rootClassName='card'
                bodyStyle={{ height:'95%', overflow:'auto' }}
                bordered={false}
                headStyle={{ border:'none', textAlign:'center', fontFamily : '"Poppins", cursive, "open-sans"'  }}>

                    <Card
                        style={{ fontFamily : '"Poppins", cursive, "open-sans"', width: '20%', justifyContent:'center'}}
                        hoverable
                        cover ={ ""} >
                        <Meta title="Recette globale" description="200000 $" />
                    </Card>

            </Card>
        </div>
    );
};

export default Recettes;