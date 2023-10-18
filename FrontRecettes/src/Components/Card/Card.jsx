import { Button, Card, ConfigProvider, Input, Modal, Upload } from 'antd';
import { UploadOutlined } from '@ant-design/icons';
import { useEffect, useState } from 'react';
import * as BiIcons from 'react-icons/bi';
import { TableClasse } from '../Table';
import axios from 'axios';
import { ModalClasse } from '../Modal';


export const CardVols = ({titre}) => {

  return (

    < Card
    title= {titre}
    style={{   width: '100% ',  height: '88vh', marginLeft:'40px', maxWidth:'94%', fontFamily : '"Poppins", cursive, "open-sans"'   }}
    className='cardBorder'
    bodyStyle={{ height:'98%', overflow:'auto', margin:'auto' }}
    bordered={false}
    headStyle={{ border:'none', textAlign:'center', fontFamily : '"Poppins", cursive, "open-sans"'  }}
    rootClassName='card'>
  </Card>
  )
}

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
  )
}

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