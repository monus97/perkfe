import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import styled from "styled-components";
import tshirt from "../../../Assets/products/Rectangle 3504.png";
import imgdumm from "../../../Assets/products/Group 289343.png";
import edit from "../../../Assets/products/Vector.png";
import {
  Chart as ChartJS,
  ArcElement,
  BarElement,
  CategoryScale,
  LinearScale,
  //   Tooltip,
  Legend,
} from "chart.js";
import {
  Box,
  Card,
  CardContent,
  Divider,
  Grid2,
  MenuItem,
  Modal,
  Select,
  Switch,
  Typography,
} from "@mui/material";
import {
  Area,
  Tooltip,
  AreaChart,
  ReferenceLine,
  ResponsiveContainer,
  XAxis,
  YAxis,
} from "recharts";
import authInstance from "../../../authInstance";

ChartJS.register(
  ArcElement,
  //   Tooltip,
  Legend,
  BarElement,
  CategoryScale,
  LinearScale
);

const Div = styled.div`
  .box {
    display: flex;
    padding: 20px;
    margin: 10px;
    border-radius: 10px;
    justify-content: space-between;
    background-color: #ffff;
    align-items: center;
  }
  .box-item {
    display: flex;
    align-items: center;
    gap: 10px;
  }
  .statusHead {
    display: flex;
    align-items: center;
  }
  .statusItem {
    cursor: pointer;
    position: relative;
    transition: all 0.3s ease;
    padding: 1rem 2rem;
    display: flex;
    align-items: center;
  }
  .selecteds {
    background-color: white;
    border-bottom: 3px solid #0039f4;
  }
  .statusItem p {
    margin-bottom: 0;
  }
  .card {
    border-radius: 10px;
    box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
    background-color: #ffff;
  }
  .detailsData strong {
    color: #b5b5b5;
    font-size: 14px;
    font-weight: 400;
  }
  .detailsData {
    font-size: 16px;
    font-weight: 400;
  }
  .card-title {
    font-size: 19px;
    font-weight: 500;
  }
  .org {
    display: flex;
    background-color: #f3f4f6;
    border-radius: 10px;
    padding: 10px;
    align-items: center;
  }
  .org img {
    margin: 0 10px;
  }
  .orderData {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    cursor: pointer;
  }
  .selectField {
    display: flex;
    flex-direction: column;
  }
  .select-dropdown {
    appearance: auto; /* Use default styling (including the default arrow) */
    -webkit-appearance: auto;
    -moz-appearance: auto;
    padding-right: 30px; /* Space to display the default arrow */
    width: 100%;
    padding: 10px 15px;
    font-size: 14px;
    border-radius: 5px;
    border: 1px solid #ccc;
    background-color: white;
    color: #333;
    cursor: pointer;
  }
  .input-group {
    width: 40%;
    display: flex;
  }
  .input-group-customeDate {
    width: auto;
    display: flex;
  }
  .custom-input {
    width: 80%;
  }
`;

const Link = styled.div`
  background-color: white;
  border-radius: 10px;
  .statusHead {
    display: flex;
    align-items: center;
  }
  .statusItem {
    cursor: pointer;
    position: relative;
    transition: all 0.3s ease;
    padding: 1rem 2rem;
    display: flex;
    align-items: center;
  }
  .selecteds {
    background-color: white;
    border-bottom: 3px solid #0039f4;
  }
  .statusItem p {
    margin-bottom: 0;
  }
  .containr {
    border-radius: 10px;
    background-color: white;
  }

  .table-light {
    font-size: 14px;
    font-weight: 600;
    background-color: #e8e8f3 !important;
    color: #575e78 !important;
  }
  .tableBody {
    font-size: 14px !important;
    font-weight: 400 !important;
  }
  .search-sort-filter {
    display: flex;
    align-items: center;
    gap: 10px;
  }
  .search-field {
    border-radius: 10px;
    background-color: #f2f2f8;
  }
  .buttons {
    display: flex;
    gap: 10px;
    align-items: center;
  }
  .buttn {
    display: flex;
    gap: 10px;
    align-items: center;
    border: 1px solid #edecec;
  }
  .attribute {
    font-size: 14px !important;
    font-weight: 400 !important;
  }
`;

