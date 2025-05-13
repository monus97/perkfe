import DeleteIcon from "@mui/icons-material/Delete";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import gold from "../../../Assets/Organzations/Vector.png";

import Footer from "../../../Auth/pages/store/footer";

import React, { useState } from "react";
import {
  Box,
  Typography,
  Button,
  Grid,
  Paper,
  Divider,
  IconButton,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import AddressSelectModal from "./changeAddres";
import NewAddressModal from "./newAddress";
import CheckoutSummary from "./checkoutSummary";
const DeliveryPage = () => {
  const [open, setOpen] = useState(false);
  const [checkout, setCheckout] = useState(false);
  const [openAddress, setOpenAddress] = useState(false);
  const handleAddress = () => {
    setOpen(false);
    setOpenAddress(true);
  };
  const onClose = () => {
    setOpen(false);
    setOpenAddress(false);
  };

  const Checkout = () => {
    setCheckout(true);
  };
  return (
    <>
      <Box px={10} py={6}>
        <Box display={"flex"} mb={3} justifyContent={"space-between"}>
          <Typography fontSize={24} fontWeight={600}>
           Delivery
          </Typography>
          <IconButton onClick={() => window.history.back()}>
            <CloseIcon />
          </IconButton>
        </Box>
        <Divider />
        <Box px={10} py={5}>
          <Box textAlign="center" mt={2} mb={2}>
            <Box display="flex" justifyContent="center" alignItems="center">
              <Box
                width={10}
                height={10}
                borderRadius="50%"
                bgcolor="rgba(27, 211, 116, 1)"
              ></Box>
              <Box
                width={"25%"}
                height={2}
                bgcolor={checkout ? "rgba(27, 211, 116, 1)" : "grey.300"}
              ></Box>
              <Box
                width={10}
                height={10}
                borderRadius="50%" 
                bgcolor={checkout ? "rgba(27, 211, 116, 1)" : "grey.400"}
              ></Box>
            </Box>
            <Box mt={1} display="flex" justifyContent="center" alignItems="center">
              <Typography fontWeight="bold" color="rgba(0, 0, 0, 1)" fontSize={18}>Delivery</Typography>
              <Box width={"20%"} height={2}></Box>

              <Typography  fontWeight="bold" color="rgba(0, 0, 0, 1)" fontSize={18}>Review</Typography>
            </Box>
          </Box>
          {checkout ? (
            <CheckoutSummary />
          ) : (
            <Grid container spacing={3}>
              <Grid item xs={12} md={8}>
                <Paper
                  elevation={0}
                  sx={{ borderRadius: "10px", border: "1px solid #ccc", p: 3 }}
                >
                  <Typography fontSize={20} fontWeight={600} mb={2}>
                    Billing Address
                  </Typography>
                  <Typography>
                    4517 Washington Ave. Manchester, Kentucky 39495{" "}
                    <Typography
                      component="span"
                      color="primary"
                      sx={{ cursor: "pointer", fontSize: 15 }}
                      onClick={() => setOpen(true)}
                    >
                      {" "}
                      Change
                    </Typography>
                  </Typography>
                  <Typography color="rgba(0, 0, 0, 0.7)" mt={1}>
                    georgia.young@example.com
                  </Typography>
                  <Typography color="rgba(0, 0, 0, 0.7)" mb={3}>
                    (307) 555-0133
                  </Typography>

                  <Typography
                    fontWeight="bold"
                    fontSize={18}
                    color="rgba(0, 0, 0, 1)"
                    mb={2}
                  >
                    Shipping Address
                  </Typography>
                  <Typography color="rgba(0, 0, 0, 1)" fontSize={16}>
                    3517 W. Gray St. Utica, Pennsylvania 57867{" "}
                    <Typography
                      component="span"
                      color="primary"
                      sx={{ cursor: "pointer" }}
                      onClick={() => setOpen(true)}
                    >
                      {" "}
                      Change
                    </Typography>
                  </Typography>

                  <Box mt={4}>
                    <Typography
                      color="rgba(0, 0, 0, 1)"
                      fontSize={20}
                      fontWeight="bold"
                      mb={1}
                    >
                      Delivery
                    </Typography>
                    <Paper
                      variant="outlined"
                      sx={{
                        p: 2,
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                      }}
                    >
                      <Box>
                        <Typography color="rgba(0, 0, 0, 1)" fontSize={17}>
                          Free Delivery
                        </Typography>
                        <Typography
                          fontSize={14}
                          color="rgba(102, 102, 102, 1)"
                        >
                          28 JAN 2023
                        </Typography>
                      </Box>
                      <Typography fontSize={18} color="rgba(17, 171, 46, 1)">
                        FREE
                      </Typography>
                    </Paper>
                  </Box>
                </Paper>
              </Grid>

              <Grid item xs={12} md={4}>
                <Paper
                  elevation={0}
                  sx={{ p: 3, borderRadius: "10px", border: "1px solid #ccc" }}
                >
                  <Typography fontWeight="bold" mb={3}>
                    ORDER SUMMARY
                  </Typography>
                  <Box display="flex" justifyContent="space-between" mb={2}>
                    <Typography color="grey.700">7 items</Typography>
                    <Typography>2012.8</Typography>
                  </Box>
                  <Box display="flex" justifyContent="space-between" mb={2}>
                    <Typography color="grey.700">Original price</Typography>
                    <Typography>2457</Typography>
                  </Box>
                  <Box display="flex" justifyContent="space-between" mb={2}>
                    <Typography color="grey.700">TAX</Typography>
                    <Typography>85.60</Typography>
                  </Box>
                  <Box display="flex" justifyContent="space-between" mb={4.3}>
                    <Typography color="grey.700">Delivery</Typography>
                    <Typography color="green">FREE</Typography>
                  </Box>
                  <Divider
                    sx={{
                      my: 2,
                      borderStyle: "dashed",
                      borderColor: "grey.400",
                      borderWidth: "1px",
                    }}
                  />
                  <Box
                    display="flex"
                    justifyContent="space-between"
                    alignItems="center"
                    mb={3}
                  >
                    <Typography fontWeight="bold">Order total</Typography>
                    <Typography fontWeight="bold">
                      <img
                        src={gold}
                        alt="coin"
                        style={{ width: 16, marginRight: 4 }}
                      />{" "}
                      2098.4
                    </Typography>
                  </Box>
                  <Divider
                    sx={{
                      my: 2,
                      borderStyle: "dashed",
                      borderColor: "grey.400",
                      borderWidth: "1px",
                    }}
                  />
                  <Button
                    fullWidth
                    variant="contained"
                    sx={{ backgroundColor: "#174aff", mt: 3 }}
                    onClick={Checkout}
                  >
                    PLACE YOUR ORDER
                  </Button>
                </Paper>
              </Grid>
            </Grid>
          )}
        </Box>
      </Box>
      <NewAddressModal open={openAddress} onClose={onClose} />
      <AddressSelectModal
        open={open}
        handleAddress={handleAddress}
        onClose={onClose}
      />
      <Footer />
    </>
  );
};

export default DeliveryPage;
