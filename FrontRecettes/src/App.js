import React, {  useEffect, useState } from "react";
import { Button, ConfigProvider, Drawer } from "antd";
import { Menus } from "./Components/Menus";
import { Menus2 } from "./Components/Menus";
import AppContent from "./Components/AppContent";
import Appfooter from "./Components/Appfooter"
import * as AiIcons from "react-icons/ai";
import { LoginOutlined } from "@ant-design/icons";

function App() {

  const [openMenu, SetOpenMenu] = useState(false)
  const HandleClose = () => {
    SetOpenMenu(false)
  }
  
  const HandleOpen = () => {
    SetOpenMenu(true)
  }

// Disparaitre when Scrowl

const [show, setShow] = useState(true)

const navControl = () => {
  if (window.scrollY > 98) {
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


  return (

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
        <AppContent/>
      </div>
      <Appfooter/>
  </div>
  );
}




export default App;
