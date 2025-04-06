'use client'

import React, { useEffect, useState } from 'react';
import Paper from '@mui/material/Paper';
import { DataGrid, GridColDef } from '@mui/x-data-grid';
import TableSortLabel from '@mui/material/TableSortLabel';

const ORIGINS_2025_ID = "8D0356F0-D38B-11EF-9091-1D8264B1C7F0";
const CLOCKTOWER_2025_ID = "32D6B730-365B-11EF-B58A-DCC620F8A28C";

type BasicRowType = {
  name: string;
  description: string;
  startdaypart_name: string;
  type_id: string;
  room_name: string;
  space_name: string;
  date_created: Date | string;
}

const fetchData = async (setData: Function)  => {
  const data = await fetch(`https://tabletop.events/api/convention/${ORIGINS_2025_ID}/events`)
  const posts = await data.json()
  // console.log(posts["result"]["items"])
  setData(posts["result"]["items"]);
  return posts["result"]["items"];
}

export default function Page() {
  const COL_NAMES = ['name', 'description', 'startdaypart_name', 'type_id', 'date_created', 'space_name', 'room_name'];

  const [rowData, setRowData] = useState([]);
  const [rows, setRows] = useState<BasicRowType[]>([]);
  const [cols, setCols] = useState<GridColDef<(typeof rows)[number]>[]>(COL_NAMES.map((name) => {
    return {field: name, headerName: name, width: 90}
  }));

  useEffect(() => {
    const fetchedData = fetchData(setRowData);
  }, [])

  useEffect(() => {
    if (rows.length > 0) {
      const colNames = ['name', 'description', 'startdaypart_name', 'type_id', 'date_created', 'space_name', 'room_name'];
      const columns: GridColDef<(typeof rows)[number]>[] = colNames.map((name) => {
        return {field: name, headerName: name, width: 90}
    });
      setCols(columns);
      setRows(rowData.filter((row) => {
        return {
          name: row.name,
          description: row.description,
          startdaypart_name: row.startdaypart_name,
          room_name: row.room_name,
          space_name: row.space_name,
          type_id: row.type_id,
          date_created: row.date_created
        }
      }))
    }
  }, [rowData])

  return (

    <Paper sx={{ height: 400, width: '100%' }}>
    <DataGrid
      rows={rows}
      columns={cols}
      initialState={{ pagination: { } }}
      pageSizeOptions={[100, 1000]}
      sx={{ border: 0 }}
    />
</Paper>
//   <TableContainer component={Paper}>
//   <Table sx={{ minWidth: 650, maxWidth: 800 }} aria-label="simple table">
//     <TableHead>
//       <TableRow>
//         {cols.map((col) => (
//           <TableCell>{col}</TableCell>
//         ))}
//       </TableRow>
//     </TableHead>
//     <TableBody>
//       {rows.map((row) => {
//         let counter = 0;
//         return (
//           <TableRow
//             key={row.id}
//           >
//             <TableCell key={1} component="th" scope="row">{row.name}</TableCell>
//             <TableCell key={2} component="th" scope="row">{row.description}</TableCell>
//             <TableCell key={3} component="th" scope="row">{row.startdaypart_name}</TableCell>
//             <TableCell key={4} component="th" scope="row">{row.type_id}</TableCell>
//             <TableCell key={5} component="th" scope="row">{row.date_created}</TableCell>
//             <TableCell key={6} component="th" scope="row">{row.room_name}</TableCell>
//             <TableCell key={7} component="th" scope="row">{row.space_name
//               }</TableCell>
//             {/* {Object.values(row).map((cell: string) => {
//               console.log(cell)
//               return (
//                 <TableCell key={counter++} component="th" scope="row">
//                 {typeof(cell) !== "object" ? String(cell).substring(0, 50) : "tbd"}
//               </TableCell>
//               )}
//             )} */}
//           </TableRow>
//         )}
//       )}
//     </TableBody>
//   </Table>
// </TableContainer>
);
}
