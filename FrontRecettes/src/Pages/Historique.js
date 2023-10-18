import React from 'react';
import { Card } from 'antd';

const Historique = () => {
    return (
        <div className='conteneur'>
             < Card
                title= "Historique"
                style={{   width: '100% ',  height: '88vh', marginLeft:'40px', maxWidth:'94%', fontFamily : '"Poppins", cursive, "open-sans"'   }}
                className='cardBorder'
                bodyStyle={{ height:'95%', overflow:'auto' }}
                bordered={false}
                rootClassName='card'
                headStyle={{ border:'none', textAlign:'center', fontFamily : '"Poppins", cursive, "open-sans"'  }}>
            </Card>
        </div>
    );
};

export default Historique;