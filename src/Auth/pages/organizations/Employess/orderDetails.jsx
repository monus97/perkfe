import React, { useState } from "react";
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
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import FiberManualRecordIcon from "@mui/icons-material/FiberManualRecord";
import EditIcon from "@mui/icons-material/Edit";
import TShirt from "../../../../Assets/products/Rectangle 3504.png";
import Hoodie from "../../../../Assets/Organzations/Rectangle 3604.png";
import Pants from "../../../../Assets/Organzations/Rectangle 3604.png";
import Jeans from "../../../../Assets/Organzations/Rectangle 3604.png";
import { OrderStatus, OrderTrends } from "./orderStatus";
import gold from "../../../../Assets/Organzations/Vector.png";
import cart from "../../../../Assets/Organzations/Cart Large.png";
import status from "../../../../Assets/Organzations/Routing 2.png";
import file from "../../../../Assets/Organzations/file.png";
import star from "../../../../Assets/Organzations/starring.png";
import SearchInput from "../../../../Components/common/searchInput";
import SortFilterButtons from "../../../../Components/common/sortingAndFiltering";
import trashico from "../../../../Assets/Organzations/trash.png";
import imgae from "../../../../Assets/Organzations/Rectangle 3604.png";
import edit from "../../../../Assets/Organzations/PenIcon.png";
import Pagination from "../../../../Components/Pagination/Pagination";
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
          <img src={cart} width={29} height={27} />
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
          width={"78%"}
          display={"flex"}
          borderRight={"0.8px solid #E4E4E4"}
        >
          <img src={star} width={27} height={27} />
          <Typography color="#A9A9A9" fontSize={18} fontWeight={400}>
            Points Balance
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
          width={"60%"}
          display={"flex"}
          borderRight={"0.8px solid #E4E4E4"}
        >
          <img src={status} width={27} height={27} />
          <Typography color="#A9A9A9" fontSize={18} fontWeight={400}>
            Status
          </Typography>
        </Box>
        <Typography
          width={"40%"}
          textAlign={"center"}
          fontSize={18}
          color="#4F4D55 "
        >
          Accepted
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
        {["Details", "Items"].map((label, index) => (
          <Tab
            key={label}
            label={label}
            sx={{
              textTransform: "capitalize",
              backgroundColor: tab === index ? "#fff" : "transparent",
              borderBottom: tab === index ? "3px solid #0039F4" : "transparent",
              color:
                tab === index ? "#414141 !important" : "#7F8493 !important",
              minHeight: "unset",
              py: 1,
              px: 2,
            }}
          />
        ))}
      </Tabs>
    </Box>
  );
};

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

const Recognition_Tasks = () => {
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [totalPages, setTotalPages] = useState(1);
  const products = [
    { name: "T shirt", quantity: 2, amount: 700, img: TShirt },
    { name: "T shirt", quantity: 2, amount: 700, img: TShirt },
    { name: "Hoodie-Grey", quantity: 2, amount: 700, img: Hoodie },
    { name: "Pants", quantity: 2, amount: 700, img: Pants },
    { name: "Jeans New", quantity: 2, amount: 700, img: Jeans },
  ];
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

   
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>SI.NO</TableCell>
                <TableCell>PRODUCT</TableCell>
                <TableCell>SPECIFICATIONS</TableCell>
                <TableCell>UNIT PRICE</TableCell>
                <TableCell>QUANTITY</TableCell>
                <TableCell>NET AMT</TableCell>
                <TableCell>DISCOUNT</TableCell>
                <TableCell>TAX AMT</TableCell>
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
                    {p.quantity}
                  </TableCell>
                  <TableCell fontSize={14} color="#4F4D55" fontWeight={400}>
                    {350}
                  </TableCell>
                  <TableCell fontSize={14} color="#4F4D55" fontWeight={400}>
                    {p.quantity}
                  </TableCell>
                  <TableCell fontSize={14} color="#4F4D55" fontWeight={400}>
                    {700}
                  </TableCell>
                  <TableCell fontSize={14} color="#4F4D55" fontWeight={400}>
                    {"25%"}
                  </TableCell>
                  <TableCell fontSize={14} color="#4F4D55" fontWeight={400}>
                    {"5%"}
                  </TableCell>
                  <TableCell fontSize={14} color="#4F4D55" fontWeight={400}>
                    {700}
                  </TableCell>
                
                </TableRow>
              ))}
            </TableBody>
          </Table>
      </Box>
      <Pagination
        currentPage={page}
        totalPages={totalPages}
        onPageChange={setPage}
      />
    </Box>
  );
};

const InfoBlock = ({ title, data }) => (
  <Paper elevation={0} sx={{ p: 3, borderRadius: 3 }}>
    <Typography fontSize={16} fontWeight={500} color="#0A090B" mb={2}>
      {title}
    </Typography>
    <Grid container spacing={2}>
      {Object.entries(data).map(([label, value], i) => (
        <Grid item xs={12} sm={label === "Street address" ? 12 : 6} key={i}>
          <Typography fontSize={13} fontWeight={400} color="#B5B5B5">
            {label}
          </Typography>
          <Typography fontSize={14} fontWeight={400} color="#0A090B">
            {value}
          </Typography>
        </Grid>
      ))}
    </Grid>
  </Paper>
);

