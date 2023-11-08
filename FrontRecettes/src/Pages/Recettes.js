import React, { useEffect, useState } from 'react';
import { Button, Card, ConfigProvider, Drawer } from 'antd';
import { Menus } from "../Components/Menus";
import { Menus2 } from "../Components/Menu2";
import Appfooter from "../Components/Appfooter"
import * as AiIcons from "react-icons/ai";
import { LoginOutlined } from "@ant-design/icons";
import { MenuProvider } from "../Components/MenuContext";
import { NavLink } from 'react-router-dom';
import axios from 'c:/xampp/htdocs/geohetra_react/src/api/axios';

const Recettes = () => {
    
    // nav bar et menu //

  const [openMenu, SetOpenMenu] = useState(false)
  const HandleClose = () => {
    SetOpenMenu(false)
  }
  
  const HandleOpen = () => {
    SetOpenMenu(true)
  }

  // fetch data 
  const [recetteFuture, setRecetteFuture] = useState([])
  const [recetteGlobale, setRecetteGlobale] = useState([])

  const  fetchRecetteFuture = async () => {
    try {
       axios.get("http://localhost:5160/operation/future")
       .then(data => setRecetteFuture(data.recetteFuture))
       
      } catch (error) {
        console.log(error)
      }
    }
    
    const  fetchRecetteGlobal = async () => {
      try {
         axios.get("http://localhost:5160/operation")
         .then (data => setRecetteGlobale(data.recetteGlobale))
      } catch (error) {
        console.log(error)
      }
    }
    
    useEffect(()=> {
    fetchRecetteFuture()
    fetchRecetteGlobal()
   console.log(recetteFuture)
  })

  const recetteF = recetteFuture.toLocaleString('fr-FR', {
    minimumFractionDigits: 0, 
  })

  const recetteG = recetteGlobale.toLocaleString('fr-FR', {
    minimumFractionDigits: 0, 
  })

// Disparaitre si on scrowll //

const [show, setShow] = useState(true)

const navControl = () => {
  if (window.scrollY > 105) {
    setShow(false)
  } else {
    setShow(true)
  }
}

const {Meta} = Card

useEffect(()=> {
  window.addEventListener("scroll", navControl)
  return () => {
    window.removeEventListener("scroll", navControl)
  }
  }, [])
    useEffect(()=> {
        document.title  = "Recettes"
    })

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
                    title= "Recettes"
                    style={{   width: '100% ',  height: '88vh', marginLeft:'40px', maxWidth:'94%', fontFamily : '"Poppins", cursive, "open-sans"'   }}
                    className='cardBorder'
                    rootClassName='card'
                    bodyStyle={{ height:'95%', overflow:'auto' }}
                    bordered={false}
                    headStyle={{ border:'none', textAlign:'center', fontFamily : '"Poppins", cursive, "open-sans"'  }}>
                      <div className='recette'>
                        <Card
                            style={{ fontFamily : '"Poppins", cursive, "open-sans"', width: '40%', height:'200px', justifyContent:'center'}}
                            hoverable
                            cover ={ ""} >
                            <Meta title="Recettes globale" description={recetteG + " Ariary"} />
                            Avion 1 : 1 000 00 Ar 
                            Avion 2 : 4 000 000 Ar
                            Avion 3 : 2 000 000 Ar
                        </Card> <br/>
                        <Card
                            style={{  fontFamily : '"Poppins", cursive, "open-sans"', height:'200px', width: '40%', justifyContent:'center'}}
                            hoverable
                            cover ={ ""} >
                            <Meta title="Recettes nettes" description="7000000" />
                            Avion 1 : 1 000 00 Ar 
                            Avion 2 : 4 000 000 Ar
                            Avion 3 : 2 000 000 Ar
                            Avion 3 : 2 000 000 Ar
                        </Card><br/>
                        <Card
                            style={{ fontFamily : '"Poppins", cursive, "open-sans"', marginLeft:'50%', marginTop:'-27%',  height:'200px', width: '40%', justifyContent:'center'}}
                            hoverable
                            cover ={ ""} >
                            <Meta title="Recettes futures" description={recetteF + "Ariary"} />
                            Avion 1 : 1 000 00 Ar 
                            Avion 2 : 4 000 000 Ar
                            Avion 3 : 2 000 000 Ar
                            Avion 3 : 2 000 000 Ar
                        </Card>
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

export default Recettes