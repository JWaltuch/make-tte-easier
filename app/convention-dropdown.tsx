import { FormControl, InputLabel, MenuItem, Select } from "@mui/material";
import React, { Dispatch, SetStateAction, useEffect, useState } from "react";
import { ConventionType } from "./types";
import { ITEMS_PER_PAGE } from "./constants";

const getConventionData = async (
  setConventions: Dispatch<SetStateAction<ConventionType[]>>,
  currentPage: number,
  setTotalPages: Dispatch<SetStateAction<number>>,
  totalPages: number
) => {
  const url = new URL(`https://tabletop.events/api/convention`);
  url.searchParams.append("_items_per_page", ITEMS_PER_PAGE);
  url.searchParams.append("_order_by", "name");
  url.searchParams.append("_sort_order", "asc");
  url.searchParams.append("_page_number", String(currentPage));
  const data = await fetch(url);
  const conventions = await data.json();
  const items = conventions["result"]["items"];
  setConventions((prev) => {
    console.log(prev);
    console.log(
      items.map((con: ConventionType) => {
        return { name: con.name, id: con.id };
      })
    );
    return [
      ...prev,
      ...items.map((con: ConventionType) => {
        return { name: con.name, id: con.id };
      }),
    ];
  });
  if (totalPages !== conventions["result"]["paging"]["total_pages"]) {
    setTotalPages(conventions["result"]["paging"]["total_pages"]);
  }
};

export default function ConventionDropdown({
  currentConvention,
  setCurrentConvention,
}: {
  currentConvention: string;
  setCurrentConvention: Dispatch<SetStateAction<string>>;
}) {
  const [conventions, setConventions] = useState<ConventionType[]>([]);
  const [totalPages, setTotalPages] = useState<number>(1);
  const [currentPage, setCurrentPage] = useState<number>(0);

  useEffect(() => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
      getConventionData(
        setConventions,
        currentPage + 1,
        setTotalPages,
        totalPages
      );
    }
  }, [conventions, totalPages, currentPage]);

  return (
    <FormControl fullWidth>
      <InputLabel id="convention-select-label">Select Convention</InputLabel>
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
  );
}
