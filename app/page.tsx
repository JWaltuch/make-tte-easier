"use client";

import React, { Dispatch, SetStateAction, useEffect, useState } from "react";
import { DataGrid, GridColDef, GridPaginationModel } from "@mui/x-data-grid";

const ORIGINS_2025_ID = "8D0356F0-D38B-11EF-9091-1D8264B1C7F0";
//const CLOCKTOWER_2025_ID = "32D6B730-365B-11EF-B58A-DCC620F8A28C";
const ITEMS_PER_PAGE = "100";

type BasicRowType = {
    id: string;
    name: string;
    description: string;
    startdaypart_name: string;
    type_id: string;
    room_name: string;
    space_name: string;
    date_created: Date | string;
    date_updated: Date | string;
    view_uri: string;
};

type AdvancedRowType = {
    id: string;
    name: string;
    description: string;
    startdaypart_name: string;
    type_id: string;
    room_name: string;
    space_name: string;
    date_created: Date | string;
    date_updated: Date | string;
    view_uri: string;
};

const fetchData = async (
    setData: Dispatch<SetStateAction<AdvancedRowType[]>>,
    currentPageNumber: number,
    setTotalItems?: Dispatch<SetStateAction<number>>,
) => {
    const url = new URL(
        `https://tabletop.events/api/convention/${ORIGINS_2025_ID}/events?is_scheduled=1`
    );
    url.searchParams.append("_items_per_page", ITEMS_PER_PAGE);
    url.searchParams.append("_page_number", String(currentPageNumber));
    url.searchParams.append("_order_by", "date_updated");
    url.searchParams.append("_sort_order", "desc");
    // url.searchParams.append("_include_related_objects", "eventtype");
    // url.searchParams.append("_include_related_objects", "eventsubmission");
    const data = await fetch(url);
    const events = await data.json();

    const totalItems = events["result"]["paging"]["total_items"];
    const items = events["result"]["items"];
    if (setTotalItems){
      setTotalItems(totalItems);
    }
    setData(items);
};

export default function Page() {
    const [rowData, setRowData] = useState<AdvancedRowType[]>([]);
    const [rows, setRows] = useState<BasicRowType[]>([]);
    const [totalItems, setTotalItems] = useState<number>(1);
    const [currentPageNumber, setCurrentPageNumber] = useState<number>(1);
    const [paginationModel, setPaginationModel] = React.useState({
      page: 0,
      pageSize: Number(ITEMS_PER_PAGE),
    });

    const COL_NAMES = [
        "name",
        "description",
        "startdaypart_name",
        "type_id",
        "date_created",
        "date_updated",
        "space_name",
        "room_name",
    ];
    const cols: GridColDef<(typeof rows)[number]>[] = COL_NAMES.map((name) => {
        return {
            field: name,
            headerName: name,
            width: 150,
            renderCell: (params) => (
                <a href={`https://tabletop.events${params.row.view_uri}`}>
                    {params.value}
                </a>
            ),
        };
    });

    useEffect(() => {
        fetchData(setRowData, currentPageNumber, setTotalItems);
    }, []);

    useEffect(() => {
        if (rowData.length > 0) {
            console.log(rowData);
            setRows(
                rowData.map((row) => {
                    return {
                        id: row.id,
                        name: row.name,
                        description: row.description,
                        startdaypart_name:
                            row.startdaypart_name ?? "Not scheduled",
                        room_name: row.room_name ?? "Not scheduled",
                        space_name: row.space_name ?? "Not scheduled",
                        type_id: row.type_id,
                        date_created: row.date_created,
                        date_updated: row.date_updated,
                        view_uri: row.view_uri,
                    };
                })
            );
        }
    }, [rowData]);


    const onPaginationModelChange = (model: GridPaginationModel) => {
      const nextPage = model.page;
      fetchData(setRowData, nextPage + 1);
      setCurrentPageNumber(nextPage + 1);
      setPaginationModel({...model, page: nextPage});
    }

    return (
        <DataGrid
            rows={rows}
            columns={cols}
            loading={rows.length === 0}
            paginationModel={paginationModel}
            rowCount={totalItems}
            paginationMode="server"
            paginationMeta={{hasNextPage: currentPageNumber  * 100 < totalItems}}
            onPaginationModelChange={onPaginationModelChange}
            pageSizeOptions={[100]}
            sx={{ border: 0 }}
        />
    );
}
