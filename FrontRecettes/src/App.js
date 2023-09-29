import React, { useState } from "react";
import { Drawer, Menu } from "antd";
import {MenuOutlined} from "@ant-design/icons";
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
    <div style={{ height:'100 vh' }}>
      <div 
      className="menuIcon"
      style={{
         backgroundColor:'#800000', 
        height: 60, 
        paddingLeft:12,
        paddingTop:12,
        }}>
        <MenuOutlined 
        onClick={HandleOpen}
        style={{ 
          color: 'white',
          fontSize : 30,
        }} />
      </div>
      <span className="headerMenu">
     <Menus/>
      </span>
     <Drawer 
      placement = 'left'
     open ={openMenu}  
     closable={false} 
      onClose={HandleClose}
     bodyStyle={{ backgroundColor :'#800000' }} >
          <Menus Isinline />
     </Drawer>
    </div>
  );
}


// Menus de l'application

function Menus  ({Isinline = false}) {
    return (
      <div>
         <Menu 
         mode=  { Isinline ?   "inline": "horizontal" }
         style={{ 
          backgroundColor:'#800000', 
          color:'white',
           border:'none', 
           fontSize: 20, 
           fontFamily:"poppins"
          }}
         items={[
        {
          label : 'Accueil',
          key : 'accueil',
        },
        {
          label : 'Tableau de Bord',
          key : 'tb',
        },
        {
          label : 'Recettes',
          key : 'recette',
        },
        {
          label : 'Nos Vols',
          key : 'vol',
        },
        {
          label : 'Réservations',
          key : 'reservation',
        },
        {
          label : 'Classe de Service',
          key : 'classe',
        },
        {
          label : 'Passagers',
          key : 'passager',
        },
        
     ]} ></Menu>
      </div>
    );
  }


export default App;
