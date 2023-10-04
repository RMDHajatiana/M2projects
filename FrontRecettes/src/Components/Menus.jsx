import { Menu } from 'antd';
import React from 'react';
import {
    DashboardOutlined,
    AccountBookOutlined,
    UserOutlined,
    HistoryOutlined, 
  } from "@ant-design/icons";
import { useNavigate } from 'react-router-dom';
import * as FaIcons from "react-icons/fa";
import * as MdIcons from "react-icons/md";

const Menus = () => {

    const Navigate = useNavigate ()
    return (
        <div className='Menus'>
        <Menu
        mode='vertical'
        onClick={({key}) => {
           Navigate(key)
        }}
        items={[
       { label : 'Tableau de Bord', key : '/', icon: <DashboardOutlined/> },
       {label : 'Vente', key : 'Vente',  icon: <FaIcons.FaShopify/>},
       {label : 'Nos Vols', key : 'Vols',  icon:<MdIcons.MdOutlineFlightTakeoff/>},
       {  label : 'Recettes',key : 'Recettes',  icon: <AccountBookOutlined/>},
       {  label : 'Avion', key : 'Avion',  icon: <MdIcons.MdFlight/>},
       { label : 'Classe de Service', key : 'Classe_de_Service',  icon: <MdIcons.MdFlightClass/> },
       { label : 'Passagers',key : 'Passager',  icon: <UserOutlined/> },
       { label : 'Historique',key : 'Historique',  icon: <HistoryOutlined/> },
    ]} >
    </Menu>
    </div>
    );
};

export default Menus;