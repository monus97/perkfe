
import React, { useEffect, useState } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Typography,
  Box,
  Button,
  Chip,
  InputAdornment,
  Autocomplete,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import gold from "../../../Assets/Organzations/Vector (1).png";
import authInstance from "../../../authInstance";

const CoinGrantModal = ({ details, open, handleClose }) => {
  const availableBalance = 6861.66;
  const [coins, setCoins] = useState("");
  const [search, setSearch] = useState("");
  const [selectedEmployees, setSelectedEmployees] = useState([]);
  const [allCustomers, setAllCustomers] = useState([]);
  const [error, setError] = useState("");

  const handleDelete = (id) => {
    setSelectedEmployees((prev) => prev.filter((emp) => emp.customerId !== id));
  };

  const fetchAllCustomer = async () => {
    const data = sessionStorage.getItem("user");
    const orgId = JSON.parse(data || "{}").orgId;
    try {
      const response = await authInstance.get(
        `/admin/customer/list?orgId=${orgId}`
      );
      if (response?.status === 200) {
        setAllCustomers(response?.data?.data || []);
      }
    } catch (error) {
      console.log(error, "error");
    }
  };

  useEffect(() => {
    fetchAllCustomer();
  }, []);

  const handleCoinChange = (e) => {
    const value = e.target.value;
    setCoins(value);
    const total = parseFloat(value || "0") * selectedEmployees?.length;
    if (total > availableBalance) {
      setError("Please Enter A Lower Amount Or Select Fewer Employees");
    } else {
      setError("");
    }
  };

  return (
    <Dialog
      open={open}
      onClose={handleClose}
      maxWidth="sm"
      fullWidth
      PaperProps={{
        sx: { borderRadius: 4, bgcolor: "#fff", px: 3, py: 2 },
      }}
    >
      <DialogTitle sx={{ fontWeight: 600, fontSize: "20px" }}>
        Coin Granting
      </DialogTitle>

      <DialogContent>
        <Box display="flex" alignItems="center" gap={2} mb={1}>
          <TextField
            value={coins}
            onChange={handleCoinChange}
            variant="standard"
            label="Coins"
            type="number"
            fullWidth
            margin="normal"
            error={!!error}
            helperText={error}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <img src={gold} width={18} height={18} />
                </InputAdornment>
              ),
            }}
            sx={{
              "& input": {
                fontSize: "14px",
                padding: "9px 10px",
              },
              "& .MuiInputLabel-root": {
                color: "#5D5D5D80",
                fontSize: "14px",
                padding: "0px 10px",
              },
              bgcolor: "#fff",
              borderRadius: "6px",
              flex: 1,
            }}
          />
          <Typography
            sx={{
              color: "#9C9C9C",
              mt: "20px",
              fontSize: 14,
              whiteSpace: "nowrap",
            }}
          >
            Available Balance:{" "}
            <span style={{ color: "#209C58", fontSize: 20, fontWeight: 600 }}>
              {details?.pointsBalanced?.toFixed(2)}
            </span>
          </Typography>
        </Box>

        <Autocomplete
          options={allCustomers}
          getOptionLabel={(option) =>
            option?.name ? `${option.name}` : ""
          }
          filterSelectedOptions
          onChange={(event, newValue) => {
            if (
              newValue &&
              !selectedEmployees.some(
                (emp) => emp.customerId === newValue.customerId
              )
            ) {
              setSelectedEmployees([...selectedEmployees, newValue]);
            }
          }}
          renderInput={(params) => (
            <TextField
              {...params}
              variant="standard"
              placeholder="Grant To Employees"
              InputProps={{
                ...params.InputProps,
                startAdornment: (
                  <InputAdornment position="start">
                    <SearchIcon sx={{ color: "#A0A0A0" }} />
                  </InputAdornment>
                )
              }}
              sx={{ mb: 2 }}
            />
          )}
          sx={{ mb: 2 }}
        />

        <Typography fontSize={14} color="#212121" sx={{ mb: 1 }}>
          Selected Employees (
          <span style={{ color: "#4160FC" }}>{selectedEmployees?.length}</span>)
        </Typography>

        <Box display="flex" flexWrap="wrap" gap={1}>
          {selectedEmployees?.map((emp) => (
            <Chip
              key={emp.customerId}
              label={emp.name}
              onDelete={() => handleDelete(emp?.customerId)}
              variant="outlined"
              sx={{
                fontSize: "12px !important",
                background: "#F7F9FC",
                color: "#4F4D55",
                border: "0.6px solid #8AA4FA",
                borderRadius: "4px",
                p: "0px !important",
              }}
            />
          ))}
        </Box>
      </DialogContent>

      <DialogActions sx={{ justifyContent: "flex-end", mt: 2 }}>
        <Button
          onClick={handleClose}
          sx={{
            borderRadius: "8px",
            bgcolor: "#fff",
            color: "#0039F4",
            fontWeight: "500",
            textTransform: "capitalize",
            padding: "4px 16px !important",
            boxShadow: "0px 1px 2px rgba(16, 24, 40, 0.05)",
          }}
        >
          Cancel
        </Button>
        <Button
          // onClick={handleSubmit}
          sx={{
            borderRadius: "8px",
            color: "#fff",
            bgcolor: "#0039F4",
            fontWeight: "500",
            boxShadow: "0px 1px 2px rgba(16, 24, 40, 0.05)",
            textTransform: "capitalize",
            padding: "4px 16px !important",
          }}
        >
          Grant
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default CoinGrantModal;
