import { Box, Grid2, Typography } from "@mui/material";
import firstIcons from "../../Assets/Organzations/Frame 1321318658.png";
import secondIcons from "../../Assets/Organzations/Frame 1321318658 (1).png";
import thirdIcons from "../../Assets/Organzations/Frame 1321318658 (3).png";
import fourthIcons from "../../Assets/Organzations/Frame 1321318658 (4).png";
import gold from "../../Assets/Organzations/Vector.png";
import greencoin from "../../Assets/Organzations/Vector (1).png";
import { useEffect, useState } from "react";
import authInstance from "../../authInstance";
const Topcards = () => {
  const [roleType, setRoleType] = useState<any>(null); // Set initial value as null or empty object
  const [crd_data, setCrd_Data] = useState<any>(null);
  const fetchCounts = async () => {
    try {
      const response = await authInstance.get(`/admin/recognition/count`);
      if (response?.status == 200) {
        setCrd_Data(response?.data);
      }
      console.log(response, "response");
    } catch (error) {
      console.log(error, "error");
    }
  };
  const data = sessionStorage.getItem("details");
  const details = data ? JSON.parse(data) : null;
  useEffect(() => {
    const userStr = sessionStorage.getItem("user");
    if (userStr) {
      const role = JSON.parse(userStr)?.role;
      setRoleType(role);
    }
    fetchCounts(); // only call function that exists
  }, []);
  console.log(roleType, "role");
  return (
    <Box mt={2}>
      <Grid2 container spacing={2}>
        <Grid2
          borderRadius={"16px"}
          bgcolor={"#FFFFFF"}
          size={{ xs: 12, md: 3 }}
          padding={"15px"}
        >
          <Typography fontSize={16} color="#A9A9A9">
            {" "}
            Total Recognitions
          </Typography>
          <Box mt={2} display={"flex"} justifyContent={"space-between"}>
            <img width={60} height={60} src={firstIcons} alt="" />
            <Typography fontSize={40} fontWeight={600} color="#921EEB">
              {crd_data?.total || 0}
            </Typography>
          </Box>
        </Grid2>
        <Grid2
          borderRadius={"16px"}
          bgcolor={"#FFFFFF"}
          size={{ xs: 12, md: 3 }}
          padding={"15px"}
        >
          <Typography fontSize={16} color="#A9A9A9">
            {" "}
            Completed Recognitions
          </Typography>
          <Box mt={2} display={"flex"} justifyContent={"space-between"}>
            <img width={60} height={60} src={secondIcons} alt="" />
            <Typography fontSize={40} fontWeight={600} color="#09BE2B">
              {crd_data?.counts?.completed || 0}
            </Typography>
          </Box>
        </Grid2>
        <Grid2
          borderRadius={"16px"}
          bgcolor={"#FFFFFF"}
          size={{ xs: 12, md: 3 }}
          padding={"15px"}
        >
          <Typography fontSize={16} color="#A9A9A9">
            {" "}
            Ongoing Recognitions
          </Typography>
          <Box mt={2} display={"flex"} justifyContent={"space-between"}>
            <img width={60} height={60} src={thirdIcons} alt="" />
            <Typography fontSize={40} fontWeight={600} color="#5437E4">
              {crd_data?.counts?.ongoing || 0}
            </Typography>
          </Box>
        </Grid2>
        <Grid2
          borderRadius={"16px"}
          bgcolor={"#FFFFFF"}
          size={{ xs: 12, md: 3 }}
          padding={"15px"}
        >
          <Typography fontSize={16} color="#A9A9A9">
            {" "}
            Claimed Recognitions
          </Typography>
          <Box mt={2} display={"flex"} justifyContent={"space-between"}>
            <img width={60} height={60} src={fourthIcons} alt="" />
            <Typography fontSize={40} fontWeight={600} color="#E3B914">
              {crd_data?.counts?.claimed || 0}
            </Typography>
          </Box>
        </Grid2>
        {roleType !== "user" && (
          <Grid2
            borderRadius={"16px"}
            bgcolor={"#FFFFFF"}
            size={{ xs: 12, md: 2.4 }}
            padding={"15px"}
          >
            <Box
              display={"flex"}
              justifyContent={"space-between"}
              alignItems={"center"}
            >
              <img width={25} height={25} src={gold} alt="" />
              <Typography color="#A9A9A9" fontSize={15}>
                Gold Coin
              </Typography>
              <Typography color="#4F4D55" fontSize={20} fontWeight={600}>
               {details?.pointsBalanced || 0}
              </Typography>
            </Box>
            <Box
              mt={3}
              display={"flex"}
              justifyContent={"space-between"}
              alignItems={"center"}
            >
              <img width={25} height={25} src={greencoin} alt="" />
              <Typography color="#A9A9A9" fontSize={15}>
                Green Coin
              </Typography>
              <Typography color="#4F4D55" fontSize={20} fontWeight={600}>
              {details?.GreenCoin || 0}
              </Typography>
            </Box>
          </Grid2>
        )}
      </Grid2>
    </Box>
  );
};

export default Topcards;
