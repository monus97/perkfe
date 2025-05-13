import React, { useState } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  RadioGroup,
  FormControlLabel,
  Radio,
  Button,
  Box,
  Typography,
  IconButton,
  Chip,
  Link,
  Stack,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";

const addresses = [
  {
    id: 1,
    text: "4517 Washington Ave. Manchester, Kentucky 39495",
    type: "HOME",
  },
  {
    id: 2,
    text: "2118 Thornridge Cir. Syracuse, Connecticut 35624",
    type: "WORK",
  },
  {
    id: 3,
    text: "2118 Thornridge Cir. Syracuse, Connecticut 35624",
    type: "WORK",
  },
];

const AddressSelectModal = ({ handleAddress, open, onClose }) => {
  const [selected, setSelected] = useState(1);

  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth="sm">
      <Box p={2} position="relative">
        <DialogTitle sx={{ fontSize: 28, fontWeight: "bold" }}>
          Select Address
        </DialogTitle>
        <IconButton
          onClick={onClose}
          sx={{ position: "absolute", top: 16, right: 16 }}
        >
          <CloseIcon />
        </IconButton>
        <DialogContent>
          <RadioGroup
            value={selected}
            onChange={(e) => setSelected(Number(e.target.value))}
          >
            {addresses.map((addr) => (
              <Box
                key={addr.id}
                display="flex"
                alignItems="center"
                justifyContent="space-between"
                mb={1}
              >
                <FormControlLabel
                  value={addr.id}
                  control={<Radio />}
                  label={
                    <Typography
                      sx={{
                        fontWeight: selected === addr.id ? "bold" : "normal",
                        color: selected === addr.id ? "black" : "gray",
                      }}
                    >
                      {addr.text}
                    </Typography>
                  }
                />
                <Chip label={addr.type} variant="outlined" />
              </Box>
            ))}
          </RadioGroup>

          <Stack direction="row" spacing={2} mt={2}>
            <Box
              onClick={handleAddress}
              underline="hover"
              fontWeight="bold"
              color="#0045FF"
            >
              Add address
            </Box>
            <Box runderline="hover" fontWeight="bold" color="#0045FF">
              Edit address
            </Box>
          </Stack>
        </DialogContent>

        <DialogActions sx={{ mt: 2, pb: 2 }}>
          <Button
            variant="outlined"
            sx={{
              textTransform: "none",
              px: 4,
              py: 1,
              borderRadius: 2,
              backgroundColor: "#F4F4F4",
            }}
            onClick={onClose}
          >
            Cancel
          </Button>
          <Button
            variant="contained"
            onClick={() => {
              // Handle confirm logic
              onClose();
            }}
            sx={{
              textTransform: "none",
              px: 4,
              py: 1,
              backgroundColor: "#113DFF",
              color: "#fff",
              borderRadius: 2,
            }}
          >
            Confirm
          </Button>
        </DialogActions>
      </Box>
    </Dialog>
  );
};

export default AddressSelectModal;
