import React, { useState } from "react";
import { Drawer } from "antd";
//import {LogoutOutlined, MenuOutlined} from "@ant-design/icons";
import Menus from "./Components/Menus"
import Menus2 from "./Components/Menus2";
import AppContent from "./Components/AppContent";
import Appfooter from "./Components/Appfooter"
import * as AiIcons from "react-icons/ai";
import './Styles/App.css';

function App() {

  const [openMenu, SetOpenMenu] = useState(false)

  const HandleClose = () => {
    SetOpenMenu(false)
  }
  
  const HandleOpen = () => {
    SetOpenMenu(true)
  }
  return (

    <div className="MenusContent" >

      <div 
      className="menuIcon"
      style={{ backgroundColor:'white', color:'black',  height: 50,  paddingLeft:12, paddingTop:12, }}>

        <AiIcons.AiOutlineMenuUnfold
        onClick={HandleOpen}
        style={{ color: 'Black',fontSize : 24,
        }} />
      {/* <Menu
      mode="horizontal"
        style={{ right:200, flexDirection:'column' }}
      items={[
        {label:'Deconnexion', icon: <LogoutOutlined/>, danger: true ,  }
      ]} 
      ></Menu> */}
      </div>

      <span className="headerMenu">
     <Menus2/>
      </span>

      <AppContent/>
      <Appfooter/>

     <Drawer 
          placement = 'left'
          open ={openMenu}  
          closable={false} 
          onClose={HandleClose}>
          <Menus Isinline />
     </Drawer>
    </div>
  );
}




export default App;
