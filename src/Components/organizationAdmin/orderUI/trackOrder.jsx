import {
  Box,
  Typography,
  Grid,
  Card,
  Button,
  Divider,
  Avatar,
  IconButton,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import Footer from "../../../Auth/pages/store/footer";
import imgs from "../../../Assets/Rectangle3426.png";
import gold from "../../../Assets/Organzations/Vector.png";
const OrderTracking = () => {
  const timeline = [
    {
      date: "OCT 20",
      time: "10:42 PM",
      status: "Created",
      detail: "Order confirmed at Zabooz Mart\nKOLLAM, KERALA IN",
      active: true,
    },
    { date: "OCT 20", time: "10:50 PM", status: "Accepted", active: true },
    { date: "OCT 21", time: "07:00 AM", status: "Shipped", active: true },
    {
      date: "OCT 24",
      time: "09:00 AM",
      status: "Out for delivery",
      detail: "Your Order will be delivered today",
      active: false,
    },
    { date: "OCT 24", time: "11:07 AM", status: "Delivered", active: false },
  ];

  return (
    <>
      <Box px={8} py={6}>
        <Box display={"flex"} justifyContent={"space-between"}>
          <Typography fontSize={24} fontWeight={600}>
            Track Details
          </Typography>
          <IconButton onClick={() => window.history.back()}>
            <CloseIcon />
          </IconButton>
        </Box>
      </Box>
      <Box px={8} py={6} bgcolor="#f5f5f5">
        <Typography fontSize={28} fontWeight={700} mb={3}>
          Order ID <span style={{ color: "#000" }}>#456789876</span>
        </Typography>

        <Grid container spacing={2}>
          {/* Timeline */}
          <Grid item xs={12} md={4}>
            <Box
              borderRadius="16px"
              border="1px solid rgba(0, 0, 0, 0.2)"
              p={3}
              sx={{ backgroundColor: "#fff" }}
            >
              <Typography fontWeight={700} fontSize="18px" mb={3}>
                Timeline
              </Typography>
              <Box position="relative" pl={5}>
                {/* <Box
                  position="absolute"
                  top={16}
                  bottom={16}
                  left={18}
                  borderLeft="2px dashed #CFCFCF"
                  zIndex={0}
                /> */}
                {timeline.map((item, idx) => (
                  <Box
                    key={idx}
                    display="flex"
                    alignItems="flex-start"
                    mb={4}
                    position="relative"
                  >
                    <Box
                      position="absolute"
                      left={8}
                      top={6}
                      width={16}
                      height={16}
                      borderRadius="50%"
                      border="2px solid #4CAF50"
                      bgcolor="#fff"
                      zIndex={1}
                      display="flex"
                      alignItems="center"
                      justifyContent="center"
                    >
                      <Box
                        width={8}
                        height={8}
                        borderRadius="50%"
                        bgcolor={item.active ? "#4CAF50" : "#fff"}
                      />
                    </Box>
                    <Box flex={1} minWidth="70px" ml={4} pt="1px">
                      <Typography
                        fontSize="12px"
                        color="rgba(143, 143, 143, 1)"
                      >
                        {item.date}
                      </Typography>
                      <Box>
                        <Typography
                          fontWeight={400}
                          fontSize={14}
                          color="rgba(0, 0, 0, 1)"
                        >
                          {item.status}
                        </Typography>
                        {item.detail && (
                          <Typography
                            fontSize="10px"
                            color="rgba(0, 0, 0, 1)"
                            whiteSpace="pre-line"
                            fontWeight={400}
                            mt={0.5}
                          >
                            {item.detail}
                          </Typography>
                        )}
                      </Box>
                    </Box>
                    <Box minWidth="80px" textAlign="right" pt="1px">
                      <Typography fontSize="13px" color="text.secondary">
                        {item.time}
                      </Typography>
                    </Box>
                  </Box>
                ))}
              </Box>
            </Box>
          </Grid>
          <Grid item xs={12} md={4.5}>
            <Box
              borderRadius={"16px"}
              border={"1px solid rgba(0, 0, 0, 0.2)"}
              sx={{ p: 2 }}
              bgcolor={"rgba(255, 255, 255, 1)"}
            >
              <Typography
                color="rgba(0, 0, 0, 1)"
                fontSize={16}
                fontWeight={600}
              >
                Products in shipment
              </Typography>
              {[1, 2].map((_, i) => (
                <Box key={i} display="flex" alignItems="center" py={1}>
                  <Avatar
                    variant="square"
                    src={imgs}
                    alt="Product"
                    sx={{ width: 64, height: 64, mr: 2 }}
                  />
                  <Box>
                    <Typography
                      fontSize={20}
                      color="rgba(0, 0, 0, 1)"
                      fontWeight={500}
                    >
                      Spigen Ultra Hybrid Cover Case
                    </Typography>
                    <Typography
                      display={"flex"}
                      alignItems={"center"}
                      mt={1}
                      gap={1}
                      fontWeight={600}
                      color="rgba(102, 102, 102, 1)"
                    >
                      <img src={gold} width={20} height={20} /> 555.50{" "}
                      <Typography fontSize="12px">(2 items)</Typography>
                    </Typography>
                  </Box>
                </Box>
              ))}
            </Box>
          </Grid>

          {/* Order Actions & Shipping Info */}
          <Grid item xs={12} md={3.5}>
            <Box display="flex" flexDirection="column" gap={2}>
              <Button
                variant="contained"
                sx={{
                  bgcolor: "rgba(0, 57, 244, 1)",
                  borderRadius: "12px",
                  textTransform: "capitalize",
                }}
              >
                Order Details
              </Button>
              <Button
                variant="outlined"
                sx={{
                  borderRadius: "12px",
                  textTransform: "capitalize",
                  border: "1.5px solid rgba(75, 75, 75, 0.2)",
                  bgcolor: "#fff",
                  color:"#000"
                }}
                
              >
                Share Order
              </Button>
              <Button
                variant="outlined"
                sx={{
                  borderRadius: "12px",
                  textTransform: "capitalize",
                  border: "1.5px solid rgba(75, 75, 75, 0.2)",
                  bgcolor: "#fff",
                  color:"#000"
                }}
              >
                Cancel Order
              </Button>

              <Box display={"flex"} justifyContent={"space-between"} sx={{ p: 2, mt: 2 }}>
                <Box>
                  <Typography fontWeight={600}>Shipping Address</Typography>
                  <Typography fontSize="14px">
                    4517 Washington Ave.
                    <br />
                    Manchester, Kentucky 39495
                  </Typography>
                </Box>
                <Box>
                  <Typography fontWeight={600}>Email & Ph No</Typography>
                  <Typography fontSize="14px">
                    georgia@example.com
                    <br />
                    (307) 555-0133
                  </Typography>
                </Box>
              </Box>
            </Box>
          </Grid>
        </Grid>
      </Box>
      <Footer />
    </>
  );
};

export default OrderTracking;
