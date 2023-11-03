import React, { useEffect, useState } from 'react';
import { ConfigProvider, Input, Modal, Select, Upload, message } from 'antd';
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

    const [capacite, setCapacite] = useState()
    const [avionID, setAvionID] = useState()
    const [type, setType] = useState()
    const [dataAV, setDataAV] = useState([])
    const {Option} = Select

    const classeService = ["classe économique",  "classe affaires ", "première classe"] 

    useEffect(() => {
      axios.get("http://localhost:5160/api/Avions")
       .then(response => {
         setDataAV(response.data)
        })
       .catch(error => console.log(error))
      }, [])
   

    handleSave = () => {
        const url = "http://localhost:5160/api/ClasseServices"
        const data = 
        {
            "num_siege":capacite,
            "avionID":avionID,
            "type_classe":type,
        }
        axios.post(url, data)
        .then(() => {
            onCancel()
            setCapacite()
            setAvionID()
            setType('')
          })
        .catch(error => console.log(error))
      }
    return (
        <Modal   
        style={{ justifyContent:'center', fontFamily:'"Poppins", cursive, "open-sans"' }}
        title = {titre} 
        okText = {okText} 
        width={300}
        open  = {open}
        cancelText = {cancelText}
        onCancel={onCancel}
        onOk={ handleSave  }>
            <ConfigProvider theme={{
                components : {
                    Input: {
                        activeBorderColor:'#b82626',
                        hoverBorderColor:'#b82626'
                      },
                      Select: {
                        //optionSelectedBg:'#b82626',
                        colorPrimaryHover:'#b82626',
                        colorPrimaryBg:'#b82626'
                      }
                }
            }} >
            <label htmlFor="nom">Capacité :</label>
            <Input onChange={(e) => setCapacite(e.target.value)}  value={capacite} />

            <label htmlFor="avion">Avion :</label>
           <Select style={{width : 250,  fontFamily:'"Poppins", cursive, "open-sans"' }}
             onChange={(value) => setAvionID(value)} 
             defaultValue={dataAV}
             value={avionID} >
            {dataAV.map(items => (
             <Option key={items.id_aeronef} value={items.id_aeronef}>
              {items.type_aeronef }
             </Option>
              ))}
            </Select><br/>

            <label htmlFor="nom">Type de classe de service :</label>
           <Select style={{width : 250,  fontFamily:'"Poppins", cursive, "open-sans"' }}
           defaultValue={classeService[0]}
             onChange={(value) => setType(value)}  value={type} >
                {
             classeService.map((items, index) => (
              <Option key={index} value = {items}>
                {items}
              </Option>
                  ))  }
             </Select>
            </ConfigProvider>
        </Modal>
    )
}


export const ModalReservationUpload = ({  titre, okText, open, cancelText, onCancel, handleSave}) => {

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
                        <p > Extension de fichier supporter : CSV  </p>
                    </Dragger>
            </ConfigProvider>
        </Modal>
    )
}


