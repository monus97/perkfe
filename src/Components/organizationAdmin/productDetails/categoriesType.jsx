import React from "react";
import {
  Box,
  Typography,
  Checkbox,
  FormControlLabel,
  FormGroup,
  Grid,
  Card,
  CardMedia,
  CardContent,
  Button,
  Divider,
  Radio,
  RadioGroup,
} from "@mui/material";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";

const filters = {
  subcategories: [
    "Tops",
    "Sarees",
    "Bottoms",
    "Outerwear",
    "Activewear",
    "Lingerie & Sleepwear",
    "Seasonal Wear",
  ],
  brands: [
    "Chic Essence",
    "Urban Muse",
    "StyleSphere",
    "Luxe Allure",
    "Eterna Femme",
  ],
  price: [
    "Less than 50",
    "₹ 100 to ₹ 200",
    "₹ 200 to ₹ 300",
    "₹ 300 to ₹ 400",
    "Above ₹ 400",
  ],
  discount: ["Upto 5%", "5% to 10%", "10% to 15%", "15% to 25%", "Above 25%"],
};

const products = new Array(9).fill({
  title: "Marbella Popline Dress",
  price: "688.9",
  image: "https://via.placeholder.com/300x400",
});

const CategoryPage = () => {
  return (
    <Box display="flex" p={4}>
      {/* Filter Panel */}
      <Box width="250px" mr={4}>
        <Typography variant="h6" fontWeight={700} mb={2}>
          Women’s
        </Typography>

        {Object.entries(filters).map(([key, options]) => (
          <Box key={key} mb={3}>
            <Typography fontWeight={600} mb={1}>
              {key.charAt(0).toUpperCase() + key.slice(1)}
            </Typography>
            {key === "discount" ? (
              <RadioGroup>
                {options.map((opt, idx) => (
                  <FormControlLabel
                    key={idx}
                    value={opt}
                    control={<Radio size="small" />}
                    label={opt}
                  />
                ))}
              </RadioGroup>
            ) : (
              <FormGroup>
                {options.map((opt, idx) => (
                  <FormControlLabel
                    key={idx}
                    control={<Checkbox size="small" />}
                    label={opt}
                  />
                ))}
              </FormGroup>
            )}
          </Box>
        ))}
      </Box>

      {/* Product Grid */}
      <Grid container spacing={2}>
        {products.map((product, idx) => (
          <Grid item xs={12} sm={6} md={4} key={idx}>
            <Card sx={{ boxShadow: 3 }}>
              <CardMedia
                component="img"
                image={product.image}
                alt={product.title}
                height="360"
              />
              <CardContent>
                <Typography>{product.title}</Typography>
                <Box display="flex" alignItems="center" mt={1}>
                  <img
                    src="https://cdn-icons-png.flaticon.com/512/2583/2583347.png"
                    alt="coin"
                    width={20}
                    height={20}
                    style={{ marginRight: 4 }}
                  />
                  <Typography fontWeight={600}>{product.price}</Typography>
                </Box>
                <Button
                  variant="contained"
                  fullWidth
                  sx={{ mt: 1, backgroundColor: "#0047FF", borderRadius: 2 }}
                  startIcon={<ShoppingCartIcon />}
                >
                  Add to Cart
                </Button>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default CategoryPage;
