'use client'

import React, { useEffect, useState } from 'react';
import { DataGrid, GridColDef } from '@mui/x-data-grid';
import { Box } from '@mui/material';

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
    return {field: name, headerName: name, width: 150}
  }));

  useEffect(() => {
    const fetchedData = fetchData(setRowData);
  }, [])

  useEffect(() => {
    if (rowData.length > 0) {
      setRows(rowData.map((row) => {
        return {
          id: row.id,
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

  console.log(rows)
  return (

    <Box sx={{ height: 400, width: '100%' }}>
      <DataGrid
        rows={rows}
        columns={cols}
        initialState={{ pagination: { } }}
        pageSizeOptions={[100, 1000]}
        sx={{ border: 0 }}
      />
  </Box>
);
}
