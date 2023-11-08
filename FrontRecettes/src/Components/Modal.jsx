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

export const ModalTarif = ({  titre, okText, open, cancelText, onCancel, handleSave}) => {

  const [vol, setVol] = useState()
  const [classe, setClasse] = useState()
  const [montant, setMontant] = useState()
  const [ dataVol, setDataVol ] = useState([])
const [ dataClass, setDataClass ] = useState([])
const {Option }= Select



const fetch = async () => {
  let resultat = await  axios.get("http://localhost:5160/api/Vols")
  setDataVol(resultat.data)
}
useEffect(()=> {
  const intervale = setInterval(() => {
    fetch()
  }, 1000)
  return () => clearInterval(intervale)
})

const fetch1 = async () => {
  let resultat = await  axios.get("http://localhost:5160/api/ClasseServices")
  setDataClass(resultat.data)
}
useEffect(()=> {
  const intervale = setInterval(() => {
    fetch1()
  }, 1000)
  return () => clearInterval(intervale)
})



  handleSave = () => {
      const url = "http://localhost:5160/api/Tarifs"
      const data = 
      {
          "volID": vol ,
          "classeServiceID": classe ,
          "Montant_tarif": montant ,
      }
      axios.post(url, data)
      .then(() => {
          onCancel()
          setVol('')
          setClasse('')
          setMontant('')
        })
      .catch(error => console.log(error))
    }
  return (
      <Modal   
      style={{ justifyContent:'center', fontFamily:'"Poppins", cursive, "open-sans"' }}
      title = {titre} 
      width= '300px'
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
          <label htmlFor="vol"> Numéros de vol :</label>
          <Select id='vol' onChange={(value) => setVol(value)}  style={{width : 250,  fontFamily:'"Poppins", cursive, "open-sans"' }}  value={vol}>
            {
             dataVol.map(items => (<Option value= {items.id_vol} key={items.id_vol}>{items.num_vol}</Option>))
            }
          </Select><br/>

          <label htmlFor="class"> Classe de sevice :</label>
          <Select id='class' onChange={(value) => setClasse(value)}  style={{width : 250,  fontFamily:'"Poppins", cursive, "open-sans"' }}  value={classe}>
            {
              dataClass.map(items => (<Option value= {items.id_classe} key={items.id_classe}>{items.type_classe}</Option>))
            }
          </Select><br/>

          <label htmlFor="mt"> Montant :</label>
          <Input id='mt' value={montant} onChange={(e) => setMontant(e.target.value)} /> <br/>

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
             //defaultValue={dataAV}
             value={avionID} >
            {dataAV.map(items => (
             <Option key={items.id_aeronef} value={items.id_aeronef}>
              {items.type_aeronef }
             </Option>
              ))}
            </Select><br/>

            <label htmlFor="nom">Type de classe de service :</label>
           <Select style={{width : 250,  fontFamily:'"Poppins", cursive, "open-sans"' }}
           //defaultValue={classeService[0]}
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

// export const ModalReservationAdd = ({ titre, okText, open, cancelText, onCancel, handleSave }) => {

//   const [volID, setVolID] = useState('')
//   const [classID, setClassID] = useState('')
//   const [passagerID, setPassagerID] = useState('')
//   const [dateRes, setDateRes] = useState('')
//   const [prix, setPrix] = useState(null)
//   const [remboursement, setRemboursement] = useState(0)

//   const { Option } = Select
//   const [dataVol, setDataVol] = useState([])
//   const [dataClass, setDataClass] = useState([])
//   const [dataPassager, setDataPassager] = useState([])
//   const [dataTarif, setDataTarif] = useState([])

//   const fetchPassagers = async () => {
//     try {
//       const response = await axios.get("http://localhost:5160/api/Passagers")
//       setDataPassager(response.data);
//     } catch (error) {
//       console.error(error)
//     }
//   }

//   const fetchTarifs = async () => {
//     try {
//       const response = await axios.get("http://localhost:5160/api/Tarifs")
//       setDataTarif(response.data);
//     } catch (error) {
//       console.error(error);
//     }
//   }

//   const fetchClasses = async () => {
//     try {
//       const response = await axios.get("http://localhost:5160/api/ClasseServices")
//       setDataClass(response.data);
//     } catch (error) {
//       console.error(error);
//     }
//   }

//   const fetchVols = async () => {
//     try {
//       const response = await axios.get("http://localhost:5160/api/Vols")
//       setDataVol(response.data)
//     } catch (error) {
//       console.error(error)
//     }
//   }

//   useEffect(() => {
//     const intervalPassagers = setInterval(() => fetchPassagers(), 1000);
//     const intervalTarifs = setInterval(() => fetchTarifs(), 1000);
//     const intervalClasses = setInterval(() => fetchClasses(), 1000);
//     const intervalVols = setInterval(() => fetchVols(), 1000);

//     return () => {
//       clearInterval(intervalPassagers);
//       clearInterval(intervalTarifs);
//       clearInterval(intervalClasses);
//       clearInterval(intervalVols);
//     }
//   }, []);

//   useEffect(() => {
//     const matchingTarif = dataTarif.find(
//       (tarif) => tarif.volID === volID && tarif.classeServiceID === classID
//     )

//     if (matchingTarif) {
//       setPrix(matchingTarif.montant_tarif);
//     } else {
//       setPrix(null); // Aucune correspondance trouvée
//     }
//   }, [volID, classID, dataTarif]);

//    handleSave = () => {
//     const url = "http://localhost:5160/api/Reservations";
//     const data = {
//       volID: volID,
//       classeServiceID: classID,
//       passagerID: passagerID,
//       prix: prix,
//       remboursement: remboursement,
//       date_reservation: dateRes
//     };

//     axios.post(url, data)
//       .then(() => {
//         onCancel();
//         setVolID('');
//         setClassID('')
//         setPassagerID('')
//         setPrix(null);
//         setRemboursement(0);
//         setDateRes('')
//       })
//       .catch((error) => console.log(error));
//   };

//   return (
//     <Modal
//       style={{ justifyContent: 'center', fontFamily: '"Poppins", cursive, "open-sans"' }}
//       title={titre}
//       width='350px'
//       okText={okText}
//       open={open}
//       cancelText={cancelText}
//       onCancel={onCancel}
//       onOk={handleSave}
//     >
//       <Select
//         style={{ width: '300px' }}
//         id='vol'
//         onChange={(value) => setVolID(value)}
//         value={volID}
//         placeholder="Numéro du vol :"
//       >
//         {dataVol.map((item) => (
//           <Option key={item.id_vol} value={item.id_vol}>
//             {item.num_vol}
//           </Option>
//         ))}
//       </Select>

//       <Select
//         style={{ width: '300px' }}
//         id='class'
//         onChange={(value) => setClassID(value)}
//         value={classID}
//         placeholder="Classe de service :"
//       >
//         {dataClass.map((item) => (
//           <Option key={item.id_classe} value={item.id_classe}>
//             {item.type_classe}
//           </Option>
//         ))}
//       </Select>

//       <Select
//         style={{ width: '300px' }}
//         id='ps'
//         onChange={(value) => setPassagerID(value)}
//         value={passagerID}
//         placeholder="Passager :"
//       >
//         {dataPassager.map((item) => (
//           <Option key={item.id_passager} value={item.id_passager}>
//             {item.nom_passager}
//           </Option>
//         ))}
//       </Select>

//       <Input
//         id='mt'
//         onChange={(e) => setPrix(e.target.value)}
//         value={prix !== null ? prix.toString() : ''}
//         placeholder="Montant :"
//       />

//       <Input
//         id='remboursement'
//         onChange={(e) => setRemboursement(e.target.value)}
//         value={remboursement}
//         placeholder="Remboursement :"
//       />

//       <Input
//         id='date'
//         type='date'
//         onChange={(e) => setDateRes(e.target.value)}
//         value={dateRes}
//         placeholder="Date de réservation :"
//       />
//     </Modal>
//   )
// }

export const ModalReservationAdd = ({ titre, okText, open, cancelText, onCancel, handleSave }) => {

  const [volID, setVolID] = useState('')
  const [classID, setClassID] = useState('')
  const [passagerID, setPassagerID] = useState('')
  const [dateRes, setDateRes] = useState('')
  const [prix, setPrix] = useState(null)
  const [remboursement, setRemboursement] = useState(0)

  const { Option } = Select
  const [dataVol, setDataVol] = useState([])
  const [dataClass, setDataClass] = useState([])
  const [dataPassager, setDataPassager] = useState([])
  const [dataTarif, setDataTarif] = useState([])

  const fetchPassagers = async () => {
    try {
      const response = await axios.get("http://localhost:5160/api/Passagers")
      setDataPassager(response.data);
    } catch (error) {
      console.error(error)
    }
  }

  const fetchTarifs = async () => {
    try {
      const response = await axios.get("http://localhost:5160/api/Tarifs")
      setDataTarif(response.data);
    } catch (error) {
      console.error(error);
    }
  }

  const fetchClasses = async () => {
    try {
      const response = await axios.get("http://localhost:5160/api/ClasseServices")
      setDataClass(response.data);
    } catch (error) {
      console.error(error);
    }
  }

  const fetchVols = async () => {
    try {
      const response = await axios.get("http://localhost:5160/api/Vols")
      setDataVol(response.data)
    } catch (error) {
      console.error(error)
    }
  }

  useEffect(() => {
    const intervalPassagers = setInterval(() => fetchPassagers(), 1000);
    const intervalTarifs = setInterval(() => fetchTarifs(), 1000);
    const intervalClasses = setInterval(() => fetchClasses(), 1000);
    const intervalVols = setInterval(() => fetchVols(), 1000);

    return () => {
      clearInterval(intervalPassagers);
      clearInterval(intervalTarifs);
      clearInterval(intervalClasses);
      clearInterval(intervalVols);
    }
  }, []);

  useEffect(() => {
    const recherTarif = dataTarif.find(
      (tarif) => tarif.volID === volID && tarif.classeServiceID === classID
    )

    if (recherTarif) {
      setPrix(recherTarif.montant_tarif);
    } else {
      setPrix(null); // Aucune correspondance trouvée
    }
  }, [volID, classID, dataTarif]);

   handleSave = () => {
    const url = "http://localhost:5160/api/Reservations";
    const data = {
      volID: volID,
      classeServiceID: classID,
      passagerID: passagerID,
      prix: prix,
      remboursement: remboursement,
      date_reservation: dateRes
    };

    axios.post(url, data)
      .then(() => {
        onCancel();
        setVolID('');
        setClassID('')
        setPassagerID('')
        setPrix(null);
        setRemboursement(0);
        setDateRes('')
      })
      .catch((error) => console.log(error));
  };

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
                    colorPrimaryHover:'#b82626',
                    colorPrimaryBg:'#b82626'
                  }
            }
        }} >

          <label htmlFor="vol">Numéro du vol :</label>
                <Select  style={{width:'300px'}} id='vol' onChange={(value)=>{ setVolID(value) }}  value={volID}>
                  {
                dataVol.map((items) => 
                <Option key={items.id_vol} value={items.id_vol} >{items.num_vol}</Option> 
                )}
             </Select>

             {/* <label htmlFor="it"></label>
             <Input id='it'  disabled={true} value={itineraire}/> */}

          <label htmlFor="class">Classe de service :</label>
          <Select  style={{width:'300px'}}  id='class' onChange={(value) =>setClassID(value) }  value={classID}>
            {
              dataClass.map(items => (<Option key={items.id_classe} value={items.id_classe} >{items.type_classe}</Option>))
            }
          </Select>
          
          <label htmlFor="ps">Passager :</label>
          <Select id='ps' style={{width:'300px'}} placeholder="Nom de passager" onChange={(value)=> setPassagerID(value)}  value={passagerID}>
            {
              dataPassager.map(items => (<Option key={items.id_passager} value= {items.id_passager} >{items.nom_passager}</Option>))
            }
          </Select>

          <label htmlFor="mt">Montant :</label>
          <Input placeholder='Montant' id='mt' onChange={(e)=> setPrix(e.target.value)}  value={prix !== null ? prix.toString() : ''}/>

          <label htmlFor="remboursement">Remboursement :</label>
          <Input id='remboursement' onChange={(e) => setRemboursement(e.target.value)}  value={remboursement}/>

          <label htmlFor="date">Date de réservation:</label>
          <Input id='date' type='date' onChange={(e)=>setDateRes(e.target.value)}  value={dateRes}/>

          </ConfigProvider>
      </Modal>
  )
}



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
    //defaultValue={dataAV[0]}
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
      //defaultValue={dataIT[0]}
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
     //defaultValue={statuts[0]}
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
          <Select style={{width:'300px'}} onChange={(value) => setDepart(value)}  
          //defaultValue={aeropoDepart[0]} 
          value={depart} >
            {
              aeropoDepart.map(items => (<Option key = {items} >{items}</Option>))
            }
          </Select> <br/>

          <label htmlFor="arrive"> Aéroport d'arrivée :</label>
          <Select style={{width:'300px'}} onChange={(value) => setArrive(value)}  
          //defaultValue={aeropoArrive[0]}  
          value={arrive} >
            {
              aeropoArrive.map(items => (<Option key={items}>{items}</Option>))
            }
          </Select>
          </ConfigProvider>
      </Modal>
  )
}



