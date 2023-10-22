import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { TablePassagers } from '../Components/Table';
import * as BsIcon from 'react-icons/bs' ;
import {  ModalPassager } from '../Components/Modal';
import { Button, Card, ConfigProvider, Drawer, Input, Modal } from 'antd';
import { Menus } from "../Components/Menus";
import { Menus2 } from "../Components/Menu2";
import Appfooter from "../Components/Appfooter"
import * as AiIcons from "react-icons/ai";
import { LoginOutlined } from "@ant-design/icons";
import { MenuProvider } from "../Components/MenuContext";
import { NavLink } from 'react-router-dom';

const Passagers = () => {

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
          document.title = "Les Passagers"
          return () => clearInterval(intervale)
        },[])
        
        
        //recherche//
        
        const [recherche, setRecherche ] = useState('')
        const handleRecherche = (e)  => {
          setRecherche(e.target.value)
        }
        const key = [  
          "nom_passager",
          "prenom_passager",
          "phone_passager",
          "email_passager",
          "num_passeport",
          "adresse_passager"
        ]
        
        // Ajout de données // 
        const [open, setOpen ]= useState(false)
        const HandleModalAdd = () => {
          setOpen(true)
        }
        
        // Moddification //
        
        const [openModalEdit, setOpenModalEdit] = useState(false)
        const OpenModalEdit = () => {
          setOpenModalEdit(true)
        } 
        
        const [idpassager, setIdpassager] =useState('')
        const [nom, setNom] =useState('')
        const [prenom, setPrenom] =useState('')
        const [telephone, setTelephone] =useState()
        const [email, setEmail] =useState('')
        const [passeport, setPasseport] =useState()
        const [adresse, setAdresse] =useState('')
        
        
        const handleUpdate = (id_passager) =>
        {
        axios.get( "http://localhost:5160/api/Passagers/ " + id_passager )
        .then ((resultat) => {
            setIdpassager (resultat.data.id_passager)
            setNom(resultat.data.nom_passager)
            setPrenom(resultat.data.prenom_passager)
            setTelephone(resultat.data.phone_passager)
            setEmail(resultat.data.email_passager)
            setPasseport(resultat.data.num_passeport)
            setAdresse(resultat.data.adresse_passager)
          })
        .catch(error => console.log(error))
        }
        
        const   handleSaveUpdate = () =>  {
         const url =" http://localhost:5160/api/Passagers/" + idpassager
         const data = {
          "id_passager":idpassager,
          "nom_passager": nom ,
          "prenom_passager": prenom,
          "phone_passager": telephone,
          "email_passager": email,
          "num_passeport": passeport,
          "adresse_passager": adresse
         }
         axios.put(url, data)
         .then(() => {
          setOpenModalEdit(false)
          fetch()
         }).catch(error => console.log(error))
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
              title= "Liste des Passagers"
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
                      handleUpdate(id_passager)
                      }}
                      handleDelete={ (id_passager) => handleRecuperedId(id_passager) }
                      data = { data.filter( (items)  =>  key.some( key =>  items[key]  &&  items[key].toString().toLowerCase().includes(recherche)  )) }
                      title={title} 
                      IndexData={IndexData} 
                      size='small' />

                      {/* Modal Ajout */}

                      <ModalPassager
                      titre='Ajouter un passager'
                      cancelText= 'Annuler'
                      okText='Ajouter' open={open} 
                      onCancel = {() => setOpen(false)}
                      handleSave  = {() => setOpen(false)} />

                      {/* //Modal Modification // */}

                      <Modal
                      style={{ justifyContent:'center', fontFamily:'"Poppins", cursive, "open-sans"' }}
                      title = "Modification"
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
                              }
                      }
                  }} >
                  <label htmlFor="nom">ID :</label>
                  <Input disabled={true}  value={idpassager}  onChange={(e) => setIdpassager(e.target.value) }/>

                  <label htmlFor="nom">Nom :</label>
                  <Input onChange={(e) => setNom(e.target.value)}  value={nom} />

                  <label htmlFor="prenom">Prenom :</label>
                  <Input onChange={(e)=> setPrenom(e.target.value)}  value={prenom}/>

                  <label htmlFor="telephone">Téléphone :</label>
                  <Input onChange={(e) =>setTelephone(e.target.value) }  value={telephone}/>

                  <label htmlFor="email">E-mail :</label>
                  <Input onChange={(e)=>setEmail(e.target.value)}  value={email}/>

                  <label htmlFor="passeport">Passeport :</label>
                  <Input onChange={(e)=> setPasseport(e.target.value)}  value={passeport}/>

                  <label htmlFor="adresse">Adresse :</label>
                  <Input onChange={(e) => setAdresse(e.target.value)}  value={adresse}/>

                  </ConfigProvider>

              </Modal>

              </div>  
              </Card> 

              </div> 

          {/* <AppContent/> */}

        </div>
        <Appfooter/>
    </div>
    </MenuProvider>
    )
}

export default Passagers;
















