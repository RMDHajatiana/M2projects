import { DashboardOutlined, DollarOutlined } from "@ant-design/icons";
import { ConfigProvider, Menu } from "antd";
import * as FaIcons from "react-icons/fa";
import * as MdIcons from "react-icons/md";
import { useNavigate } from "react-router-dom";
import { useMenuContext } from "./MenuContext";

 export const Menus2 = ({Isinline= false, onSelect}) => {

    const { selectedMenuKey, selectMenu } = useMenuContext();

    const Navigate = useNavigate ()
  
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
  
        onClick={({key}) => {
                Navigate(key)
               selectMenu(key)
                }}
        items={[
  
                { label : 'Tableau de Bord', key : 'Tableau_de_bord', icon: <DashboardOutlined/> },
            
                {label : 'Vente', key : 'Vente',  icon: <FaIcons.FaShopify/>},
            
                {  label : 'Recettes',key : 'Recettes',  icon: <DollarOutlined/>},
            
                {label : 'Nos Vols', key : 'Vols',  icon:<MdIcons.MdOutlineFlightTakeoff/>},

             ]} >
  
    </Menu>
  
    </ConfigProvider>
  
  )
  }