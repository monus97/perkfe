import { Box, Grid2, Typography } from "@mui/material";
import AdminDashboard from "../../../Components/organizationAdmin/adminDashboard";
import SelectDates from "../../../Components/common/selectDates";

const OrganizationsDash = () => {
  const details = sessionStorage.getItem("details");
  const allData = details ? JSON.parse(details) : null;

  return (
    <Box>
      <Grid2 container>
        <Grid2 size={{ xs: 12, md: 6 }}>
          <Typography color="#28282D" fontSize={26} fontWeight={600}>
            Hi, {allData?.name}
          </Typography>
          <Typography fontSize={16} color="#28282D">
            Welcome to Organization Dashboard
          </Typography>
        </Grid2>
        <Grid2 textAlign={"end"} size={{ xs: 12, md: 6 }}>
          <Box>
            <SelectDates />
          </Box>{" "}
        </Grid2>
      </Grid2>
      <AdminDashboard />
    </Box>
  );
};

export default OrganizationsDash;
