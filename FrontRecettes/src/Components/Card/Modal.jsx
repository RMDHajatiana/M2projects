import React, { useEffect, useState } from 'react';
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

export const ModalEditPassager = ({titre,okText,onCancel,open, handleUpdate, handleSaveUpdate, idpassagerToEdit}) => {

    const [idpassager, setIdpassager] =useState('')
    const [nom, setNom] =useState('')
    const [prenom, setPrenom] =useState('')
    const [telephone, setTelephone] =useState()
    const [email, setEmail] =useState('')
    const [passeport, setPasseport] =useState()
    const [adresse, setAdresse] =useState('')


     handleUpdate = (id_passager) =>
    {
      axios.get( "http://localhost:5160/api/Passagers/ " + id_passager )
      .then ((resultat) => {
          setIdpassager (resultat.data.id_passager)
          setNom(resultat.data.nom_passager)
          setPrenom(resultat.data.prenom_passager)
          setTelephone(resultat.data.phone_passager)
          setEmail(resultat.data.email_passager)
          setPasseport(resultat.data.num_passeport)
          setAdresse(resultat.data.adresse_passager)
        })
      .catch(error => console.log(error))
    }
    useEffect (() => {
        if(idpassagerToEdit) {
            handleUpdate(idpassagerToEdit)
        }
    }, [handleUpdate, idpassagerToEdit])
    
      handleSaveUpdate = () =>  {
       const url =" http://localhost:5160/api/Passagers/" + idpassager
       const data = {
        "nom_passager": nom ,
        "prenom_passager": prenom,
        "phone_passager": telephone,
        "email_passager": email,
        "num_passeport": passeport,
        "adresse_passager": adresse
       }
       axios.put(url, data)
       .then(() => {
        fetch()
        onCancel()
       }).catch(error => console.log(error))
       
      }

    return (
        <Modal   
        style={{ justifyContent:'center', fontFamily:'"Poppins", cursive, "open-sans"' }}
        title = {titre} 
        okText = { okText } 
        open  = {open }
        onCancel={onCancel} 
        onOk={handleSaveUpdate}>
            <ConfigProvider theme={{
                components : {
                    Input: {
                        activeBorderColor:'#b82626',
                        hoverBorderColor:'#b82626'
                      }
                }
            }} >
                 <label htmlFor="nom">ID :</label>
            <Input disabled={true}  value={idpassager}  onChange={(e) => setIdpassager(e.target.value) }/>

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
