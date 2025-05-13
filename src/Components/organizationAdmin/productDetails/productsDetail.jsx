import React, { useEffect } from "react";
import {
  Box,
  Grid,
  Typography,
  Button,
  IconButton,
  Rating,
  TextField,
  Card,
  Avatar,
  Divider,
  ToggleButton,
  ToggleButtonGroup,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import CloseIcon from "@mui/icons-material/Close";
import RemoveIcon from "@mui/icons-material/Remove";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import gold from "../../../Assets/Organzations/Vector.png";
import first from "../../../Assets/Organzations/21488707952.png";
import MainContent from "../../../Auth/pages/store/mainContent";
import LikeMore from "./likeMore";
import Footer from "../../../Auth/pages/store/footer";
import { useLocation } from "react-router-dom";
import authInstance from "../../../authInstance";
const ProductDetailsPage = () => {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const productId = queryParams.get("id");
  const [size, setSize] = React.useState("");
  const [color, setColor] = React.useState("");
  const [quantity, setQuantity] = React.useState(1);
  const [rating, setRating] = React.useState(0);
  const [products, setProducts] = React.useState([]);
  const [sizes,setSizes] = React.useState([]);
  const [colors,setColors] = React.useState([]);
  const fetchAllProductsById = async () => {
    try {
      const response = await authInstance.get(
        `/superAdmin/products/${productId}`
      );
      if (response?.status == 200) {
        setProducts(response?.data);
        setSizes(response?.data?.attributes?.size);
        setColors(response?.data?.attributes?.color)
      }
    } catch (error) {
      console.error(error);
    }
  };
  console.log(products, "products");

  useEffect(() => {
    fetchAllProductsById();
  }, [])
  return (
    <>
      <Box p={10}>
        <Box display={"flex"} mb={4} justifyContent={"space-between"}>
          <Typography fontSize={24} fontWeight={600}>
            Product Details
          </Typography>
          <IconButton onClick={() => window.history.back()}>
            <CloseIcon />
          </IconButton>
        </Box>
        <Divider />
        <Grid mt={1} container spacing={4}>
          {/* Left Images */}
          <Grid item xs={12} md={6}>
            <Box sx={{ width: "100%", mb: 2 }}>
              <img
                src={ products?.images?.length > 0 ? products?.images[0] : first}
                alt="Product"
                style={{ width: "100%",height: "500px", borderRadius: 8 }}
              />
            </Box>
            <Grid container xs={12} spacing={2}>
              {products?.images?.slice(1, 5).map((_, idx) => (
                <Grid item xs={12} md={3} key={idx}>
                  <img
                    src={first}
                    alt={`Thumb ${idx}`}
                    style={{
                      width: "140px",
                      borderRadius: 4,
                      border: "2px solid #ddd",
                      height: "140px",
                    }}
                  />
                </Grid>
              ))}
            </Grid>
          </Grid>

          {/* Right Details */}
          <Grid item xs={12} md={6}>
            <Card variant="outlined" sx={{ p: 3 }}>
              <Typography fontSize={40} fontWeight={400}>
                {products?.productName}
              </Typography>
              <Box display="flex" alignItems="center" my={1}>
                <Rating value={4} readOnly size="small" />
                <Typography variant="body2" ml={1}>
                  (4.5)
                </Typography>
              </Box>

              <Box my={2}>
                <Typography variant="subtitle2">Choose size:</Typography>
                <ToggleButtonGroup
                  value={size}
                  exclusive
                  onChange={(e, v) => v && setSize(v)}
                >
                  {sizes?.map((s) => (
                    <ToggleButton
                      sx={{
                        borderRadius: size === s?.size ? "6px" : "none",
                        border: "none",
                        bgcolor: size == s?.size ? "#EBE9FA" : "none",
                      }}
                      key={s?.size}
                      value={s?.size}
                    >
                      {s?.size}
                    </ToggleButton>
                  ))}
                </ToggleButtonGroup>
              </Box>

              <Box my={2}>
                <Typography variant="subtitle2">Choose Color:</Typography>
                <Box display="flex" gap={1}>
                  {colors?.map((c) => (
                    <Box
                      key={c?.hex}
                      onClick={() => setColor(c)}
                      sx={{
                        width: 24,
                        height: 24,
                        bgcolor: c?.hex,
                        borderRadius: "50%",
                        border:
                          color === c ? "2px solid black" : "1px solid #ccc",
                        cursor: "pointer",
                      }}
                    />
                  ))}
                </Box>
              </Box>

              <Box my={2}>
                <Typography variant="subtitle2">Choose Quantity:</Typography>
                <Box display="flex" alignItems="center">
                  <IconButton
                    onClick={() => setQuantity((prev) => Math.max(1, prev - 1))}
                    sx={{ bgcolor: "#EBE9FA" }}
                  >
                    <RemoveIcon />
                  </IconButton>
                  <Typography mx={2}>{quantity}</Typography>
                  <IconButton
                    sx={{ bgcolor: "#EBE9FA" }}
                    onClick={() => setQuantity((prev) => prev + 1)}
                  >
                    <AddIcon />
                  </IconButton>
                </Box>
              </Box>

              <Box
                display="flex"
                justifyContent={"space-between"}
                alignItems="center"
                mt={2}
                mb={2}
              >
                <Box display={"flex"} alignItems={"center"}>
                  <Typography
                    gap={1}
                    alignItems={"center"}
                    display={"flex"}
                    variant="h6"
                    mr={2}
                  >
                    <Typography mr={1} variant="subtitle2">
                      price:
                    </Typography>
                    <span style={{ color: "#ffb400" }}>
                      <img src={gold} width={20} alt="" />
                    </span>{" "}
                    {products?.offerPrice || 0}
                  </Typography>
                  <Typography
                    variant="body2"
                    sx={{ textDecoration: "line-through", color: "#888" }}
                  >
                   {products?.actualPrice || 0}
                  </Typography>
                </Box>
                <Button
                  sx={{
                    bgcolor: "#0039F4",
                    borderRadius: "12px",
                    color: "#fff",
                    p: "8px 20px",
                  }}
                  endIcon={<ShoppingCartIcon />}
                >
                  Add To Cart
                </Button>
              </Box>
            </Card>

            <Card variant="outlined" sx={{ mt: 2, p: 2 }}>
              <Typography variant="subtitle1">{products?.description}</Typography>
            </Card>
          </Grid>
        </Grid>

        {/* Review Section */}
        <Typography mt={5} fontWeight={600} fontSize={34} mb={2}>
          Review & Ratings
        </Typography>
        <>
          <Grid container display={"flex"} gap={3} xs={12}>
            <Grid
              xs={12}
              sx={{
                display: "flex",
                flexDirection: "column",
                border: "1px solid red",
                alignItems: "end",
                borderRadius: "8px",
                border: "1px solid #00000033",
                height: "fit-content",
                padding: "10px",
              }}
              md={5.5}
            >
              <TextField
                fullWidth
                variant="outlined"
                multiline
                rows={3}
                sx={{
                  "& .MuiOutlinedInput-root": {
                    "& fieldset": {
                      border: "none",
                    },
                    "&:hover fieldset": {
                      border: "none",
                    },
                    "&.Mui-focused fieldset": {
                      border: "none",
                    },
                  },
                }}
                placeholder="Write a review..."
              />
              <Button variant="contained" sx={{ mt: 1 }}>
                Post
              </Button>
            </Grid>
            <Grid
              border={"1px solid #00000033"}
              sx={{ borderRadius: "8px" }}
              p={2}
              xs={12}
              md={6.2}
            >
              <Grid container spacing={2} p={1.6} xs={12}>
                <Grid xs={12} md={6}>
                  <Typography fontSize={14} color="#060606">
                    Overall rating
                  </Typography>
                  <Rating value={rating} onChange={(e, v) => setRating(v)} />
                  <Typography fontSize={14} color="#060606" mt={1}>
                    How is the product price?
                  </Typography>
                  <ToggleButtonGroup sx={{ fontSize: "14px" }}>
                    <ToggleButton
                      sx={{
                        border: "none",
                        p: 0,
                        fontSize: "10px",
                        textTransform: "capitalize",
                      }}
                      value="1"
                    >
                      <Typography
                        sx={{
                          border: "1px solid #00000033",
                          borderRadius: "4px",
                          p: "2px 4px",
                          mr: "3px",
                        }}
                        fontSize={12}
                      >
                        Expensive
                      </Typography>
                    </ToggleButton>
                    <ToggleButton
                      sx={{
                        border: "none",
                        p: 0,
                        fontSize: "10px",
                        textTransform: "capitalize",
                      }}
                      value="2"
                    >
                      <Typography
                        sx={{
                          border: "1px solid #00000033",
                          borderRadius: "4px",
                          p: "2px 4px",
                          mr: "3px",
                        }}
                        fontSize={12}
                      >
                        {" "}
                        Just okay
                      </Typography>
                    </ToggleButton>
                    <ToggleButton
                      sx={{
                        border: "none",
                        p: 0,
                        fontSize: "10px",
                        textTransform: "capitalize",
                      }}
                      value="3"
                    >
                      <Typography
                        sx={{
                          border: "1px solid #00000033",
                          borderRadius: "4px",
                          p: "2px 4px",
                          mr: "3px",
                        }}
                        fontSize={12}
                      >
                        Value for money{" "}
                      </Typography>
                    </ToggleButton>
                  </ToggleButtonGroup>
                </Grid>

                <Grid xs={12} md={6}>
                  <Typography fontSize={14} color="#060606" mt={2}>
                    Package Quality
                  </Typography>
                  <ToggleButtonGroup>
                    <ToggleButton
                      sx={{
                        border: "none",
                        p: 0,
                        fontSize: "10px",
                        textTransform: "capitalize",
                      }}
                      value="Poor"
                    >
                      <Typography
                        sx={{
                          border: "1px solid #00000033",
                          borderRadius: "4px",
                          p: "2px 4px",
                          mr: "3px",
                        }}
                        fontSize={12}
                      >
                        Poor
                      </Typography>
                    </ToggleButton>
                    <ToggleButton
                      sx={{
                        border: "none",
                        p: 0,
                        fontSize: "10px",
                        textTransform: "capitalize",
                      }}
                      value="Replace"
                    >
                      {" "}
                      <Typography
                        sx={{
                          border: "1px solid #00000033",
                          borderRadius: "4px",
                          p: "2px 4px",
                          mr: "3px",
                        }}
                        fontSize={12}
                      >
                        Can be replaced
                      </Typography>
                    </ToggleButton>
                    <ToggleButton
                      sx={{
                        border: "none",
                        p: 0,
                        fontSize: "10px",
                        textTransform: "capitalize",
                      }}
                      value="Okay"
                    >
                      <Typography
                        sx={{
                          border: "1px solid #00000033",
                          borderRadius: "4px",
                          p: "2px 4px",
                          mr: "3px",
                        }}
                        fontSize={12}
                      >
                        Okay
                      </Typography>
                    </ToggleButton>
                    <ToggleButton
                      sx={{
                        border: "none",
                        p: 0,
                        fontSize: "10px",
                        textTransform: "capitalize",
                      }}
                      value="Good"
                    >
                      <Typography
                        sx={{
                          border: "1px solid #00000033",
                          borderRadius: "4px",
                          p: "2px 4px",
                          mr: "3px",
                        }}
                        fontSize={12}
                      >
                        Good
                      </Typography>
                    </ToggleButton>
                    <ToggleButton
                      sx={{
                        border: "none",
                        p: 0,
                        fontSize: "10px",
                        textTransform: "capitalize",
                      }}
                      value="Perfect"
                    >
                      <Typography
                        sx={{
                          border: "1px solid #00000033",
                          borderRadius: "4px",
                          p: "2px 4px",
                          mr: "3px",
                        }}
                        fontSize={12}
                      >
                        Perfect
                      </Typography>
                    </ToggleButton>
                  </ToggleButtonGroup>
                  <Typography fontSize={14} color="#060606" mt={2}>
                    Would you repurchase this product?
                  </Typography>
                  <ToggleButtonGroup>
                    <ToggleButton
                      sx={{
                        border: "none",
                        p: 0,
                        fontSize: "10px",
                        textTransform: "capitalize",
                      }}
                      value="Yes"
                    >
                      <Typography
                        sx={{
                          border: "1px solid #00000033",
                          borderRadius: "4px",
                          p: "2px 4px",
                          mr: "3px",
                        }}
                        fontSize={12}
                      >
                        Yes
                      </Typography>
                    </ToggleButton>
                    <ToggleButton
                      sx={{
                        border: "none",
                        p: 0,
                        fontSize: "10px",
                        textTransform: "capitalize",
                      }}
                      value="No"
                    >
                      <Typography
                        sx={{
                          border: "1px solid #00000033",
                          borderRadius: "4px",
                          p: "2px 4px",
                          mr: "3px",
                        }}
                        fontSize={12}
                      >
                        No
                      </Typography>
                    </ToggleButton>
                  </ToggleButtonGroup>
                </Grid>
              </Grid>
            </Grid>
          </Grid>

          <Typography fontSize={24} fontWeight={600} mt={4}>
            Words from our customers
          </Typography>
          <Grid container spacing={2} mt={1}>
            {[1, 2, 3].map((idx) => (
              <Grid item xs={12} md={4} key={idx}>
                <Card variant="outlined" sx={{ p: 2 }}>
                  <Box display="flex" alignItems="center" my={1}>
                    <Rating value={4} readOnly size="small" />
                    <Typography variant="body2" ml={1}>
                      (4.5)
                    </Typography>
                  </Box>
                  <Typography variant="body2" mt={1}>
                    Excepteur sint occaecat cupidatat non proident, sunt in
                    culpa qui officia deserunt
                  </Typography>
                  <Divider sx={{ my: 1 }} />
                  <Box display="flex" alignItems="center">
                    <Avatar sx={{ width: 32, height: 32, mr: 1 }} />
                    <Box>
                      <Typography variant="body2">Sarah John</Typography>
                      <Typography variant="caption" color="gray">
                        Kerala
                      </Typography>
                    </Box>
                  </Box>
                </Card>
              </Grid>
            ))}
          </Grid>
        </>
        <LikeMore />
      </Box>
      <Footer />
    </>
  );
};

export default ProductDetailsPage;
