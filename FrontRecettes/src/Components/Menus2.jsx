import React from 'react';
import { Menu } from 'antd';
import { useNavigate } from 'react-router-dom';
import { 
    AccountBookOutlined,
     DashboardOutlined,
    } from '@ant-design/icons';
import * as MdIcons from "react-icons/md";
import * as FaIcons from "react-icons/fa";


const Menus2 = ({Isinline= false}) => {

        const Navigate = useNavigate ()
        return (
            <div  className='Menus2' >
            <Menu

            mode=  { Isinline ?   "inline": "horizontal" }

            style={{ color:'black',  fontSize: 16  }}

            onClick={({key}) => {
                    Navigate(key)
                    }}
            items={[
         { label : 'Tableau de Bord', key : '/', icon: <DashboardOutlined/> },
           {label : 'Vente', key : 'Vente',  icon: <FaIcons.FaShopify/>},
           {  label : 'Recettes',key : 'Recettes',  icon: <AccountBookOutlined/>},
           {label : 'Nos Vols', key : 'Vols',  icon:<MdIcons.MdOutlineFlightTakeoff/>},
        ]} >
        </Menu>
        </div>
    );
}

export default Menus2;