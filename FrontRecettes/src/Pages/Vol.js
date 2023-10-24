import React, { useEffect, useState } from 'react';
import { Button, Card, ConfigProvider, Drawer, Input, Modal } from 'antd';
import axios from 'axios';
import { TableVols } from '../Components/Table';
import { MenuProvider } from '../Components/MenuContext';
import { Menus } from "../Components/Menus";
import { Menus2 } from "../Components/Menu2";
import Appfooter from "../Components/Appfooter"
import * as AiIcons from "react-icons/ai";
import { LoginOutlined } from "@ant-design/icons";
import { NavLink } from 'react-router-dom';

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


    const title = [
        "Id",
        "Numéro de vol",
        "Id Avion",
        "Itineraire"

    ]

   const IndexData = [    
        "id_vol",
        "num_vol",
        "avionID",
        "itineraireID",
      ]
    
     // recherche //
     const key = [
        "id_vol",
        "num_vol",
        "id_aeronef",
        "id_itineraire",
        "date_depart",
        "heure_depart"
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
        console.log(data)
    }

    useEffect(()=> {
        const intervale = setInterval(() => {
            fetch()
        }, 1000)
        document.title = "Nos Vols"
        return () => clearInterval(intervale)
    })

    // Modal information //
    const recuperedInfo = (id_vol) => {

    data.map( (items) => { 
    Modal.info({
      style: 'height 50vh ',
      title: 'Information de vol numéro'   + items.num_vol  ,
      content: (
        <div key={items.id_vol}>
          <label> Numéro de ce vol : </label>
          <p>{items.}</p>
        </div>
      ),
      onOk() {}
    })  })

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
                            {/* <Button  onClick={() => HandleModalAdd () }
                            icon ={ <UploadOutlined/>} > Importer </Button> */}
                            <Input style={{ marginLeft:'80%' }} value={recherche} onChange={handleRecherche} placeholder =  "Rechercher" />
                        </ConfigProvider>
                        </div>

                        <TableVols
                            handleInfo={(id_vol) => recuperedInfo(id_vol)}
                            data = { data.filter( (items)  =>  key.some( key =>  items[key]  &&  items[key].toString().toLowerCase().includes(recherche)  )) }
                            title={title} 
                            IndexData={IndexData} 
                            size='large' />
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







