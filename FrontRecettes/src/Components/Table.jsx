import React from 'react';
import {ConfigProvider, Table } from 'antd';
import { DeleteOutlined, EditOutlined } from '@ant-design/icons';

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
              <EditOutlined  onClick={()  => handleEdit (action.id_passager) }/>
              <DeleteOutlined style={{ size:14, marginLeft: '10px', color: '#b82626'  }}  onClick={() => handleDelete (action.id_passager) }/>
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
