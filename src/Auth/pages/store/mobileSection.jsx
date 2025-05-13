import { Box, Button, Grid2, Typography } from "@mui/material";
import playicon from "../../../Assets/playstore.png";
import applestore from "../../../Assets/logosapple.png";
import mob from "../../../Assets/mob.png"
const MobileSection = () => {
  return (
    <Grid2 container>
      <Grid2 size={{ xs: 12, md: 7 }}>
        <Box
          sx={{
            width: "100%",
            height: "400px", // or adjust as needed
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "flex-start",
            p: 14,
            bgcolor:"#fafafa"
          }}
        >
          <Typography display={"flex"} gap={2} fontSize={40} fontWeight={500}>
            Download Our{" "}
            <Typography fontSize={40} color="#0039F4">
              Mobile App
            </Typography>
          </Typography>
          <Typography color="#4B4B4B" fontSize={20} fontWeight={400}>
            Get the best quality and most delicious grocery food in the world,
            you can get them from our Mobile App.
          </Typography>
          <Box display={"flex"} gap={2}>
            <Button
              sx={{
                bgcolor: "#e1e1e1",
                border: "none",
                borderRadius: "8px",
                p: 2,
                mt: 2,
              }}
            >
              <img width={38} height={40} src={playicon} />
              <Box ml={2} textAlign={"start"}>
                <Typography color="#000" fontSize={12}>
                  Get it on
                </Typography>
                <Typography color="#000" fontSize={20}>
                  Google Play
                </Typography>
              </Box>
            </Button>
            <Button
              sx={{
                bgcolor: "#e1e1e1",
                border: "none",
                borderRadius: "8px",
                p: 2,
                mt: 2,
              }}
            >
              <img width={38} height={40} src={applestore} />
              <Box ml={2} textAlign={"start"}>
                <Typography color="#000" fontSize={12}>
                  Download on the
                </Typography>
                <Typography color="#000" fontSize={20}>
                  Apple Store
                </Typography>
              </Box>
            </Button>
          </Box>
        </Box>
      </Grid2>
      <Grid2 size={{ xs: 12, md: 5 }}>
        <Box
          sx={{
            width: "100%",
            height: "400px", // or adjust as needed
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "flex-start",
          }}
        >
       <img height={"100%"} width={"100%"} src={mob}/>
        </Box>
      </Grid2>
    </Grid2>
  );
};

export default MobileSection;
