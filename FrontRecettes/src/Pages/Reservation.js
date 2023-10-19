import React, { useEffect, useState } from 'react';
import { Button, Card, ConfigProvider, Input} from 'antd';
import { UploadOutlined } from '@ant-design/icons';
//import { use } from 'i18next';
import axios from 'axios';
import { TablePassagers } from '../Components/Table';
import { ModalReservation } from '../Components/Modal';

const Reservation = () => {

    const title = [
        "ID",
        "Identifiant vol",
        "itineraire",
         "Remboursement",
        "Date de depart",
        "iIdentifiant de classe",
        "Identifiant de passager",
        "Date de reservation"
    ]

    const IndexData = [
        "num_reservation",
        "id_vol",
        "id_itineraire",
         "remboursement",
        "date_depart",
        "id_classe",
        "id_passager",
        "date_reservation"
    ]

    const [recherche, setRecherche ] = useState('')
    const handleRecherche = (e)  => {
      setRecherche(e.target.value)
    }
    const key = [  
        "num_reservation",
        "id_vol",
        "id_itineraire",
        "itineraire",
         "remboursement",
        "date_depart",
        "heure_depart",
        "id_classe",
        "id_passager",
        "date_reservation"
    ]
    
    // fetch data// 
    const [data, setData]= useState([])
    const fetch = async () => {
        let resultat = await axios.get("http://localhost:5160/api/Reservations")
        setData(resultat.data)
    }
    useEffect(()=> {
        const intervale = setInterval(() => {
            fetch()
        }, 1000)
        document.title = "Toutes les réservations"
        return () => clearInterval(intervale)
    })

    // Ajout de données // 
    const [open, setOpen ]= useState(false)
     const HandleModalAdd = () => {
        setOpen(true)
    }

    return (
            <div  className='conteneur'>
                <Card
                title="Toutes les réservations"
                style={{   width: '100% ',  height: '88vh', marginLeft:'40px', maxWidth:'94%', fontFamily : '"Poppins", cursive, "open-sans"'   }}
                className='cardBorder'
                rootClassName='card'
                bodyStyle={{ height:'95%', overflow:'auto' }}
                bordered={false}
                headStyle={{ border:'none', textAlign:'center', fontFamily : '"Poppins", cursive, "open-sans"'  }}>
                    <div className="cardBody">
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
                        <Button  onClick={() => HandleModalAdd () }
                         icon ={ <UploadOutlined/>} > Importer </Button>
                        <Input style={{ marginLeft:'70%' }} value={recherche} onChange={handleRecherche} placeholder =  "Rechercher" />
                    </ConfigProvider>
                    </div>

                  {/* Affichage de données */}

                     <TablePassagers
                        // handleEdit = {(id_passager) => {
                        // OpenModalEdit(id_passager) 
                        // handleUpdate(id_passager)
                        // }}
                        //handleDelete={ (id_passager) => handleRecuperedId(id_passager) }
                        data = { data.filter( (items)  =>  key.some( key =>  items[key]  &&  items[key].toString().toLowerCase().includes(recherche)  )) }
                        title={title} 
                        IndexData={IndexData} 
                        size='small' />

                        <ModalReservation
                        titre="Importation "
                        okText="Enregistrer"
                        cancelText="Annuler"
                        open = {open} 
                        onCancel={()=> setOpen(false)}
                        handleSave={()=> setOpen(false)}/>
                    </div>
                </Card>
            </div>

    )
}

export default Reservation;