import React, { useEffect, useState } from 'react';
import { Card, ConfigProvider, Input } from 'antd';
import axios from 'axios';
import { TableVols } from '../Components/Table';

const Vol = () => {

    const title = [
        "Id",
        "Numéro de vol",
        "Id Avion",
        "Itineraire",
        "Date de départ",
        "Heure de départ"
    ]

   const IndexData = [    
        "id_vol",
        "num_vol",
        "id_aeronef",
        "id_itineraire",
        "date_depart",
        "heure_depart"
      ]
    
     // recherche //
     const key = [
        "id_vol",
        "num_vol",
        "id_aeronef",
        "id_itineraire",
        "remboursement",
        "date_depart",
        "heure_depart"
     ]
     const [recherche, setRecherche ] = useState('')
     const handleRecherche = (e)  => {
       setRecherche(e.target.value)
     }

    // fetch data //
    const [data,setData] = useState([]) 
    const fetch = async () => {
        let resultat = await axios.get("http://localhost:5160/api/Vols")
        setData ( resultat.data)
    }

    useEffect(()=> {
        const intervale = setInterval(() => {
            fetch()
        }, 1000)
        document.title = "Nos Vols"
        return () => clearInterval(intervale)
    })

    return (
        <div  className='conteneur'>
            < Card
                title= "Nos Vols"
                style={{   width: '100% ',  height: '88vh', marginLeft:'40px', maxWidth:'94%', fontFamily : '"Poppins", cursive, "open-sans"'   }}
                className='cardBorder'
                bodyStyle={{ height:'98%', overflow:'auto', margin:'auto' }}
                bordered={false}
                headStyle={{ border:'none', textAlign:'center', fontFamily : '"Poppins", cursive, "open-sans"'  }}
                rootClassName='card'>
                      <div style={{ marginBottom:14, display:'flex', flexDirection:'row', fontFamily: '"Poppins", cursive, "open-sans"' }} >
                    <ConfigProvider theme={{
                        components : {
                        Button : {
                        fontFamily: '"Poppins", cursive, "open-sans"',
                        colorPrimary:'#b82626',
                        colorPrimaryBorder:'#b82626',
                        colorPrimaryHover:'rgba(145, 53, 61, 0.699)',
                        colorPrimaryActive:'#b82626'
                        }, 
                        Input: {
                            activeBorderColor:'#b82626',
                            hoverBorderColor:'#b82626'
                        }
                        }}} >
                        {/* <Button  onClick={() => HandleModalAdd () }
                         icon ={ <UploadOutlined/>} > Importer </Button> */}
                        <Input style={{ marginLeft:'80%' }} value={recherche} onChange={handleRecherche} placeholder =  "Rechercher" />
                    </ConfigProvider>
                    </div>

                    <TableVols
                        data = { data.filter( (items)  =>  key.some( key =>  items[key]  &&  items[key].toString().toLowerCase().includes(recherche)  )) }
                        title={title} 
                        IndexData={IndexData} 
                        size='large' />
            </Card>
        </div>
    )
}

export default Vol;