export const ModalReservationAdd = ({  titre, okText, open, cancelText, onCancel, handleSave}) => {

  const [ volID, setVolID ] = useState()
  const [ classID, setclassID ] = useState()
  const [ passagerID, setPassagerID ] = useState()
  const [ dateRes, setDateRes ] = useState()
  const [prix, setPrix]  = useState()
  const [ remboursement, setRemboursement ] = useState(0)

  handleSave = () => {
    const url = "http://localhost:5160/api/Reservations"
    const data = 
    {
        "volID": volID ,
        "classeServiceID": classID,
        "passagerID": passagerID,
        "prix": prix,
        "remboursement": remboursement,
        "date_reservation":dateRes

    }
    axios.post(url, data)
    .then(() => {
        onCancel()
        setVolID('')
        setclassID('')
        setPassagerID()
        setPrix('')
        setRemboursement()
        setDateRes('')
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
                  }, 
                  Select: {
                    //optionSelectedBg:'#b82626',
                    colorPrimaryHover:'#b82626',
                    colorPrimaryBg:'#b82626'
                  }
            }
        }} >

          <label htmlFor="vol">Numéro du vol :</label>
          <Input id='vol' onChange={(e)=> setVolID(e.target.value)}  value={volID}/>

          <label htmlFor="class">Classe de service :</label>
          <Input id='class' onChange={(e) =>setclassID(e.target.value) }  value={classID}/>


          <label htmlFor="passeport">Passager :</label>
          <Input onChange={(e)=> setPassagerID(e.target.value)}  value={passagerID}/>

          <label htmlFor="passeport">Montant :</label>
          <Input onChange={(e)=> setPrix(e.target.value)}  value={prix}/>

          <label htmlFor="remboursement">Remboursement :</label>
          <Input id='remboursement' onChange={(e) => setRemboursement(e.target.value)}  value={remboursement}/>

          <label htmlFor="date">Date de réservation:</label>
          <Input id='date' type='date' onChange={(e)=>setDateRes(e.target.value)}  value={dateRes}/>

          </ConfigProvider>
      </Modal>
  )
}

// export const ModalReservation = ({  titre, okText, open, cancelText, onCancel, handleSave}) => {
//   const { Option } = Select
//   const [data,setData] = useState([])

// const fetch = async () => {
//   let  response = await axios.get("http://localhost:5160/api/Vols") 
//   setData (response.data)
// }
// useEffect(()=> {
//   const intervale = setInterval(()=>{
//     fetch()
//   },1000)
//   return ()=> clearInterval(intervale)
// })

// const ReservationForm = () => {

//   const [selectedVol, setSelectedVol] = useState(null);
//   const [selectedAvion, setSelectedAvion] = useState(null);
//   const [selectedClasse, setSelectedClasse] = useState(null);

//   const handleVolChange = (value) => {
//     setSelectedVol(value);
//     // Recherchez l'avion associé à ce vol dans le tableau de données JSON
//     const avion = data.find((item) => item.id_vol === value)?.avion;
//     setSelectedAvion(avion?.id_aeronef);
//   };

//   const handleAvionChange = (value) => {
//     setSelectedAvion(value);
//     // Recherchez les classes de service associées à cet avion dans le tableau de données JSON
//     const classes = data.find((item) => item.avion.id_aeronef === value)?.avion.classeServices;
//     // Remplissez les options de classe ici
//   };

//   const handleClasseChange = (value) => {
//     setSelectedClasse(value);
//   };

//   return (
//     <div>
//       <h1>Sélection de vol, avion et classe</h1>
//       <Select style={{ width: 200 }} onChange={handleVolChange} placeholder="Sélectionnez un vol">
//         {data.map((item) => (
//           <Option key={item.id_vol} value={item.id_vol}>
//             {item.num_vol}
//           </Option>
//         ))}
//       </Select>
//       {selectedAvion && (
//         <Select style={{ width: 200 }} onChange={handleAvionChange} placeholder="Sélectionnez un avion">
//           {data
//             .find((item) => item.avion.id_aeronef === selectedAvion)
//             ?.avion.classeServices.map((classe) => (
//               <Option key={classe.id_classe} value={classe.id_classe}>
//                 {classe.type_classe}
//               </Option>
//             ))}
//         </Select>
//       )}

//       {selectedClasse && (
//         <Select style={{ width: 200 }} onChange={handleClasseChange} placeholder="Sélectionnez une classe">
//           {/* Remplissez les options de classe ici */}
//         </Select>

//       )}
//     </div>
//   )
// }


// }


