import React from 'react';
import { Button, Card, ConfigProvider, Input, Modal } from 'antd';
import { useEffect, useState } from 'react';
import * as BiIcons from 'react-icons/bi';
import { TableClasse } from '../Components/Table';
import axios from 'axios';
import { ModalClasse } from '../Components/Modal';

const Classe = () => {
    const title = [
        "Id",
        "Numero siège",
        "Type de Classe"
        ]
        const IndexData = [
          "id_classe",
          "num_siege",
          "type_classe",
        ]
        
          //recherche//
        
          const [recherche, setRecherche ] = useState('')
          const handleRecherche = (e)  => {
            setRecherche(e.target.value)
          }
        const key = [
          "id_classe",
          "num_siege",
          "type_classe",
        ]
        
        //fetch data //
        
        const [data, setData] = useState([])
        const fetch = async  () => {
            let resultat = await axios.get("http://localhost:5160/api/ClasseServices ")
            setData(resultat.data)
          }
          useEffect(()=> {
            const intervale = setInterval(() => {
              fetch()
            }, 1000)
            return () => clearInterval(intervale)
          })
        
        
        // Ajout de données // 
        
        const [open, setOpen ]= useState(false)
        const HandleModalAdd = () => {
          setOpen(true)
        }
        
        
        //Modification // 
        
        const [idclasse, setIdClasse] = useState()
        const [nomSiege, setNumSiege] = useState()
        const [type, setType] = useState()
        
        const [openModalEdit, setOpenModalEdit] = useState(false)
        
        const OpenModalEdit = () => {
          setOpenModalEdit(true)
        } 
        
        const handleUpdate = (id_classe) =>
        {
        axios.get( "http://localhost:5160/api/ClasseServices/ " + id_classe )
        .then ((resultat) => {
          setIdClasse (resultat.data.id_classe)
          setNumSiege(resultat.data.num_siege)
          setType(resultat.data.type_classe)
        
          })
        .catch(error => console.log(error))
        }
        
        const   handleSaveUpdate = () =>  {
        
        const url = "http://localhost:5160/api/ClasseServices/" + idclasse
        
         const data = {
            "id_classe":idclasse,
              "num_siege":nomSiege,
              "type_classe":type,
          }
         axios.put(url, data)
         .then(() => {
          setOpenModalEdit(false)
          fetch()
         }).catch(error => console.log(error))
        
        }
        
         // suppression de données // 
                
          const handleRecuperedId =  (id_classe) => {
                
          Modal.confirm ({
              cancelText:'Annuler',
              okType:'danger',
              title : "Voulez vous vraiment supprimer ? ", 
               onOk: () => {
               axios.delete("http://localhost:5160/api/ClasseServices/" + id_classe )
               .then(() => fetch())
               .catch(error => console.log(error))
            } }) }
        

    return (
        <div className='conteneur'>
            < Card
            title=  "Les Classes de Services"
            style={{   width: '100% ',  height: '88vh', marginLeft:'40px', maxWidth:'94%', fontFamily : '"Poppins", cursive, "open-sans"'   }}
            className='cardBorder'
            bordered={false}
            bodyStyle={{ height:'92%', overflow:'auto'}}
            headStyle={{ border:'none', textAlign:'center', fontFamily : '"Poppins", cursive, "open-sans"'  }}
            rootClassName='card'>
            <div style={{ marginBottom:14, display:'flex', flexDirection:'row', fontFamily: '"Poppins", cursive, "open-sans"' }} >
                <ConfigProvider
                        theme={{
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
                                                } }}} >
                        <Button  onClick={() => HandleModalAdd () }
                            type='primary'  icon= {<BiIcons.BiAddToQueue/>} >Ajouter</Button>
                            <Input style={{ marginLeft:'70%' }} value={recherche} onChange={handleRecherche} placeholder = "Rechercher"/>
                            </ConfigProvider>
                        </div>

            <TableClasse
                handleEdit = {(id_classe) => {
                    OpenModalEdit(id_classe) 
                    handleUpdate(id_classe)
                    }}
                    handleDelete={ (id_classe) => handleRecuperedId(id_classe) }
                    data = { data.filter( (items)  => key.some( key =>  items[key]  &&  items[key].toString().toLowerCase().includes(recherche))) }
                    title={title} 
                    IndexData={IndexData} />

                    {/* Modal Ajout */}

                <ModalClasse
                    titre='Ajouter une Classe de service'
                    cancelText= 'Annuler'
                    okText='Ajouter' open={open} 
                    onCancel = {() => setOpen(false)}
                handleSave  = {() => setOpen(false)} />

                    {/* //Modal Modification // */}

                    <Modal
                        style={{ justifyContent:'center', fontFamily:'"Poppins", cursive, "open-sans"' }}
                        title = "Modification"
                        okText = "Enregistrer"
                        cancelText ="Annuler"
                        open  = {openModalEdit }
                        onCancel={() => setOpenModalEdit(false)}
                        onOk={() => handleSaveUpdate()} >

                            <ConfigProvider 
                            theme={{
                                components : {
                                    Input: {
                                        activeBorderColor:'#b82626',
                                        hoverBorderColor:'#b82626'
                                        }
                                }
                            }} >

                            <label htmlFor="nom">ID :</label>
                            <Input disabled={true}  value={idclasse}  onChange={(e) => setIdClasse(e.target.value) }/>
                            <label htmlFor="nom">Numéro de Siège :</label>
                            <Input onChange={(e) => setNumSiege(e.target.value)}  value={nomSiege} />
                            <label htmlFor="nom">Type de classe de service :</label>
                        <Input onChange={(e) => setType(e.target.value)}  value={type} />
                        
                            </ConfigProvider>

                        </Modal>

        </Card>

        </div>
    );
};

export default Classe;