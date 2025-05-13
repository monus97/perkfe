import React from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Typography,
  Box,
  Grid,
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
  Button,
  TextField,
  Divider,
} from "@mui/material";
import gold from "../../../Assets/Organzations/Vector.png";
import CloseIcon from "@mui/icons-material/Close";
import IconButton from "@mui/material/IconButton";

const InvoiceModal = ({ open, onClose }) => {
  return (
    <Dialog open={open} onClose={onClose} maxWidth="md" fullWidth>
      <DialogTitle sx={{ px: 3, pt: 3, pb: 1 }}>
        <Box display="flex" justifyContent="space-between" alignItems="center">
          <Typography variant="h6">
            Invoice{" "}
            <Typography
              component="span"
              fontSize={18}
              color="rgba(135, 141, 172, 1)"
            >
              #8409465976
            </Typography>
          </Typography>
          <IconButton onClick={onClose}>
            <CloseIcon />
          </IconButton>
        </Box>
      </DialogTitle>
      <Divider sx={{ borderBottomWidth: 2, borderColor: "grey.500" }} />

      <DialogContent sx={{ px: 3 }}>
        {/* Header Info */}
        <Box>
          <Typography fontWeight="bold" sx={{ color: "#1D4ED8" }}>
            PERK MASTER
          </Typography>
          <Typography variant="caption" display="block" sx={{ mb: 1 }}>
            LOGO
          </Typography>
        </Box>
        <Grid container spacing={2}>
          <Grid item xs={12} sm={4}>
            <Typography fontSize={14} color="rgba(172, 170, 170, 1)">
              Seller:
            </Typography>
            <Typography color="rgba(60, 60, 60, 1)" fontSize={16}>
              Perk Master
            </Typography>
            <Typography color="rgba(60, 60, 60, 1)" fontSize={16}>
              6391 Elgin St. Celina, Delaware 10299
            </Typography>
            <Typography color="rgba(60, 60, 60, 1)" fontSize={16}>
              9876543210 , 9999999999
            </Typography>
            <Typography color="rgba(60, 60, 60, 1)" fontSize={16}>
              www.smartshopping.io
            </Typography>
          </Grid>
          <Grid item xs={12} sm={4}>
            <Box>
              <Typography fontSize={14} color="rgba(172, 170, 170, 1)">
                GSTIN:
              </Typography>
              <Typography color="rgba(60, 60, 60, 1)" fontSize={16} mb={1}>
                F56D777 CD76788
              </Typography>

              <Typography mt={1} fontSize={14} color="rgba(172, 170, 170, 1)">
                PAN No:
              </Typography>
              <Typography color="rgba(60, 60, 60, 1)" fontSize={16} mb={1}>
                AFDSS88888C
              </Typography>
            </Box>
          </Grid>
          <Grid item xs={12} sm={4}>
            <Box>
              <Typography fontSize={14} color="rgba(172, 170, 170, 1)">
                Issued On
              </Typography>
              <Typography color="rgba(60, 60, 60, 1)" fontSize={16} mb={1}>
                Thursday Oct 12
              </Typography>

              <Typography mt={1} fontSize={14} color="rgba(172, 170, 170, 1)">
                Due On
              </Typography>
              <Typography color="rgba(60, 60, 60, 1)" fontSize={16}>
                Tuesday Oct 24
              </Typography>
            </Box>
          </Grid>
        </Grid>

        <Divider
          sx={{ my: 2, borderBottomWidth: 2, borderColor: "grey.500" }}
        />

        {/* Bill To & Ship To */}
        <Grid container spacing={2}>
          <Grid item xs={12} sm={6}>
            <Typography fontSize={14} color="rgba(172, 170, 170, 1)">
              Bill To
            </Typography>
            <Typography color="rgba(60, 60, 60, 1)" fontSize={14}>
              Rajesh Kumar
            </Typography>
            <Typography color="rgba(60, 60, 60, 1)" fontSize={14}>
              4517 Washington Ave. Manchester, Kentucky 39495
            </Typography>
            <Typography color="rgba(60, 60, 60, 1)" fontSize={14}>
              9876543210 , 9999999999
            </Typography>
            <Typography color="rgba(60, 60, 60, 1)" fontSize={14}>
              rajesh@gmail.com
            </Typography>
          </Grid>
          <Grid item xs={12} sm={6}>
            <Typography fontSize={14} color="rgba(172, 170, 170, 1)">
              Ship To
            </Typography>
            <Typography color="rgba(60, 60, 60, 1)" fontSize={14}>
              Rajesh Kumar
            </Typography>
            <Typography color="rgba(60, 60, 60, 1)" fontSize={14}>
              4517 Washington Ave. Manchester, Kentucky 39495
            </Typography>
            <Typography color="rgba(60, 60, 60, 1)" fontSize={14}>
              9876543210 , 9999999999
            </Typography>
            <Typography color="rgba(60, 60, 60, 1)" fontSize={14}>
              r ajesh@gmail.com
            </Typography>
          </Grid>
        </Grid>

        {/* Invoice Items */}
        <Typography
          variant="subtitle1"
          color="rgba(0, 0, 0, 1)"
          mt={4}
          mb={1.5}
        >
          Invoice Items
        </Typography>
        <Table sx={{ border: "1px solid #E0E0E0" }}>
          <TableHead sx={{ bgcolor: "#F9FAFB" }}>
            <TableRow>
              <TableCell>Description</TableCell>
              <TableCell>Price</TableCell>
              <TableCell>Qty</TableCell>
              <TableCell>Total Price</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {[1, 2].map((item, index) => (
              <TableRow key={index}>
                <TableCell fontSize={12} color="rgba(0, 0, 0, 1)">
                  Spigen Ultra Hybrid Cover Case
                </TableCell>
                <TableCell>
                  <Box display="flex" gap={1} alignItems="center">
                    <img src={gold} width={12} height={12} />
                    220.60
                  </Box>
                </TableCell>
                <TableCell>2</TableCell>
                <TableCell>
                  <Box display="flex" gap={1} alignItems="center">
                    <img src={gold} width={12} height={12} />
                    441.2
                  </Box>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>

        {/* Notes & Total */}
        <Grid container spacing={2} mt={2}>
          <Grid item xs={12} sm={8}>
            <TextField
              fullWidth
              multiline
              rows={3}
              placeholder="Here we can write additional notes for the customer to get a better understanding of this invoice."
              variant="outlined"
              InputProps={{ sx: { fontSize: 12, fontStyle: "italic" } }}
            />
          </Grid>
          <Grid item xs={12} sm={4} textAlign="right">
            <Typography variant="subtitle1" fontWeight="600">
              Total Amount
            </Typography>
            <Box
              display="flex"
              alignItems="center"
              justifyContent="flex-end"
              mt={0.5}
            >
              <img src={gold} width={12} height={12} />
              <Typography fontWeight="bold">882.4</Typography>
            </Box>
          </Grid>
        </Grid>

        {/* Signature */}
        <Box
          mt={4}
          display="flex"
          justifyContent="flex-end"
          alignItems="center"
          flexDirection="column"
        >
          <Box
            component="img"
            src="/signature.png"
            alt="signature"
            sx={{ height: 40, mb: 1 }}
          />
          <Typography variant="body2" fontWeight="600">
            Authorized Signatory
          </Typography>
          <Typography variant="body2">Karthik Stores</Typography>
        </Box>
      </DialogContent>

      {/* Action Buttons */}
      <DialogActions sx={{ p: 3 }}>
        <Button onClick={onClose} variant="outlined">
          Cancel
        </Button>
        <Button variant="contained" sx={{ bgcolor: "#1D4ED8" }}>
          Print
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default InvoiceModal;
