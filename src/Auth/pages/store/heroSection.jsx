import { Box, Button, Typography } from "@mui/material";
import "./hero.css";
const HeroSection = () => {
  return (
    <Box
      sx={{
        height: "600px",
        display: "flex",
        alignItems: "center",
        justifyContent: "start",
        color: "#fff",
        fontSize: 24,
        pl: 14,
        fontWeight: "bold",
      }}
      className="hero"
    >
      <Box>
        <Typography fontSize={55} color="#000" fontWeight={700}>
          Outfits Dazlings
        </Typography>
        <Typography fontSize={22} color="#4B4B4B">
          Refresh your style with our diverse range of textiles
        </Typography>
        <Button
          sx={{
            bgcolor: "#0039F4",
            mt: 4,
            color: "#fff",
            textTransform: "capitalize",
            fontSize: "18px",
        px:3
          }}
          
        >
          {" "}
          Order Now
        </Button>
      </Box>
    </Box>
  );
};

export default HeroSection;
