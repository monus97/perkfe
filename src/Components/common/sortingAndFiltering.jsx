import React from "react";
import { Box, Button } from "@mui/material";
import SwapVertIcon from "@mui/icons-material/SwapVert";
import FilterListIcon from "@mui/icons-material/FilterList";

const SortFilterButtons = () => {
  return (
    <Box display="flex" gap={1}>
      <Button
        variant="outlined"
        startIcon={<SwapVertIcon sx={{ color: "#8887b2" }} />}
        sx={{
          borderRadius: "12px",
          textTransform: "none",
          fontWeight: 500,
          borderColor: "#e0e0e0",
          color: "#1a1a1a",
          backgroundColor: "#fff",
          px: 2,
          py: 1,
        }}
      >
        Sort
      </Button>

      <Button
        variant="outlined"
        startIcon={<FilterListIcon sx={{ color: "#8887b2" }} />}
        sx={{
          borderRadius: "12px",
          textTransform: "none",
          fontWeight: 500,
          borderColor: "#e0e0e0",
          color: "#1a1a1a",
          backgroundColor: "#fff",
          px: 2,
          py: 1,
        }}
      >
        Filter(0)
      </Button>
    </Box>
  );
};

export default SortFilterButtons;
