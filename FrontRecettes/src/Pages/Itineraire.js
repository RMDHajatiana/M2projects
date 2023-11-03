import React from 'react';
import { Button, Card, ConfigProvider, Input, Modal, Drawer } from 'antd';
import { useEffect, useState } from 'react';
import * as BiIcons from 'react-icons/bi';
import { TableItineraire } from '../Components/Table';
import axios from 'axios';
import {  ModalItineraire } from '../Components/Modal';
import { Menus } from "../Components/Menus";
import { Menus2 } from "../Components/Menu2";
import Appfooter from "../Components/Appfooter"
import * as AiIcons from "react-icons/ai";
import { LoginOutlined } from "@ant-design/icons";
import { MenuProvider } from "../Components/MenuContext";
import { NavLink } from 'react-router-dom';


const Itineraire = () => {

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

    const title = [
        "Id",
        "Ville de départ",
        "Ville d'arrivée"
        ]
    const IndexData = [
          "id_itineraire",
          "aeroport_depart",
          "aeroport_arrive",
      ]
        
          //recherche//
        
      const [recherche, setRecherche ] = useState('')
      const handleRecherche = (e)  => {
            setRecherche(e.target.value)
          }
      const key = [
        "id_itineraire",
        "aeroport_depart",
        "aeroport_arrive",
        ]
        
        //fetch data //
        
        const [data, setData] = useState([])
        const fetch = async  () => {
            let resultat = await axios.get("http://localhost:5160/api/Itineraires ")
            setData(resultat.data)
          }
          useEffect(()=> {
            const intervale = setInterval(() => {
              fetch()
            }, 1000)
            document.title = "Itinéraire"
            return () => clearInterval(intervale)
          })
        
        
        // Ajout de données // 
        
        const [open, setOpen ]= useState(false)
        const HandleModalAdd = () => {
          setOpen(true)
        }
        
        
        //Modification // 
        
        const [idItineraire, setIdItineraire] = useState()
        const [depart, setDepart] = useState()
        const [arrive, setArrive] = useState()
        
        const [openModalEdit, setOpenModalEdit] = useState(false)
        
        const OpenModalEdit = () => {
          setOpenModalEdit(true)
        } 
        
        const handleUpdate = (id_itineraire) =>
        {
        axios.get( "http://localhost:5160/api/Itineraires/ " + id_itineraire )
        .then ((resultat) => {
          setIdItineraire (resultat.data.id_itineraire)
          setDepart(resultat.data.aeroport_depart)
          setArrive(resultat.data.aeroport_arrive)
        
          })
        .catch(error => console.log(error))
        }
        
        const   handleSaveUpdate = () =>  {
        
        const url = "http://localhost:5160/api/Itineraires/" + idItineraire
        
         const data = {
            "id_itineraire":idItineraire,
              "aeroport_depart":depart,
              "aeroport_arrive":arrive,
          }
         axios.put(url, data)
         .then(() => {
          setOpenModalEdit(false)
          fetch()
         }).catch(error => console.log(error))
        
        }
        
         // suppression de données // 
                
          const handleRecuperedId =  (id_itineraire) => {
                
          Modal.confirm ({
              cancelText:'Annuler',
              okType:'danger',
              title : "Êtess-vous sûr de supprimer ? ", 
               onOk: () => {
               axios.delete("http://localhost:5160/api/Itineraires/" + id_itineraire )
               .then(() => fetch())
               .catch(error => console.log(error))
            } }) }
        

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
              > <LoginOutlined/> Deconnexion</Button>
              </NavLink>
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

          <div className='conteneur'>
            < Card
          title=  "Itinéraires"
          style={{   width: '100% ',  height: '88vh', marginLeft:'40px', maxWidth:'94%', fontFamily : '"Poppins", cursive, "open-sans"'   }}
          className='cardBorder'
          bordered={false}
          bodyStyle={{ height:'92%', overflow:'auto'}}
          headStyle={{ border:'none', textAlign:'center', fontFamily : '"Poppins", cursive, "open-sans"'  }}
          rootClassName='card'>
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
                                              } }}} >
                      <Button  onClick={() => HandleModalAdd () }
                          type='primary'  icon= {<BiIcons.BiAddToQueue/>} >Ajouter</Button>
                          <Input style={{ marginLeft:'70%' }} value={recherche} onChange={handleRecherche} placeholder = "Rechercher"/>
                          </ConfigProvider>
                      </div>

          <TableItineraire
              handleEdit = {(id_itineraire) => {
                  OpenModalEdit(id_itineraire) 
                  handleUpdate(id_itineraire)
                  }}
                  handleDelete={ (id_itineraire) => handleRecuperedId(id_itineraire) }
                  data = { data.filter( (items)  => key.some( key =>  items[key]  &&  items[key].toString().toLowerCase().includes(recherche))) }
                  title={title} 
                  IndexData={IndexData} />

                  {/* Modal Ajout */}

              <ModalItineraire
                  titre='Ajouter une Itinéraire'
                  cancelText= 'Annuler'
                  okText='Ajouter' open={open} 
                  onCancel = {() => setOpen(false)}
              handleSave  = {() => setOpen(false)} />

                  {/* //Modal Modification // */}

                  <Modal
                      style={{ justifyContent:'center', fontFamily:'"Poppins", cursive, "open-sans"' }}
                      title = "Modification"
                      okText = "Enregistrer"
                      cancelText ="Annuler"
                      width= '350px'
                      open  = {openModalEdit }
                      onCancel={() => setOpenModalEdit(false)}
                      onOk={() => handleSaveUpdate()} >

                          <ConfigProvider 
                          theme={{
                              components : {
                                  Input: {
                                      activeBorderColor:'#b82626',
                                      hoverBorderColor:'#b82626'
                                      }
                              }
                          }} >

                          <label htmlFor="nom">ID :</label>
                          <Input disabled={true}  value={idItineraire}  onChange={(e) => setIdItineraire(e.target.value) }/>
                          <label htmlFor="nom">Ville de départ :</label>
                          <Input onChange={(e) => setDepart(e.target.value)}  value={depart} />
                          <label htmlFor="nom">Ville d'arrivée :</label>
                          <Input onChange={(e) => setArrive(e.target.value)}  value={arrive} />
                      
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

export default Itineraire