import React from "react";
import { Box, Typography, Grid, Button, Divider, Card } from "@mui/material";
import StarIcon from "@mui/icons-material/Star";
import gold from "../../../Assets/Organzations/Vector.png";
import { useNavigate } from "react-router-dom";
const OrderCard = ({
  title,
  subtitle,
  product,
  date,
  total,
  shipTo,
  items,
  orderId,
}) => {
  const navigate = useNavigate();
  const navigateOrderDetails = (orderId) => {
    navigate(`/user/orders-details?${orderId}`);
  };
  return (
    <Card variant="outlined" sx={{ p: 3, mb: 3, borderRadius: 2 }}>
      <Grid container spacing={2}>
        {/* Left Side */}
        <Grid item xs={12} md={9}>
          <Typography fontSize={28} fontWeight={700}>
            {title}
          </Typography>
          <Typography fontSize={18} color="rgba(51, 51, 51, 1)" mb={2}>
            {subtitle}
          </Typography>

          <Grid container spacing={2}>
            <Grid item>
              <Box
                component="img"
                src={product.image}
                alt={product.name}
                sx={{ width: 80, height: 80, borderRadius: 1 }}
              />
            </Grid>
            <Grid item xs>
              <Typography fontSize={20} fontWeight="500">
                {product.name}
              </Typography>
              <Typography color="rgba(168, 164, 164, 1)" fontSize={16} mt={0.5}>
                {product.description}
                <br />
                {product.description}
              </Typography>
            </Grid>
          </Grid>

          <Box display="flex" gap={4} mt={2} flexWrap="wrap">
            <Box>
              <Typography fontSize={12} color="rgba(102, 102, 102, 1)">
                ORDER PLACED
              </Typography>
              <Typography fontSize={14} color="rgba(0, 0, 0, 1)">
                {date}
              </Typography>
            </Box>
            <Box>
              <Typography fontSize={12} color="rgba(102, 102, 102, 1)">
                TOTAL
              </Typography>
              <Box display="flex" alignItems="center" gap={0.5}>
                <img
                  src={gold}
                  width={12}
                  height={12}
                />
                <Typography fontSize={14} color="rgba(0, 0, 0, 1)">
                  {total}
                </Typography>
              </Box>
            </Box>
            <Box>
              <Typography fontSize={12} color="rgba(102, 102, 102, 1)">
                SHIP TO
              </Typography>
              <Typography fontSize={14} color="rgba(0, 0, 0, 1)">
                {shipTo}
              </Typography>
            </Box>
            <Box>
              <Typography fontSize={12} color="rgba(102, 102, 102, 1)">
                ITEMS
              </Typography>
              <Typography fontSize={14} color="rgba(0, 0, 0, 1)">
                {items}
              </Typography>
            </Box>
            <Box>
              <Typography fontSize={12} color="rgba(102, 102, 102, 1)">
                ORDER ID
              </Typography>
              <Typography fontSize={14} color="rgba(0, 0, 0, 1)">
                #{orderId}
              </Typography>
            </Box>
          </Box>
        </Grid>

        {/* Right Side */}
        <Grid
          item
          xs={12}
          md={3}
          display="flex"
          flexDirection="column"
          gap={1}
          justifyContent="center"
        >
          <Button
            sx={{
              border: "1.5px solid rgba(220, 221, 229, 1)",
              fontSize: 18,
              color: "rgba(0, 0, 0, 1)",
              textTransform: "capitalize",
            }}
            fullWidth
          >
            Track Order
          </Button>
          <Button
            sx={{
              border: "1.5px solid rgba(220, 221, 229, 1)",
              fontSize: 18,
              color: "rgba(0, 0, 0, 1)",
              textTransform: "capitalize",
            }}
            fullWidth
            onClick={()=>navigateOrderDetails(orderId)}
          >
            Order details
          </Button>
          <Button
            sx={{
              border: "1.5px solid rgba(220, 221, 229, 1)",
              fontSize: 18,
              color: "rgba(0, 0, 0, 1)",
              textTransform: "capitalize",
            }}
            fullWidth
          >
            Print invoice
          </Button>
          <Button
            sx={{
              border: "1.5px solid rgba(220, 221, 229, 1)",
              fontSize: 18,
              color: "rgba(0, 0, 0, 1)",
              textTransform: "capitalize",
            }}
            fullWidth
          >
            Write product review
          </Button>
        </Grid>
      </Grid>
    </Card>
  );
};

export default OrderCard;
