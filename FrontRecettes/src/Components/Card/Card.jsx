import React, { useEffect } from 'react';
import { Button, Card, ConfigProvider, Input, Modal, Upload } from 'antd';
import { UploadOutlined } from '@ant-design/icons';
import { useState } from 'react';
import axios from 'axios';
import { TablePassagers } from '../Table';
import * as BsIcon from 'react-icons/bs' ;
import { ModalEditPassager, ModalPassager, } from './Modal';

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
    bodyStyle={{ height:'98%', overflow:'auto', margin:'auto' }}
    bordered={false}
    headStyle={{ border:'none', textAlign:'center', fontFamily : '"Poppins", cursive, "open-sans"'  }}
    rootClassName='card'>
  </Card>
  )
}


export const CardPassager = ({titre}) => {

  const IndexData = [  
  "id_passager",
  "nom_passager",
  "prenom_passager",
  "phone_passager",
  "email_passager",
  "num_passeport",
  "adresse_passager"
]

const title  = [
  "Id",
  "Nom",
  "Prenom",
  "Téléphone",
  "E-mail",
  "Passeport",
  "Adresse",
]


// fetch data // 

  const [data, setData] = useState([])
  const fetch =  async () => {
    let resultats = await axios.get("http://localhost:5160/api/Passagers")
    setData(resultats.data)
  }  
  useEffect( ()=> {
    const intervale = setInterval(() => {
      fetch()
    }, 1000)
    return () => clearInterval(intervale)
  },[])

  
  //recherche//

  const [recherche, setRecherche ] = useState('')
  const handleRecherche = (e)  => {
    setRecherche(e.target.value)
  }

  // Ajout de données // 
  const [open, setOpen ]= useState(false)
  const HandleModalAdd = () => {
    setOpen(true)
  }

  // Moddification // 
const [ idpassagerToEdit, setidpassagerToEdit ] = useState(null)
  const [openModalEdit, setOpenModalEdit] = useState(false)

  const OpenModalEdit = () => {
    setOpenModalEdit(true)
  } 

  // suppression de données // 

  const handleRecuperedId =  (id_passager) => {

  Modal.confirm ({
    cancelText:'Annuler',
    okType:'danger',
    title : "Voulez vous vraiment supprimer ? ", 
    onOk: () => {
      axios.delete("http://localhost:5160/api/Passagers/" + id_passager )
      .then(() => fetch())
      .catch(error => console.log(error))
    }
  }) }

  const key = [  
  "nom_passager",
  "prenom_passager",
  "phone_passager",
  "email_passager",
  "num_passeport",
  "adresse_passager"
]

  return (

    < Card
    title= {titre}
    style={{   width: '100% ',  height: '90vh', marginLeft:'40px', maxWidth:'94%', fontFamily : '"Poppins", cursive, "open-sans"'  }}
    className='cardBorder'
    bodyStyle={{ height:'90%', overflow:'auto', margin:'auto' }}
    bordered={false}
    headStyle={{ border:'none', textAlign:'center', fontFamily : '"Poppins", cursive, "open-sans"'  }}
    rootClassName='card'>
    <div className="cardBody">
      <div style={{ marginBottom:14, display:'flex', flexDirection:'row', fontFamily: '"Poppins", cursive, "open-sans"' }} >
        <ConfigProvider theme={{
          components : {
            Button : {
            fontFamily: '"Poppins", cursive, "open-sans"',
            colorPrimary:'#b82626',
            colorPrimaryBorder:'#b82626',
            colorPrimaryHover:'rgba(145, 53, 61, 0.699)',
            colorPrimaryActive:'#b82626'
            }, 
            Input: {
              activeBorderColor:'#b82626',
              hoverBorderColor:'#b82626'
            }
          }}} >
            <Button  onClick={() => HandleModalAdd () }
            type='primary'  icon= {<BsIcon.BsPersonAdd/>} >Ajouter</Button>
            <Input style={{ marginLeft:'70%' }} value={recherche} onChange={handleRecherche} placeholder =  "Rechercher" />
        </ConfigProvider>
      </div>

      {/* Affichage de données */}

          <TablePassagers
          handleEdit = {(id_passager) => {
            OpenModalEdit(id_passager) 
            setidpassagerToEdit(id_passager)
          }}
          handleDelete={ (id_passager) => handleRecuperedId(id_passager) }
          data = { data.filter( (items)  =>  key.some( key =>  items[key]  &&  items[key].toString().toLowerCase().includes(recherche)  )) }
          title={title} 
          IndexData={IndexData} 
          size='large' />

          {/* Modal Ajout */}

          <ModalPassager
          titre='Ajouter un passager'
          cancelText= 'Annuler'
           okText='Ajouter' open={open} 
           onCancel = {() => setOpen(false)}
           handleSave  = {() => setOpen(false)} />

           {/* //Modal Modification // */}

           <ModalEditPassager  
           titre= "Modification"
           cancelText = "Annuler"
           okText='Enregister'
           handleUpdate
           idpassagerToEdit={idpassagerToEdit}
           open={openModalEdit}
           handleSaveUpdate = {() => setOpenModalEdit(false)}
           onCancel={ () => setOpenModalEdit(false) }/>

    </div>
  </Card>
  )
}

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
    bodyStyle={{ height:'92%', overflow:'auto'}}
    headStyle={{ border:'none', textAlign:'center', fontFamily : '"Poppins", cursive, "open-sans"'  }}
    rootClassName='card'>
  </Card>
  )
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

      <Upload>
        <Button icon ={ <UploadOutlined/>} > Importer </Button>
      </Upload>
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