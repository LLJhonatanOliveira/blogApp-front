import { Box, InputAdornment, TextField } from "@mui/material"
import SearchIcon from "@mui/icons-material/Search";
import { DebounceInput } from "debounce-input-react";
import { ChangeEvent, useState } from "react";
import { useRecoilState } from "recoil";
import { filter } from "../atom/postAtom";

export default function SearchBar(){
    const [complete, setComplete] = useState(false);
    const [filterData, setFilterData] = useRecoilState(filter);
    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        setFilterData(e.target.value);
      };
    return(
        <Box sx={{ display: "flex", alignItems: "center", marginBottom: 2 }}>
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
      </Box>
    )
}