import React from "react";
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
const List = ({list , states}) => {
  function createData(id, name,address, floor_number, apartment_number, area) {
    return { id, name,address, floor_number, apartment_number, area };
  }
  const getCityId = (cityid)=>{
    let city = [];
    if(states.length>0){
    city = states.filter(el=>{
      return el.id === cityid
    })}
    if(states.length>0){
    return city[0].name}else{
      return 0
    }
  }
  const rows = []
  list.map((el)=>{
    rows.push(createData(el.id , el.name ,el.description, el.floor_number , el.apartment_number , el.area))

  })
  return <TableContainer component={Paper} style={{width:'80%'}}>
  <Table sx={{ minWidth: 450 }} aria-label="simple table">
    <TableHead>
      <TableRow>
        <TableCell align="right">#</TableCell>
        <TableCell align="right">Name</TableCell>
        <TableCell align="right">Address</TableCell>
        <TableCell align="right">Floor no</TableCell>
        <TableCell align="right">Apartment no</TableCell>
        <TableCell align="right">city</TableCell>
      </TableRow>
    </TableHead>
    <TableBody>
      {rows.map((row) => (
        <TableRow
          key={row.name}
          sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
        >
          <TableCell  align="right">
            {row.id}
          </TableCell>
          <TableCell align="right">{row.name}</TableCell>
          <TableCell align="right">{row.address}</TableCell>
          <TableCell align="right">{row.floor_number}</TableCell>
          <TableCell align="right">{row.apartment_number}</TableCell>
          <TableCell align="right">{getCityId(row.area)}</TableCell>
        </TableRow>
      ))}
    </TableBody>
  </Table>
</TableContainer>;
};

export default List;
