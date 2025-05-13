import { Box, Grid, Typography, Button } from "@mui/material";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import first from "../../../Assets/Organzations/21488707952.png";
import second from "../../../Assets/Organzations/214887.png";
import third from "../../../Assets/Organzations/2148870.png";
import fourth from "../../../Assets/Organzations/214887079.png";
import gold from "../../../Assets/Organzations/Vector.png";
import roundarrow from "../../../Assets/Organzations/Round Arrow Left.svg"
const products = [
  {
    name: "Marbella Popline Dress",
    price: "688.9",
    image: first,
  },
  {
    name: "Marbella Popline Dress",
    price: "688.9",
    image: second,
  },
  {
    name: "Marbella Popline Dress",
    price: "688.9",
    image: third,
  },
  {
    name: "Marbella Popline Dress",
    price: "688.9",
    image: fourth,
  },
];

const WomenSection = ({handleNavigate}) => {
  const handleNavigat = (id) => {
    handleNavigate(id)
  };
  return (
    <Box position={"relative"} pb={10}  px={13.4}>
      <Box
        display="flex"
        justifyContent="space-between"
        alignItems="center"
      >
        <Typography variant="h6" fontWeight="bold">
          Women's
        </Typography>
        <Typography color="primary" fontWeight={500} sx={{ cursor: "pointer" }}>
          View All
        </Typography>
      </Box>

      <Grid container spacing={2}>
        {products.map((product, idx) => (
          <Grid item xs={12} md={3} key={idx}>
            <Box
              onClick={() => handleNavigat(product?.name)}
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
                      background: "linear-gradient(90deg, #3c6ff3, #1a40d6)",
                      borderRadius: 2,
                      textTransform: "none",
                      mt:2
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
  );
};

export default WomenSection;
