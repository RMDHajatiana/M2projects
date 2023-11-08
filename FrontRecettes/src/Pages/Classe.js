import React from 'react';
import { Button, Card, ConfigProvider, Input, Modal, Drawer, Select } from 'antd';
import { useEffect, useState } from 'react';
import * as BiIcons from 'react-icons/bi';
import { TableClasse } from '../Components/Table';
import axios from 'axios';
import { ModalClasse } from '../Components/Modal';
import { Menus } from "../Components/Menus";
import { Menus2 } from "../Components/Menu2";
import Appfooter from "../Components/Appfooter"
import * as AiIcons from "react-icons/ai";
import { LoginOutlined } from "@ant-design/icons";
import { MenuProvider } from "../Components/MenuContext";
import { NavLink } from 'react-router-dom';
import { CircularProgress } from '@mui/material';

const Classe = () => {

  const classeService = ["classe économique",  "classe affaires ", "première classe"] 

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
        "Capacité",
        "Type de Classe"
        ]
    const IndexData = [
          "id_classe",
          "num_siege",
          "type_classe",
      ]
        
          //recherche//
        
      const [recherche, setRecherche ] = useState('')
      const handleRecherche = (e)  => {
            setRecherche(e.target.value)
          }
      const key = [
          "id_classe",
          "num_siege",
          "type_classe",
        ]
        
        //fetch data //
        
        const [data, setData] = useState([])
        const fetch = async  () => {
            let resultat = await axios.get("http://localhost:5160/api/ClasseServices ")
            setData(resultat.data)
          }
          useEffect(()=> {
            const intervale = setInterval(() => {
              fetch()
            }, 1000)
            document.title = "Les Classes de services"
            return () => clearInterval(intervale)
          })

          const ProgressData = () => {
            if(data.length === 0) {
              return( <CircularProgress style={{ color:'#b82626', marginLeft:'50%', marginTop:'4%'}} />)
            } else {
              return (
                <TableClasse
                handleEdit = {(id_classe) => {
                  OpenModalEdit(id_classe) 
                  handleUpdate(id_classe)
                  }}
                  handleDelete={ (id_classe) => handleRecuperedId(id_classe) }
                  data = { data.filter( (items)  => key.some( key =>  items[key]  &&  items[key].toString().toLowerCase().includes(recherche))) }
                  title={title} 
                  IndexData={IndexData} />
              )
            }
          }
      
        
        
        // Ajout de données // 
        
        const [open, setOpen ]= useState(false)
        const HandleModalAdd = () => {
          setOpen(true)
        }
        
        
        //Modification // 
        
        const [idclasse, setIdClasse] = useState()
        const [avionID, setAvionID] = useState()
        const [capacite, setCapacite] = useState()
        const [type, setType] = useState()
        
        const [openModalEdit, setOpenModalEdit] = useState(false)
        
        const OpenModalEdit = () => {
          setOpenModalEdit(true)
        } 
        
        const handleUpdate = (id_classe) =>
        {
        axios.get( "http://localhost:5160/api/ClasseServices/ " + id_classe )
        .then ((resultat) => {
          setIdClasse (resultat.data.id_classe)
          setAvionID (resultat.data.avionID)
          setCapacite(resultat.data.num_siege)
          setType(resultat.data.type_classe)
        
          })
        .catch(error => console.log(error))
        }
        
        const   handleSaveUpdate = () =>  {
        
        const url = "http://localhost:5160/api/ClasseServices/" + idclasse
        
         const data = {
            "id_classe":idclasse,
            "avionID":avionID,
             "num_siege":capacite,
            "type_classe":type,
          }
         axios.put(url, data)
         .then(() => {
          setOpenModalEdit(false)
          fetch()
         }).catch(error => console.log(error))
        
        }
        
        const {Option} = Select
         // suppression de données // 
                
          const handleRecuperedId =  (id_classe) => {
                
          Modal.confirm ({
              cancelText:'Annuler',
              okType:'danger',
              title : "Voulez vous vraiment supprimer ? ", 
               onOk: () => {
               axios.delete("http://localhost:5160/api/ClasseServices/" + id_classe )
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
            title=  "Les Classes de Services"
            style={{   width: '100% ',  height: '88vh', marginLeft:'40px', maxWidth:'94%', fontFamily : '"Poppins", cursive, "open-sans"'   }}
            className='cardBorder'
            width= '300px'
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
                <>{ProgressData()}</>                           

                  {/* Modal Ajout */}

              <ModalClasse
                  titre='Ajouter une Classe de service'
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
                                      },
                                      Select: {
                                        //optionSelectedBg:'#b82626',
                                        colorPrimaryHover:'#b82626',
                                        colorPrimaryBg:'#b82626'
                                      }
                              }
                          }} >

                          <label htmlFor="nom">ID :</label>
                          <Input disabled={true}  value={idclasse}  onChange={(e) => setIdClasse(e.target.value) }/>

                          <label htmlFor="avion">Avion :</label>
                          <Input id='avion' disabled={true}  value={avionID}  onChange={(e) => setAvionID(e.target.value) }/>

                          <label htmlFor="capacite">Capacité :</label>
                          <Input id='capacite' onChange={(e) => setCapacite(e.target.value)}  value={capacite} />
                          
                          <label htmlFor="nom">Type de classe de service :</label>
                          <Select onChange={(value) => setType(value)}  value={type} style={{width : 300,  fontFamily:'"Poppins", cursive, "open-sans"' }}>
                            { 
                            classeService.map(items => 
                              <Option value = {items}>
                                  {items}
                              </Option>
                              )}
                          </Select>
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

export default Classe



