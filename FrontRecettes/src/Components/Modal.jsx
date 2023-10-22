import React, { useState } from 'react';
import { ConfigProvider, Input, Modal, Upload, message } from 'antd';
import * as FaIcons from 'react-icons/fa'
import axios from 'axios';

export const  ModalPassager =  ({titre, okText, cancelText, onCancel, handleSave, open}) =>  {
    
    const [nom, setNom] =useState('')
    const [prenom, setPrenom] =useState('')
    const [telephone, setTelephone] =useState('')
    const [email, setEmail] =useState('')
    const [passeport, setPasseport] =useState('')
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
            width= '350px'
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
        width= '350px'
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

export const ModalClasse = ({  titre, okText, open, cancelText, onCancel, handleSave}) => {

    const [nomSiege, setNumSiege] = useState()
    const [type, setType] = useState()

    handleSave = () => {
        const url = "http://localhost:5160/api/ClasseServices"
        const data = 
        {
            "num_siege":nomSiege,
            "type_classe":type,
        }
        axios.post(url, data)
        .then(() => {
            onCancel()
            setNumSiege()
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
            <label htmlFor="nom">Numéro de Siège :</label>
            <Input onChange={(e) => setNumSiege(e.target.value)}  value={nomSiege} />
            <label htmlFor="nom">Type de classe de service :</label>
            <Input onChange={(e) => setType(e.target.value)}  value={type} />
            </ConfigProvider>
        </Modal>
    )
}


export const ModalReservation = ({  titre, okText, open, cancelText, onCancel, handleSave}) => {

    // Upload files //

    const { Dragger } = Upload
    const props = {
    
      name: 'file',
      multiple: true,
      action: 'http://localhost:5160/api/Reservations',
    
      onChange(info) {
        const { status } = info.file;
        if (status !== 'uploading') {
          console.log(info.file, info.fileList);
        }
        if (status === 'done') {
          message.success(`${info.file.name} Importation avec succès.`);
        } else if (status === 'error') {
            console.log(info.file)
          message.error(`${info.file.name} Erreur d'importaion.`);
        }
      },
      onDrop(e) {
        console.log('Dropped files', e.dataTransfer.files)
      }
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
                    Upload: {
                        activeBorderColor:'#b82626',
                        hoverBorderColor:'#b82626'
                      }
                } }} >
                    <Dragger {...props}>
                        <p className="ant-upload-drag-icon">
                        <FaIcons.FaFileUpload  fontSize={35} color='#b82626'/>
                        </p>
                        <p >Cliquer ou glisser le fichier ici </p>
                        <p > Extension de fichier supporter : CSV, XML  </p>
                    </Dragger>
            </ConfigProvider>
        </Modal>
    )
}

export const ModalVol= ({  titre, okText, open, cancelText, onCancel, handleSave}) => {

  const [nomSiege, setNumSiege] = useState()
  const [type, setType] = useState()

  handleSave = () => {
      const url = "http://localhost:5160/api/ClasseServices"
      const data = 
      {
          "num_siege":nomSiege,
          "type_classe":type,
      }
      axios.post(url, data)
      .then(() => {
          onCancel()
          setNumSiege()
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
          <label htmlFor="nom">Numéro de Siège :</label>
          <Input onChange={(e) => setNumSiege(e.target.value)}  value={nomSiege} />
          <label htmlFor="nom">Type de classe de service :</label>
          <Input onChange={(e) => setType(e.target.value)}  value={type} />
          </ConfigProvider>
      </Modal>
  )
}
