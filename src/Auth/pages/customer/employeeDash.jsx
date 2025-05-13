import { Box, Grid2 } from "@mui/material";
import Topcards from "../../../Components/organizationAdmin/adOrgCards";
import AddRecognition from "../../../Components/organizationAdmin/addRecognition";
import LeaderBoard from "../../../Components/organizationAdmin/leaderBoard";
import StepperDetailing from "./stepperDetailing";

const EmployeeDash = ({ activeData, setActiveData }) => {
  return (
    <div>
      <Topcards />
      <Grid2 mt={2} container spacing={2}>
        <Grid2 borderRadius={"16px"}   size={{ xs: 12, md: 9.6 }}>
          <AddRecognition />
         
        </Grid2>
        <Grid2
          // height={"70vh"}
          borderRadius={"16px"}
          bgcolor={"#fff"}
          size={{ xs: 12, md: 2.4 }}
        >
          <LeaderBoard />
        </Grid2>
        <Box mt={2}>
            <StepperDetailing
              activeData={activeData}
              setActiveData={setActiveData}
            />
          </Box>
      </Grid2>
    </div>
  );
};

export default EmployeeDash;