export const ModalVol= ({  titre, okText, open, cancelText, onCancel, handleSave}) => {

  const [numVol, setNumVol] =useState('')
  const [avionID, setAvionID] =useState()
  const [itineraireID, setItineraireID] =useState()
  const [statut, setStatut] =useState("A l'heure")
  const [dateD, setDateD] =useState('')
  const [heureD, setHeureD] =useState('')

  const [dataIT, setDataIT] = useState([])
  const [dataAV, setDataAV] = useState([])
  
  useEffect(() => {
   axios.get("http://localhost:5160/api/Itineraires")
   .then(response => setDataIT(response.data))
   .catch(error => console.log(error))
   }, [])
  
   useEffect(() => {
     axios.get("http://localhost:5160/api/Avions")
      .then(response => {
        setDataAV(response.data)
      })
      .catch(error => console.log(error))
     }, [])
  

  handleSave = () => {
      const url = "http://localhost:5160/api/Vols"
      const data = 
      {
        "num_vol":numVol,
        "avionID": avionID ,
        "itineraireID": itineraireID,
        "statut": statut,
        "date_depart": dateD,
        "heure_depart": heureD
      }
      axios.post(url, data)
      .then(() => {
        onCancel()
        setNumVol('')
        setAvionID()
        setItineraireID()
        setStatut('')
        setDateD('')
        setHeureD('')
        })
      .catch(error => console.log(error))
    }

    const { Option } = Select
      const statuts = [
      "A l'heure",
      "Retardé",
       "Annuler" 
      ]
  return (

    <Modal
    style={{ justifyContent:'center', fontFamily:'"Poppins", cursive, "open-sans"' }}
    title = {titre}
    okText ={okText}
    cancelText = {cancelText}
    width= '300px'
    open  = {open }
    onCancel ={onCancel}
    onOk={handleSave} >

<ConfigProvider 
theme={{
    components : {
        Input: {
            activeBorderColor:'#b82626',
            hoverBorderColor:'#b82626'
            },
        Select: {
          //optionSelectedBg:'#b82626',
          colorPrimaryHover:'#b82626',
          colorPrimaryBg:'#b82626'
        }
    }
}} >

      <label htmlFor="numeroVol">Numero de vol :</label>
      <Input onChange={e =>setNumVol(e.target.value) }  value={numVol}/>

    <label htmlFor="avion">Avion :</label>
    <Select style={{width : 250,  fontFamily:'"Poppins", cursive, "open-sans"' }}
    defaultValue={dataAV[0]}
    onChange={(value) => setAvionID(value)} 
    value={avionID} >
      {dataAV.map(items => (
          <Option key={items} value={items.id_aeronef}>
            {items.type_aeronef }
          </Option>
        ))}
    </Select>

      <label htmlFor="Itineraire">Itineraire du vol :</label>
      <Select style={{width : 250,  fontFamily:'"Poppins", cursive, "open-sans"' }}
      defaultValue={dataIT[0]}
     onChange={(value)=> setItineraireID(value)} 
     value={itineraireID}>
        {dataIT.map(items => (
          <Option key={items} value={ items.id_itineraire}>
            {items.aeroport_depart + "-" + items.aeroport_arrive}
          </Option>
        ))}
      </Select>  <br/>

      {/* <label htmlFor="items">items de vol :</label>
     options={dataAV.map(items => ({label: items.type_aeronef, value: items.id_aeronef }))}
      options = {dataIT.map((items) =>( { label: items.aeroport_depart + "-" + items.aeroport_arrive,  value: items.id_itineraire })  )}
     <Select 
     defaultValue={statuts[0]}
      style={{width : 250,  fontFamily:'"Poppins", cursive, "open-sans"' }}
      onChange={(value)=>setStatut(value)} 
      value={statut}
      options={statuts.map( (items )=>( { label: items, value: items}) )}
      /><br/> */}

      <label htmlFor="Statut">Statut de vol :</label>
      <Select
        style={{ width: 250, fontFamily: '"Poppins", cursive, "open-sans"' }}
        onChange={value => setStatut(value)}
        value={statut} >
        {statuts.map(statut => (
          <Option key={statut} value={statut}>
            {statut}
          </Option>
        ))}
      </Select>

      <label htmlFor="Date">Date de départ :</label>
      <Input type='date' onChange={e=> setDateD(e.target.value)}  value={dateD}/>

      <label htmlFor="Heure">Heure de départ :</label>
      <Input type='time' onChange={e => setHeureD(e.target.value)}  value={heureD}/>  

      </ConfigProvider>

      </Modal>
  )
}

