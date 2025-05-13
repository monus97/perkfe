import React, { useEffect, useState } from "react";
import {
  Typography,
  Paper,
  Grid,
  IconButton,
  Tabs,
  Tab,
  Box,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Avatar,
  Divider,
  Grid2,
  Button,
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import TShirt from "../../../../Assets/products/Rectangle 3504.png";
import Hoodie from "../../../../Assets/Organzations/Rectangle 3604.png";
import Pants from "../../../../Assets/Organzations/Rectangle 3604.png";
import Jeans from "../../../../Assets/Organzations/Rectangle 3604.png";
import { OrderStatus, OrderTrends } from "./orderStatus";
import gold from "../../../../Assets/Organzations/Vector.png";
import green from "../../../../Assets/Organzations/Vector (1).png";
import cart from "../../../../Assets/Organzations/Cart Large.png";
import file from "../../../../Assets/Organzations/file.png";
import SearchInput from "../../../../Components/common/searchInput";
import SortFilterButtons from "../../../../Components/common/sortingAndFiltering";
import mailio from "../../../../Assets/Organzations/mail.png";
import trashico from "../../../../Assets/Organzations/trash.png";
import call from "../../../../Assets/Organzations/call.png";
import imgae from "../../../../Assets/Organzations/Rectangle 3604.png";
import edit from "../../../../Assets/Organzations/PenIcon.png";
import Pagination from "../../../../Components/Pagination/Pagination";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import authInstance from "../../../../authInstance";
import { format } from "date-fns";
const TopBar = () => (
  <Box mb={3}>
    <Grid2 spacing={2} container size={{ xs: 12 }}>
      <Grid2
        border={"1.5px solid #F4F4F4"}
        p={2}
        borderRadius={"16px"}
        width={"100%"}
        display={"flex"}
        alignItems={"center"}
        size={{ xs: 12, md: 3 }}
        bgcolor={"#fff"}
      >
        <Box
          gap={1}
          width={"78%"}
          display={"flex"}
          borderRight={"0.8px solid #E4E4E4"}
        >
          <img src={cart} width={27} height={27} />
          <Typography color="#A9A9A9" fontSize={18} fontWeight={400}>
            Total Orders{" "}
          </Typography>
        </Box>
        <Typography
          width={"22%"}
          textAlign={"center"}
          fontSize={22}
          fontWeight={700}
          color="#4F4D55 "
        >
          16
        </Typography>
      </Grid2>
      <Grid2
        border={"1.5px solid #F4F4F4"}
        p={2}
        borderRadius={"16px"}
        width={"100%"}
        display={"flex"}
        alignItems={"center"}
        size={{ xs: 12, md: 3 }}
        bgcolor={"#fff"}
      >
        <Box
          gap={1}
          width={"78%"}
          display={"flex"}
          borderRight={"0.8px solid #E4E4E4"}
        >
          <img src={file} width={27} height={27} />
          <Typography color="#A9A9A9" fontSize={18} fontWeight={400}>
            Ongoing Tasks
          </Typography>
        </Box>
        <Typography
          width={"22%"}
          textAlign={"center"}
          fontSize={22}
          fontWeight={700}
          color="#4F4D55 "
        >
          16
        </Typography>
      </Grid2>
      <Grid2
        border={"1.5px solid #F4F4F4"}
        p={2}
        borderRadius={"16px"}
        width={"100%"}
        display={"flex"}
        alignItems={"center"}
        size={{ xs: 12, md: 3 }}
        bgcolor={"#fff"}
      >
        <Box
          gap={1}
          width={"50%"}
          display={"flex"}
          borderRight={"0.8px solid #E4E4E4"}
        >
          <Typography color="#4F4D55" fontSize={22} fontWeight={700}>
            <img src={green} width={27} height={27} /> 233
          </Typography>
        </Box>
        <Typography
          width={"50%"}
          textAlign={"center"}
          fontSize={22}
          fontWeight={700}
          color="#4F4D55 "
        >
          <img src={gold} width={27} /> 16
        </Typography>
      </Grid2>

      <Grid2
        border={"1.5px solid #F4F4F4"}
        p={2}
        borderRadius={"16px"}
        width={"100%"}
        display={"flex"}
        alignItems={"center"}
        size={{ xs: 12, md: 3 }}
        bgcolor={"#fff"}
        pl={1}
        gap={2}
      >
        <Avatar />
        <Typography fontSize={18} fontWeight={400} color="#4f4d55">
          Michael Green
        </Typography>
      </Grid2>
    </Grid2>
  </Box>
);

const TabBar = ({ tab, setTab }) => {
  return (
    <Box>
      <Tabs
        value={tab}
        onChange={(e, val) => setTab(val)}
        sx={{
          width: "fit-content",
          minHeight: "unset",
          "& .MuiTabs-indicator": {
            display: "none",
          },
        }}
      >
        {["Summary", "Recognition Tasks", "Orders", "Transactions"].map(
          (label, index) => (
            <Tab
              key={label}
              label={label}
              sx={{
                textTransform: "capitalize",
                backgroundColor: tab === index ? "#fff" : "transparent",
                borderBottom:
                  tab === index ? "3px solid #0039F4" : "transparent",
                color:
                  tab === index ? "#414141 !important" : "#7F8493 !important",
                minHeight: "unset",
                py: 1,
                px: 2,
              }}
            />
          )
        )}
      </Tabs>
    </Box>
  );
};

const GeneralDetails = ({ data }) => {
  const employee = data?.employee;

  if (!employee) return null;

  const details = {
    Email: employee.email,
    Contact: `+91 ${employee.mobile}`,
    "Street address": employee.street,
    City: employee.city,
    State: employee.state,
    Country: employee.country,
    "Postal code": employee.pincode,
  };

  return (
    <Paper elevation={0} sx={{ p: 3, height: "100%", borderRadius: 3 }}>
      <Box
        display="flex"
        justifyContent="space-between"
        alignItems="center"
        mb={2}
      >
        <Typography fontSize={18} color="#444444" fontWeight={500}>
          General Details
        </Typography>
        <IconButton>
          <EditIcon fontSize="small" />
        </IconButton>
      </Box>
      <Divider sx={{ mb: 2 }} />
      <Grid container spacing={2}>
        {Object.entries(details).map(([label, value], index) => (
          <Grid
            item
            xs={12}
            sm={label === "Street address" ? 12 : 6}
            key={index}
          >
            <Typography fontSize={14} color="#B5B5B5" fontWeight={400}>
              {label}
            </Typography>
            <Typography fontSize={16} color="#0A090B" fontWeight={400}>
              {value}
            </Typography>
          </Grid>
        ))}
      </Grid>
    </Paper>
  );
};

const products = [
  { name: "T shirt", quantity: 2, amount: 700, img: TShirt },
  { name: "T shirt", quantity: 2, amount: 700, img: TShirt },
  { name: "Hoodie-Grey", quantity: 2, amount: 700, img: Hoodie },
  { name: "Pants", quantity: 2, amount: 700, img: Pants },
  { name: "Jeans New", quantity: 2, amount: 700, img: Jeans },
];

const SearchAndFilter = ({ data }) => {
  return (
    <Box>
      <Grid2 container size={{ xs: 12 }} spacing={1}>
        <Grid2 size={{ xs: 12, md: 4.5 }}>
          <Typography color="#0A090B" fontSize={18} fontWeight={500}>
            {data?.title}
          </Typography>
          <Typography color="#4F4D55" fontSize={14} fontWeight={400}>
            {data?.desc}
          </Typography>
        </Grid2>
        <Grid2 size={{ xs: 12, md: 4.2 }}>
          <SearchInput />
        </Grid2>
        <Grid2
          display={"flex"}
          justifyContent={"center"}
          size={{ xs: 12, md: 3.3 }}
        >
          <SortFilterButtons />
        </Grid2>
      </Grid2>
    </Box>
  );
};

const LatestOrders = ({ data }) => {
  return (
    <Paper elevation={0} sx={{ p: 2, borderRadius: 3 }}>
      <>
        <Box display="flex" justifyContent="space-between" mb={2}>
          <Typography fontSize={18} color="#444444">
            Latest Orders
          </Typography>
          <Typography color="#0039F4" fontSize={14} sx={{ cursor: "pointer" }}>
            View more
          </Typography>
        </Box>
        {data?.latestOrders?.length === 0 ? (
          <Typography>No orders found</Typography>
        ) : (
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>SI.NO</TableCell>
                <TableCell>PRODUCT</TableCell>
                <TableCell>QUANTITY</TableCell>
                <TableCell>TOTAL AMT</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {products.map((p, index) => (
                <TableRow key={index}>
                  <TableCell>{index + 1}</TableCell>
                  <TableCell>
                    <Box display="flex" alignItems="center" gap={1}>
                      <Avatar
                        src={p.img}
                        variant="rounded"
                        sx={{ width: 30, height: 30 }}
                      />
                      <Box>
                        <Typography fontSize={16} color="#4F4D55">
                          {p.name}
                        </Typography>
                        <Typography fontSize={14} color="#B2B2B2">
                          Designed for...
                        </Typography>
                      </Box>
                    </Box>
                  </TableCell>
                  <TableCell fontSize={14} color="#4F4D55" fontWeight={400}>
                    x{p.quantity}
                  </TableCell>
                  <TableCell>
                    <Typography fontSize={12}>
                      <img
                        src={gold}
                        width={11}
                        height={11}
                        style={{ marginRight: "5px" }}
                      />
                      {p.amount}
                    </Typography>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        )}
      </>
    </Paper>
  );
};

const Recognition_Tasks = () => {
  const { id } = useParams();
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [totalPages, setTotalPages] = useState(1);
  const [RecognitionTasks, setRecognitionTasks] = useState([]);

  const fetchAllRecognitionTasks = async () => {
    try {
      const data = sessionStorage.getItem("user");
      const org_id = JSON.parse(data || "{}").orgId;
      const response = await authInstance.get(
        `/admin/recognition/list?orgId=${org_id}`
      );
      console.log(response, "response");
      if (response?.status == 200) {
        setRecognitionTasks(response?.data);
      }
    } catch (error) {
      console.log(error, "error");
    }
  };
  useEffect(() => {
    fetchAllRecognitionTasks();
  }, []);
  const data = {
    title: "Recognition Tasks",
    desc: "List of Tasks and their details",
  };
  return (
    <Box bgcolor={"#fff"} mt={3} p={2} borderRadius={"16px"}>
      <SearchAndFilter data={data} />
      <Box
        display={"flex"}
        mt={2}
        sx={{ cursor: "pointer" }}
        gap={1}
        height={"50vh"}
        flexDirection={"column"}
      >
        {RecognitionTasks?.map((task, i) => (
          <Grid2
            key={i}
            container
            p={2}
            size={{ xs: 12 }}
            border={"1px solid #E9E9E9"}
            borderRadius={"4px"}
          >
            <Grid2
              size={{ xs: 12, md: 0.5 }}
              display={"flex"}
              alignItems={"center"}
            >
              {i + 1}
            </Grid2>
            <Grid2 size={{ xs: 12, md: 2 }}>
              <Box display={"flex"} flexDirection={"column"}>
                <Typography
                  // onClick={() => handleNavigation(employee?.id)}
                  color="#4160FC"
                  fontSize={16}
                  fontWeight={500}
                >
                  {task.title}
                </Typography>
              </Box>
            </Grid2>
            <Grid2 size={{ xs: 12, md: 2.8 }}>
              <Box display={"flex"} alignItems={"center"} gap={1}>
                <Typography fontSize={14} fontWeight={400} color="#858585">
                  Assigned By:{" "}
                  <span style={{ color: "#4F4D55" }}>{task?.organization?.name}</span>
                </Typography>
              </Box>
            </Grid2>
            <Grid2 size={{ xs: 12, md: 3 }}>
              <Box display={"flex"} alignItems={"center"} gap={1}>
                <Typography fontSize={14} fontWeight={400} color="#858585">
                  Assigned On:
                  <span style={{ color: "#4F4D55" }}>{format(new Date(task?.createdAt), 'yyyy-MM-dd')}</span>
                </Typography>
              </Box>
            </Grid2>
            <Grid2 size={{ xs: 12, md: 1 }}>
              <Box display={"flex"} alignItems={"center"} gap={1}>
                <Typography fontSize={16} color="#3D3847" fontWeight={400}>
                  <img src={gold} width={14} height={14} />
                  {task?.points}
                </Typography>
              </Box>
            </Grid2>
            <Grid2 size={{ xs: 12, md: 1.5 }}>
              <Box display={"flex"} alignItems={"center"} gap={1}>
                <Button
                  sx={{
                    fontSize: "14px",
                    fontWeight: "400",
                    borderRadius: "4px",
                    color:
                      task?.status === "claimed"
                        ? "#930AFC"
                        : task?.status === "completed"
                        ? "#23BD40"
                        : "#3768E3",
                    bgcolor:
                      task?.status === "claimed"
                        ? "#F9E9FF"
                        : task?.status === "completed"
                        ? "#E6FDE5"
                        : "#E8EFFD",
                    textTransform: "capitalize",
                    padding: "0px 5px !important",
                  }}
                >
                  {task?.status}
                </Button>
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
const Orders = () => {
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [totalPages, setTotalPages] = useState(1);
  const navigate = useNavigate();
  const { id } = useParams();

  const fetchAllOrders = async () => {
    const data = sessionStorage.getItem("user");
    const org_id = JSON.parse(data || "{}").orgId;
    const response = await authInstance.get(
      `/user/order/list?organizationId=${org_id}`
    );
  };
  useEffect(() => {
    fetchAllOrders();
  }, []);
  const orderData = [
    {
      id: 1,
      name: "IT1235678",
      role: "Marketing Manager",
      email: "abc@samplemail.com",
      phone: "+91 9191919191",
      items: 5,
      completedTasks: 2,
      status: "shipped",
      coinsClaimed: 1500,
      greenCoins: 700,
    },
    {
      id: 2,
      name: "IT1235672",
      role: "Sales Lead",
      email: "sarah@example.com",
      phone: "+91 8888888888",
      items: 2,
      completedTasks: 5,
      status: "Cancelled",
      coinsClaimed: 1200,
      greenCoins: 850,
    },
    {
      id: 3,
      name: "IT1235643",
      role: "Product Designer",
      email: "john@designmail.com",
      phone: "+91 7777777777",
      items: 3,
      completedTasks: 4,
      status: "Out of Delivery",
      coinsClaimed: 1100,
      greenCoins: 640,
    },
    {
      id: 4,
      name: "IT1233443",
      role: "Product Designer",
      email: "john@designmail.com",
      phone: "+91 7777777777",
      items: 3,
      completedTasks: 4,
      status: "delivered",
      coinsClaimed: 1100,
      greenCoins: 640,
    },
    {
      id: 4,
      name: "IT1235443",
      role: "Product Designer",
      email: "john@designmail.com",
      phone: "+91 7777777777",
      items: 2,
      completedTasks: 4,
      status: "Accepted",
      coinsClaimed: 1100,
      greenCoins: 640,
    },
  ];

  const handleNavigation = (data) => {
    navigate(`/employees/${id}/${data}`);
  };
  const data = {
    title: "Orders",
    desc: "List of Orders and their details",
  };
  return (
    <Box bgcolor={"#fff"} mt={3} p={2} borderRadius={"16px"}>
      <SearchAndFilter data={data} />
      <Box
        display={"flex"}
        mt={2}
        sx={{ cursor: "pointer" }}
        gap={1}
        height={"50vh"}
        flexDirection={"column"}
      >
        {orderData?.map((employee, i) => (
          <Grid2
            key={i}
            container
            p={2}
            size={{ xs: 12 }}
            border={"1px solid #E9E9E9"}
            borderRadius={"4px"}
          >
            <Grid2
              size={{ xs: 12, md: 0.5 }}
              display={"flex"}
              alignItems={"center"}
            >
              {i + 1}
            </Grid2>
            <Grid2 size={{ xs: 12, md: 2 }}>
              <Box display={"flex"} flexDirection={"column"}>
                <Typography
                  onClick={() => handleNavigation(employee?.id)}
                  color="#4160FC"
                  fontSize={16}
                  fontWeight={500}
                >
                  {employee.name}
                </Typography>
              </Box>
            </Grid2>
            <Grid2 size={{ xs: 12, md: 1 }}>
              <Box display={"flex"} alignItems={"center"} gap={1}>
                <Typography fontSize={14} fontWeight={400} color="#858585">
                  Items:{" "}
                  <span style={{ color: "#4160FC" }}>{employee.items}</span>
                </Typography>
              </Box>
            </Grid2>
            <Grid2 size={{ xs: 12, md: 3 }}>
              <Box display={"flex"} alignItems={"center"} gap={1}>
                <Typography fontSize={14} fontWeight={400} color="#858585">
                  Ordered On:
                  <span style={{ color: "#4F4D55", marginLeft: "5px" }}>
                    02/03/2025
                  </span>
                </Typography>
              </Box>
            </Grid2>
            <Grid2 size={{ xs: 12, md: 3 }}>
              <Box display={"flex"} alignItems={"center"} gap={1}>
                <Typography fontSize={14} fontWeight={400} color="#858585">
                  Delivery Date:
                  <span style={{ color: "#4F4D55", marginLeft: "5px" }}>
                    02/03/2025
                  </span>
                </Typography>
              </Box>
            </Grid2>
            <Grid2 size={{ xs: 12, md: 1 }}>
              <Box display={"flex"} alignItems={"center"} gap={1}>
                <Typography fontSize={16} color="#3D3847" fontWeight={400}>
                  <img src={gold} width={14} height={14} />
                  {employee.coinsClaimed}
                </Typography>
              </Box>
            </Grid2>
            <Grid2 size={{ xs: 12, md: 1.5 }}>
              <Box display={"flex"} alignItems={"center"} gap={1}>
                <Button
                  sx={{
                    fontSize: "14px",
                    fontWeight: "400",
                    borderRadius: "4px",
                    color:
                      employee?.status === "shipped"
                        ? "#F39B0F"
                        : employee?.status === "delivered"
                        ? "#23BD40"
                        : employee?.status === "Cancelled"
                        ? "#E24B42"
                        : employee?.status === "Accepted"
                        ? "#068BE5"
                        : "#2243EF",
                    bgcolor:
                      employee?.status === "shipped"
                        ? "#FCECD3"
                        : employee?.status === "delivered"
                        ? "#E6FDE5"
                        : employee?.status === "Cancelled"
                        ? "#FFE6E5"
                        : employee?.status === "Accepted"
                        ? "#E1F1FC"
                        : "#E8EBFF",
                    textTransform: "capitalize",
                    padding: "0px 5px !important",
                  }}
                >
                  {employee?.status}
                </Button>
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
const Transactions = () => {
  const {id} = useParams()
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [totalPages, setTotalPages] = useState(1);
  const fetchAllOrders = async () => {
    const data = sessionStorage.getItem("user");
    const org_id = JSON.parse(data || "{}").orgId;
    const response = await authInstance.get(
      `/superAdmin/transactions/list?userId=${id}`
    );
    console.log(response, "response");
  };
  useEffect(() => {
    fetchAllOrders();
  }, []);
  const employeeData = [
    {
      id: 1,
      name: "Michael Green",
      title: "IT1235678",
      orderId: "r1435665",
      role: "Marketing Manager",
      email: "abc@samplemail.com",
      phone: "+91 9191919191",
      pendingTasks: 2,
      completedTasks: 2,
      status: "processing",
      coinsClaimed: 1500,
      greenCoins: 700,
      image: imgae,
    },
    {
      id: 2,
      name: "Sarah Smith",
      title: "t51125678",
      orderId: "r1435665",
      role: "Sales Lead",
      email: "sarah@example.com",
      phone: "+91 8888888888",
      pendingTasks: 1,
      completedTasks: 5,
      status: "completed",
      coinsClaimed: 1200,
      greenCoins: 850,
      image: imgae,
    },
    {
      id: 3,
      name: "John Doe",
      title: "IT1435612",
      orderId: "r1435665",
      role: "Product Designer",
      email: "john@designmail.com",
      phone: "+91 7777777777",
      pendingTasks: 0,
      completedTasks: 4,
      status: "processing",
      coinsClaimed: 1100,
      greenCoins: 640,
      image: imgae,
    },
  ];
  const data = {
    title: "Transactions",
    desc: "List of Transctions and their details",
  };
  return (
    <Box bgcolor={"#fff"} mt={3} p={2} borderRadius={"16px"}>
      <SearchAndFilter data={data} />
      <Box
        display={"flex"}
        mt={2}
        sx={{ cursor: "pointer" }}
        gap={1}
        height={"50vh"}
        flexDirection={"column"}
      >
        {employeeData?.map((employee, i) => (
          <Grid2
            key={i}
            container
            p={2}
            size={{ xs: 12 }}
            border={"1px solid #E9E9E9"}
            borderRadius={"4px"}
          >
            <Grid2
              size={{ xs: 12, md: 0.5 }}
              display={"flex"}
              alignItems={"center"}
            >
              {i + 1}
            </Grid2>
            <Grid2 size={{ xs: 12, md: 2 }}>
              <Box display={"flex"} flexDirection={"column"}>
                <Typography
                  // onClick={() => handleNavigation(employee?.id)}
                  color="#4F4D55"
                  fontSize={16}
                  fontWeight={500}
                >
                  {employee.title}
                </Typography>
              </Box>
            </Grid2>
            <Grid2 size={{ xs: 12, md: 3 }}>
              <Box display={"flex"} alignItems={"center"} gap={1}>
                <Typography fontSize={14} fontWeight={400} color="#858585">
                  Order ID:
                  <span style={{ color: "#4160FC" }}>{employee.orderId}</span>
                </Typography>
              </Box>
            </Grid2>
            <Grid2 size={{ xs: 12, md: 3.3 }}>
              <Box display={"flex"} alignItems={"center"} gap={1}>
                <Typography fontSize={14} fontWeight={400} color="#858585">
                  Date & Time:
                  <span style={{ color: "#4F4D55", marginLeft: "5px" }}>
                    02/03/2025 - 02:30PM
                  </span>
                </Typography>
              </Box>
            </Grid2>
            <Grid2 size={{ xs: 12, md: 1.3 }}>
              <Box display={"flex"} alignItems={"center"} gap={1}>
                <Typography fontSize={16} color="#3D3847" fontWeight={400}>
                  <img src={gold} width={14} height={14} />
                  {employee.coinsClaimed}
                </Typography>
              </Box>
            </Grid2>
            <Grid2 size={{ xs: 12, md: 1.8 }}>
              <Box display={"flex"} alignItems={"center"} gap={1}>
                <Button
                  sx={{
                    fontSize: "14px",
                    fontWeight: "400",
                    borderRadius: "4px",
                    color:
                      employee?.status === "claimed"
                        ? "#930AFC"
                        : employee?.status === "completed"
                        ? "#23BD40"
                        : "#2F37E1",
                    bgcolor:
                      employee?.status === "claimed"
                        ? "#F9E9FF"
                        : employee?.status === "completed"
                        ? "#E6FDE5"
                        : "#EDEAFF",
                    textTransform: "capitalize",
                    padding: "0px 5px !important",
                  }}
                >
                  {employee?.status}
                </Button>
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

const EmployeeDetailing = () => {
  const { id } = useParams();
  const [tab, setTab] = React.useState(0);
  const [data, setData] = useState(null);
  const fetchDetailsById = async (id) => {
    const response = await authInstance.get(`/admin/customer/${id}`);
    if (response.status === 200) {
      setData(response?.data);
    }
  };

  useEffect(() => {
    fetchDetailsById(id);
  }, []);
  return (
    <Box sx={{ minHeight: "100vh", p: 3 }}>
      <TopBar />
      <TabBar tab={tab} setTab={setTab} />
      {tab === 0 && (
        <>
          <Grid container spacing={3} mt={2}>
            <Grid item xs={12} md={6}>
              <GeneralDetails data={data} />
            </Grid>
            <Grid item xs={12} md={6}>
              <LatestOrders data={data} />
            </Grid>
          </Grid>
          <Grid container spacing={3} mt={1}>
            <Grid item xs={12} md={6}>
              <OrderStatus data={data} />
            </Grid>
            <Grid item xs={12} md={6}>
              <OrderTrends data={data} />
            </Grid>
          </Grid>
        </>
      )}
      {tab === 1 && <Recognition_Tasks />}
      {tab === 2 && <Orders />}
      {tab === 3 && <Transactions />}
    </Box>
  );
};

export default EmployeeDetailing;
