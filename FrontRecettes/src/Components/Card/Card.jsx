import React from 'react';
import { Card } from 'antd';

export const CardAvion = ({titre}) => {

  return (

    < Card
    title= {titre}
    className='cardBorder'
    bordered={false}
    headStyle={{ border:'none', textAlign:'center' }}
    style={{
      width: '1220px',
      height: '85vh' ,
      margin: '70px 70px 0px 56px',

    }}>

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
    style={{
      width: '1220px',
      height: '85vh' ,
      margin: '70px 70px 0px 56px',

    }}>

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
    style={{
      width: '1220px',
      height: '85vh' ,
      margin: '70px 70px 0px 56px',

    }}>

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
    headStyle={{ border:'none', textAlign:'center' }}
    style={{
      width: '1220px',
      height: '85vh' ,
      margin: '70px 70px 0px 56px',

    }}>

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
    style={{
      width: '1220px',
      height: '85vh' ,
      margin: '70px 70px 0px 56px',
    }}>

  </Card>
  );
};