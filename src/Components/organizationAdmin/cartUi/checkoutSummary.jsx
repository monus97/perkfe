import React from "react";
import {
  Box,
  Typography,
  Grid,
  Card,
  CardContent,
  Button,
  Divider,
  Stepper,
  Step,
  StepLabel,
} from "@mui/material";
import StarIcon from "@mui/icons-material/Star";
import gold from "../../../Assets/Organzations/Vector.png";
import first from "../../../Assets/Organzations/21488707952.png";
import second from "../../../Assets/Organzations/214887.png";
import third from "../../../Assets/Organzations/2148870.png";
import fourth from "../../../Assets/Organzations/214887079.png";

const steps = ["Delivery", "Review"];

const products = [
  { name: "Marbella Popline Dress", coins: 1377.8, quantity: 2, img: first },
  { name: "Marbella Popline Dress", coins: 180, quantity: 3, img: second },
  { name: "Marbella Popline Dress", coins: 110, quantity: 1, img: third },
  { name: "Marbella Popline Dress", coins: 345, quantity: 1, img: fourth },
];

const CheckoutSummary = () => {
  const subtotal = products.reduce((sum, p) => sum + p.coins, 0);

  return (
    <Box>
      <Grid container spacing={4} mt={2}>
        {/* Product List */}
        <Grid item xs={12} md={6}>
          <Card variant="outlined" sx={{ p: 2 }}>
            {products.map((item, index) => (
              <Box key={index} display="flex" mb={3.6}>
                <Box
                  component="img"
                  src={item.img}
                  alt={item.name}
                  sx={{ width: 70, height: 70, borderRadius: 1, mr: 2 }}
                />
                <Box flexGrow={1}>
                  <Typography fontSize={18} mb={1} fontWeight={500}>
                    {item.name}
                  </Typography>
                  <Box display="flex" alignItems="center" gap={1}>
                    <img src={gold} width={21} height={21} />
                    <Typography
                      fontSize={22}
                      color="rgba(102, 102, 102, 1)"
                      fontWeight={400}
                    >
                      {item.coins}
                    </Typography>
                    <Typography
                      ml={3}
                      color="rgba(147, 144, 144, 1)"
                      fontSize={18}
                      fontWeight={400}
                    >
                      {item.quantity}(items)
                    </Typography>
                  </Box>
                </Box>
              </Box>
            ))}
          </Card>
        </Grid>

        {/* Order Summary */}
        <Grid item xs={12} md={6}>
          <Card variant="outlined" sx={{ p: 3 }}>
            <Typography fontSize={20} fontWeight={500}>
              Shipping Address
            </Typography>
            <Typography
              fontSize={16}
              color="rgba(102, 102, 102, 0.7)"
              fontWeight={400}
              mt={1}
              mb={2}
            >
              4517 Washington Ave. Manchester, Kentucky 39495
            </Typography>

            <Typography fontWeight={500} fontSize={20}>
              Email & Ph No
            </Typography>
            <Typography
              color="rgba(102, 102, 102, 0.7)"
              fontSize={16}
              fontWeight={400}
            >
              georgia.young@example.com
              <br />
              (307) 555-0133
            </Typography>

            <Divider
              sx={{
                my: 2,
                borderStyle: "dashed",
                borderColor: "grey.400",
                borderWidth: "1px",
              }}
            />

            <Box display="flex" justifyContent="space-between">
              <Typography
                fontSize={18}
                fontWeight={500}
                color="rgba(102, 102, 102, 1)"
              >
                {" "}
                Subtotal
              </Typography>
              <Typography
                fontSize={18}
                fontWeight={500}
                color="rgba(0, 0, 0, 1)"
              >
                {subtotal}
              </Typography>
            </Box>
            <Box display="flex" justifyContent="space-between">
              <Typography
                fontSize={18}
                fontWeight={500}
                color="rgba(102, 102, 102, 1)"
              >
                Delivery
              </Typography>
              <Typography
                fontSize={18}
                fontWeight={500}
                color="rgba(17, 171, 46, 1)"
              >
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

            <Box
              display="flex"
              justifyContent="space-between"
              alignItems="center"
            >
              <Typography fontSize={20} fontWeight={700}>Order total</Typography>
              <Box display="flex" alignItems="center" gap={0.5}>
              <img src={gold} width={21} height={21} />
                <Typography fontSize={20} fontWeight={700}>{subtotal}</Typography>
              </Box>
            </Box>

            <Button
              fullWidth
              variant="contained"
              sx={{
                mt: 3,
                bgcolor: "#0047FF",
                "&:hover": { bgcolor: "#003be5" },
                borderRadius: "12px",
                py: 1.5,
              }}
            >
              CONTINUE
            </Button>
          </Card>
        </Grid>
      </Grid>
    </Box>
  );
};

export default CheckoutSummary;
