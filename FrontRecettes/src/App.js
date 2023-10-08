import React, { useState } from "react";
import { Drawer } from "antd";
//import {LogoutOutlined, MenuOutlined} from "@ant-design/icons";
import Menus from "./Components/Menus"
import Menus2 from "./Components/Menus2";
import AppContent from "./Components/AppContent";
import Appfooter from "./Components/Appfooter"
import * as AiIcons from "react-icons/ai";

function App() {

  const [openMenu, SetOpenMenu] = useState(false)
  const Url = "../Assets/Images/Logo.ico"
  const HandleClose = () => {
    SetOpenMenu(false)
  }
  
  const HandleOpen = () => {
    SetOpenMenu(true)
  }
  return (

    <div className="App" >

      <div className="Navbar">

      <div className="menuIcon"

      style={{ backgroundColor:'white', color:'#880808', }}>

        <div className="Imenu">
        <AiIcons.AiOutlineMenu onClick={HandleOpen} style={{ color: '#880808',fontSize : 24, }} /> 
        </div>
        <div className="logoEntreprise"> 
            <img  src= {Url} alt="Logo" />
        </div>
        <div className="epace">
        </div>
        <div className="deconnexion"> 
           <AiIcons.AiOutlineLogout/> Deconnexion
        </div>
      </div>
      <span className="headerMenu">
        <Menus2/>
      </span>
      </div>

{/* Drawer menu */}

     <Drawer 
         contentWrapperStyle={{width:'270px'}}
          placement = 'left'
          open ={openMenu}  
          closable={true} 
          onClose={HandleClose}>
          <Menus Isinline  />
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
