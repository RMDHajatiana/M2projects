import React from 'react';
import {ConfigProvider, Table } from 'antd';
import { DeleteOutlined } from '@ant-design/icons';
import * as AiIcons from 'react-icons/ai';
import * as FiIcons from 'react-icons/fi';

export const TablePassagers = ({title, IndexData, data, size, handleDelete, handleEdit}) => {

       const colonne = IndexData.map( (items, index) => ({
        title : title[index],
        dataIndex: items
      }))
    
      colonne.push({
        title: 'Action',
        render: (action) => {
          return (
            <>
              <FiIcons.FiEdit  style={{ fontSize:15.5 }}  onClick={()  => handleEdit (action.id_passager) }/>
              <DeleteOutlined style={{ fontSize:14, marginLeft: '10px', color: '#b82626'  }}  onClick={() => handleDelete (action.id_passager) }/>
            </>
          )}
      })

    return (
        <div initial={{ opacity: 0 }} transition={{ duration: 0.5 }} animate={{ opacity: 1 }} >
        <ConfigProvider 

        theme={{
            components : {
                Table : {
                    fontSizeIcon:14,
                    fontFamily:'"Poppins", cursive, "open-sans"',
                    colorText:'#051039',
                    fontSize:13,
                    headerBg :'#d1d1d1',
                    rowHoverBg:'#ebe9e9',
                }
            }
        }} >

        <Table size={size}  columns={colonne} 
        scroll={{ y: 338 }}
        dataSource={data.map(  (items, index) => ( { ...items, key:index  })) } />
        
        </ConfigProvider>
        </div>
    )
}


export const TableAvion = ({title, handleInfo,IndexData, data, size, handleDelete, handleEdit}) => {

  const colonne = IndexData.map( (items, index) => ({
   title : title[index],
   dataIndex: items
 }))

 colonne.push({
   title: 'Action',
   render: (action) => {
     return (
       <>
        <AiIcons.AiOutlineEye style={{ fontSize:17, marginRight: '10px', color: 'blue'  }}  onClick={() => handleInfo (action.id_aeronef) } />
         <FiIcons.FiEdit  style={{ fontSize:15.5 }}  onClick={()  => handleEdit (action.id_aeronef) }/>
         <DeleteOutlined style={{ fontSize:16, marginLeft: '10px', color: '#b82626'  }}  onClick={() => handleDelete (action.id_aeronef) }/>
       </>
     )}
 })

return (
   <div initial={{ opacity: 0 }} transition={{ duration: 0.5 }} animate={{ opacity: 1 }} >
   <ConfigProvider 

   theme={{
       components : {
           Table : {
               fontSizeIcon:14,
               fontFamily:'"Poppins", cursive, "open-sans"',
               colorText:'#051039',
               fontSize:13,
               headerBg :'#d1d1d1',
               rowHoverBg:'#ebe9e9',
           }
       }
   }} >

   <Table size={size}  columns={colonne} 
   scroll={{ y: 300 }}
   dataSource={data.map(  (items, index) => ( { ...items, key:index  })) }  />
   </ConfigProvider>
   </div>
)
}


export const TableClasse = ({title, IndexData, data, size, handleDelete, handleEdit}) => {
  const colonne = IndexData.map( (items, index) => ({
    title : title[index],
    dataIndex: items
  }))
 
  colonne.push({
    title: 'Action',
    render: (action) => {
      return (
        <>
          <FiIcons.FiEdit style={{fontSize:15.5}}  onClick={()  => handleEdit (action.id_classe) }/>
          <DeleteOutlined style={{ fontSize:15.5, marginLeft: '10px', color: '#b82626'  }}  onClick={() => handleDelete (action.id_classe) }/>
        </>
      )}
  })
 
 return (
    <div initial={{ opacity: 0 }} transition={{ duration: 0.5 }} animate={{ opacity: 1 }} >
    <ConfigProvider 
 
    theme={{
        components : {
            Table : {
                fontSizeIcon:14,
                fontFamily:'"Poppins", cursive, "open-sans"',
                colorText:'#051039',
                fontSize:13,
                headerBg :'#d1d1d1',
                rowHoverBg:'#ebe9e9',
            }
        }
    }} >
 
    <Table size={size}  columns={colonne} 
    scroll={{ y: 300 }}
    dataSource={data.map(  (items, index) => ( { ...items, key:index  })) }  />
    </ConfigProvider>
    </div>
 )
}

