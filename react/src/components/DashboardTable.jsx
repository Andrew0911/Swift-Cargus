import * as React from 'react';
import Box from '@mui/material/Box';
import { DataGrid } from '@mui/x-data-grid';

const columns = [
    { 
      field: 'id', 
      headerName: 'AWB', 
      width: 150,
      headerClassName: 'table-column',
      sortable: false,
      renderCell: (params) => (
        <div style={{ fontWeight: '550', color: '#4f96b2' }}>{params.value}</div>
      ),
    },
    {
      field: 'senderName',
      headerName: 'Sender Name',
      width: 250,
      headerClassName: 'table-column',
      sortable: false
    },
    {
      field: 'recipientName',
      headerName: 'Recipient Name',
      width: 250,
      headerClassName: 'table-column',
      sortable: false
    },
    {
      field: 'date',
      headerName: 'Date',
      width: 200,
      headerClassName: 'table-column'
    },
    {
      field: 'service',
      headerName: 'Service Type',
      width: 180,
      headerClassName: 'table-column',
      renderCell: (params) => (
        <div style={{ color: params.row.service == 'Heavy' ? 'red' : 'green'}}>{params.value}</div>
      ),
    },
    {
      field: 'options',
      headerName: 'Options',
      width: 400,
      headerClassName: 'table-column',
      sortable: false
    },
    {
      field: 'value',
      headerName: 'Value',
      width: 170,
      headerClassName: 'table-column',
    },
    {
      field: 'status',
      headerName: 'Status',
      width: 200,
      headerClassName: 'table-column',
      sortable: false,
      renderCell: (params) => {
        let color;
        if (params.row.status === 'Processed') {
          color = '#135a76';
        } else if (params.row.status === 'Shipment in delivery') {
          color = 'orange';
        } else {
          color = 'green';
        }
        return <div style={{ color }}> &#x2022; {params.value}</div>;
      },
    },
];

const getRowClassName = () => {
    return 'table-row';
};

export default function DashboardTable({ rows }) {

    return (
      <Box sx={{ marginLeft: '2vw', marginTop: '7.5vh', height: 652, width: '55%' }}>
        <DataGrid
          sx={{ fontFamily: 'Quicksand, sans-serif' }}
          rows={rows}
          columns={columns}
          initialState={{ pagination: { paginationModel: { pageSize: 10 }}}}
          getRowClassName={getRowClassName}
          pageSizeOptions={[10, 20, 30]}
          rowSelection={false}
        />
      </Box>
    )
      
}
