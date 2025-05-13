import { Box, Grid, Grid2 } from "@mui/material";
import Topcards from "./adOrgCards";
import AddRecognition from "./addRecognition";
import LeaderBoard from "./leaderBoard";
import StepperList from "./stepperList";

const AdminDashboard = () => {
  return (
    <div>
    <Topcards/>
    <Grid2 mt={2} container spacing={2}>
        <Grid2 borderRadius={"16px"}  size={{xs:12,md:9.6}}>
            <AddRecognition/>
            <Box mt={2}>

            <StepperList/>
            </Box>
        </Grid2>
        <Grid2 height={"70vh"} borderRadius={"16px"}  bgcolor={"#fff"} size={{xs:12,md:2.4}}>
             <LeaderBoard/>
        </Grid2>
        </Grid2>
    </div>
  );
};

export default AdminDashboard;