export const TableReservation = ({title, IndexData, data, size, handleDelete, handleEdit}) => {

  const colonne = IndexData.map( (items, index) => ({
   title : title[index],
   dataIndex: items
 }))

 colonne.push({
  title: "Date de réservation",
  dataIndex: "date_reservation",
  render: (text, record) => {
    const date = new Date(record.date_reservation)
    const options = { year: "numeric", day: "2-digit", month: "long" }
    return <span>{date.toLocaleDateString("fr-FR", options)}</span>
  }
})

 colonne.push({
   title: 'Action',
   render: (action) => {
     return (
       <>
         <FiIcons.FiEdit  style={{ fontSize:15.5 }}  onClick={()  => handleEdit (action.id_passager) }/>
         <DeleteOutlined style={{ fontSize:15.5, marginLeft: '10px', color: '#b82626'  }}  onClick={() => handleDelete (action.id_passager) }/>
       </>
     )}
 })

return (
   <div initial={{ opacity: 0 }} transition={{ duration: 0.5 }} animate={{ opacity: 1 }} >
   <ConfigProvider 

   theme={{
       components : {
           Table : {
               fontSizeIcon:14,
               fontFamily:'"Poppins", cursive, "open-sans"',
               colorText:'#051039',
               fontSize:13,
               headerBg :'#d1d1d1',
               rowHoverBg:'#ebe9e9',
           }
       }
   }} >

   <Table size={size}  columns={colonne} 
   scroll={{ y: 338 }}
   dataSource={data.map(  (items, index) => ( { ...items, key:index  })) }  />
   </ConfigProvider>
   </div>
)
}

export const TableVols = ({title,customRenderers, IndexData, data, size, handleInfo, handleDalete, handleEdit}) => {

  const colonne = IndexData.map( (items, index) => ({
   title : title[index],
   dataIndex: items,
   render: customRenderers[index]
 }))


 colonne.push({
  title: "Date de départ",
  dataIndex: "date_depart",
  render: (text, record) => {
    const date = new Date(record.date_depart)
    const options = { year: "numeric", day: "2-digit", month: "long" }
    return <span>{date.toLocaleDateString("fr-FR", options)}</span>
  }
})


 colonne.push({
   title: 'Action',
   render: (action) => {
     return (
       <>
         <AiIcons.AiOutlineEye style={{ fontSize:17, marginRight: '10px', color: 'blue'  }}  onClick={() => handleInfo (action.id_vol) } />

         <FiIcons.FiEdit  style={{ fontSize:15.5 }}  onClick={()  => handleEdit (action.id_vol) }/>
         <DeleteOutlined style={{ fontSize:15.5, marginLeft: '10px', color: '#b82626'  }}  onClick={() => handleDalete (action.id_vol) } />
       </>
     )}
 })

return (
   <div initial={{ opacity: 0 }} transition={{ duration: 0.5 }} animate={{ opacity: 1 }} >
   <ConfigProvider 

   theme={{
       components : {
           Table : {
               fontSizeIcon:14,
               fontFamily:'"Poppins", cursive, "open-sans"',
               colorText:'#051039',
               fontSize:13,
               headerBg :'#d1d1d1',
               rowHoverBg:'#ebe9e9',
           }
       }
   }} >

   <Table size={size}  columns={colonne} 
   scroll={{ y: 338 }}
   dataSource={data.map(  (items, index) => ( { ...items, key:index  })) }  />
   </ConfigProvider>
   </div>
)
}


export const TableItineraire = ({title, IndexData, data, size, handleDelete, handleEdit}) => {
  const colonne = IndexData.map( (items, index) => ({
    title : title[index],
    dataIndex: items
  }))
 
  colonne.push({
    title: 'Action',
    render: (action) => {
      return (
        <>
          <FiIcons.FiEdit style={{fontSize:15.5}}  onClick={()  => handleEdit (action.id_itineraire) }/>
          <DeleteOutlined style={{ fontSize:15.5, marginLeft: '10px', color: '#b82626'  }}  onClick={() => handleDelete (action.id_itineraire) }/>
        </>
      )}
  })
 
 return (
    <div initial={{ opacity: 0 }} transition={{ duration: 0.5 }} animate={{ opacity: 1 }} >
    <ConfigProvider 
 
    theme={{
        components : {
            Table : {
                fontSizeIcon:14,
                fontFamily:'"Poppins", cursive, "open-sans"',
                colorText:'#051039',
                fontSize:13,
                headerBg :'#d1d1d1',
                rowHoverBg:'#ebe9e9',
            }
        }
    }} >
 
    <Table size={size}  columns={colonne} 
    scroll={{ y: 300 }}
    dataSource={data.map(  (items, index) => ( { ...items, key:index  })) }  />
    </ConfigProvider>
    </div>
 )
}