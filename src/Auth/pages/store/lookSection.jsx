import { Box, Button, Typography } from "@mui/material";
import imgas from "../../../Assets/banner11.jpg";
const LookSection = () => {
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
        <Typography color="#fff" fontSize={50} fontWeight={500}>
          Your Perfect Look Awaits
        </Typography>
        <Typography color="#fff" fontSize={20} fontWeight={400}>
          Exclusive shirts for every occasion—grab yours today and enjoy a
          surprise gift!
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

export default LookSection;
