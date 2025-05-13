import React from "react";
import {
  Box,
  Typography,
  Grid,
  Card,
  CardContent,
  Button,
  Divider,
  IconButton,
  Avatar,
  Stack,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import StoreTopbar from "../../../Auth/pages/store/topBar";
import StoreHeader from "../../../Auth/pages/store/storeHeader";
import gold from "../../../Assets/Organzations/Vector.png";
import first from "../../../Assets/Organzations/21488707952.png";
import second from "../../../Assets/Organzations/214887.png";
import third from "../../../Assets/Organzations/2148870.png";
import fourth from "../../../Assets/Organzations/214887079.png";
import Footer from "../../../Auth/pages/store/footer";
import { useNavigate } from "react-router-dom";
import emptycart from "../../../Assets/emptycart.png";
import { Link } from "react-router-dom";
const cartItems = [
  {
    id: 1,
    name: "Marbella Popline Dress",
    price: 688.9,
    qty: 2,
    image: second,
  },
  {
    id: 2,
    name: "Marbella Popline Dress",
    price: 60,
    qty: 3,
    image: first,
  },
  {
    id: 3,
    name: "Marbella Popline Dress",
    price: 110,
    qty: 1,
    image: third,
  },
  {
    id: 4,
    name: "Marbella Popline Dress",
    price: 345,
    qty: 1,
    image: fourth,
  },
];

const recommendations = cartItems.slice(0, 4);

const CartPage = () => {
  const navigate = useNavigate();
  const totalPrice = cartItems.reduce(
    (sum, item) => sum + item.price * item.qty,
    0
  );
  const handleDelivery = () => {
    navigate(`/user/cart/delivery`);
  };
  return (
    <Box>
      <Box
        sx={{
          position: "sticky",
          top: 0,
          zIndex: 1100,
          backgroundColor: "#fff",
          boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.1)",
        }}
      >
        <StoreTopbar />
        <StoreHeader />
      </Box>
      {cartItems.length > 0 ? (
        <Box display={"flex"} mb={5} justifyContent={"center"}>
          {" "}
          <Box display={"flex"} flexDirection={"column"} alignItems={"center"}>
          <img src={emptycart} width={400} alt="" />
          <Typography fontSize={28} fontWeight={600}>Your cart is empty!</Typography>
          <Link to="/store/details" color="rgba(0, 57, 244, 1)">Continue Shopping</Link>
        </Box>
        </Box>
      ) : (
        <Box px={10} py={5}>
          <Typography fontSize={28} fontWeight="700">
            My Cart
          </Typography>
          <Typography fontSize={18} fontWeight={400} mt={1}>
            TOTAL:- ({cartItems.length} items){" "}
            <img width={25} height={25} src={gold} />{" "}
            <span style={{ fontWeight: "600" }}>{totalPrice.toFixed(1)}</span>
          </Typography>

          <Grid container spacing={4} mt={2}>
            {/* Cart List */}
            <Grid item xs={12} md={8}>
              <Box p={2}>
                <Grid bgcolor={"#FCFCFC"} container spacing={2}>
                  <Grid item xs={6}>
                    <Typography color="#575E78" fontSize={20} fontWeight="bold">
                      PRODUCT
                    </Typography>
                  </Grid>
                  <Grid item xs={2}>
                    <Typography color="#575E78" fontSize={20} fontWeight="bold">
                      QTY
                    </Typography>
                  </Grid>
                  <Grid item xs={3}>
                    <Typography color="#575E78" fontSize={20} fontWeight="bold">
                      TOTAL
                    </Typography>
                  </Grid>
                  <Grid item xs={3} />
                </Grid>
                {cartItems?.map((item) => (
                  <Grid
                    container
                    alignItems="center"
                    key={item.id}
                    spacing={2}
                    my={1}
                    bgcolor={"#FCFCFC"}
                  >
                    <Grid item xs={6} md={6}>
                      <Stack direction="row" spacing={2}>
                        <Avatar
                          variant="square"
                          src={item.image}
                          sx={{ width: 60, height: 60 }}
                        />
                        <Box>
                          <Typography fontSize={18} fontWeight={500}>
                            {item.name}
                          </Typography>
                          <Typography color="#666666" fontSize={20}>
                            <img width={23} height={23} src={gold} />{" "}
                            {item.price}
                          </Typography>
                        </Box>
                      </Stack>
                    </Grid>
                    <Grid item xs={2}>
                      <Typography>
                        <span
                          style={{
                            cursor: "pointer",
                            backgroundColor: "#0039F4",
                            width: "20px",
                            height: "20px",
                            borderRadius: "3px",
                            color: "#fff",
                            padding: "0px 6px",
                          }}
                        >
                          -
                        </span>{" "}
                        {item.qty}{" "}
                        <span
                          style={{
                            cursor: "pointer",
                            backgroundColor: "#0039F4",
                            width: "20px",
                            height: "20px",
                            borderRadius: "3px",
                            color: "#fff",
                            padding: "0px 4.4px",
                          }}
                        >
                          +
                        </span>
                      </Typography>
                    </Grid>
                    <Grid item xs={3}>
                      <Typography fontSize={20} fontWeight={500}>
                        <img width={23} height={23} src={gold} />{" "}
                        {(item.price * item.qty).toFixed(1)}
                      </Typography>
                    </Grid>
                    <Grid item xs={1}>
                      <IconButton color="error">
                        <DeleteIcon />
                      </IconButton>
                    </Grid>
                  </Grid>
                ))}
              </Box>
            </Grid>
            <Grid item xs={12} md={4}>
              <Card variant="outlined">
                <Box p={2}>
                  <Typography fontSize={20} fontWeight={700}>
                    ORDER SUMMARY
                  </Typography>
                  <Box display={"flex"} justifyContent={"space-between"} mt={2}>
                    <Typography color="#666666" fontSize={18} fontWeight={400}>
                      7 items
                    </Typography>
                    <Typography>2012.8</Typography>
                  </Box>
                  <Box mt={1}>
                    <Box display={"flex"} justifyContent={"space-between"}>
                      <Typography
                        color="#666666"
                        fontSize={18}
                        fontWeight={400}
                      >
                        Original price:{" "}
                      </Typography>
                      <Typography>2457</Typography>
                    </Box>
                    <Box mt={1}>
                      <Box display={"flex"} justifyContent={"space-between"}>
                        <Typography
                          color="#666666"
                          fontSize={18}
                          fontWeight={400}
                        >
                          TAX:{" "}
                        </Typography>
                        <Typography> 85.6</Typography>
                      </Box>
                    </Box>
                    <Box display={"flex"} justifyContent={"space-between"}>
                      <Typography
                        color="#666666"
                        fontSize={18}
                        fontWeight={400}
                      >
                        Delivery:{" "}
                      </Typography>
                      <Typography>
                        <span style={{ color: "green" }}>FREE</span>
                      </Typography>
                    </Box>
                  </Box>
                  <Divider
                    sx={{
                      my: 2,
                      borderStyle: "dashed",
                      borderColor: "grey.400",
                      borderWidth: "1px",
                    }}
                  />
                  <Box display={"flex"} justifyContent={"space-between"}>
                    <Typography color="#666666" fontSize={20} fontWeight={700}>
                      Order total:{" "}
                    </Typography>
                    <Typography fontSize={22} fontWeight={700}>
                      {" "}
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
                    onClick={handleDelivery}
                    fullWidth
                    sx={{ mt: 2, bgcolor: "#0039F4", color: "#fff" }}
                  >
                    CHECKOUT
                  </Button>
                </Box>
              </Card>
            </Grid>
          </Grid>

          {/* Top Picks */}
          <Box mt={6}>
            <Typography variant="h6" fontWeight="bold">
              Top Picks For You
            </Typography>
            <Grid container spacing={2} mt={2}>
              {recommendations?.map((product) => (
                <Grid item xs={12} sm={6} md={3} key={product.id}>
                  <Box
                    // onClick={() => handleNavigat(product?.name)}
                    sx={{
                      backgroundImage: `url(${product.image})`,
                      backgroundSize: "cover",
                      backgroundPosition: "center",
                      height: 400,
                      display: "flex",
                      flexDirection: "column",
                      justifyContent: "flex-end",
                      color: "#fff",
                      overflow: "hidden",
                      position: "relative",
                    }}
                  >
                    <Box
                      sx={{
                        background:
                          "linear-gradient(to top, rgba(0,0,0,0.7), rgba(0,0,0,0))",
                        p: 2,
                      }}
                    >
                      <Typography fontSize={25} fontWeight={300}>
                        {product.name}
                      </Typography>
                      <Box
                        display="flex"
                        justifyContent="space-between"
                        alignItems="center"
                      >
                        <Typography
                          fontWeight={400}
                          fontSize={30}
                          fontStyle={"italic"}
                          sx={{ display: "flex", alignItems: "center" }}
                        >
                          <span
                            style={{
                              color: "#FFFFFF",
                              marginRight: 4,
                            }}
                          >
                            <img src={gold} width={25} height={25} />
                          </span>
                          {product.price}
                        </Typography>
                      </Box>
                      <Button
                        variant="contained"
                        color="primary"
                        fullWidth
                        startIcon={<ShoppingCartIcon />}
                        sx={{
                          background:
                            "linear-gradient(90deg, #0039F4, #1a40d6)",
                          borderRadius: 2,
                          textTransform: "none",
                          mt: 2,
                          py: 2,
                          "&:hover": {
                            background:
                              "linear-gradient(90deg,rgb(4, 55, 221),rgb(57, 85, 201))",
                            transition: "all 0.3s ease-in-out",
                          },
                        }}
                      >
                        Add to Cart
                      </Button>
                    </Box>
                  </Box>
                </Grid>
              ))}
            </Grid>
          </Box>
        </Box>
      )}
      <Footer />
    </Box>
  );
};

export default CartPage;
