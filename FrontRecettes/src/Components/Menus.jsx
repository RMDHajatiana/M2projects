import React, {  } from 'react';
import { ConfigProvider, Menu } from 'antd';
import {
    DashboardOutlined,
    AccountBookOutlined,
    UserOutlined,
    HistoryOutlined,
    DollarOutlined, 
  } from "@ant-design/icons";
import { useNavigate } from 'react-router-dom';
import * as FaIcons from "react-icons/fa";
import * as MdIcons from "react-icons/md";
import * as SiIcons from "react-icons/si";
import * as AiIcons from "react-icons/ai";


export const Menus = ({Isinline = false, onSelect }) => {

 
  const Navigate = useNavigate ()

    return (
  <ConfigProvider 
    theme = {{
      components: {
          Menu: {
            iconSize: 17.5,
            itemActiveBg:'#880808',
            itemBg:'#880808',
            itemColor:'#051039',
            itemHoverBg:'#880808',
            itemHoverColor:'white',
            itemSelectedBg :'#8808087d',
            itemSelectedColor:'white'
          },
      },
    }}>

{/* , color:'#051039',   */}

    <Menu
        onSelect={onSelect}

        mode=  { Isinline ?   "inline": "horizontal" }

        style={{ backgroundColor:'white', border:'none',  fontSize: 16, 
        fontFamily : '"Poppins", cursive, "open-sans"'}}

        onClick={({key}) => {
          Navigate(key)
        }}

        items={[

              { label : 'Tableau de Bord', key : 'Tableau_de_bord', icon: <DashboardOutlined/> },
          
              {label : 'Vente', key : 'Vente',  icon: <FaIcons.FaShopify/>},

              {label : 'Nos Vols', key : 'Vols',  icon:<MdIcons.MdOutlineFlightTakeoff/>},

              {  label : 'Recettes',key : 'Recettes',  icon: <DollarOutlined/>},
              
              {  label : 'Avion', key : 'Avion',  icon: <MdIcons.MdFlight/>},
              
              { label : 'Classe de Service', key : 'Classe_de_Service',  icon: <MdIcons.MdFlightClass/> },
              
              { label : 'Passagers',key : 'Passager',  icon: <UserOutlined/> },
              
              { label : 'Historique',key : 'Historique',  icon: <HistoryOutlined/> },

              { label : 'Paramètre',key : 'Parametre',  icon: <AiIcons.AiOutlineSetting/> },

              { label : 'À propos de',key : 'a_propos',  icon: <SiIcons.SiAboutdotme/> },
          ]} >

         </Menu>

  </ConfigProvider>

    );
};

export const Menus2 = ({Isinline= false}) => {

  const Navigate = useNavigate ()

  return (
      <div  className='Menus2' >

      <Menu

      mode=  { Isinline ?   "inline": "horizontal" }
      
      style={{ color:'#051039',  fontSize: 16, fontFamily : '"Poppins", cursive, "open-sans"',  }}

      onClick={({key}) => {
              Navigate(key)
              }}
      items={[

   { label : 'Tableau de Bord', key : 'Tableau_de_bord', icon: <DashboardOutlined/> },

     {label : 'Vente', key : 'Vente',  icon: <FaIcons.FaShopify/>},

     {  label : 'Recettes',key : 'Recettes',  icon: <AccountBookOutlined/>},

     {label : 'Nos Vols', key : 'Vols',  icon:<MdIcons.MdOutlineFlightTakeoff/>},
  ]} >

  </Menu>
  
  </div>
);
}