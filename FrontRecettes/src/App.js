import React, { useEffect, useState } from "react";
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

  useEffect(() => {

    const handleScroll = () => {

      const secondNavBar = document.querySelector('.headerMenu')

      if (window.scrollY  >=  500)
       {
        secondNavBar.classList.add('visible')
      } 
      secondNavBar.classList.remove('visible')
      
    }
    window.addEventListener('scroll', handleScroll)

    return () => {
      window.removeEventListener('scroll', handleScroll)
    }
  }, [])

  return (

    <div className="App" >

      <div className="Navbar">

      <div className="menuIcon"

      style={{ backgroundColor:'white', color:'#880808', }}>

        <div className="Imenu">
        <AiIcons.AiOutlineMenu onClick={HandleOpen} style={{ color: '#880808',fontSize : 22, }} /> 
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
                primaryColor :'#880808',
                defaultBorderColor:'#880808',
                linkHoverBg:'#8808087d',
                defaultColor:'white',
                textHoverBg:'white',
                ghostBg:'#880808',
                defaultGhostColor:'white',
                defaultGhostBorderColor:'#880808',
            }
          }

        }} >
          <Button  type="link"
          style={{ fontFamily:'"Poppins", cursive, "open-sans"', color:'#880808'}}
          > <LoginOutlined/> Deconnexion</Button>
         </ConfigProvider>

        </div>
      </div>
      <div className="headerMenu">
        <span ><Menus2/></span>
      </div>
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

     <div className="Content">
        <div className="image">
        <AppContent/>
        </div>
        </div>
      <Appfooter/>
    </div>
  );
}




export default App;
