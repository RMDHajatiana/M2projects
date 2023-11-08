import React, { useEffect, useState } from 'react';
import { Menus } from "../Components/Menus";
import { Menus2 } from "../Components/Menu2";
import * as AiIcons from "react-icons/ai";
import { LoginOutlined } from "@ant-design/icons";
import { NavLink } from 'react-router-dom';
import * as BiIcons from 'react-icons/bi';
import * as FiIcons from 'react-icons/fi';
import { Button, Card, ConfigProvider, Drawer, Input, Modal, Select } from 'antd';
import Appfooter from "../Components/Appfooter";
import { MenuProvider } from "../Components/MenuContext";
import { ModalTarif } from '../Components/Modal';
import { TableTarif } from '../Components/Table';
import axios from 'axios';
import { CircularProgress } from '@mui/material';


const Tarif = () => {

      // nav bar et menu //

  const [openMenu, SetOpenMenu] = useState(false)
  const HandleClose = () => {
    SetOpenMenu(false)
  }
  
  const HandleOpen = () => {
    SetOpenMenu(true)
  }

// Disparaitre si on scrowll //

const [show, setShow] = useState(true)

const navControl = () => {
  if (window.scrollY > 105) {
    setShow(false)
  } else {
    setShow(true)
  }
}

useEffect(()=> {
  window.addEventListener("scroll", navControl)
  return () => {
    window.removeEventListener("scroll", navControl)
  }
  }, [])

    const [recherche, setRecherche ] = useState('')
    const handleRecherche = (e)  => {
      setRecherche(e.target.value)
    }
  
    const customRenderers = [
      //  (text, record) => record.id_vol,
        (text, record) => record.id_tarif,
        (text, record) => record.vol ? record.vol.num_vol : '',
        (text, record) => record.classeService ? record.classeService.type_classe: ''
      ]

    const title = [
        "#",
        "Numero de vol",
        "Classe de service",
        "Montant"
    ]

    const IndexData = [
        "id_tarif",
        "volID",
        "classeServiceID",
        "montant_tarif"
    ]

    const key = [  
        "id_tarif",
        "volID",
        "classeServiceID",
        "montant_tarif"
    ]

//fetch donées // 

const [ data, setData ] = useState([])
const [ dataVol, setDataVol ] = useState([])
const [ dataClass, setDataClass ] = useState([])
const {Option }= Select

useEffect(()=> {
    axios.get("http://localhost:5160/api/Vols")
    .then (reponse => {
        setDataVol(reponse.data) 
    })
    .catch(error => console.log(error))
}, [])

useEffect(()=> {
    axios.get("http://localhost:5160/api/ClasseServices")
    .then (reponse =>{ 
        setDataClass(reponse.data)
        })
    .catch(error => console.log(error))
}, [])


const fetch = async () => {
    let resultat = await axios.get("http://localhost:5160/api/Tarifs")
    setData ( resultat.data)
}

useEffect(()=> {
    const intervale = setInterval(() => {
        fetch()
    }, 1000)
    document.title = "Tarif"
    return () => clearInterval(intervale)
})

const ProgressData = () => {
  if(data.length === 0) {
    return( <CircularProgress style={{ color:'#b82626', marginLeft:'50%', marginTop:'4%'}} />)
  } else {
    return (
      <TableTarif
      handleEdit = {(id_tarif) => {
      OpenModalEdit(id_tarif) 
      handleUpdate(id_tarif)
          }}
      handleDelete={ (id_tarif) => handleRecuperedId(id_tarif) }
      data = {data.filter( (items)  => key.some( key =>  items[key]  &&  items[key].toString().toLowerCase().includes(recherche)))  }
      title={title} 
      customRenderers= {customRenderers}
      IndexData={IndexData} 
      size='small' />
    )
  }
}

  // Ajout de données // 

  const [open, setOpen ]= useState(false)
  const HandleModalAdd = () => {
      setOpen(true)
  }

    // Moddification //

  const [id, setId] = useState()
  const [vol, setVol] = useState()
  const [classe, setClasse] = useState()
  const [montant, setMontant] = useState()
  
    const [openModalEdit, setOpenModalEdit] = useState(false)
    const OpenModalEdit = () => {
        setOpenModalEdit(true)
     } 

     const handleUpdate = (id_tarif) =>
     {
     axios.get( "http://localhost:5160/api/Tarifs/ " + id_tarif )
     .then ((resultat) => {
        setId (resultat.data.id_tarif)
         setVol(resultat.data.volID)
         setClasse(resultat.data.classeServiceID)
         setMontant(resultat.data.montant_tarif)

       })
     .catch(error => console.log(error))
     }
     

     const   handleSaveUpdate = () =>  {
      const url =" http://localhost:5160/api/Tarifs/" + id
      const data = {
       "id_tarif":id,
       "volID": vol ,
       "classeServiceID": classe ,
       "montant_tarif": montant ,
      }
      axios.put(url, data)
      .then(() => {
       setOpenModalEdit(false)
       fetch()
      }).catch(error => console.log(error))
     }

 // suppression de données // 
      
  const handleRecuperedId =  (id_tarif) => {
    Modal.confirm ({
      cancelText:'Annuler',
      okType:'danger',
      title : "Êtes vous sûr de supprimer ? ", 
      onOk: () => {
      axios.delete("http://localhost:5160/api/Tarifs/" + id_tarif )
        .then(() => fetch())
        .catch(error => console.log(error))
         } })
    }

    return (
        <MenuProvider>
        <div className="App" >
          <div className="navBar" >
          <div className="menuIcon"
          style={{ backgroundColor:'white', color:'#b82626', }}>
            <div className="Imenu">
            <AiIcons.AiOutlineMenu onClick={HandleOpen} style={{ color: '#b82626',fontSize : 22, }} /> 
            </div>
            <div className="logoEntreprise"> 
                <img  src= "./Logo1.jpg" alt="Logo" />
            </div>
            <div className="epace">
            </div>
            <div className="deconnexion"> 
            <ConfigProvider
            theme={{
              components : {
                  Button : {
                  //   primaryColor :'#b82626',
                  //    defaultBorderColor:'#b82626',
                      linkHoverBg:'#88080833',
                  //     defaultColor:'white',
                  //     textHoverBg:'white',
                  //     ghostBg:'#880808',
                  //     defaultGhostColor:'white',
                  //     defaultGhostBorderColor:'#880808',
                    }
              }
    
            }} >
              <NavLink to="/">
              <Button  type="link"
                onClick={()=> {
                  console.log("login");
                  }}
                style={{ fontFamily:'"Poppins", cursive, "open-sans"', color:'#b82626'}}
                > <LoginOutlined/> Deconnexion</Button></NavLink>
             </ConfigProvider>
    
            </div>
          </div>
          <div className={ show ? 'headerMenu' : 'noMenu' }>
            <span ><Menus2/></span>
          </div>
    
    {/* Drawer menu */}
    
         <Drawer
             contentWrapperStyle={{width:'270px'}}
              placement = 'left'
              open ={openMenu}  
              closable={true} 
              onClose={HandleClose}>
              <Menus Isinline  onSelect={HandleClose}  />
         </Drawer>
         </div>
          <div className="styleContent" ></div>
         <div className="Content">
  
  
            {/* <AppContent/> */}
  
            <div className='conteneur' >
                  < Card
                      title= "Tarification"
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
                                  <>{ProgressData()}</>
                                  {/* Modal Ajout */}
           
                                <ModalTarif
                                titre='Ajouter un Tarf'
                                cancelText= 'Annuler'
                                okText='Ajouter' open={open} 
                                onCancel = {() => setOpen(false)}
                                handleSave  = {() => setOpen(false)} />

                             <Modal   
                            style={{ justifyContent:'center', fontFamily:'"Poppins", cursive, "open-sans"' }}
                            title = "Modification" 
                            width= '300px'
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
                                            },
                                            Select: {
                                            //optionSelectedBg:'#b82626',
                                            colorPrimaryHover:'#b82626',
                                            colorPrimaryBg:'#b82626'
                                            }
                                    }
                                }} >
                                <label htmlFor="vol"> Numéros de vol :</label>
                                <Select id='vol' onChange={(value) => setVol(value)}  style={{width : 250,  fontFamily:'"Poppins", cursive, "open-sans"' }}  value={vol}>
                                    {
                                    dataVol.map(items => (<Option value= {items.id_vol} key={items.id_vol}>{items.num_vol}</Option>))
                                    }
                                </Select><br/>

                                <label htmlFor="class"> Classe de service :</label>
                                <Select id='class' onChange={(value) => setClasse(value)}  style={{width : 250,  fontFamily:'"Poppins", cursive, "open-sans"' }}  value={classe}>
                                    {
                                    dataClass.map(items => (<Option value= {items.id_classe} key={items.id_classe}>{items.type_classe}</Option>))
                                    }
                                </Select><br/>

                                <label htmlFor="mt"> Montant :</label>
                                <Input style={{width : 250}} id='mt' value={montant} onChange={(e) => setMontant(e.target.value)} /> <br/>

                                </ConfigProvider>
                            </Modal>
                                                        
                          </Card>
                  </div>
  
            {/* <AppContent/> */}
  
          </div>
          <Appfooter/>
      </div>
      </MenuProvider>

    )
}

export default Tarif