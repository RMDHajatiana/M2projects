import { Card, Space, Statistic } from 'antd';
import React from 'react';
import * as MdIcons from "react-icons/md";
import * as BiIcons from "react-icons/bi";

export const CardDashboard = () => {
    return (
        <React.Fragment>

            <Space direction='horizantal'>

                <Carte title={ "Nombre de vol" } value = {10}
                icon={<MdIcons.MdOutlineFlightTakeoff
                 style={{color:'white',
                  fontSize:24,
                  backgroundColor:'rgb(52 73 153 / 53%)',
                  borderRadius:20,
                  padding:8, }}/> } />

                <Carte icon={<MdIcons.MdOutlineFlightTakeoff
                 style={{color:'#051039',
                  fontSize:24,
                  backgroundColor:'rgb(52 73 153 / 53%)',
                  borderRadius:20,
                  padding:8,

                  }}/> } title={ "Nombre de vol" } value = {5} />
                <Carte icon={<BiIcons.BiSolidCoinStack
                 style={{color:'white',
                  fontSize:24,
                  backgroundColor:'#b82626',
                  borderRadius:20,
                  padding:8, }}/> } 
                  title={ "Recettes futures" } value = {30 + "  Ariary"} />

                <Carte  style = {{ with: 100 }}  icon={< BiIcons.BiSolidCoinStack
                 style={{color:'green',
                  fontSize:24,
                  backgroundColor:'rgb(0, 225, 0,0.25)',
                  borderRadius:20,
                  padding:8,}}/> } 
                  title={ "Recettes Brute" } value = {23 + "  Ariary"} />

            </Space>

        </React.Fragment>
    )
}

const Carte = ({title,value, icon}) => {
    return (
        <Card >
        <Space direction='horizontal'>
            {icon}
            <Statistic
            style={{ fontFamily:'  "Poppins", Cursive, "opeen-sans" ' }}
            value={value}
             title = {title} >
            </Statistic>
        </Space>
    </Card>
    )
}