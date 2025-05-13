import { Box, Grid2, Typography } from "@mui/material";
import Store_crds from "../../../../Components/store/store_crds";
import SelectDates from "../../../../Components/common/selectDates";
import home from "../../../../Assets/Organzations/home.png";
import PurchasesChart from "../../../../Components/store/purchasehart";
import { useNavigate } from "react-router-dom";
import authInstance from "../../../../authInstance";
import { useEffect, useState } from "react";
const Org_Store = () => {
  const navigate = useNavigate();
  const [storeData, setStoreData] = useState([]);
  const fetchData = async () => {
    const data = sessionStorage.getItem("user");
    const parsedData = data ? JSON.parse(data) : null;
    try {
      const response = await authInstance.get(
        `/admin/organization/store?orgId=${
          parsedData?.orgId
        }&filterData=${"lastThirtyDays"}`
      );
      if (response?.status == 200) {
        setStoreData(response?.data);
      }
    } catch (error) {
      console.log(error, "error");
    }
  };

  useEffect(() => {
    fetchData();
  }, []);
  const handleNavigateToStore = () => {
    navigate("/store/details");
  };
  return (
    <Box>
      <Grid2 container>
        <Grid2 size={{ xs: 12, md: 6 }}>
          <Typography color="#28282D" fontSize={26} fontWeight={600}>
            Breed Cromb
          </Typography>
        </Grid2>
        <Grid2 textAlign={"end"} size={{ xs: 12, md: 6 }}>
          <Box
            display={"flex"}
            justifyContent={"end"}
            alignItems={"center"}
            gap={"15px"}
          >
            <SelectDates />
            <Box
              sx={{ cursor: "pointer" }}
              bgcolor={"#0039F4"}
              borderRadius={"8px"}
              color={"#fff"}
              fontSize={"16px"}
              p={"8px 12px"}
              onClick={handleNavigateToStore}
            >
              <img src={home} width={17} height={17} /> go to store
            </Box>
          </Box>{" "}
        </Grid2>
      </Grid2>
      <Store_crds storeData={storeData} />
      <PurchasesChart />
    </Box>
  );
};

export default Org_Store;
