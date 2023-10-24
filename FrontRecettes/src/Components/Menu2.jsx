import { DashboardOutlined, DollarOutlined } from "@ant-design/icons";
import { ConfigProvider, Menu } from "antd";
import * as FaIcons from "react-icons/fa";
import * as MdIcons from "react-icons/md";
import { Link, useLocation } from "react-router-dom";
import { useMenuContext } from "./MenuContext";
import { useEffect } from "react";

 export const Menus2 = ({Isinline= false, onSelect}) => {

    const { selectedMenuKey, selectMenu } = useMenuContext()

    const location = useLocation()

    useEffect(() => {
      const path = location.pathname;
      const menuKey = path.substring(1)
      selectMenu(menuKey);
    }, [location.pathname, selectMenu])
  
  
    return (
  
      <ConfigProvider
      
      theme={{
        components: {
          Menu: {
            iconSize: 17.5,
            itemColor:'#051039',
            itemHoverColor:'#b82626',
            horizontalItemSelectedBg:'#f7f7f7',
            horizontalItemHoverColor:'#b82626',
            horizontalItemSelectedColor:'#b82626',
            activeBarHeight:3
            
          }  }  }}>
  
        <Menu

        onSelect={onSelect}
  
        selectedKeys={[selectedMenuKey]}
  
        mode=  { Isinline ?   "inline": "horizontal" }
        
        style={{  fontSize: 16, fontFamily : '"Poppins", cursive, "open-sans"',  }}
  
        onClick={({key}) => { selectMenu(key) }}>

        <Menu.Item key="Tableau_de_bord" icon={<DashboardOutlined />}>
          <Link to="/Tableau_de_bord">Tableau de Bord</Link>
        </Menu.Item>
        <Menu.Item key="Vente" icon={<FaIcons.FaShopify />}>
          <Link to="/Vente">Réservation</Link>
        </Menu.Item>
        <Menu.Item key="Vols" icon={<MdIcons.MdOutlineFlightTakeoff />}>
          <Link to="/Vols">Nos Vols</Link>
        </Menu.Item>
        <Menu.Item key="Recettes" icon={<DollarOutlined />}>
          <Link to="/Recettes">Recettes</Link>
        </Menu.Item>
    </Menu>
  
    </ConfigProvider>
  
  )
  }




// import { useEffect } from 'react';
// import { useLocation } from 'react-router-dom';
// import { useMenuContext } from './MenuContext';

// const MyMenu = () => {
//   const { selectedMenuKey, selectMenu } = useMenuContext();
//   const location = useLocation()


//   // Utilisez useEffect pour mettre à jour selectedMenuKey en fonction de l'emplacement de la page.
//   useEffect(() => {
//     // Exemple : si l'URL se termine par "/Tableau_de_bord", mettez "Tableau_de_bord" comme clé sélectionnée.
//     const path = location.pathname;
//     const menuKey = path.substring(1); // Supprime le "/" initial
//     selectMenu(menuKey);
//   }, [location.pathname, selectMenu])

//   // Reste du composant (Menu)...
// }

// export default MyMenu


  


// import React from 'react';
// import { ConfigProvider, Menu } from 'antd';
// import {
//   DashboardOutlined,
//   UserOutlined,
//   HistoryOutlined,
//   DollarOutlined,
// } from "@ant-design/icons";
// import { Link, useNavigate } from 'react-router-dom';
// import * as FaIcons from "react-icons/fa";
// import * as MdIcons from "react-icons/md";
// import * as SiIcons from "react-icons/si";
// import { useMenuContext } from './MenuContext';

// export const Menus = ({ Isinline = false, onSelect }) => {
//   const { selectedMenuKey, selectMenu } = useMenuContext();
//   const Navigate = useNavigate();

//   return (
//     <ConfigProvider
//       theme={{
//         components: {
//           Menu: {
//             iconSize: 17.5,
//             itemActiveBg: '#b82626',
//             itemBg: '#b82626',
//             itemColor: '#051039',
//             itemHoverBg: '#b82626',
//             itemHoverColor: 'white',
//             itemSelectedBg: '#8808087d',
//             itemSelectedColor: 'white'
//           },
//         },
//       }}
//     >
//       <Menu
//         onSelect={onSelect}
//         mode={Isinline ? "inline" : "horizontal"}
//         style={{
//           backgroundColor: 'white',
//           border: 'none',
//           fontSize: 16,
//           fontFamily: '"Poppins", cursive, "open-sans"'
//         }}
//         onClick={({ key }) => {
//           Navigate(key);
//           selectMenu(key);
//         }}
//         selectedKeys={[selectedMenuKey]}
//       >
//         <Menu.Item key="Tableau_de_bord" icon={<DashboardOutlined />}>
//           <Link to="/Tableau_de_bord">Tableau de Bord</Link>
//         </Menu.Item>
//         <Menu.Item key="Vente" icon={<FaIcons.FaShopify />}>
//           <Link to="/Vente">Vente</Link>
//         </Menu.Item>
//         <Menu.Item key="Vols" icon={<MdIcons.MdOutlineFlightTakeoff />}>
//           <Link to="/Vols">Nos Vols</Link>
//         </Menu.Item>
//         <Menu.Item key="Recettes" icon={<DollarOutlined />}>
//           <Link to="/Recettes">Recettes</Link>
//         </Menu.Item>
//         <Menu.Item key="Avion" icon={<MdIcons.MdFlight />}>
//           <Link to="/Avion">Avion</Link>
//         </Menu.Item>
//         <Menu.Item key="Classe_de_Service" icon={<MdIcons.MdFlightClass />}>
//           <Link to="/Classe_de_Service">Classe de Service</Link>
//         </Menu.Item>
//         <Menu.Item key="Passager" icon={<UserOutlined />}>
//           <Link to="/Passager">Passagers</Link>
//         </Menu.Item>
//         <Menu.Item key="Historique" icon={<HistoryOutlined />}>
//           <Link to="/Historique">Historique</Link>
//         </Menu.Item>
//         <Menu.Item key="a_propos" icon={<SiIcons.SiAboutdotme />}>
//           <Link to="/a_propos">À propos de</Link>
//         </Menu.Item>
//       </Menu>
//     </ConfigProvider>
//   )
// }


// items={[
  
//   { label : 'Tableau de Bord', key : 'Tableau_de_bord', icon: <DashboardOutlined/> },

//   {label : 'Vente', key : 'Vente',  icon: <FaIcons.FaShopify/>},

//   {  label : 'Recettes',key : 'Recettes',  icon: <DollarOutlined/>},

//   {label : 'Nos Vols', key : 'Vols',  icon:<MdIcons.MdOutlineFlightTakeoff/>},

// ]} >