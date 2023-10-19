import React from 'react';
import { useEffect, useState } from 'react';
import * as BiIcons from 'react-icons/bi';
import * as FiIcons from 'react-icons/fi';
import { TableAvion } from '../Components/Table';
import axios from 'axios';
import { ModalAvion } from '../Components/Modal';
import { Button, Card, ConfigProvider, Input, Modal, } from 'antd';


const Avion = () => {

  const IndexData = [  
    "id_aeronef",
    "type_aeronef",
    ]
    const title  = [
    "Id",
    "Nom de l'Avion",
    ]

  //recherche//

  const [recherche, setRecherche ] = useState('')
  const handleRecherche = (e)  => {
    setRecherche(e.target.value)
  }

  const key = [  
    "id_aeronef",
    "type_aeronef",
  ]

  //fetch donées // 

  const [ data, setData ] = useState([])

  const fetch = async () => {
    let resultat =await  axios.get("http://localhost:5160/api/Avions")
    setData(resultat.data)
  }

  useEffect(()=> {
    const intervale = setInterval(() => {
      fetch()
    }, 1000)
    return () => clearInterval(intervale)
  })

    // Ajout de données // 

    const [open, setOpen ]= useState(false)
    const HandleModalAdd = () => {
        setOpen(true)
    }

      // Moddification //
      const [idAeronef, setIdaeronef] = useState()
      const [type, setType] = useState()

      const [openModalEdit, setOpenModalEdit] = useState(false)
      const OpenModalEdit = () => {
          setOpenModalEdit(true)
       } 

       const handleUpdate = (id_aeronef) =>
       {
       axios.get( "http://localhost:5160/api/Avions/ " + id_aeronef )
       .then ((resultat) => {
           setIdaeronef (resultat.data.id_aeronef)
           setType(resultat.data.type_aeronef)

         })
       .catch(error => console.log(error))
       }
       

       const   handleSaveUpdate = () =>  {
        const url =" http://localhost:5160/api/Avions/" + idAeronef
        const data = {
         "id_aeronef":idAeronef,
         "type_aeronef": type ,
        }
        axios.put(url, data)
        .then(() => {
         setOpenModalEdit(false)
         fetch()
        }).catch(error => console.log(error))
       }
       

   // suppression de données // 
        
    const handleRecuperedId =  (id_aeronef) => {
      Modal.confirm ({
        cancelText:'Annuler',
        okType:'danger',
        title : "Voulez vous vraiment supprimer ? ", 
        onOk: () => {
        axios.delete("http://localhost:5160/api/Avions/" + id_aeronef )
          .then(() => fetch())
          .catch(error => console.log(error))
           }
                })
      }
    return (
            <div className='conteneur' >
                
                < Card
                    title= "Liste des Avions"
                    style={{   width: '100% ',  height: '88vh', marginLeft:'40px', maxWidth:'94%', fontFamily : '"Poppins", cursive, "open-sans"'   }}
                    className='cardBorder'
                    bodyStyle={{ height:'95%', overflow:'auto' }}
                    bordered={false}
                    headStyle={{ border:'none', textAlign:'center', fontFamily : '"Poppins", cursive, "open-sans"'  }}>

                    <div style={{ marginBottom:14, display:'flex', flexDirection:'row', fontFamily: '"Poppins", cursive, "open-sans"' }} >
                    <ConfigProvider
                        theme={{
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
                                    type='primary'  icon= {<BiIcons.BiAddToQueue/>} >Ajouter</Button>
                                    {<FiIcons.FiSearch/>}
                                    <Input style={{ marginLeft:'70%' }} value={recherche} onChange={handleRecherche} placeholder = "Rechercher"/>
                            </ConfigProvider>
                        </div>
                                {/* Affichage de données */}

                            <TableAvion
                                handleEdit = {(id_aeronef) => {
                                OpenModalEdit(id_aeronef) 
                                handleUpdate(id_aeronef)
                                    }}
                                handleDelete={ (id_aeronef) => handleRecuperedId(id_aeronef) }
                                data = { data.filter( (items)  => key.some( key =>  items[key]  &&  items[key].toString().toLowerCase().includes(recherche))) }
                                title={title} 
                                IndexData={IndexData} 
                                size='large' />

                                {/* Modal Ajout */}

                                <ModalAvion
                                titre='Ajouter un Avion'
                                cancelText= 'Annuler'
                                okText='Ajouter' open={open} 
                                onCancel = {() => setOpen(false)}
                                handleSave  = {() => setOpen(false)} />

                                    <Modal   
                                    style={{ justifyContent:'center', fontFamily:'"Poppins", cursive, "open-sans"' }}
                                    title = "Modification" 
                                    width= '350px'
                                    okText = "Enregistrer"
                                    open  = {openModalEdit}
                                    cancelText ="Annuler"
                                    onCancel={() => { setOpenModalEdit(false)}}
                                    onOk={ ()=> handleSaveUpdate()  }>
                                        <ConfigProvider theme={{
                                            components : {
                                                Input: {
                                                    activeBorderColor:'#b82626',
                                                    hoverBorderColor:'#b82626'
                                                    }
                                            }
                                        }} >
                                        <label htmlFor="nom">Id: </label>
                                        <Input disabled = {true} onChange={(e) => setIdaeronef(e.target.value)}  value={idAeronef} />
                                        <label htmlFor="nom">Type de l'avion :</label>
                                        <Input onChange={(e) => setType(e.target.value)}  value={type} />
                                        </ConfigProvider>
                                    </Modal>
                        </Card>
               </div>
    )
};

export default Avion;