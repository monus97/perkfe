import React, { useState } from "react";
import {
  Box,
  Typography,
  Grid,
  Button,
  Paper,
  Divider,
  IconButton,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import Footer from "../../../Auth/pages/store/footer";
import gold from "../../../Assets/Organzations/Vector.png";
import imgs from "../../../Assets/Rectangle3426.png";
import AddressSelectModal from "../cartUi/changeAddres";
import NewAddressModal from "../cartUi/newAddress";
import InvoiceModal from "./inVoices";
import CancelOrderDialog from "./cancelOrder";
import { useNavigate } from "react-router-dom";
const InfoRow = ({ label, value, bold = false }) => (
  <Box mb={1.5}>
    <Typography variant="body2" fontWeight="500" sx={{ color: "text.primary" }}>
      {label}
    </Typography>
    <Typography variant="body2" sx={{ color: "text.secondary" }}>
      {value}
    </Typography>
  </Box>
);

const OrderDetailPage = () => {
    const navigate = useNavigate();
      const [openAddress, setOpenAddress] = useState(false);
      const [openInvoice, setOpenInvoice] = useState(false);
      const [open,setOpen] = useState(false);
      const [cancel,setCancel] = useState(false);
      const handleAddress = () => {
          setOpenAddress(false);
        setOpen(true);
      };

      const openAdd = () => {
        setOpenAddress(true);  
      }
      const onClose = () => {
        setOpen(false);
        setCancel(false);
        setOpenAddress(false);
        setOpenInvoice(false);
      };
      const openInvoiceModal = () => {
        setOpenInvoice(true)
      }
      const openCancelModal = () => {
        setCancel(true)
      }
      const onConfirm = () => {
  
      }
      const onTracking = () => {
  navigate("/user/orders-details/tracking")
      }
  return (
    <>
      <Box px={8} py={6}>
        <Box display={"flex"} justifyContent={"space-between"}>
          <Typography fontSize={24} fontWeight={600}>
            Delivery
          </Typography>
          <IconButton onClick={() => window.history.back()}>
            <CloseIcon />
          </IconButton>
        </Box>
      </Box>
      <Box sx={{ bgcolor: "#f7f7f8", p: 8 }}>
        <Grid container spacing={3}>
          <Grid item xs={12} md={5}>
            <Paper sx={{ p: 3, borderRadius: 2 }} elevation={0}>
              <Box display="flex" justifyContent="space-between">
                <Typography fontSize={20}>
                  Order{" "}
                  <Typography component="span" color="rgba(135, 141, 172, 1)">
                    #456789876
                  </Typography>
                </Typography>
                <Typography color="rgba(102, 102, 102, 1)" fontSize={16}>
                  Order Date:-{" "}
                  <b style={{ color: "rgba(0, 0, 0, 1)" }}>Oct 5, 2023</b>
                </Typography>
              </Box>

              <Box mt={3}>
                <Grid container xs={12} md={12} spacing={2}>
                  <Grid item xs={6} md={6}>
                    {" "}
                    <Typography
                      fontSize={14}
                      fontWeight={600}
                      color="rgba(0, 0, 0, 1)"
                      display={"flex"}
                      gap={"5px"}
                    >
                      Shipping Address{" "}
                      <Typography onClick={openAdd} color="primary" sx={{ cursor: "pointer" }}>
                        Change
                      </Typography>
                    </Typography>
                    <Typography
                      fontSize={14}
                      color="rgba(0, 0, 0, 0.7)"
                      fontWeight={400}
                    >
                      4517 Washington Ave.\nManchester, Kentucky\n39495
                    </Typography>
                  </Grid>
                  <Grid item xs={6} md={6}>
                    {" "}
                    <Typography
                      fontSize={14}
                      fontWeight={600}
                      color="rgba(0, 0, 0, 1)"
                    >
                      Billing Address{" "}
                    </Typography>
                    <Typography
                      fontSize={14}
                      color="rgba(0, 0, 0, 0.7)"
                      fontWeight={400}
                    >
                      4517 Washington Ave.\nManchester, Kentucky\n39495
                    </Typography>
                  </Grid>
                </Grid>
                <Grid mt={1} container xs={12} md={12} spacing={2}>
                  <Grid item xs={6} md={7}>
                    {" "}
                    <Typography
                      fontSize={14}
                      fontWeight={600}
                      color="rgba(0, 0, 0, 1)"
                    >
                      Email & Ph No
                    </Typography>
                    <Typography
                      fontSize={14}
                      color="rgba(0, 0, 0, 0.7)"
                      fontWeight={400}
                    >
                      georgia.young@example.com\n(307) 555-0133
                    </Typography>
                  </Grid>
                  <Grid item xs={6} md={5}>
                    {" "}
                    <Typography
                      fontSize={14}
                      fontWeight={600}
                      color="rgba(0, 0, 0, 1)"
                    >
                      Expected Delivery{" "}
                    </Typography>
                    <Typography
                      fontSize={14}
                      color="rgba(0, 0, 0, 0.7)"
                      fontWeight={400}
                    >
                      Thursday Oct 12
                    </Typography>
                  </Grid>
                </Grid>
                <Grid mt={1} container xs={12} md={12} spacing={2}>
                  <Grid item xs={6} md={6}>
                    {" "}
                    <Typography
                      fontSize={14}
                      fontWeight={600}
                      color="rgba(0, 0, 0, 1)"
                    >
                      Payment Method
                    </Typography>
                    <Typography
                      fontSize={14}
                      color="rgba(0, 0, 0, 0.7)"
                      fontWeight={400}
                    >
                      Reward Coins
                    </Typography>
                  </Grid>
                  <Grid item xs={6} md={6}>
                    {" "}
                    <Typography
                      fontSize={14}
                      fontWeight={600}
                      color="rgba(0, 0, 0, 1)"
                    >
                      Shipping Method{" "}
                    </Typography>
                    <Typography
                      fontSize={14}
                      color="rgba(0, 0, 0, 0.7)"
                      fontWeight={400}
                    >
                      Standard delivery
                    </Typography>
                  </Grid>
                </Grid>
              </Box>

              <Box
                display={"flex"}
                gap={2}
                alignItems={"center"}
                justifyContent={"center∂"}
                mt={2}
              >
                <Typography
                  color="rgba(0, 0, 0, 1)"
                  fontSize={20}
                  fontWeight="500"
                >
                  Order total
                </Typography>
                <Box display="flex" gap={1} alignItems="center" mt={0.5}>
                  <img src={gold} width={21} height={21} />
                  <Typography
                    fontSize={22}
                    color="rgba(0, 0, 0, 1)"
                    fontWeight="400"
                  >
                    555.50
                  </Typography>
                </Box>
              </Box>
            </Paper>
          </Grid>
          <Grid item xs={12} md={4}>
            <Paper sx={{ p: 3, borderRadius: 2 }} elevation={0}>
              <Typography fontWeight="700" fontSize={20} mb={2}>
                ORDER RECAP
              </Typography>

              {[1, 2].map((item, index) => (
                <Box display="flex" alignItems="center" mb={2} key={index}>
                  <Box
                    component="img"
                    src={imgs}
                    alt="product"
                    sx={{ width: 64, height: 64, mr: 2, borderRadius: 1 }}
                  />
                  <Box>
                    <Typography
                      fontSize={18}
                      color="rgba(0, 0, 0, 1)"
                      fontWeight="500"
                    >
                      Spigen Ultra Hybrid Cover Case
                    </Typography>
                    <Box mt={1} display="flex" alignItems="center" gap={1}>
                      <img src={gold} width={20} height={20} />{" "}
                      <Typography fontSize={20} color="rgba(102, 102, 102, 1)">
                        555.50
                      </Typography>
                      <Typography color="text.secondary">2(items)</Typography>
                    </Box>
                  </Box>
                </Box>
              ))}

              <Divider sx={{ my: 2 }} />

              <Box display="flex" justifyContent="space-between" mb={1}>
                <Typography fontSize={18} color="rgba(102, 102, 102, 1)">
                  Subtotal
                </Typography>
                <Typography fontSize={18} color="rgba(0, 0, 0, 1)">
                  205.60
                </Typography>
              </Box>
              <Box display="flex" justifyContent="space-between" mb={1}>
                <Typography fontSize={18} color="rgba(102, 102, 102, 1)">
                  Delivery
                </Typography>
                <Typography sx={{ color: "rgba(17, 171, 46, 1)" }}>
                  FREE
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

              <Box display="flex" justifyContent="space-between" mt={2}>
                <Typography
                  fontSize={20}
                  color="rgba(0, 0, 0, 1)"
                  fontWeight="700"
                >
                  Order total
                </Typography>
                <Box gap={1} display="flex" alignItems="center">
                  <img src={gold} width={20} height={20} />
                  <Typography fontWeight="600" fontSize={20}>
                    555.50
                  </Typography>
                </Box>
              </Box>
            </Paper>
          </Grid>
          <Grid item xs={12} md={3}>
            <Box>
              <Typography
                fontWeight="600"
                fontSize={20}
                color="rgba(0, 0, 0, 1)"
                mb={2}
              >
                More Actions
              </Typography>
              <Button
                variant="contained"
                fullWidth
                sx={{
                  mb: 1,
                  bgcolor: "rgba(0, 57, 244, 1)",
                  textTransform: "capitalize",
                  borderRadius: "12px",
                  fontSize:18,
                  fontWeight:600,
                  color:"rgba(255, 255, 255, 1)"
                }}
                onClick={onTracking}
              >
                Track Order
              </Button>
              <Button
                sx={{
                  mb: 1,
                  textTransform: "capitalize",
                  borderRadius: "12px",
                  border: "1.5px solid rgba(75, 75, 75, 0.2)",
                  fontSize:18,
                  fontWeight:600,
                  color:"rgba(0, 0, 0, 1)"
                }}
                variant="outlined"
                fullWidth
                onClick={openCancelModal}
              >
                Cancel order
              </Button>
              <Button
                variant="outlined"
                fullWidth
                sx={{
                  mb: 1,
                  textTransform: "capitalize",
                  borderRadius: "12px",
                  border: "1.5px solid rgba(75, 75, 75, 0.2)",
                  fontSize:18,
                  fontWeight:600,
                  color:"rgba(0, 0, 0, 1)"
                }}
               
              >
                Go to My Orders
              </Button>
              <Button
                variant="outlined"
                sx={{
                  mb: 1,
                  textTransform: "capitalize",
                  borderRadius: "12px",
                  border: "1.5px solid rgba(75, 75, 75, 0.2)",
                  fontSize:18,
                  fontWeight:600,
                  color:"rgba(0, 0, 0, 1)"
                }}
                fullWidth
                onClick={openInvoiceModal}
              >
                Print Invoice
              </Button>
            </Box>
          </Grid>
        </Grid>
      </Box>
      <AddressSelectModal
        open={openAddress}
        handleAddress={handleAddress}
        onClose={onClose}
      />
      <NewAddressModal open={open} onClose={onClose} />
      <InvoiceModal open={openInvoice} onClose={onClose} />
      <CancelOrderDialog open={cancel} onConfirm={onConfirm} onClose={onClose} />
      <Footer />
    </>
  );
};

export default OrderDetailPage;
