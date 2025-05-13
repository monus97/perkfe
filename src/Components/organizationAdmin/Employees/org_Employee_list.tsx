import { Box, Grid2, Typography } from "@mui/material";
import gold from "../../../Assets/Organzations/Vector.png";
import green from "../../../Assets/Organzations/Vector (1).png";
import mailio from "../../../Assets/Organzations/mail.png";
import trashico from "../../../Assets/Organzations/trash.png";
import call from "../../../Assets/Organzations/call.png";
import edit from "../../../Assets/Organzations/PenIcon.png";
import Pagination from "../../Pagination/Pagination";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
interface Employee {
  id: string;
  customerId: string;
  name: string;
  email: string;
  mobile: string;
  image: string;
  role: string;
  pendingTasks: number;
  completedTasks: number;
  pointBalance: number;
  greenCoins: number;
}

type Props = {
  customerList: Employee[];
};

const Org_Employee_List: React.FC<Props> = ({ customerList }) => {
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const navigate = useNavigate();

  const handleNavigation = (id: any) => {
    navigate(`/employees/${id}`);
  };

  return (
    <Box bgcolor={"#fff"}>
      <Box
        height={"65vh"}
        display={"flex"}
        sx={{ cursor: "pointer" }}
        gap={1}
        flexDirection={"column"}
      >
        {customerList?.map((employee, i) => (
          <Grid2
            key={i}
            container
            p={1}
            size={{ xs: 12 }}
            border={"1px solid #E9E9E9"}
            borderRadius={"4px"}
          >
            <Grid2 size={{ xs: 12, md: 1 }}>
              <img
                width={69}
                height={69}
                src={employee?.image}
                style={{ borderRadius: "9px" }}
              />
            </Grid2>
            <Grid2 size={{ xs: 12, md: 2 }}>
              <Box display={"flex"} flexDirection={"column"} mt={1}>
                <Typography
                  onClick={() => handleNavigation(employee?.customerId)}
                  color="#4160FC"
                  fontSize={16}
                  fontWeight={500}
                >
                  {employee?.name}
                </Typography>
                <Typography color="#858585" fontSize={14} fontWeight={400}>
                  {employee?.role}
                </Typography>
              </Box>
            </Grid2>
            <Grid2 size={{ xs: 12, md: 2.3 }}>
              <Box mt={"8px"} display={"flex"} alignItems={"center"} gap={1}>
                <img width={13.33} height={13} src={mailio} />
                <Typography fontSize={14} fontWeight={400} color="#323131">
                  {employee?.email}
                </Typography>
              </Box>
              <Box mt={"5px"} display={"flex"} alignItems={"center"} gap={1}>
                <img width={13} height={13} src={call} />
                <Typography fontSize={14} fontWeight={400} color="#323131">
                  {employee?.mobile}
                </Typography>
              </Box>
            </Grid2>
            <Grid2 size={{ xs: 12, md: 3 }}>
              <Box
                mt={"5px"}
                justifyContent={"end"}
                display={"flex"}
                alignItems={"center"}
                gap={1}
              >
                <Typography fontSize={14} fontWeight={400} color="#858585">
                  Pending Recognition Tasks:
                </Typography>
                <Typography fontSize={16} color="#3D3847" fontWeight={400}>
                  {String(employee.pendingTasks).padStart(2, "0")}
                </Typography>
              </Box>
              <Box
                mt={"5px"}
                justifyContent={"end"}
                display={"flex"}
                alignItems={"center"}
                gap={1}
              >
                <Typography fontSize={14} fontWeight={400} color="#858585">
                  Completed Recognition Tasks:
                </Typography>
                <Typography fontSize={16} fontWeight={400} color="#3D3847">
                  {String(employee.completedTasks).padStart(2, "0")}
                </Typography>
              </Box>
            </Grid2>
            <Grid2 size={{ xs: 12, md: 2.5 }}>
              <Box
                mt={"5px"}
                justifyContent={"end"}
                display={"flex"}
                alignItems={"center"}
                gap={1}
              >
                <Typography fontSize={14} fontWeight={400} color="#858585">
                  Coins Claimed:
                </Typography>
                <Typography fontSize={16} color="#3D3847" fontWeight={400}>
                  <img src={gold} width={14} height={14} />
                  {employee?.pointBalance}
                </Typography>
              </Box>
              <Box
                mt={"5px"}
                justifyContent={"end"}
                display={"flex"}
                alignItems={"center"}
                gap={1}
              >
                <Typography fontSize={14} fontWeight={400} color="#858585">
                  Green Coins:
                </Typography>
                <Typography fontSize={16} fontWeight={400} color="#3D3847">
                  <img src={green} width={14} height={14} />
                  {employee.greenCoins}
                </Typography>
              </Box>
            </Grid2>
            <Grid2
              display={"flex"}
              justifyContent={"center"}
              alignItems={"center"}
              size={{ xs: 12, md: 1.2 }}
            >
              <Box display={"flex"} gap={2}>
                <img width={16} height={16} src={edit} />
                <img width={16} height={16} src={trashico} />
              </Box>
            </Grid2>
          </Grid2>
        ))}
      </Box>

      <Pagination
        currentPage={page}
        totalPages={totalPages}
        onPageChange={setPage}
      />
    </Box>
  );
};

export default Org_Employee_List;