export const ModalItineraire = ({  titre, okText, open, cancelText, onCancel, handleSave}) => {

  const [depart, setDepart] = useState()
  const [arrive, setArrive] = useState()

  const aeropoDepart = [
    'Antananarivo',
    "Ambatondrazaka",  //- WAM
    "Antsiranana (Diégo-Suarez)", // – DIE
    "Antalaha ",
    'Fianarantsoa ', // WFI
    'Mahajanga (Majunga)', //– MJN
    'Manakara' ,// - WVK
    'Mananjary', // - MNJ
    'Maroantsetra ',// – WMN
    'Morondava ' ,//– MOQ
    'Nosy Be' ,// – NOS
    'Sainte-Marie', // – SMS
    'Sambava ',//– SVB
    'Taolagnaro (Fort-Dauphin)' ,//– FTU
    'Toamasina (Tamatave) ',//– TMM
    'Toliara (Tuléar)' ,//– TLE 
]

  const aeropoArrive = [
    "Ambatondrazaka",  //- WAM
    "Antsiranana (Diégo-Suarez)", // – DIE
    "Antalaha ", 
    'Antananarivo',
    'Fianarantsoa ', // WFI
    'Mahajanga (Majunga)', //– MJN
    'Manakara' ,// - WVK
    'Antananarivo', // – TNR
    'Mananjary', // - MNJ
    'Maroantsetra ',// – WMN
    'Morondava ' ,//– MOQ
    'Nosy Be' ,// – NOS
    'Sainte-Marie', // – SMS
    'Sambava ',//– SVB
    'Taolagnaro (Fort-Dauphin)' ,//– FTU
    'Toamasina (Tamatave) ',//– TMM
    'Toliara (Tuléar)' ,//– TLE 
  ]
  
  const {Option} = Select

  handleSave = () => {
      const url = "http://localhost:5160/api/Itineraires"
      const data = 
      {
          "aeroport_depart":depart,
          "aeroport_arrive":arrive,
      }
      axios.post(url, data)
      .then(() => {
          onCancel()
          setDepart('')
          setArrive('')
        })
      .catch(error => console.log(error))
    }
  return (
      <Modal   
      style={{ justifyContent:'center', fontFamily:'"Poppins", cursive, "open-sans"' }}
      title = {titre} 
      okText = {okText} 
      open  = {open}
      width= '350px'
      cancelText = {cancelText}
      onCancel={onCancel}
      onOk={ handleSave  }>
          <ConfigProvider theme={{
              components : {
                  Input: {
                      activeBorderColor:'#b82626',
                      hoverBorderColor:'#b82626'
                    }, 
                    Select: {
                      //optionSelectedBg:'#b82626',
                      colorPrimaryHover:'#b82626',
                      colorPrimaryBg:'#b82626'
                    }
              }
          }} >
          <label htmlFor="depart">Aéroport de départ :</label>
          <Select style={{width:'300px'}} onChange={(value) => setDepart(value)}  defaultValue={aeropoDepart[0]} value={depart} >
            {
              aeropoDepart.map(items => (<Option key = {items} >{items}</Option>))
            }
          </Select> <br/>

          <label htmlFor="arrive"> Aéroport d'arrivée :</label>
          <Select style={{width:'300px'}} onChange={(value) => setArrive(value)}  defaultValue={aeropoArrive[0]}  value={arrive} >
            {
              aeropoArrive.map(items => (<Option key={items}>{items}</Option>))
            }
          </Select>
          </ConfigProvider>
      </Modal>
  )
}