const ProductDetails = () => {
  const [products, setProducts] = useState<any>(null);
  const [error, setError] = useState<string | null>(null);
  const { id } = useParams();
  const tabs = ["Summary", "Sales"];
  const [selected, setSelected] = useState("Summary");
  const [selectedOption, setSelectedOption] = useState("today");

  const tabChange = (tab: string) => {
    setSelected(tab);
  };
  useEffect(() => {
    if (id) {
      if (selected == "Summary") {
      }
    }
  }, [selectedOption]);

  useEffect(() => {
    // Get customer details only when the id changes
    if (id) {
      if (selected == "Summary") {
        getDetails();
      }
    }
  }, [id, selected]);

  const getDetails = async () => {
    const response = await authInstance.get(
      `${process.env.REACT_APP_BASE_URL}/superadmin/products/${id}`
    );
    if (response?.status == 200) {
      setProducts(response?.data);
    }
  };
  console.log(products, "products");
  // Show loading or error message based on the state
  if (error) {
    return <div>{error}</div>;
  }

  if (!products) {
    return <div>Loading...</div>;
  }

  const datas = [
    { hour: "01", sales: 120 },
    { hour: "02", sales: 80 },
    { hour: "03", sales: 50 },
    { hour: "04", sales: 30 },
    { hour: "05", sales: 40 },
    { hour: "06", sales: 60 },
    { hour: "07", sales: 100 },
    { hour: "08", sales: 160 },
    { hour: "09", sales: 200 },
    { hour: "10", sales: 190 },
    { hour: "11", sales: 160 },
    { hour: "12", sales: 140 },
    { hour: "13", sales: 130 },
    { hour: "14", sales: 150 },
    { hour: "15", sales: 170 },
    { hour: "16", sales: 210 },
    { hour: "17", sales: 200 },
    { hour: "18", sales: 170 },
    { hour: "19", sales: 150 },
    { hour: "20", sales: 145 },
    { hour: "21", sales: 140 },
    { hour: "22", sales: 130 },
    { hour: "23", sales: 125 },
    { hour: "24", sales: 120 },
  ];

  return (
    <Div>
      <div className="breadcrumb">
        <span>
          Dashboard
          <span className="p-3">{">"}</span>
        </span>
        <span>
          Customers
          <span className="seperator p-3">{">"}</span>
        </span>
        <span>{products?.productName}</span>
      </div>
      <div className="mt-4">
        <div className="row rounded p-3">
          <div className="col box">
            <div className="box-item">
              <svg
                width="32"
                height="32"
                viewBox="0 0 32 32"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M2.66602 4L3.01923 4.11774C4.77928 4.70442 5.65931 4.99776 6.16266 5.69613C6.66602 6.3945 6.66602 7.32213 6.66602 9.17738V12.6667C6.66602 16.4379 6.66602 18.3235 7.83759 19.4951C9.00916 20.6667 10.8948 20.6667 14.666 20.6667H25.3327"
                  stroke="#0039F4"
                  stroke-width="2"
                  stroke-linecap="round"
                />
                <path
                  d="M10 24C11.1046 24 12 24.8954 12 26C12 27.1046 11.1046 28 10 28C8.89543 28 8 27.1046 8 26C8 24.8954 8.89543 24 10 24Z"
                  stroke="#0039F4"
                  stroke-width="1.5"
                />
                <path
                  d="M22 24.0001C23.1046 24.0001 24 24.8955 24 26.0001C24 27.1047 23.1046 28.0001 22 28.0001C20.8954 28.0001 20 27.1047 20 26.0001C20 24.8955 20.8954 24.0001 22 24.0001Z"
                  stroke="#0039F4"
                  stroke-width="1.5"
                />
                <path
                  d="M14.666 12H10.666"
                  stroke="#0039F4"
                  stroke-width="1.5"
                  stroke-linecap="round"
                />
                <path
                  d="M6.66602 8H21.9332C24.6732 8 26.0431 8 26.636 8.89902C27.2288 9.79804 26.6891 11.0572 25.6098 13.5757L25.0383 14.909C24.5344 16.0848 24.2825 16.6727 23.7815 17.003C23.2806 17.3333 22.641 17.3333 21.3618 17.3333H6.66602"
                  stroke="#0039F4"
                  stroke-width="2"
                />
              </svg>
              <div className="p-0">Total Orders</div>
            </div>
            <strong>{products?.orderCountData?.totalCount}</strong>
          </div>
          <div className="col box">
            <div className="box-item">
              <svg
                width="32"
                height="32"
                viewBox="0 0 32 32"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M20.7696 4.50962L23.4363 5.90902C26.3052 7.41454 27.7396 8.1673 28.5362 9.51998C29.3327 10.8727 29.3327 12.5559 29.3327 15.9223V16.0783C29.3327 19.4448 29.3327 21.128 28.5362 22.4807C27.7396 23.8333 26.3052 24.5861 23.4363 26.0916L20.7696 27.491C18.4288 28.7194 17.2584 29.3337 15.9993 29.3337C14.7403 29.3337 13.5699 28.7195 11.2291 27.491L8.56241 26.0916C5.69352 24.5861 4.25907 23.8333 3.46254 22.4807C2.66602 21.128 2.66602 19.4448 2.66602 16.0783V15.9223C2.66602 12.5559 2.66602 10.8727 3.46254 9.51998C4.25907 8.1673 5.69352 7.41454 8.56241 5.90902L11.2291 4.50961C13.5699 3.2812 14.7403 2.66699 15.9993 2.66699C17.2584 2.66699 18.4288 3.2812 20.7696 4.50962Z"
                  stroke="#0039F4"
                  stroke-width="2"
                  stroke-linecap="round"
                />
                <path
                  d="M28 10L16 16M16 16L4 10M16 16V28.6667"
                  stroke="#0039F4"
                  stroke-width="2"
                  stroke-linecap="round"
                />
              </svg>
              <div>Total Items</div>
            </div>
            <strong>{products?.orderCountData?.totalItemsCount}</strong>
          </div>
          <div className="col box">
            <div className="box-item">
              <svg
                width="30"
                height="30"
                viewBox="0 0 30 30"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <g clip-path="url(#clip0_826_10484)">
                  <path
                    d="M15 30C6.725 30 0 23.275 0 15C0 6.725 6.725 0 15 0C23.275 0 30 6.725 30 15C30 23.275 23.275 30 15 30ZM15 1.25C7.4125 1.25 1.25 7.4125 1.25 15C1.25 22.5875 7.4125 28.75 15 28.75C22.5875 28.75 28.75 22.5875 28.75 15C28.75 7.4125 22.5875 1.25 15 1.25ZM10.925 21.25C10.6625 21.25 10.4 21.1625 10.175 21C9.75 20.6875 9.575 20.125 9.7375 19.625L10.9125 15.8625L7.95 13.45C7.5375 13.1 7.4 12.55 7.575 12.0625C7.75 11.575 8.225 11.25 8.75 11.25H12.5L13.825 7.6875C14 7.2125 14.4625 6.9125 15 6.9125C15.5375 6.9125 16 7.2125 16.175 7.6875L17.5 11.25H21.25C21.775 11.25 22.25 11.575 22.425 12.075C22.6 12.5625 22.4625 13.125 22.0625 13.45L19.1 15.8625L20.325 19.5875C20.4875 20.0875 20.325 20.65 19.9 20.9625C19.475 21.2875 18.9 21.3125 18.4625 21.025L15.025 18.7875L11.6375 21.05C11.425 21.1875 11.175 21.2625 10.9375 21.2625L10.925 21.25ZM8.75 12.4875L12.025 15.15C12.225 15.3125 12.3 15.575 12.225 15.825L10.925 20L14.65 17.5125C14.8625 17.375 15.125 17.375 15.3375 17.5125L19.125 19.975L17.7625 15.8375C17.675 15.5875 17.7625 15.325 17.9625 15.1625L21.2375 12.5H17.05C16.7875 12.5 16.55 12.3375 16.4625 12.0875L14.9875 8.1125L13.5125 12.0875C13.425 12.3375 13.1875 12.5 12.925 12.5H8.7375L8.75 12.4875Z"
                    fill="#0039F4"
                  />
                </g>
                <defs>
                  <clipPath id="clip0_826_10484">
                    <rect width="30" height="30" fill="white" />
                  </clipPath>
                </defs>
              </svg>
              <div>Total Purchases</div>
            </div>
            <strong>{products?.revenue}</strong>
          </div>
          <div className="col box">
            <div className="box-item">
              <img
                className="rounded-circle"
                src={products?.latestOrders?.images?.[0]}
                alt={products?.employee?.name}
                height="40px"
                width="40px"
              />
              <div>{products?.employee?.name}</div>
            </div>
          </div>
        </div>
      </div>
      <div className="statusHead">
        {tabs.map((tab) => (
          <div
            key={tab}
            className={`statusItem ${selected === tab ? "selecteds" : ""}`}
            onClick={() => tabChange(tab)}
          >
            <p>{tab}</p>
          </div>
        ))}
      </div>
      {selected == "Summary" && (
        <Link className="containr mt-3 p-3">
          <Grid2 container spacing={2} size={{ xs: 12, md: 12 }}>
            <Grid2 size={{ xs: 12, md: 4 }}>
              <Box display={"flex"} gap={2} flexDirection={"column"}>
                <Box
                  border={"1px solid #EBECF0"}
                  width={"308px"}
                  height={"308px"}
                  borderRadius={"8px"}
                  p={1}
                  display={"flex"}
                  justifyContent={"center"}
                >
                  <img width={"100%"} src={products?.images?.[0]} alt="img" />
                </Box>
                <Box display={"flex"} alignItems={"center"} gap={1}>
                  {products?.images
                    ?.slice(1, 5)
                    ?.map((img: any, index: number) => (
                      <Box
                        border={"1px solid #EBECF0"}
                        width={"70px"}
                        height={"70px"}
                        borderRadius={"8px"}
                        p={1}
                        display={"flex"}
                        justifyContent={"center"}
                      >
                        <img width={"100%"} src={img} alt="img" />
                      </Box>
                    ))}
                </Box>
                <Box display={"flex"} alignItems={"center"} gap={2}>
                  <Typography color="#B5B5B5">Sizes:</Typography>
                  <Box display={"flex"} textAlign={"center"} gap={1}>
                    {products?.attributes?.size?.map(
                      (size: any, index: number) => (
                        <Typography
                          key={index}
                          fontSize={"14px"}
                          fontWeight={"400"}
                          sx={{
                            border: "0.6px solid #8AA4FA",
                            borderRadius: "8px",
                            padding: "8px 0px",
                            width: "34px",
                            background: "#FBFBFB",
                          }}
                        >
                          {size?.size}
                        </Typography>
                      )
                    )}
                  </Box>
                </Box>
              </Box>
            </Grid2>
            <Grid2 size={{ xs: 12, md: 8 }}>
              <Box display={"flex"} justifyContent={"space-between"}>
                <Box>
                  <Typography fontSize={"26px"} fontWeight={"500"}>
                    {products?.productName}
                  </Typography>
                  <Typography mt={1} fontSize={"16px"} color={"#9E9E9E"}>
                    {products?.description}
                  </Typography>
                </Box>
                <Box display={"flex"} gap={1}>
                  <img
                    width={"15px"}
                    height={"15px"}
                    style={{ marginTop: "5px" }}
                    src={edit}
                    alt="img"
                  />{" "}
                  <Typography fontSize={"16px"} color="#414141">
                    Edit
                  </Typography>
                </Box>
              </Box>
              <Divider sx={{ my: 3 }} />
              <Grid2 container spacing={2}>
                <Grid2 size={{ md: 6 }}>
                  <Box
                    width={"100%"}
                    sx={{
                      background: "#FBFBFB",
                      borderRadius: "16px",
                      padding: "24px 22px",
                    }}
                  >
                    <Box display={"flex"} justifyContent={"space-around"}>
                      <Typography fontSize={"14px"} color={"#B5B5B5"}>
                        Actual Price
                      </Typography>{" "}
                      <Typography fontSize={"14px"} color={"#414141"}>
                        {products?.actualPrice}
                      </Typography>
                    </Box>
                    <Box
                      mt={2}
                      display={"flex"}
                      justifyContent={"space-around"}
                    >
                      <Typography fontSize={"14px"} color={"#B5B5B5"}>
                        Offer Price
                      </Typography>{" "}
                      <Typography fontSize={"14px"} color={"#414141"}>
                        {products?.offerPrice}
                      </Typography>
                    </Box>
                    <Box
                      mt={2}
                      display={"flex"}
                      justifyContent={"space-around"}
                    >
                      <Typography fontSize={"14px"} color={"#B5B5B5"}>
                        Tax(%)
                      </Typography>{" "}
                      <Typography
                        display={"flex"}
                        alignItems={"baseline"}
                        gap={2}
                        fontSize={"14px"}
                        color={"#414141"}
                      >
                        {products?.tax[0]}% GST{" "}
                        <Typography>
                          ( = ₹
                          {(
                            (products?.offerPrice ?? 0) *
                            (1 + (products?.tax?.[0] ?? 0) / 100)
                          ).toFixed(2)}{" "}
                          Incl. Taxes)
                        </Typography>
                      </Typography>
                    </Box>
                    <Box
                      mt={2}
                      display={"flex"}
                      justifyContent={"space-around"}
                    >
                      <Typography fontSize={"14px"} color={"#B5B5B5"}>
                        Category
                      </Typography>{" "}
                      {products?.category?.map((item: any, index: number) => (
                        <Typography
                          key={index}
                          fontSize={"14px"}
                          color={"#414141"}
                        >
                          {item?.name}
                        </Typography>
                      ))}
                    </Box>
                    <Box
                      mt={2}
                      display={"flex"}
                      justifyContent={"space-around"}
                    >
                      <Typography fontSize={"14px"} color={"#B5B5B5"}>
                        Sub Category
                      </Typography>{" "}
                      {products?.subCategory?.map(
                        (item: any, index: number) => (
                          <Typography
                            key={index}
                            fontSize={"14px"}
                            color={"#414141"}
                          >
                            {item?.name}
                          </Typography>
                        )
                      )}
                    </Box>
                  </Box>
                </Grid2>
                <Grid2 size={{ md: 6 }}>
                  <Box
                    width={"100%"}
                    height={"100%"}
                    sx={{
                      background: "#FBFBFB",
                      borderRadius: "16px",
                      padding: "24px 22px",
                    }}
                  >
                    <Box display={"flex"} justifyContent={"space-around"}>
                      <Typography fontSize={"16px"} color={"#0A090B"}>
                        Deal of the day?
                      </Typography>{" "}
                      <Typography fontSize={"14px"} color={"#414141"}>
                        <Switch checked={products?.dealOfTheDay}></Switch>
                      </Typography>
                    </Box>
                    <Box
                      mt={2}
                      display={"flex"}
                      justifyContent={"space-around"}
                    >
                      <Typography fontSize={"14px"} color={"#0A090B"}>
                        Prepaid
                      </Typography>{" "}
                      <Typography fontSize={"14px"} color={"#414141"}>
                        <Switch checked={products?.prepaid}></Switch>
                      </Typography>
                    </Box>
                    <Box
                      mt={2}
                      display={"flex"}
                      justifyContent={"space-around"}
                    >
                      <Typography fontSize={"14px"} color={"#0A090B"}>
                        Cash on Delivery
                      </Typography>{" "}
                      <Typography
                        display={"flex"}
                        alignItems={"baseline"}
                        gap={2}
                        fontSize={"14px"}
                        color={"#414141"}
                      >
                        <Switch checked={products?.cashOnDelivery}></Switch>
                      </Typography>
                    </Box>
                  </Box>
                </Grid2>
              </Grid2>
              <Box mt={3} display={"flex"} alignItems={"center"} gap={2}>
                <Typography color="#B5B5B5">Keywords:</Typography>
                <Box display={"flex"} textAlign={"center"} gap={1}>
                  {products?.keywordSearch?.map((item: any, index: number) => (
                    <Typography
                      key={index}
                      fontSize={"14px"}
                      fontWeight={"400"}
                      sx={{
                        border: "0.6px solid #8AA4FA",
                        borderRadius: "8px",
                        padding: "6px",
                        background: "#FBFBFB",
                      }}
                      color="#4F4D55"
                    >
                      {item}
                    </Typography>
                  ))}
                </Box>
              </Box>
            </Grid2>
          </Grid2>
        </Link>
      )}
      {selected == "Sales" && (
        <Link className="containr mt-3 p-3">
          <Card elevation={0} sx={{ borderRadius: 3 }}>
            <Box
              sx={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                mb: 1,
              }}
            >
              <Box>
                <Typography fontSize={"18px"} color="#0A090B" fontWeight="500">
                  Sales
                </Typography>
                <Typography color="#4F4D55" fontSize={"14px"}>
                  Graph of sales against time
                </Typography>
              </Box>
              <Select
                sx={{
                  border: "1px solid #EDECEC",
                  borderRadius: "4px",
                  fontSize: "14px !important",
                  ".MuiOutlinedInput-notchedOutline": {
                    border: "none",
                  },
                  "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
                    border: "2px solid #1976d2",
                  },
                }}
                size="small"
                defaultValue="today"
              >
                <MenuItem value="today">Today</MenuItem>
                <MenuItem value="yesterday">Yesterday</MenuItem>
                <MenuItem value="week">This Week</MenuItem>
              </Select>
            </Box>

            <CardContent sx={{ height: 300 }}>
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={datas}>
                  <defs>
                    <linearGradient id="colorSales" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#25B9DA" stopOpacity={0.5} />
                      <stop offset="95%" stopColor="#25B9DA" stopOpacity={0} />
                    </linearGradient>
                  </defs>
                  <XAxis
                    dataKey="hour"
                    tick={{ fill: "#8B8BA7", fontSize: "14px" }}
                    tickLine={false}
                  />
                  <YAxis
                    tickLine={false}
                    tick={{ fill: "#8B8BA7", fontSize: "14px" }}
                  />
                  <Tooltip />
                  <Area
                    type="monotone"
                    dataKey="sales"
                    stroke="#3f9ddf"
                    fillOpacity={1}
                    fill="url(#colorSales)"
                    strokeWidth={2}
                  />
                  {/* <ReferenceLine x="23" stroke="#1976d2" strokeWidth={3} />s */}
                </AreaChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </Link>
      )}
    </Div>
  );
};

export default ProductDetails;
