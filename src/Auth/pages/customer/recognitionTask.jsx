import { Box, useScrollTrigger } from "@mui/material";
import StoreTopbar from "../store/topBar";
import RecognitionHeader from "./recognition";
import EmployeeDash from "./employeeDash";
import { useState } from "react";

const RecognitionTask = () => {
    const [activeData,setActiveData] = useState("")
  return (
    <Box bgcolor={"#F8F8F8"}>
      <Box
        sx={{
          position: "sticky",
          top: 0,
          zIndex: 1100, // higher than other content
          backgroundColor: "#fff", // ensure it doesn't look transparent
        }}
      >
        <StoreTopbar />
        <RecognitionHeader activeData={activeData} setActiveData={setActiveData} />
      </Box>
      <Box padding={"0rem 5rem"}>
        <EmployeeDash activeData={activeData} setActiveData={setActiveData}/>
      </Box>
    </Box>
  );
};

export default RecognitionTask;
