'use client'

import React, { ReactElement, useEffect, useState } from 'react';
import { DataGrid, GridColDef } from '@mui/x-data-grid';
import { Box } from '@mui/material';

const ORIGINS_2025_ID = "8D0356F0-D38B-11EF-9091-1D8264B1C7F0";
const CLOCKTOWER_2025_ID = "32D6B730-365B-11EF-B58A-DCC620F8A28C";
const ITEMS_PER_PAGE = "100";

type BasicRowType = {
  name: string;
  description: string;
  startdaypart_name: string;
  type_id: string;
  room_name: string;
  space_name: string;
  date_created: Date | string;
  date_updated: Date | string;
  view_uri: string;
}

const fetchData = async (
  rowData: BasicRowType[],
  setData: Function,
  currentPageNumber: number
)  => {

  let url = new URL(`https://tabletop.events/api/convention/${ORIGINS_2025_ID}/events`);
  url.searchParams.append('_items_per_page', ITEMS_PER_PAGE);
  url.searchParams.append('_page_number', String(currentPageNumber));
  url.searchParams.append('_order_by', 'date_created');
  url.searchParams.append('_sort_order', 'desc');
  const data = await fetch(url);
  let events = await data.json();

  // SAVE FOR SETTING UP PAGINATION
  const nextPageNumber = events["result"]["paging"]["next_page_number"];
  const totalPages = events["result"]["paging"]["total_pages"];

  const items = events["result"]["items"];
  setData([...rowData, ...items]);
  return {items, nextPageNumber, totalPages};

}

export default function Page() {
  const COL_NAMES = ['name', 'description', 'startdaypart_name', 'type_id', 'date_created', 'date_updated', 'space_name', 'room_name'];

  const [rowData, setRowData] = useState([]);
  const [rows, setRows] = useState<BasicRowType[]>([]);
  const [cols, setCols] = useState<GridColDef<(typeof rows)[number]>[]>(COL_NAMES.map((name) => {
    return {field: name, headerName: name, width: 150, renderCell: (params) => (
      <a href={`https://tabletop.events${params.row.view_uri}`}>{params.value}</a>
    )}
  }));

  useEffect(() => {
    const currentPageNumber = 1;
    fetchData(rowData, setRowData, currentPageNumber).then((fetchedData) => {
      // console.log(fetchedData)
      // currentPageNumber = fetchedData["nextPageNumber"];
      // while (currentPageNumber <= fetchedData["totalPages"]){
      //   currentPageNumber++;
      //   fetchData(fetchedData["items"], setRowData, currentPageNumber);
      // }
    });

    //what if instead, sort data when calling? then i can use the data grid pagination and match it with this pagination
  }, [])

  useEffect(() => {
    if (rowData.length > 0) {
      console.log(rowData)
      setRows(rowData.map((row) => {
        return {
          id: row.id,
          name: row.name,
          description: row.description,
          startdaypart_name: row.startdaypart_name ?? "Not scheduled",
          room_name: row.room_name ?? "Not scheduled",
          space_name: row.space_name ?? "Not scheduled",
          type_id: row.type_id,
          date_created: row.date_created,
          date_updated: row.date_updated,
          view_uri: row.view_uri
        }
      }))
    }
  }, [rowData])

  return (

      <DataGrid
        rows={rows}
        columns={cols}
   //loading={true}
        initialState={{ pagination: { } }}
        pageSizeOptions={[100, 1000]}
        sx={{ border: 0 }}
      />
);
}
