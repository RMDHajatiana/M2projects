import React, { useEffect, useState } from 'react';
import { Button, Card, ConfigProvider, Input, Drawer, Modal} from 'antd';
import { UploadOutlined } from '@ant-design/icons';
import axios from 'axios';
import { TableReservation } from '../Components/Table';
import { ModalReservationAdd, ModalReservationUpload } from '../Components/Modal';
import { Menus } from "../Components/Menus";
import { Menus2 } from "../Components/Menu2";
import Appfooter from "../Components/Appfooter"
import * as AiIcons from "react-icons/ai";
import * as BiIcons from "react-icons/bi";
import { LoginOutlined } from "@ant-design/icons";
import { MenuProvider } from "../Components/MenuContext";
import { NavLink } from 'react-router-dom';
import { CircularProgress } from '@mui/material';

const Reservation = () => {

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
        (text, record) => record.num_reservation,
        (text, record) => record.vol ? record.vol.num_vol : '',
        (text, record) => record.classeService ? record.classeService.type_classe: '',
        (text, record) => record.passager ? record.passager.nom_passager : ''
      ]

    const title = [
        "#",
        "Numéro de vol",
        "Classe de service",
        "Passager",
        "Remboursement",
      
    ]

    const IndexData = [
      "num_reservation",
      "volID",
      "classeServiceID",
      "passagerID",
      "remboursement",
    ]

    const [recherche, setRecherche ] = useState('')
    const handleRecherche = (e)  => {
      setRecherche(e.target.value)
    }
    const key = [  
        "num_reservation",
        "volID",
        "passagerID",
        "classeServiceID",
        "prix",
         "remboursement",
        "date_reservation"
    ]
    
    //fetch data// 

    const [data, setData]= useState([])
    const fetch = async () => {
        let resultat = await axios.get("http://localhost:5160/api/Reservations")
        setData(resultat.data)
    }
    useEffect(()=> {
        const intervale = setInterval(() => {
            fetch()
        }, 1000)
        document.title = "Toutes les réservations"
        return () => clearInterval(intervale)
    })

    const ProgressData = () => {
      if(data.length === 0) {
        return( <CircularProgress style={{ color:'#b82626', marginLeft:'50%', marginTop:'4%'}} />)
      } else {
        return (
          <TableReservation
          handleEdit = { (num_reservation) => {
          OpenModalEdit(num_reservation) 
          handleUpdate(num_reservation)
          }}
          handleDelete={ (num_reservation) => handleDelete(num_reservation) }

          data = {data.filter( (items)  =>  key.some( key =>  items[key]  &&  items[key].toString().toLowerCase().includes(recherche)  )) }
          title={title} 
          customRenderers = {customRenderers}
          IndexData={IndexData} 
          size='small' />
        )
      }
    }


   // Ajout de données // 
        
   const [open, setOpen ]= useState(false)
   const HandleModalUpload = () => {
      setOpen(true)
  }

  const [openAdd, setOpenAdd ]= useState(false)
  const HandleModalAdd = () => {
     setOpenAdd(true)
 }

         
       //Modification

     const [openModalEdit, setOpenModalEdit] = useState(false)
     const OpenModalEdit = () => {
         setOpenModalEdit(true)
       } 
       
       const [ id, setId ] = useState()
       const [ volID, setVolID ] = useState()
       const [ classID, setclassID ] = useState()
       const [ passagerID, setPassagerID ] = useState()
       const [ dateRes, setDateRes ] = useState()
       const [prix, setPrix]  = useState()
       const [ remboursement, setRemboursement ] = useState(0)


     const handleUpdate = (num_reservation) =>
         {
         axios.get( "http://localhost:5160/api/Reservations/ " + num_reservation )
         .then ((resultat) => {
          setId (resultat.data.num_reservation)
           setVolID(resultat.data.volID)
           setclassID(resultat.data.classeServiceID)
           setPassagerID(resultat.data.passagerID)
           setPrix(resultat.data.prix)
           setDateRes(new Date(resultat.data.date_reservation).toISOString().split('T')[0])
           setRemboursement(resultat.data.remboursement)
           
         }).catch(error => console.log(error))
         
         }
     
         const   handleSaveUpdate = () =>  {
          const url =" http://localhost:5160/api/Reservations/" + id
          const data = {
           "num_reservation":id,
           "volID":volID,
           "classeServiceID": classID,
           "passagerID": passagerID,
           "prix": prix,
           "date_reservation": dateRes,
           "remboursement": remboursement
          }
          axios.put(url, data)
          .then(() => {
           setOpenModalEdit(false)
           fetch()
          }).catch(error => console.log(error))
         }

             //  Suppression de res///  
             const handleDelete =  (num_reservation) => {
                
              Modal.confirm ({
                  cancelText:'Non',
                  okText:'oui',
                  okType:'danger',
                  title : "Êtes vous sûr de supprimer ? ", 
                   onOk: () => {
                   axios.delete("http://localhost:5160/api/Reservations/" + num_reservation )
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

            <div  className='conteneur'>
                <Card
                title={"Toutes les réservations :  "  +   data.length  }
                style={{   width: '100% ',  height: '88vh', marginLeft:'40px', maxWidth:'94%', fontFamily : '"Poppins", cursive, "open-sans"'   }}
                className='cardBorder'
                rootClassName='card'
                bodyStyle={{ height:'95%', overflow:'auto' }}
                bordered={false}
                headStyle={{ border:'none', textAlign:'center', fontFamily : '"Poppins", cursive, "open-sans"'  }}>
                    <div className="cardBody">
                <div style={{ marginBottom:14, display:'flex', flexDirection:'row', fontFamily: '"Poppins", cursive, "open-sans"' }} >
                    <ConfigProvider theme={{
                        components : {
                        Button : {
                        fontFamily: '"Poppins", cursive, "open-sans"',
                        colorPrimary:'#b82626',
                        defaultColor:'',
                        defaultBorderColor:'#b82626',
                        colorPrimaryBorder:'#b82626',
                        colorPrimaryHover:'rgba(145, 53, 61, 0.699)',
                        colorPrimaryActive:'#b82626'
                        }, 
                        Input: {
                            activeBorderColor:'#b82626',
                            hoverBorderColor:'#b82626'
                        }
                        }}} >
                        <Button   onClick={() => HandleModalUpload () }
                        icon ={ <UploadOutlined/>} > Importer </Button>
                        <Button style={{ marginLeft:'0.5%' }}  type='primary' onClick={() => HandleModalAdd () }
                        icon ={ <BiIcons.BiAddToQueue/>} > Ajouter </Button>
                        <Input style={{ marginLeft:'70%' }} value={recherche} onChange={handleRecherche} placeholder =  "Rechercher" />
                    </ConfigProvider>
                    </div>

                {/* Affichage de données */}

                        <>{ProgressData()}</>

                        <ModalReservationUpload
                        titre="Importation "
                        okText="Enregistrer"
                        cancelText="Annuler"
                        open = {open} 
                        onCancel={()=> setOpen(false)}
                        handleSave={()=> setOpen(false)}/>

                      <ModalReservationAdd
                        titre="Ajouter une réservation "
                        okText="Ajouter"
                        cancelText="Annuler"
                        open = {openAdd} 
                        onCancel={()=> setOpenAdd(false)}
                        handleSave={()=> setOpenAdd(false)}/>

                     <Modal   
                        style={{ justifyContent:'center', fontFamily:'"Poppins", cursive, "open-sans"' }}
                        title = "Modification"
                        cancelText ="Annuler"
                        okText = "Enregistrer"
                        width= '300px'
                        open  = {openModalEdit }
                        onCancel={() => setOpenModalEdit(false)}
                        onOk={() => handleSaveUpdate()} >
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
                              <label htmlFor="num">Identifiant :</label>
                              <Input  disabled = {true} id='num' onChange={(e)=> setId(e.target.value)}  value={id}/>

                              <label htmlFor="vol">Numéro du vol :</label>
                              <Input id='vol' onChange={(e)=> setVolID(e.target.value)}  value={volID}/>

                              <label htmlFor="class">Classe de service :</label>
                              <Input id='class' onChange={(e) =>setclassID(e.target.value) }  value={classID}/>


                              <label htmlFor="passeport">Passager :</label>
                              <Input onChange={(e)=> setPassagerID(e.target.value)}  value={passagerID}/>

                              <label htmlFor="passeport">Montant :</label>
                              <Input onChange={(e)=> setPrix(e.target.value)}  value={prix}/>

                              <label htmlFor="remboursement">Remboursement :</label>
                              <Input id='remboursement' onChange={(e) => setRemboursement(e.target.value)}  value={remboursement}/>

                              <label htmlFor="date">Date de réservation:</label>
                              <Input id='date' type='date' onChange={(e)=>setDateRes(e.target.value)}  value={dateRes}/>

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

export default Reservation



