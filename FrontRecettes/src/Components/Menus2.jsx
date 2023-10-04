import React from 'react';
import { Menu } from 'antd';
import { useNavigate } from 'react-router-dom';
import { 
    AccountBookOutlined,
     DashboardOutlined,
     LogoutOutlined, 
    } from '@ant-design/icons';
import * as MdIcons from "react-icons/md";
import * as FaIcons from "react-icons/fa";


const Menus2 = () => {

        const Navigate = useNavigate ()
        return (
            <div  className='Menus2' >
            <Menu
            mode='horizontal'
            onClick={({key}) => {
               Navigate(key)
            }}
            items={[
           { label : 'Tableau de Bord', key : '/', icon: <DashboardOutlined/> },
           {label : 'Vente', key : 'Vente',  icon: <FaIcons.FaShopify/>},
           {  label : 'Recettes',key : 'Recettes',  icon: <AccountBookOutlined/>},
           {label : 'Nos Vols', key : 'Vols',  icon:<MdIcons.MdOutlineFlightTakeoff/>},
           {  label : 'Deconnexion', key : 'Deconnexion',  icon: <LogoutOutlined/>, danger:true,  },
        ]} >
        </Menu>
        </div>
    );
}

export default Menus2;