import {InputAdornment, TextField } from "@mui/material"
import SearchIcon from "@mui/icons-material/Search";
import { DebounceInput } from "debounce-input-react";
import { ChangeEvent, useState } from "react";
import { useRecoilState } from "recoil";
import { filter, page } from "../atom/postAtom";

export default function SearchBar(){
    const [complete, setComplete] = useState(false);
    const [filterData, setFilterData] = useRecoilState(filter);
    const [pageNumber, setPageNumber] = useRecoilState(page);
    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        setPageNumber(1)
        setFilterData(e.target.value);
      };
    return(
        <DebounceInput
            placeholder="Search"
            onFocus={() => { setComplete(true) }}
            onBlur={() => { setComplete(false) }}
            minLength={3}
            element={TextField}
            debounceTimeout = { 300 } 
            value={filterData}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <SearchIcon />
                </InputAdornment>
              ),
            }}
            onInput={ handleChange}/>
     
    )
}

