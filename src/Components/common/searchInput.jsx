import React from "react";
import { InputBase, Box } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";

const SearchInput = () => {
  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        backgroundColor: "#f5f5fa",
        borderRadius: "12px",
        padding: "8px 16px",
        width: "100%",
        maxWidth: 600,
      }}
    >
      <SearchIcon sx={{ color: "#A0A0B0", mr: 1 }} />
      <InputBase
        placeholder="Search"
        sx={{
          color: "#A0A0B0",
          fontSize: 16,
          width: "100%",
        }}
        disableUnderline
      />
    </Box>
  );
};

export default SearchInput;
