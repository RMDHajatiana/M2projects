import { Card, Space, Statistic } from 'antd';
import React, { useEffect, useState } from 'react';
import * as MdIcons from "react-icons/md";
import * as BiIcons from "react-icons/bi";
import axios from 'axios';

export const CardDashboard = () => {
  
      //fetch donées // 

      const [ dataVol, setDataVol ] = useState([])
      const [ dataOperation, setDataOperation ] = useState([])
  //    const [recetteFuture, setRecetteFuture] = useState([])

      // const  fetchRecetteFuture = async () => {
      //   try {
      //      const reponse = axios.get("http://localhost:5160/operation/future")
      //      setRecetteFuture(reponse.data)
      //     } catch (error) {
      //       console.log(error)
      //     }
      //   }
        
    
      const fetchVols = async () => {
        try {
        const resultat = await  axios.get("http://localhost:5160/api/Vols")
        setDataVol(resultat.data)
      } catch (error) {
        console.log(error)
      }
    }
    
      const fetchOperation = async () => {
        try {
          const response = await axios.get("http://localhost:5160/Operation")
          setDataOperation(response.data)
        } catch (error) {
          console.error(error)
        }
      }
      
      useEffect(() => {
        const intervaleVol = setInterval(() => fetchVols() , 1000)
        const intervaleOperation = setInterval(() => fetchOperation() , 1000)
        //const intervaleFuture = setInterval(() => fetchRecetteFuture() , 1000)
        return () => {
          clearInterval(intervaleVol)
          clearInterval(intervaleOperation)
        //  clearInterval(intervaleFuture)
        }
      }, [])

      const montantG = dataOperation.toLocaleString('fr-FR', {
        // style: 'currency',
        // currency: 'USD',
        minimumFractionDigits: 0, // Pour supprimer les décimales
      })

      // const montantF = recetteFuture.toLocaleString('fr-FR', {
      //   // style: 'currency',
      //   // currency: 'USD',
      //   minimumFractionDigits: 0, // Pour supprimer les décimales
      // })
    
      const nbrVol = dataVol.length
    
        return (
            <React.Fragment>
                <Space direction='horizantal'>
                    <Carte title={ "Nombre de vol" } value = {nbrVol}
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
                      borderRadius:18,
                      padding:8,
    
                      }}/> } title={ "Nombre de vol" } value = {nbrVol} />
                    <Carte icon={<BiIcons.BiSolidCoinStack
                     style={{color:'white',
                      fontSize:24,
                      backgroundColor:'#b82626',
                      borderRadius:18,
                      padding:8, }}/> } 
                      title={ "Recettes futures" } value = {"" + "  Ar"} />
    
                    <Carte    icon={< BiIcons.BiSolidCoinStack
                     style={{color:'green',
                      fontSize:24,
                      backgroundColor:'rgb(0, 225, 0,0.25)',
                      borderRadius:20,
                      padding:8,}}/> } 
                      title={ "Recettes Globale" } value = { montantG + "  Ar"} />
                </Space>
            </React.Fragment>
        )
}


const Carte = ({title,value, icon}) => {
    return (
        <Card style = {{ width: '300px' }} >
        <Space direction='horizontal'>
            {icon}
            <Statistic
            style={{width: '100px' ,  fontFamily:'  "Poppins", Cursive, "opeen-sans" ' }}
            value={value}
             title = {title} >
            </Statistic>
        </Space>
    </Card>
    )
}