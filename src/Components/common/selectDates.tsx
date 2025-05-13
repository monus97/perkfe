import React, { useState, useRef } from "react";
import {
  Menu,
  MenuItem,
  Button,
  ClickAwayListener,
  Box,
  Typography,
} from "@mui/material";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";

const options = [
  "Today",
  "This week",
  "Last 7 days",
  "Last week",
  "Last 30 days",
  "Last month",
  "Last year",
  "Custom date",
];

const SelectDates = () => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [selected, setSelected] = useState("Today");

  const handleOpen = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleSelect = (option: string) => {
    setSelected(option);
    handleClose();
  };

  return (
    <ClickAwayListener onClickAway={handleClose}>
      <Box>
        <Button
          variant="outlined"
          onClick={handleOpen}
          endIcon={<KeyboardArrowDownIcon sx={{ color: "#7B82A3" }} />}
          sx={{
            backgroundColor: "#FAFAFA",
            textTransform: "none",
            color: "#000",
            borderRadius: "12px",
            px: 2,
            py: 1,
            fontWeight: 500,
            fontSize: "16px",
            borderColor: "transparent",
            "&:hover": {
              borderColor: "#E0E0E0",
              backgroundColor: "#f0f0f0",
            },
          }}
        >
          {selected}
        </Button>

        <Menu
          anchorEl={anchorEl}
          open={Boolean(anchorEl)}
          onClose={handleClose}
          PaperProps={{
            sx: {
              borderRadius: "12px",
              mt: 1,
              p: 0,
              bgcolor: "#fff",
              boxShadow:
                "0px 4px 12px rgba(0, 0, 0, 0.1), 0px 0px 0px 1px rgba(0,0,0,0.05)",
              minWidth: 180,
            },
          }}
        >
          {options.map((option) => (
            <MenuItem
              key={option}
              selected={option === selected}
              onClick={() => handleSelect(option)}
              sx={{
                fontSize: "16px",
                py: 1.5,
                px: 2,
                "&.Mui-selected": {
                  backgroundColor: "#165DFF !important",
                  color: "#fff",
                  borderRadius: "12px",
                  mx: 1,
                },
                "&:hover": {
                  backgroundColor: "#f5f5f5",
                },
              }}
            >
              {option}
            </MenuItem>
          ))}
        </Menu>
      </Box>
    </ClickAwayListener>
  );
};

export default SelectDates;
