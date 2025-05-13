import { Box, Button, Grid2, Typography } from "@mui/material";
import SearchInput from "../../common/searchInput";
import SortFilterButtons from "../../common/sortingAndFiltering";
import Org_Employee_List from "./org_Employee_list";
import AddEmployeeModal from "./addEmployee";
import { useEffect, useState } from "react";
import CoinGrantModal from "./grantCoinModal";
import authInstance from "../../../authInstance";

const Employees = () => {
  const [open, setOpen] = useState(false);
  const [openCoin, setOpencoin] = useState(false);
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [customerList, setCustomerList] = useState([]);
  const onClose = () => {
    setOpen(false);
    setOpencoin(false);
  };

  const handleOpen = () => {
    setOpen(true);
  };
  const handleOpenModal = () => {
    setOpencoin(true);
  };
  const data = sessionStorage.getItem("details");
  const details = JSON.parse(data || "{}");
  const fetchAllEmployees = async () => {
    try {
      const response = await authInstance.get(
        `/admin/customer/list?key=${searchTerm}&page=${page}&pageSize=${pageSize}&orgId=${details?.orgId}`
      );
      if (response?.status == 200) {
        setCustomerList(response?.data?.data);
      }
    } catch (error) {
      console.log(error, "error");
    }
  };

  useEffect(() => {
    fetchAllEmployees();
  }, []);

  return (
    <Box p={2} bgcolor={"#fff"} borderRadius={"16px"}>
      <Grid2 container size={{ xs: 12 }} spacing={1}>
        <Grid2 size={{ xs: 12, md: 3.8 }}>
          <Typography color="#0A090B" fontSize={18} fontWeight={500}>
            Employees
          </Typography>
          <Typography color="#4F4D55" fontSize={14} fontWeight={400}>
            List of Employees and their details
          </Typography>
        </Grid2>
        <Grid2 size={{ xs: 12, md: 3.4 }}>
          <SearchInput />
        </Grid2>
        <Grid2 size={{ xs: 12, md: 2.2 }}>
          <SortFilterButtons />
        </Grid2>
        <Grid2 size={{ xs: 12, md: 2.6 }}>
          <Box display={"flex"} gap={1}>
            <Button
              sx={{
                color: "#0039F4",
                fontSize: 14,
                border: "none",
                borderRadius: "6px",
                p: "8px 10px",
                bgcolor: "#F2F4FF",
                textTransform: "capitalize",
              }}
              onClick={handleOpenModal}
            >
              Grant Coins
            </Button>
            <Button
              sx={{
                color: "#fff",
                fontSize: 14,
                border: "none",
                borderRadius: "6px",
                p: "8px 10px",
                bgcolor: "#0039F4",
                textTransform: "capitalize",
              }}
              onClick={handleOpen}
            >
              + Employees
            </Button>
          </Box>
        </Grid2>
      </Grid2>
      <Box mt={4}>
        <Org_Employee_List customerList={customerList} />
      </Box>
      <AddEmployeeModal open={open} handleClose={onClose} />
      <CoinGrantModal
        details={details}
        open={openCoin}
        handleClose={onClose}
      />
    </Box>
  );
};

export default Employees;
