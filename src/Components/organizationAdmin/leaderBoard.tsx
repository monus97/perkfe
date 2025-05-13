import { Box, Typography } from "@mui/material";
import firstPlace from "../../Assets/Organzations/Vector (3).png";
import secondPlace from "../../Assets/Organzations/Vector (4).png";
import thirdPlace from "../../Assets/Organzations/Vector (5).png";
import gld from "../../Assets/Organzations/Vector (6).png";
import authInstance from "../../authInstance";
import { useEffect, useState } from "react";
const LeaderBoard = () => {
  type Leader = {
    name: string;
    pointBalance: number;
    // Add other fields if needed
  };
  const [data, setData] = useState<Leader[]>([]);
  const fetchAllLeaders = async () => {
    const data = sessionStorage.getItem("user");
    if (!data) {
      console.error("No user data found in sessionStorage");
      return;
    }
    const user = JSON.parse(data);
    try {
      const response = await authInstance.get(
        `/admin/leaderBoard?organizationId=${user.orgId}`
      );
      console.log(response, "response");
      if(response?.status === 200){
        setData(response?.data?.leaders);
      }
    } catch (error) {
      console.log(error, "error");
    }
  };
  useEffect(() => {
    fetchAllLeaders();
  }, []);

  const medalIcons = [firstPlace, secondPlace, thirdPlace];
  return (
    <Box p={"15px 10px"}>
      <Typography fontSize={18} color="#252525">
        LeaderBoard
      </Typography>
      <Box mt={2}>
        {data?.map((ele, i) => {
          const showMedal = i < 3;
          return (
            <Box
              height={"45px"}
              display={"flex"}
              justifyContent={"space-around"}
            >
              {showMedal ? (
                <img
                  src={medalIcons[i]}
                  alt={`place-${i + 1}`}
                  width={24}
                  height={24}
                />
              ) : (
                <Typography width={24} textAlign="center">
                  {i + 1}
                </Typography>
              )}
              <Typography
                color={i === 1 ? "#606060" : "#606060"}
                fontSize={"16px"}
                fontWeight={i === 0 ? 600 : 400}
              >
                {ele?.name}
              </Typography>
              <Typography color="#D06513">
                <img src={gld} width={14} height={14} /> {ele?.pointBalance}
              </Typography>
            </Box>
          );
        })}
      </Box>
    </Box>
  );
};

export default LeaderBoard;
