import React from 'react';
import { Card } from 'antd';

export const CardAvion = ({titre}) => {

  return (

    < Card
    title= {titre}
    style={{   width: '100% ',  height: '88vh', marginLeft:'40px', maxWidth:'94%', fontFamily : '"Poppins", cursive, "open-sans"'   }}
    className='cardBorder'
    bodyStyle={{ height:'95%', overflow:'auto' }}
    bordered={false}
    headStyle={{ border:'none', textAlign:'center', fontFamily : '"Poppins", cursive, "open-sans"'  }}
   
>

  </Card>
  );
};

export const CardVols = ({titre}) => {

  return (

    < Card
    title= {titre}
    style={{   width: '100% ',  height: '88vh', marginLeft:'40px', maxWidth:'94%', fontFamily : '"Poppins", cursive, "open-sans"'   }}
    className='cardBorder'
    bodyStyle={{ height:'95%', overflow:'auto' }}
    bordered={false}
    headStyle={{ border:'none', textAlign:'center', fontFamily : '"Poppins", cursive, "open-sans"'  }}
    rootClassName='card'>
  </Card>
  );
};


export const CardPassager = ({titre}) => {

  return (

    < Card
    title= {titre}
    style={{   width: '100% ',  height: '88vh', marginLeft:'40px', maxWidth:'94%', fontFamily : '"Poppins", cursive, "open-sans"'  }}
    className='cardBorder'
    bodyStyle={{ height:'95%', overflow:'auto' }}
    bordered={false}
    headStyle={{ border:'none', textAlign:'center', fontFamily : '"Poppins", cursive, "open-sans"'  }}
    rootClassName='card'>

      <div>
        body
      </div>

  </Card>
  );
};

export const CardHistorique = ({titre}) => {

  return (

    < Card
    title= {titre}
    style={{   width: '100% ',  height: '88vh', marginLeft:'40px', maxWidth:'94%', fontFamily : '"Poppins", cursive, "open-sans"'   }}
    className='cardBorder'
    bodyStyle={{ height:'95%', overflow:'auto' }}
    bordered={false}
    rootClassName='card'
    headStyle={{ border:'none', textAlign:'center', fontFamily : '"Poppins", cursive, "open-sans"'  }}>
  </Card>
  );
};


export const CardClasse = ({titre}) => {

  return (

    < Card
    title= {titre}
    style={{   width: '100% ',  height: '88vh', marginLeft:'40px', maxWidth:'94%', fontFamily : '"Poppins", cursive, "open-sans"'   }}
    className='cardBorder'
    bordered={false}
    bodyStyle={{ height:'95%', overflow:'auto' }}
    headStyle={{ border:'none', textAlign:'center', fontFamily : '"Poppins", cursive, "open-sans"'  }}
    rootClassName='card'>
  </Card>
  );
};

export const CardVente = ({titre}) => {

  return (

    < Card
    title= {titre}
    style={{   width: '100% ',  height: '88vh', marginLeft:'40px', maxWidth:'94%', fontFamily : '"Poppins", cursive, "open-sans"'   }}
    className='cardBorder'
    rootClassName='card'
    bodyStyle={{ height:'95%', overflow:'auto' }}
    bordered={false}
    headStyle={{ border:'none', textAlign:'center', fontFamily : '"Poppins", cursive, "open-sans"'  }}>
  </Card>
  );
};


export const CardRecettes = ({titre}) => {

  return (

    < Card
    title= {titre}
    style={{   width: '100% ',  height: '88vh', marginLeft:'40px', maxWidth:'94%', fontFamily : '"Poppins", cursive, "open-sans"'   }}
    className='cardBorder'
    rootClassName='card'
    bodyStyle={{ height:'95%', overflow:'auto' }}
    bordered={false}
    headStyle={{ border:'none', textAlign:'center', fontFamily : '"Poppins", cursive, "open-sans"'  }}>

  </Card>
  );
};

export const CardApropos = ({titre}) => {

  return (

    < Card
    title= {titre}
    style={{   width: '100% ',  height: '88vh', marginLeft:'40px', maxWidth:'94%', fontFamily : '"Poppins", cursive, "open-sans"'   }}
    className='cardBorder'
    rootClassName='card'
    bodyStyle={{ height:'95%', overflow:'auto' }}
    bordered={false}
    headStyle={{ border:'none', textAlign:'center', fontFamily : '"Poppins", cursive, "open-sans"'  }}>
        <div>
        body
      </div>
  </Card>
  );
};