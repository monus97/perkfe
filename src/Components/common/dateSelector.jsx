import React, { useState, useRef } from "react";
import { Typography, Box, IconButton } from "@mui/material";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import dayjs, { Dayjs } from "dayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";

const CalendarDisplay = () => {
  const [selectedDate, setSelectedDate] = useState<Dayjs | null>(dayjs("2024-01-02"));
  const [open, setOpen] = useState(false);

  const handleIconClick = () => {
    setOpen(true);
  };

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <Box display="flex" alignItems="center" gap={1}>
        <Typography
          variant="body2"
          fontSize={14}
          color="#9C9C9C"
          display="flex"
          alignItems="center"
          gap={1}
        >
          Last Date:
          <IconButton
            onClick={handleIconClick}
            size="small"
            sx={{ p: 0.5, color: "#9C9C9C" }}
          >
            <CalendarMonthIcon fontSize="small" />
          </IconButton>
          <b style={{ color: "#3D3847" }}>
            {selectedDate?.format("D MMM YYYY")}
          </b>
        </Typography>

        {/* Hidden DatePicker that opens when icon is clicked */}
        <DatePicker
          open={open}
          onClose={() => setOpen(false)}
          value={selectedDate}
          onChange={(newValue) => setSelectedDate(newValue)}
          slotProps={{ textField: { hidden: true } }}
        />
      </Box>
    </LocalizationProvider>
  );
};

export default CalendarDisplay;
