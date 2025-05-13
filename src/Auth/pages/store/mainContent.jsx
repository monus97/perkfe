import { Box, Grid, Typography, Button } from "@mui/material";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import gold from "../../../Assets/Organzations/Vector.png";
import roundarrow from "../../../Assets/Organzations/Round Arrow Left.svg";


const MainContent = ({products,handleNavigate}) => {
  const handleNavigat = (id) => {
    handleNavigate(id)
  };
  return (
    <Box position={"relative"} p={13.4}>
      <Box
        display="flex"
        justifyContent="space-between"
        alignItems="center"
        mb={2}
      >
        <Typography variant="h6" fontWeight="bold">
          Top Deals
        </Typography>
        <Typography color="primary" fontWeight={500} sx={{ cursor: "pointer" }}>
          View All
        </Typography>
      </Box>

      <Grid container spacing={2}>
        {products?.slice(0, 4)?.map((product, idx) => (
          <Grid item xs={12} md={6} key={idx}>
            <Box
              onClick={() => handleNavigat(product?.productId)}
              sx={{
                backgroundImage: `url(${product?.images?.[0]})`,
                backgroundSize: "cover",
                backgroundPosition: "center",
                height: 400,
                borderRadius: 2,
                display: "flex",
                flexDirection: "column",
                justifyContent: "flex-end",
                color: "#fff",
                overflow: "hidden",
                position: "relative",
                cursor: "pointer",
              }}
            >
              <Box
                sx={{
                  background:
                    "linear-gradient(to top, rgba(0,0,0,0.7), rgba(0,0,0,0))",
                  p: 2,
                }}
              >
                <Typography fontSize={30} fontWeight={300}>
                  {product?.productName}
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
                    {product?.actualPrice}
                  </Typography>
                  <Button
                    variant="contained"
                    color="primary"
                    startIcon={<ShoppingCartIcon />}
                    sx={{
                      background: "linear-gradient(90deg, #3c6ff3, #1a40d6)",
                      borderRadius: 2,
                      textTransform: "none",
                    }}
                  >
                    Add to Cart
                  </Button>
                </Box>
              </Box>
            </Box>
          </Grid>
        ))}
      </Grid>

      {/* Left Arrow */}
      <Box
        sx={{
          position: "absolute",
          top: 150,
          left: 20,
          backgroundColor: "#fff",
          cursor: "pointer",
          transition: "transform 0.3s ease, box-shadow 0.3s ease",
          "&:hover": {
            transform: "translateY(-5px)",
            borderRadius: "40px",
            boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.2)",
          },
        }}
      >
        <img width={60} height={60} src={roundarrow} />
      </Box>
    </Box>
  );
};

export default MainContent;
