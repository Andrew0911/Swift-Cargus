import React from 'react'
import { Table, TableBody, TableCell, TableHead, TableRow } from '@mui/material';

const createData = (name, calories, fat, carbs, protein) => {
  return { name, calories, fat, carbs, protein };
}

const rows = [
  createData('1592833092', '2024-05-31 00:06:59', 'Standard', 'None', 40.95),
  createData('1592833092', '2024-05-31 00:06:59', 'Standard', 'Opening For Delivery, Fragile Packaging', 9.56),
  createData('1592833092', '2024-05-31 00:06:59', 'Standard', 'None', 89.01),
  createData('1592833092', '2024-05-31 00:06:59', 'Standard', 'Opening For Delivery, Fragile Packaging', 32.19),
  createData('1592833092', '2024-05-31 00:06:59', 'Standard', 'None', 24.67),
];

function Admin() {
  return (

    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', height: '90vh', paddingLeft: '2vw', paddingRight: '2vw'}}>

      <div style={{ width: '89vw'}}>
        <Table>

          <TableHead>
            <TableRow>
              <TableCell sx={{fontFamily: 'Quicksand', color: 'var(--yellow-color)', fontSize: '18px'}} align="center">AWB</TableCell>
              <TableCell sx={{fontFamily: 'Quicksand', color: 'var(--yellow-color)', fontSize: '18px'}} align="center">Date</TableCell>
              <TableCell sx={{fontFamily: 'Quicksand', color: 'var(--yellow-color)', fontSize: '18px'}} align="center">Service Type</TableCell>
              <TableCell sx={{fontFamily: 'Quicksand', color: 'var(--yellow-color)', fontSize: '18px'}} align="center">Options</TableCell>
              <TableCell sx={{fontFamily: 'Quicksand', color: 'var(--yellow-color)', fontSize: '18px'}} align="center">Value</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>

            {rows.map((row) => (
              <TableRow>
                <TableCell sx={{fontFamily: 'Quicksand', color: '#135a76', fontSize: '16px'}} align="center">{row.name}</TableCell>
                <TableCell sx={{fontFamily: 'Quicksand'}} align="center">{row.calories}</TableCell>
                <TableCell sx={{fontFamily: 'Quicksand'}} align="center">{row.fat}</TableCell>
                <TableCell sx={{fontFamily: 'Quicksand'}} align="center">{row.carbs}</TableCell>
                <TableCell sx={{fontFamily: 'Quicksand'}} align="center">{row.protein}</TableCell>
              </TableRow>
            ))}

          </TableBody>

        </Table>
      </div>
    </div>
  );
}

export default Admin