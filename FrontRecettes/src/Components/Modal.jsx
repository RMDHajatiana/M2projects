import React, { useState } from 'react';
import { ConfigProvider, Input, Modal } from 'antd';
import axios from 'axios';

export const  ModalPassager =  ({titre, okText, cancelText, onCancel, handleSave, open}) =>  {
    
    const [nom, setNom] =useState('')
    const [prenom, setPrenom] =useState('')
    const [telephone, setTelephone] =useState(34)
    const [email, setEmail] =useState('')
    const [passeport, setPasseport] =useState(0)
    const [adresse, setAdresse] =useState('')
   

     handleSave = () => {
        const url = "http://localhost:5160/api/Passagers"
        const data = 
        {
            "nom_passager": nom ,
            "prenom_passager": prenom,
            "phone_passager": telephone,
            "email_passager": email,
            "num_passeport": passeport,
            "adresse_passager": adresse
        }
        axios.post(url, data)
        .then(() => {
            onCancel()
            setNom('')
            setPrenom('')
            setTelephone()
            setEmail('')
            setPasseport()
            setAdresse('')
          })
        .catch(error => console.log(error))
      }
      
        return (
            <Modal   
            style={{ justifyContent:'center', fontFamily:'"Poppins", cursive, "open-sans"' }}
            title = {titre} 
            okText = {okText} 
            open  = {open}
            cancelText = {cancelText}
            onCancel={onCancel}
            onOk={ handleSave  }>
                <ConfigProvider theme={{
                    components : {
                        Input: {
                            activeBorderColor:'#b82626',
                            hoverBorderColor:'#b82626'
                          }
                    }
                }} >

                <label htmlFor="nom">Nom :</label>
                <Input onChange={(e) => setNom(e.target.value)}  value={nom} />

                <label htmlFor="prenom">Prenom :</label>
                <Input onChange={(e)=> setPrenom(e.target.value)}  value={prenom}/>

                <label htmlFor="telephone">Téléphone :</label>
                <Input onChange={(e) =>setTelephone(e.target.value) }  value={telephone}/>

                <label htmlFor="email">E-mail :</label>
                <Input onChange={(e)=>setEmail(e.target.value)}  value={email}/>

                <label htmlFor="passeport">Passeport :</label>
                <Input onChange={(e)=> setPasseport(e.target.value)}  value={passeport}/>

                <label htmlFor="adresse">Adresse :</label>
                <Input onChange={(e) => setAdresse(e.target.value)}  value={adresse}/>

                </ConfigProvider>
            </Modal>
        )
}

export const ModalAvion = ({  titre, okText, open, cancelText, onCancel, handleSave}) => {

    const [type, setType] = useState()

    handleSave = () => {
        const url = "http://localhost:5160/api/Avions"
        const data = 
        {
            "type_aeronef": type ,
        }
        axios.post(url, data)
        .then(() => {
            onCancel()
            setType('')
          })
        .catch(error => console.log(error))
      }
    return (
        <Modal   
        style={{ justifyContent:'center', fontFamily:'"Poppins", cursive, "open-sans"' }}
        title = {titre} 
        okText = {okText} 
        open  = {open}
        cancelText = {cancelText}
        onCancel={onCancel}
        onOk={ handleSave  }>
            <ConfigProvider theme={{
                components : {
                    Input: {
                        activeBorderColor:'#b82626',
                        hoverBorderColor:'#b82626'
                      }
                }
            }} >
            <label htmlFor="nom">Type de l'avion :</label>
            <Input onChange={(e) => setType(e.target.value)}  value={type} />
            </ConfigProvider>
        </Modal>
    )
}