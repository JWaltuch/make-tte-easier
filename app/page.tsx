"use client";

import React, { Dispatch, SetStateAction, useEffect, useState } from "react";
import { DataGrid, GridColDef, GridPaginationModel } from "@mui/x-data-grid";
import {
  FormControl,
  InputLabel,
  MenuItem,
  Paper,
  Select,
  Tooltip,
} from "@mui/material";

const ITEMS_PER_PAGE = "100";

type BasicRowType = {
  id: string;
  name: string;
  description: string;
  startdaypart_name: string;
  type_id: string;
  type: string;
  room_name: string;
  space: string;
  date_created: Date | string;
  date_updated: Date | string;
  view_uri: string;
  duration: string;
};

type AdvancedRowType = {
  id: string;
  name: string;
  description: string;
  startdaypart_name: string;
  type_id: string;
  type: {
    name: string;
  };
  room_name: string;
  space_name: string;
  date_created: Date | string;
  date_updated: Date | string;
  view_uri: string;
  duration: string;
};

const fetchEvents = async (
  setData: Dispatch<SetStateAction<AdvancedRowType[]>>,
  currentPageNumber: number,
  currentConvention: string,
  setTotalItems?: Dispatch<SetStateAction<number>>,
  setTotalPages?: Dispatch<SetStateAction<number[]>>
) => {
  const url = new URL(
    `https://tabletop.events/api/convention/${currentConvention}/events?is_scheduled=1&is_cancelled=0`
  );
  url.searchParams.append("_items_per_page", ITEMS_PER_PAGE);
  url.searchParams.append("_page_number", String(currentPageNumber));
  url.searchParams.append("_order_by", "date_updated");
  url.searchParams.append("_sort_order", "desc");
  url.searchParams.append("_include_related_objects", "type");
  // url.searchParams.append("_include_related_objects", "eventsubmission");
  const data = await fetch(url);
  const events = await data.json();

  const totalItems = events["result"]["paging"]["total_items"];
  const items = events["result"]["items"];
  if (setTotalItems) {
    setTotalItems(totalItems);
    const allPages = Array.from(
      { length: events["result"]["paging"]["total_pages"] },
      (_, index) => index + 1
    );
    setTotalPages(allPages);
  }
  setData(items);
};

export default function Page() {
  const [conventions, setConventions] = useState<
    { name: string; id: string }[]
  >([
    { name: "Final 3 Con 2025", id: "32D6B730-365B-11EF-B58A-DCC620F8A28C" },
    { name: "Origins 2025", id: "8D0356F0-D38B-11EF-9091-1D8264B1C7F0" },
  ]);
  const [currentConvention, setCurrentConvention] = useState<string>(
    "8D0356F0-D38B-11EF-9091-1D8264B1C7F0"
  );
  const [rowData, setRowData] = useState<AdvancedRowType[]>([]);
  const [rows, setRows] = useState<BasicRowType[]>([]);
  const [totalItems, setTotalItems] = useState<number>(1);
  const [totalPages, setTotalPages] = useState<number[]>([1]);
  const [currentPageNumber, setCurrentPageNumber] = useState<number>(1);
  const [paginationModel, setPaginationModel] = React.useState({
    page: 0,
    pageSize: Number(ITEMS_PER_PAGE),
  });

  const COL_NAMES = [
    "name",
    "type",
    "description",
    "startdaypart_name",
    "duration",
    "date_created",
    "date_updated",
    "space",
    "room_name",
  ];
  const cols: GridColDef<(typeof rows)[number]>[] = COL_NAMES.map((name) => {
    return {
      field: name,
      headerName: name,
      width:
        name === "duration" || name === "space" || name === "type" ? 80 : 170,
      renderCell: (params) => (
        <Tooltip
          title={name === "description" ? params.row.description : ""}
          placement="bottom-start"
        >
          <a
            href={`https://tabletop.events${params.row.view_uri}`}
            target="_blank"
            rel="noopener noreferrer"
          >
            {params.value}
          </a>
        </Tooltip>
      ),
    };
  });

  useEffect(() => {
    setRowData([]);
    fetchEvents(
      setRowData,
      currentPageNumber,
      currentConvention,
      setTotalItems,
      setTotalPages
    );
  }, [currentPageNumber, currentConvention]);

  useEffect(() => {
    if (rowData.length > 0) {
      console.log(rowData);
      setRows(
        rowData.map((row) => {
          return {
            id: row.id,
            name: row.name,
            description: row.description,
            startdaypart_name: row.startdaypart_name ?? "Not scheduled",
            room_name: row.room_name ?? "Not scheduled",
            space: row.space_name ?? "Not scheduled",
            type_id: row.type_id,
            type: row.type.name,
            date_created: row.date_created,
            date_updated: row.date_updated,
            view_uri: row.view_uri,
            duration: `${Number(row.duration) / 60} hrs`,
          };
        })
      );
    }
  }, [rowData]);

  const onPaginationModelChange = (model: GridPaginationModel) => {
    const nextPage = model.page;
    setCurrentPageNumber(nextPage + 1);
    setPaginationModel({ ...model, page: nextPage });
  };

  return (
    <div>
      <div style={{ display: "flex" }}>
        <FormControl fullWidth>
          <InputLabel id="page-select-label">Select Page</InputLabel>
          <Select
            labelId="page-select"
            id="page-select"
            value={currentPageNumber}
            label="Page"
            onChange={(event) => {
              const newPage = Number(event.target.value);
              console.log(newPage);
              setCurrentPageNumber(newPage);
              onPaginationModelChange({
                page: newPage - 1,
                pageSize: Number(ITEMS_PER_PAGE),
              });
            }}
          >
            {totalPages.map((pg) => {
              return (
                <MenuItem value={pg} key={pg}>
                  {pg}
                </MenuItem>
              );
            })}
          </Select>
        </FormControl>
        <FormControl fullWidth>
          <InputLabel id="page-select-label">Select Convention</InputLabel>
          <Select
            labelId="convention-select"
            id="convention-select"
            value={currentConvention}
            label="Convention"
            onChange={(event) => {
              setCurrentConvention(event.target.value);
            }}
          >
            {conventions.map((convention) => {
              return (
                <MenuItem value={convention.id} key={convention.id}>
                  {convention.name}
                </MenuItem>
              );
            })}
          </Select>
        </FormControl>
      </div>
      <Paper sx={{ height: 600, width: "100%" }}>
        <DataGrid
          rows={rows}
          columns={cols}
          loading={rowData.length === 0}
          slotProps={{
            loadingOverlay: {
              variant: "circular-progress",
              noRowsVariant: "circular-progress",
            },
          }}
          paginationModel={paginationModel}
          rowCount={totalItems}
          paginationMode="server"
          paginationMeta={{
            hasNextPage: currentPageNumber * 100 < totalItems,
          }}
          onPaginationModelChange={onPaginationModelChange}
          pageSizeOptions={[100]}
          sx={{
            border: 0,
          }}
        />
      </Paper>
    </div>
  );
}
