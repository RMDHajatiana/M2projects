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


export const TableAvion = ({title, IndexData, data, size, handleDelete, handleEdit}) => {

  const colonne = IndexData.map( (items, index) => ({
   title : title[index],
   dataIndex: items
 }))

 colonne.push({
   title: 'Action',
   render: (action) => {
     return (
       <>
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

export const TableVols = ({title, IndexData, data, size, handleDelete, handleEdit, expandable}) => {

  const colonne = IndexData.map( (items, index) => ({
   title : title[index],
   dataIndex: items
 }))

 colonne.push({
   title: 'Action',
   render: (action) => {
     return (
       <>
         <FiIcons.FiEdit  style={{ fontSize:15.5 }}  onClick={()  => handleEdit (action.id_vol) }/>
         <AiIcons.AiOutlineEye style={{ fontSize:14, marginLeft: '10px', color: '#b82626'  }}  onClick={() => handleDelete (action.id_vol) } />
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
   expandable={expandable} 
   dataSource={data.map(  (items, index) => ( { ...items, key:index  })) }  />
   </ConfigProvider>
   </div>
)
}
