import React, { useEffect, useState } from 'react';
import { Button, Card, ConfigProvider, Input, Drawer} from 'antd';
import { UploadOutlined } from '@ant-design/icons';
import axios from 'axios';
import { TablePassagers } from '../Components/Table';
import { ModalReservation } from '../Components/Modal';
import { Menus } from "../Components/Menus";
import { Menus2 } from "../Components/Menu2";
import Appfooter from "../Components/Appfooter"
import * as AiIcons from "react-icons/ai";
import { LoginOutlined } from "@ant-design/icons";
import { MenuProvider } from "../Components/MenuContext";

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
    useEffect(()=>{
        document.title = "Tableau de bord"
    })

    const title = [
        "ID",
        "Identifiant vol",
        "itineraire",
         "Remboursement",
        "Date de depart",
        "iIdentifiant de classe",
        "Identifiant de passager",
        "Date de reservation"
    ]

    const IndexData = [
        "num_reservation",
        "id_vol",
        "id_itineraire",
         "remboursement",
        "date_depart",
        "id_classe",
        "id_passager",
        "date_reservation"
    ]

    const [recherche, setRecherche ] = useState('')
    const handleRecherche = (e)  => {
      setRecherche(e.target.value)
    }
    const key = [  
        "num_reservation",
        "id_vol",
        "id_itineraire",
        "itineraire",
         "remboursement",
        "date_depart",
        "heure_depart",
        "id_classe",
        "id_passager",
        "date_reservation"
    ]
    
    // fetch data// 
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

    // Ajout de données // 
    const [open, setOpen ]= useState(false)
     const HandleModalAdd = () => {
        setOpen(true)
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
                onClick={()=> {
                  console.log("login");
                  }}
                style={{ fontFamily:'"Poppins", cursive, "open-sans"', color:'#b82626'}}
                > <LoginOutlined/> Deconnexion</Button>
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
                title="Toutes les réservations"
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
                        icon ={ <UploadOutlined/>} > Importer </Button>
                        <Input style={{ marginLeft:'70%' }} value={recherche} onChange={handleRecherche} placeholder =  "Rechercher" />
                    </ConfigProvider>
                    </div>

                {/* Affichage de données */}

                    <TablePassagers
                        // handleEdit = {(id_passager) => {
                        // OpenModalEdit(id_passager) 
                        // handleUpdate(id_passager)
                        // }}
                        //handleDelete={ (id_passager) => handleRecuperedId(id_passager) }
                        data = { data.filter( (items)  =>  key.some( key =>  items[key]  &&  items[key].toString().toLowerCase().includes(recherche)  )) }
                        title={title} 
                        IndexData={IndexData} 
                        size='small' />

                        <ModalReservation
                        titre="Importation "
                        okText="Enregistrer"
                        cancelText="Annuler"
                        open = {open} 
                        onCancel={()=> setOpen(false)}
                        handleSave={()=> setOpen(false)}/>
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



