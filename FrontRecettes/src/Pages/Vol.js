import React, { useEffect, useState } from 'react';
import { Button, Card, ConfigProvider, Drawer, Input, Modal, Select } from 'antd';
import axios from 'axios';
import { TableVols } from '../Components/Table';
import { MenuProvider } from '../Components/MenuContext';
import { Menus } from "../Components/Menus";
import { Menus2 } from "../Components/Menu2";
import Appfooter from "../Components/Appfooter"
import * as AiIcons from "react-icons/ai";
import * as BiIcons from "react-icons/bi";
import {  useNavigate } from 'react-router-dom';
import { ModalVol } from '../Components/Modal';
import { LogoutOutlined } from '@ant-design/icons';
import { CircularProgress } from '@mui/material';


const Vol = () => {

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

  const customRenderers = [
  //  (text, record) => record.id_vol,
    (text, record) => record.num_vol,
    (text, record) => record.avion ? record.avion.type_aeronef : '',
    (text, record) => record.itineraire ? `${record.itineraire.aeroport_depart} - ${record.itineraire.aeroport_arrive}` : ''
  ]

    const title = [
     // "#",
        "Numéro de vol",
        "Avion",
        "Itinéraire"

    ]

 const IndexData = [    
        "num_vol",
        "avionID",
        "itineraireID",
      ]
    
     // recherche //
     const key = [
        "id_vol",
        "num_vol",
        "avionID",
        "itineraireID",
        "date_depart",
     ]

     const [recherche, setRecherche ] = useState('')
     const handleRecherche = (e)  => {
       setRecherche(e.target.value)
     }

    // fetch data //

    const [data,setData] = useState([]) 
    const fetch = async () => {
        let resultat = await axios.get("http://localhost:5160/api/Vols")
        setData ( resultat.data)
    }

    useEffect(()=> {
        const intervale = setInterval(() => {
            fetch()
        }, 1000)
        document.title = "Vols"
        return () => clearInterval(intervale)
    })

    const ProgressData = () => {
      if(data.length === 0) {
        return( <CircularProgress style={{ color:'#b82626', marginLeft:'50%', marginTop:'4%'}} />)
      } else {
        return (
          <TableVols
          handleDalete={(id_vol)=> handleDeleteVol(id_vol) }
          handleInfo={(id_vol) => handleInfo(id_vol)}
         handleEdit={(id_vol) => {
            OpenModalEdit(id_vol)
            handleUpdate(id_vol)
            }}
          data = { data.filter( (items)  =>  key.some( key =>  items[key]  &&  items[key].toString().toLowerCase().includes(recherche)  )) }
          title={title} 
          customRenderers= {customRenderers}
          IndexData={IndexData} 
          size='samll' />
        )
      }
    }

      // Ajout de données // 
        
      const [open, setOpen ]= useState(false)
      const HandleModalAdd = () => {
              setOpen(true)
            }
            
          //Modification

        const [openModalEdit, setOpenModalEdit] = useState(false)
        const OpenModalEdit = () => {
            setOpenModalEdit(true)
          } 
          
        const [idVol, setIdVol] =useState()
        const [numVol, setNumVol] =useState('')
        const [avionID, setAvionID] =useState('')
        const [itineraireID, setItineraireID] =useState()
        const [statut, setStatut] =useState('')
        const [dateD, setDateD] =useState('')
        const [heureD, setHeureD] =useState('')


        const handleUpdate = (id_vol) =>
            {
            axios.get( "http://localhost:5160/api/Vols/ " + id_vol )
            .then ((resultat) => {
              setIdVol (resultat.data.id_vol)
              setNumVol(resultat.data.num_vol)
              setAvionID(resultat.data.avionID)
              setItineraireID(resultat.data.itineraireID)
              setStatut(resultat.data.statut)
              setDateD(new Date(resultat.data.date_depart).toISOString().split('T')[0])
              setHeureD(resultat.data.heure_depart)
              
            }).catch(error => console.log(error))
            
            }
        
            const   handleSaveUpdate = () =>  {
             const url =" http://localhost:5160/api/Vols/" + idVol
             const data = {
              "id_vol":idVol,
              "num_vol":numVol,
              "avionID": avionID ,
              "itineraireID": itineraireID,
              "statut": statut,
              "date_depart": dateD,
              "heure_depart": heureD
             }
             axios.put(url, data)
             .then(() => {
              setOpenModalEdit(false)
              fetch()
             }).catch(error => console.log(error))
            }
            
    // Modal information //

    const handleInfo = (id_vol) => {

      data.map(items => { 

        if(items.id_vol === id_vol ) {
          Modal.info({
            title: 'Information sur le vol numéro  '   + items.num_vol ,
            content: (
              <div key={items.id_vol}>
                <label> Identifiant du vol :  <span>{items.id_vol}</span></label> <br/> <br/>
                <label> Numéro de ce vol :  <span>{items.num_vol}</span></label> <br/> <br/>
                <label> Nom de l'appareil : <span>{items.avion.type_aeronef}</span></label> <br/> <br/>
                <label> Date de départ :  <span>{new Date(items.date_depart).toLocaleDateString()}</span></label> <br/> <br/>
                <label> Heure de départ :  <span>{items.heure_depart} </span></label> <br/> <br/>
                <label> Itinéraire  : <span>{items.itineraire.aeroport_depart + '-' +  items.itineraire.aeroport_arrive }</span> </label> <br/> <br/>
                <label> Status du vol  : <span>{items.statut }</span> </label> <br/> <br/>
                <label> Tarif de ce vol :
                {items.tarifs.map(tarif =>   <span> {tarif.montant_tarif+ ' Ar'} ; </span>)} </label><br/> <br/>
              </div>
            ),
            onOk() {}
          })
        } 
        })
    }

    const { Option } = Select
    const statuts = [
    "A l'heure",
    "Retardé",
     "Annuler" 
    ]

    //  Suppression de vol///

                
         const handleDeleteVol =  (id_vol) => {
                
          Modal.confirm ({
              cancelText:'Non',
              okText:'oui',
              okType:'danger',
              title : "Êtes vous sûr de supprimer ? ", 
               onOk: () => {
               axios.delete("http://localhost:5160/api/Vols/" + id_vol )
               .then(() => fetch())
               .catch(error => console.log(error))
            } }) }
        

  //deconnexion // 
const navigate = useNavigate()
  const deconnexion = () => {
   navigate('/')
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
              
              <Button  type="link"
                onClick={()=>deconnexion ()}
                style={{ fontFamily:'"Poppins", cursive, "open-sans"', color:'#b82626'}}>  {<LogoutOutlined/>}Deconnexion</Button>
                
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

            <div  className='conteneur'>
                < Card
                    title= "Nos Vols"
                    style={{   width: '100% ',  height: '88vh', marginLeft:'40px', maxWidth:'94%', fontFamily : '"Poppins", cursive, "open-sans"'   }}
                    className='cardBorder'
                    bodyStyle={{ height:'98%', overflow:'auto', margin:'auto' }}
                    bordered={false}
                    headStyle={{ border:'none', textAlign:'center', fontFamily : '"Poppins", cursive, "open-sans"'  }}
                    rootClassName='card'>
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
                            <Button  onClick={() => HandleModalAdd () } type='primary'
                            icon ={ <BiIcons.BiAddToQueue/>} > Ajouter </Button> 
                            <label htmlFor='recherche'> </label>
                            <Input id='recherche'  style={{ marginLeft:'75%' }} value={recherche} onChange={handleRecherche} placeholder =  "Rechercher ici..." />
                        </ConfigProvider>
                        </div>
                        
                      <ModalVol
                      titre='Ajouter un Vol'
                      cancelText= 'Annuler'
                      okText='Ajouter' open={open} 
                      onCancel = {() => setOpen(false)}
                      handleSave  = {() => setOpen(false)} />

                  <Modal
                      style={{ justifyContent:'center', fontFamily:'"Poppins", cursive, "open-sans"' }}
                      title = "Modification"
                      cancelText ="Annuler"
                      okText = "Enregistrer"
                      width= '300px'
                      open  = {openModalEdit }
                      onCancel={() => setOpenModalEdit(false)}
                      onOk={() => handleSaveUpdate()} >

                  <ConfigProvider 
                  theme={{
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
                  
                  <label htmlFor="idVol">ID :</label>
                  <Input disabled={true} id='idvol' value={idVol}  onChange={(e) => setIdVol(e.target.value) }/> 

                  <label htmlFor="numeroVol">Numero de vol :</label>
                  <Input  id='numeroVol' disabled={false} onChange={(e) =>setNumVol(e.target.value) }  value={numVol}/>

                  <label htmlFor="avion">Avion :</label>
                  <Input id='avion' disabled={true} onChange={(e) => setAvionID(e.target.value)}  value={avionID} />

                  <label htmlFor="Itineraire">Itineraire du vol :</label>
                  <Input id='Itineraire' disabled={true} onChange={(e)=> setItineraireID(e.target.value)}  value={itineraireID}/>

                  <label htmlFor="Statut">Statut de vol :</label>
                  <Select style={{width:'250px'}} id='Statut' onChange={(value)=>setStatut(value)}  value={statut}>
                    {statuts.map( items => <Option key={items}>{items}</Option>)}
                  </Select>

                  <label htmlFor="Date">Date de départ :</label>
                  <Input type='date' disabled={true} id='Date' onChange={(e)=> setDateD(e.target.value)}  value={dateD}/>

                  <label htmlFor="Heure">Heure de départ :</label>
                  <Input type='time'disabled={true} id='Heure' onChange={(e) => setHeureD(e.target.value)}  value={heureD}/>  

                  </ConfigProvider>

              </Modal>

                  <>{ProgressData()}</>

                </Card>

           </div>

            {/* <AppContent/> */}
  
  
          </div>
          <Appfooter/>
      </div>
      </MenuProvider>
    )
}

export default Vol







