import React from 'react';
import { Card } from 'antd';

export const CardAvion = ({titre}) => {

  return (

    < Card
    title= {titre}
    className='cardBorder'
    bordered={false}
    headStyle={{ border:'none', textAlign:'center' }}
    rootClassName='card'
>

  </Card>
  );
};

export const CardVols = ({titre}) => {

  return (

    < Card
    title= {titre}
    className='cardBorder'
    bordered={false}
    headStyle={{ border:'none', textAlign:'center' }}
    rootClassName='card'>
  </Card>
  );
};


export const CardPassager = ({titre}) => {

  return (

    < Card
    title= {titre}
    className='cardBorder'
    bordered={false}
    headStyle={{ border:'none', textAlign:'center' }}
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
    className='cardBorder'
    bordered={false}
    rootClassName='card'
    headStyle={{ border:'none', textAlign:'center' }}>
  </Card>
  );
};


export const CardClasse = ({titre}) => {

  return (

    < Card
    title= {titre}
    className='cardBorder'
    bordered={false}
    headStyle={{ border:'none', textAlign:'center' }}
    rootClassName='card'>

  </Card>
  );
};

export const CardVente = ({titre}) => {

  return (

    < Card
    title= {titre}
    className='cardBorder'
    rootClassName='card'
    bordered={false}
    headStyle={{ border:'none', textAlign:'center' }}>

  </Card>
  );
};


export const CardRecettes = ({titre}) => {

  return (

    < Card
    title= {titre}
    className='cardBorder'
    rootClassName='card'
    bordered={false}
    headStyle={{ border:'none', textAlign:'center' }}>

  </Card>
  );
};