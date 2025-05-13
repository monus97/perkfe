import { Box, Button, Typography } from "@mui/material";
import imgas from "../../../Assets/banner1.jpg";
const OfferSection = () => {
  return (
    <Box>
      <Box
        sx={{
          backgroundImage: `url(${imgas})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
          width: "100%",
          height: "400px", // or adjust as needed
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "flex-start",
          p: 14,
        }}
      >
        <Typography color="#779CEC" fontSize={50} fontWeight={500}>
          30 %
        </Typography>
        <Typography color="" fontSize={54} fontWeight={600}>
         OFFER
        </Typography>
        <Typography color="#666161" fontSize={20}>
          Affordable, reliable, and ready for wear
          </Typography>
        <Button
          sx={{
            bgcolor: "#0039F4",
            border: "none",
            borderRadius: "8px",
            p: 2,
            mt: 2,
          }}
        >
          <Typography color="#fff" fontSize={16}>
            Shop Now
          </Typography>
        </Button>
      </Box>
    </Box>
  );
};

export default OfferSection;
