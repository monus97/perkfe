import { Box, Grid2, Typography } from "@mui/material";
import firstIcons from "../../Assets/Organzations/Cart Large.png";
import secondIcons from "../../Assets/Organzations/file.png";
import thirdIcons from "../../Assets/Organzations/signal.png";
import fourthIcons from "../../Assets/Organzations/star.png";

const Store_crds = ({ storeData }) => {

  return (
    <Box mt={2}>
      <Grid2 container spacing={2}>
        <Grid2
          borderRadius={"16px"}
          bgcolor={"#FFFFFF"}
          size={{ xs: 12, md: 3 }}
          padding={"15px"}
        >
          <Typography fontSize={18} color="#A9A9A9">
            {" "}
            Total Orders
          </Typography>
          <Box
            mt={2}
            display={"flex"}
            alignItems={"center"}
            justifyContent={"space-between"}
          >
            <img width={35} height={35} src={firstIcons} alt="" />
            <Typography fontSize={40} fontWeight={500}>
              {storeData?.totalOrderCount || 0}
            </Typography>
          </Box>
        </Grid2>
        <Grid2
          borderRadius={"16px"}
          bgcolor={"#FFFFFF"}
          size={{ xs: 12, md: 3 }}
          padding={"15px"}
        >
          <Typography fontSize={18} color="#A9A9A9">
            {" "}
            Recognitions
          </Typography>
          <Box
            mt={2}
            display={"flex"}
            alignItems={"center"}
            justifyContent={"space-between"}
          >
            <img width={32} height={32} src={secondIcons} alt="" />
            <Typography fontSize={40} fontWeight={500}>
              {storeData?.recognitionCount || 0}
            </Typography>
          </Box>
        </Grid2>
        <Grid2
          borderRadius={"16px"}
          bgcolor={"#FFFFFF"}
          size={{ xs: 12, md: 3 }}
          padding={"15px"}
        >
          <Typography fontSize={18} color="#A9A9A9">
            {" "}
            Purchase
          </Typography>
          <Box
            mt={2}
            display={"flex"}
            alignItems={"center"}
            justifyContent={"space-between"}
          >
            <img width={32} height={32} src={thirdIcons} alt="" />
            <Typography fontSize={40} fontWeight={500}>
              {storeData?.totalOrderAmount || 0}
            </Typography>
          </Box>
        </Grid2>
        <Grid2
          borderRadius={"16px"}
          bgcolor={"#FFFFFF"}
          size={{ xs: 12, md: 3 }}
          padding={"15px"}
        >
          <Typography fontSize={18} color="#A9A9A9">
            {" "}
            Available Points
          </Typography>
          <Box
            mt={2}
            display={"flex"}
            alignItems={"center"}
            justifyContent={"space-between"}
          >
            <img width={32} height={32} src={fourthIcons} alt="" />
            <Typography fontSize={14} fontWeight={500} color="#82848A">
              Total:<b>{storeData?.balancePoints}</b>
            </Typography>
            <Typography fontSize={40} fontWeight={500}>
            {storeData?.balancePoints || 0}
            </Typography>
          </Box>
        </Grid2>
      </Grid2>
    </Box>
  );
};

export default Store_crds;
