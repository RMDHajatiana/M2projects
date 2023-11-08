import React from 'react';
import { useEffect, useState } from 'react';
import * as BiIcons from 'react-icons/bi';
import * as FiIcons from 'react-icons/fi';
import { TableAvion } from '../Components/Table';
import axios from 'axios';
import { ModalAvion } from '../Components/Modal';
import { Button, Card, ConfigProvider, Drawer, Input, Modal } from 'antd';
import { Menus } from "../Components/Menus";
import { Menus2 } from "../Components/Menu2";
import Appfooter from "../Components/Appfooter"
import * as AiIcons from "react-icons/ai";
import { LoginOutlined } from "@ant-design/icons";
import { MenuProvider } from "../Components/MenuContext";
import { NavLink } from 'react-router-dom';
import { CircularProgress } from '@mui/material';


const Avion = () => {

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
    "id_aeronef",
    "type_aeronef",
    ]
    const title  = [
    "#",
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
    let resultat = await  axios.get("http://localhost:5160/api/Avions")
    setData(resultat.data)
  }

  useEffect(()=> {
    const intervale = setInterval(() => {
      fetch()
    }, 1000)
    return () => clearInterval(intervale)
  })

  const ProgressData = () => {
    if(data.length === 0) {
      return( <CircularProgress style={{ color:'#b82626', marginLeft:'50%', marginTop:'4%'}} />)
    } else {
      return (
        <TableAvion
        handleInfo={(id_aeronef)=> {handleInfo(id_aeronef)}}
        handleEdit = {(id_aeronef) => {
        OpenModalEdit(id_aeronef) 
        handleUpdate(id_aeronef)
            }}
        handleDelete={ (id_aeronef) => handleRecuperedId(id_aeronef) }
        data = { data.filter( (items)  => key.some( key =>  items[key]  &&  items[key].toString().toLowerCase().includes(recherche))) }
        title={title} 
        IndexData={IndexData} 
        size='large' />
      )
    }
  }

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

           // Modal information //


    const handleInfo = (id_aeronef) => {
      
      const Avion = data.find( items => items.id_aeronef === id_aeronef)

        const nbrClasse  = Avion.classeServices.length
        
        let CapaciteTotal = 0
        
         Avion.classeServices.forEach(items => {CapaciteTotal += items.num_siege })

         console.log(CapaciteTotal)
        
          data.map((items) => { 
            
          if(items.id_aeronef === id_aeronef ) {
            
            if (CapaciteTotal === 0 ) {
              CapaciteTotal = "Zéro" 
            }
            
            Modal.info({
              
              title: "Information sur l'Avion "   + items.type_aeronef,

              content: (

                <div key={items.id_aeronef}>

                <label> Numéro d'identification :  <span>{items.id_aeronef}</span></label> <br/> <br/>
                <label> Nom de l'appareil : <span>{items.type_aeronef}</span></label> <br/> <br/>

                <label> Possède {nbrClasse} classe(s) de service(s) :</label> <br/>
                   {Avion.classeServices.map((item) => <span key={item.id_classe}> - {item.type_classe +' : '+ item.num_siege } <br/>  </span>  ) }  <br/> 

                <label> Capacité max de l'avion jusqu' à : <span> { CapaciteTotal + " Passager(s)"}</span></label> <br/> <br/>

              </div>
          ),
          onOk() {}
        })
      } 
    })
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
           }  })
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
                                  <>{ProgressData()}</>
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
                                                    }, 
                                                    Select: {
                                                      //optionSelectedBg:'#b82626',
                                                      colorPrimaryHover:'#b82626',
                                                      colorPrimaryBg:'#b82626'
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

          {/* <AppContent/> */}

        </div>
        <Appfooter/>
    </div>
    </MenuProvider>
    )
}

export default Avion