const TrackOrder = () => {
  const steps = [
    { label: "Packed", location: "Zudio, Trivandrum", time: "11:30 PM" },
    { label: "Dispatched", location: "Zudio, Trivandrum" },
    { label: "Shipped", location: "Vizhinjam, Trivandrum" },
    { label: "Out for delivery", location: "Pattom, Trivandrum" },
    { label: "Delivered", location: "Sasthamangalam, Trivandrum" },
  ];
  return (
    <Paper elevation={0} sx={{ p: 3, borderRadius: 3 }}>
      <Typography fontSize={16} fontWeight={500} mb={2}>
        Track Order
      </Typography>
      <Box pl={1}>
        {steps.map((step, idx) => (
          <Box key={idx} display="flex" alignItems="flex-start" mb={2}>
            <Box mr={1} mt={0.5}>
              {idx === 0 ? (
                <CheckCircleIcon color="success" fontSize="small" />
              ) : (
                <FiberManualRecordIcon
                  sx={{ color: "#b0b0b0" }}
                  fontSize="small"
                />
              )}
            </Box>
            <Box>
              <Typography fontWeight={500} fontSize={14}>
                {step.label}
              </Typography>
              <Typography variant="caption" color="textSecondary">
                {step.location}
              </Typography>
              {step.time && (
                <Typography variant="caption">{step.time}</Typography>
              )}
            </Box>
          </Box>
        ))}
      </Box>
    </Paper>
  );
};

const OrderSummaryPage = () => {
  const orderDetails = {
    "Order ID": "OR1232334",
    Status: "Packed",
    Seller: "Zudio ,Kollam",
    Contact: "+91 9028282828",
    "Delivery Date": "27/09/2024",
    "Created Date": "26/09/2024",
    "Shipment Track ID": "44AS455AD5",
    "Order Track ID": "44AS455AD5",
  };

  const customerDetails = {
    Email: "rajeshpvonline@email.com",
    Contact: "+91 9545555555",
    Organization: "NVS Pvt Ltd",
    "City/State": "Trivandrum",
  };

  const billingAddress = {
    "Street address":
      "Sasthamangalam Shree Dhanya Apex 31/747 Sasthamangalam Opp Alibaba And Dishes Sreedhanya Homes,",
    "City/State": "Trivandrum",
    "Postal code": "34677-4973",
    Contact: "+91 9545555555",
    Country: "India",
    "GST IN No": "GST459468413584",
  };

  return (
    <Box sx={{ bgcolor: "#f9f9fb", p: 3 }}>
      <Grid container spacing={3}>
        <Grid item xs={12} md={9}>
          <Grid container spacing={3}>
            <Grid item xs={12} md={6}>
              <InfoBlock title="Order Details" data={orderDetails} />
            </Grid>
            <Grid sx={{ height: "100%" }} item xs={12} md={6}>
              <Paper elevation={0} sx={{ p: 3, borderRadius: 3 }}>
                <Box display="flex" alignItems="center" gap={2}>
                  <Avatar
                    src="https://i.pravatar.cc/300"
                    sx={{ width: 60, height: 60 }}
                  />
                  <Box>
                    <Typography color="#414141" fontSize={16} fontWeight={500}>
                      Rajesh PV
                    </Typography>
                    <Typography color="#7A7A7A" fontSize={12}>
                      Trivandrum
                    </Typography>
                  </Box>
                </Box>
                <Divider sx={{ my: 2 }} />
                <Grid container spacing={2}>
                  {Object.entries(customerDetails).map(([label, value], i) => (
                    <Grid item xs={12} sm={6} key={i}>
                      <Typography
                        fontSize={13}
                        fontWeight={400}
                        color="#B5B5B5"
                      >
                        {label}
                      </Typography>
                      <Typography
                        fontSize={14}
                        fontWeight={400}
                        color="#0A090B"
                      >
                        {value}
                      </Typography>
                    </Grid>
                  ))}
                </Grid>
              </Paper>
            </Grid>
            <Grid item xs={12} md={6}>
              <InfoBlock title="Billing Address" data={billingAddress} />
            </Grid>
            <Grid item xs={12} md={6}>
              <InfoBlock title="Shipping Address" data={billingAddress} />
            </Grid>
          </Grid>
        </Grid>
        <Grid item xs={12} md={3}>
          <TrackOrder />
        </Grid>
      </Grid>
    </Box>
  );
};

const EmployeesOrderDetailing = () => {
  const [tab, setTab] = React.useState(0);
  console.log(tab, "tab");
  return (
    <Box sx={{ bgcolor: "#F9F9FB", minHeight: "100vh", p: 3 }}>
      <TopBar />
      <TabBar tab={tab} setTab={setTab} />
      {tab === 0 && (
        <>
          <OrderSummaryPage />
          {/* <Grid container spacing={3} mt={2}>
            <Grid item xs={12} md={6}>
          
            </Grid>
            <Grid item xs={12} md={6}>
         
            </Grid>
          </Grid>
          <Grid container spacing={3} mt={1}>
            <Grid item xs={12} md={6}>
            
            </Grid>
            <Grid item xs={12} md={6}>
         
            </Grid>
          </Grid> */}
        </>
      )}
      {tab === 1 && <Recognition_Tasks />}
    </Box>
  );
};

export default EmployeesOrderDetailing;
