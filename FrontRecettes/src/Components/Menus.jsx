import React, {  } from 'react';
import { ConfigProvider, Menu } from 'antd';
import {
    DashboardOutlined,
    UserOutlined,
    HistoryOutlined,
    DollarOutlined, 
  } from "@ant-design/icons";
import { useNavigate } from 'react-router-dom';
import * as FaIcons from "react-icons/fa";
import * as MdIcons from "react-icons/md";
import * as SiIcons from "react-icons/si";
import { useMenuContext } from './MenuContext';
//import { connect } from 'react-redux';
//import selectedMenuKey from '../Reducers/SelectionReducer';


 export const Menus = ({Isinline = false, onSelect  }) => {

  const { selectedMenuKey, selectMenu } = useMenuContext()

  const Navigate = useNavigate ()

    return (
  <ConfigProvider 
    theme = {{
      components: {
          Menu: {
            iconSize: 17.5,
            itemActiveBg:'#b82626',
            itemBg:'#b82626',
            itemColor:'#051039',
            itemHoverBg:'#b82626',
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
          selectMenu(key)
        }}

        selectedKeys={[selectedMenuKey]}

        items={[

              { label : 'Tableau de Bord', key : 'Tableau_de_bord', icon: <DashboardOutlined/> },
          
              {label : 'Vente', key : 'Vente',  icon: <FaIcons.FaShopify/>},

              {label : 'Nos Vols', key : 'Vols',  icon:<MdIcons.MdOutlineFlightTakeoff/>},

              {  label : 'Recettes',key : 'Recettes',  icon: <DollarOutlined/>},
              
              {  label : 'Avion', key : 'Avion',  icon: <MdIcons.MdFlight/>},
              
              { label : 'Classe de Service', key : 'Classe_de_Service',  icon: <MdIcons.MdFlightClass/> },
              
              { label : 'Passagers',key : 'Passager',  icon: <UserOutlined/> },
              
              { label : 'Historique',key : 'Historique',  icon: <HistoryOutlined/> },

              { label : 'À propos de',key : 'a_propos',  icon: <SiIcons.SiAboutdotme/> },
          ]} >

         </Menu>

  </ConfigProvider>

    )
}

// const mapStateToProps = (state) => ({
//   selectedMenuKey: state.menu.selectedMenuKey,
// })
// export default connect(mapStateToProps, { selectMenu })(Menus)




 