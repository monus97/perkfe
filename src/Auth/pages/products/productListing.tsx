import React, { useEffect, useState } from "react";
import styled from "styled-components";
import axios from "axios";
import "./product.css";
import tshirt from "../../../Assets/products/Rectangle 3504.png";
import {
  Box,
  Button,
  IconButton,
  Modal,
  Switch,
  Typography,
} from "@mui/material";
import { useNavigate } from "react-router-dom";

import MoreVertIcon from "@mui/icons-material/MoreVert";
import Pagination from "../../../Components/Pagination/Pagination";
import authInstance from "../../../authInstance";
import { format } from "date-fns";
const Clist = styled.div`
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
    font-size: 14px !important;
    font-weight: 600 !important;
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
  .search-box {
    width: 23rem;
  }
  .bg-blue {
    background-color: #0039f4;
    color: #fff;
  }
  .buttn {
    display: flex;
    gap: 10px;
    align-items: center;
    border: 1px solid #edecec;
  }
`;
const Colortext = styled.th`
  color: #575e78 !important;
  padding: 20px !important;

  .deletebtn {
    cursor: pointer;
  }
  .wi {
    width: 25%;
  }
`;

const Linktext = styled.th`
  color: #575e78 !important;
  padding: 20px !important;

  .customerId {
    cursor: pointer;
  }
`;

const Title = styled.span`
  font-size: 18px;
  font-weight: 500;
`;

const Subtitle = styled.span`
  font-size: 14px;
  font-weight: 400;
`;

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 5,
};
const ProductList = () => {
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [sortOrder, setSortOrder] = useState<string>("asc");
  const [filterCount, setFilterCount] = useState<number>(0);
  const [customerList, setCustomerList] = useState<any[]>([]);
  const [toggle1, setToggle1] = React.useState(true);
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [totalPages, setTotalPages] = useState(1);
  const [modalValue, setModalValue] = useState<any>({});
  const navigate = useNavigate();
  useEffect(() => {
    getCustomerList();
    fetchAllProducts();
  }, [searchTerm, page]);

  function formatDate(date: any) {
    const d = new Date(date); // Convert the date string to a Date object
    const day = String(d.getDate()).padStart(2, "0"); // Get day and pad with leading zero if needed
    const month = String(d.getMonth() + 1).padStart(2, "0"); // Get month (add 1 since months are 0-based)
    const year = d.getFullYear(); // Get the full year

    return `${day}-${month}-${year}`; // Return in dd-mm-yyyy format
  }

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
  };

  const handleSortToggle = () => {
    setSortOrder((prev) => (prev === "asc" ? "desc" : "asc"));
  };

  const handleFilterToggle = () => {
    navigate("/store/products/addproduct");
  };
  const deleteCustomer = (id: string) => {
    axios
      .delete(`${process.env.REACT_APP_BASE_URL}/admin/customer/${id}`, {
        headers: {
          Authorization: `Bearer ${sessionStorage.getItem("token")}`,
        },
      })
      .then((res) => {
        if (res.status == 200) {
          getCustomerList();
        }
      })
      .catch((error) => {
        if (error.response) {
          console.error("Error response:", error.response);
        }
      });
  };
  const [productLists, setProductsList] = useState<any[]>([]);
  const fetchAllProducts = async () => {
    try {
      const response = await authInstance.get(`/superAdmin/products/list`);
      if (response?.status == 200) {
        setProductsList(response?.data?.data);
      }
    } catch (error) {}
  };
  const navigateToDetails = (id: string) => {
    console.log(id, "id");
    navigate(`/store/products/${id}`);
  };

  const getCustomerList = () => {
    axios
      .get(
        `${process.env.REACT_APP_BASE_URL}/admin/customer/list?key=${searchTerm}&page=${page}&pageSize=${pageSize}`,
        {
          headers: {
            Authorization: `Bearer ${sessionStorage.getItem("token")}`,
          },
        }
      )
      .then((res) => {
        if (res?.data?.data?.length > 0) {
          setCustomerList(res.data.data);
          const total = Math.ceil(res.data.totalDataCount / pageSize);
          setTotalPages(total);
        } else {
          setCustomerList([]);
        }
      })
      .catch((error) => {
        if (error.response) {
          console.error("Error response:", error.response);
        }
      });
  };

  const [open, setOpen] = React.useState(false);
  const handleOpen = (value: any) => {
    setModalValue(value);
    setOpen(true);
  };
  const handleClose = () => setOpen(false);

  return (
    <Clist>
      <div>
        <Modal
          open={open}
          onClose={handleClose}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box sx={style} style={{ borderRadius: "10px" }}>
            <Typography id="modal-modal-title" variant="h6" component="h2">
              Are you absolutely sure?
            </Typography>
            <Typography id="modal-modal-description" sx={{ mt: 2 }}>
              This action cannot be undone. This will permanently delete this
              user {modalValue?.name}?
            </Typography>
            <div
              className="d-flex mt-4"
              style={{ display: "flex", justifyContent: "space-between" }}
            >
              <div></div>
              <div>
                <button
                  onClick={handleClose}
                  className="btn me-3"
                  style={{ backgroundColor: "#F4F4F5" }}
                >
                  Cancel
                </button>
                <button
                  className="btn btn-danger"
                  onClick={() => deleteCustomer(modalValue?.customerId)}
                >
                  Delete
                </button>
              </div>
            </div>
          </Box>
        </Modal>
      </div>
      <div className="breadcrumb">
        <span>
          Dashboard
          <span className="p-3">{">"}</span>
        </span>
        <span>
          Store
          <span className="p-3">{">"}</span>
        </span>

        <span>products</span>
      </div>
      <div className="containr mt-3 p-3">
        <div style={{ display: "flex", justifyContent: "space-between" }}>
          <div>
            <Title>Products</Title> <br />
            <Subtitle>All Products and details listed below</Subtitle>
          </div>
          <div className="search-sort-filter">
            <div className="search-box">
              <input
                type="text"
                placeholder="Search"
                value={searchTerm}
                onChange={handleSearchChange}
                className="search-field"
              />
            </div>
            <div className="buttons">
              <button onClick={handleSortToggle} className="btn buttn">
                <svg
                  width="20"
                  height="20"
                  viewBox="0 0 20 20"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fill-rule="evenodd"
                    clip-rule="evenodd"
                    d="M13.334 4.375C13.5031 4.375 13.665 4.44352 13.7827 4.56491L17.116 8.00241C17.3563 8.25021 17.3502 8.64589 17.1024 8.88619C16.8546 9.12648 16.4589 9.12039 16.2186 8.87259L13.959 6.54233L13.959 15C13.959 15.3452 13.6792 15.625 13.334 15.625C12.9888 15.625 12.709 15.3452 12.709 15L12.709 6.54233L10.4493 8.87259C10.209 9.12039 9.81336 9.12648 9.56556 8.88619C9.31776 8.64589 9.31167 8.25021 9.55196 8.00241L12.8853 4.56491C13.003 4.44352 13.1649 4.375 13.334 4.375ZM6.66732 4.375C7.0125 4.375 7.29232 4.65482 7.29232 5L7.29232 13.4577L9.55196 11.1274C9.79226 10.8796 10.1879 10.8735 10.4357 11.1138C10.6835 11.3541 10.6896 11.7498 10.4493 11.9976L7.11601 15.4351C6.99829 15.5565 6.83641 15.625 6.66732 15.625C6.49822 15.625 6.33634 15.5565 6.21863 15.4351L2.8853 11.9976C2.645 11.7498 2.65109 11.3541 2.89889 11.1138C3.1467 10.8735 3.54238 10.8796 3.78267 11.1274L6.04232 13.4577L6.04232 5C6.04232 4.65482 6.32214 4.375 6.66732 4.375Z"
                    fill="#828BB9"
                  />
                </svg>

                {sortOrder === "asc" ? "Sort" : "Sort"}
              </button>
              <button onClick={handleFilterToggle} className="btn buttn">
                <svg
                  width="20"
                  height="20"
                  viewBox="0 0 20 20"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fill-rule="evenodd"
                    clip-rule="evenodd"
                    d="M18.959 5.8335C18.959 6.17867 18.6792 6.4585 18.334 6.4585L1.66732 6.4585C1.32214 6.4585 1.04232 6.17867 1.04232 5.8335C1.04232 5.48832 1.32214 5.2085 1.66732 5.2085L18.334 5.2085C18.6792 5.2085 18.959 5.48832 18.959 5.8335Z"
                    fill="#828BB9"
                  />
                  <path
                    fill-rule="evenodd"
                    clip-rule="evenodd"
                    d="M16.459 10C16.459 10.3452 16.1792 10.625 15.834 10.625L4.16732 10.625C3.82214 10.625 3.54232 10.3452 3.54232 10C3.54232 9.65482 3.82214 9.375 4.16732 9.375L15.834 9.375C16.1792 9.375 16.459 9.65482 16.459 10Z"
                    fill="#828BB9"
                  />
                  <path
                    fill-rule="evenodd"
                    clip-rule="evenodd"
                    d="M13.959 14.1665C13.959 14.5117 13.6792 14.7915 13.334 14.7915L6.66732 14.7915C6.32214 14.7915 6.04232 14.5117 6.04232 14.1665C6.04232 13.8213 6.32214 13.5415 6.66732 13.5415H13.334C13.6792 13.5415 13.959 13.8213 13.959 14.1665Z"
                    fill="#828BB9"
                  />
                </svg>
                {"   "} Filter({filterCount})
              </button>
              <button
                onClick={handleFilterToggle}
                className="bg-blue btn buttn"
              >
                + Products
              </button>
            </div>
          </div>
        </div>
        <table className="table mt-4 ">
          <thead style={{ backgroundColor: "red !important" }}>
            <tr className="table-light">
              <Colortext>
                <Typography>PRODUCT</Typography>
              </Colortext>
              <Colortext>
                {" "}
                <Typography className="wi">DESCRIPTION</Typography>
              </Colortext>
              <Colortext>
                {" "}
                <Typography>CATEGORY</Typography>
              </Colortext>
              <Colortext>
                {" "}
                <Typography>STOCK</Typography>
              </Colortext>
              <Colortext>
                {" "}
                <Typography>PRICE</Typography>
              </Colortext>
              <Colortext>
                {" "}
                <Typography>CREATED DATE</Typography>
              </Colortext>
              <Colortext>
                {" "}
                <Typography>DEAL OF THE DAY</Typography>
              </Colortext>
              <Colortext>
                {" "}
                <Typography>ACTION</Typography>
              </Colortext>
            </tr>
          </thead>
          <tbody className="tableBody">
            {productLists.map((prd, index) => (
              <tr key={index}>
                <Linktext
                  onClick={() => navigateToDetails(prd?.productId)}
                >
                  <Box
                    sx={{ display: "flex", alignItems: "center", gap: "20px" }}
                    className="customerId"
                  >
                    <Box height={"62px"} width={"62px"}>
                      <img width={"100%"} src={prd?.images[0]} alt="icon" />
                    </Box>
                    <Box>
                      <Typography sx={{ fontSize: "16px", color: "#4160FC" }}>
                        {prd?.productName}
                      </Typography>
                      <Typography
                        fontWeight={"400"}
                        sx={{ fontSize: "14px", color: "#B2B2B2" }}
                      >
                        {prd?.brandName}
                      </Typography>
                    </Box>
                  </Box>
                </Linktext>
                <Colortext>
                  <Typography
                    sx={{
                      overflow: "hidden",
                      display: "-webkit-box",
                      WebkitLineClamp: 2, // number of lines to show
                      WebkitBoxOrient: "vertical",
                    }}
                    fontSize={"14px"}
                    fontWeight={"400"}
                    color="#4F4D55"
                    // className="wi"
                  >
                   {prd?.description}
                  </Typography>
                </Colortext>
                <Linktext>
                {
                  prd?.category?.map((cat: any, index: number) => (
                    
                  <Typography
                    fontSize={"14px"}
                    fontWeight={"400"}
                    color="#4F4D55"
                  >
                    {cat?.name}
                  </Typography>
                  ))
                }
                </Linktext>
                <Linktext>
                  <Box display={"flex"} gap={"8px"}>
                    <Box color={"#9A9AA6"}>
                      <Typography fontSize={"14px"} fontWeight={"400"}>
                        {"On Hand"}
                      </Typography>
                      <Typography fontSize={"14px"} fontWeight={"400"}>
                        {"Min"}
                      </Typography>
                      <Typography fontSize={"14px"} fontWeight={"400"}>
                        {"Max"}
                      </Typography>
                    </Box>
                    <Box color={"#4F4D55"}>
                      <Typography fontSize={"14px"} fontWeight={"400"}>
                       {prd?.onHandValue}
                      </Typography>
                      <Typography fontSize={"14px"} fontWeight={"400"}>
                        {500}
                      </Typography>
                      <Typography fontSize={"14px"} fontWeight={"400"}>
                        {1000}
                      </Typography>
                    </Box>
                  </Box>
                </Linktext>
                <Linktext>
                  {" "}
                  <Box display={"flex"} gap={"8px"}>
                    <Box color={"#9A9AA6"}>
                      <Typography fontSize={"14px"} fontWeight={"400"}>
                        {"Actual"}
                      </Typography>
                      <Typography fontSize={"14px"} fontWeight={"400"}>
                        {"Offer"}
                      </Typography>
                    </Box>
                    <Box color={"#4F4D55"}>
                      <Typography fontSize={"14px"} fontWeight={"400"}>
                        {prd?.actualPrice}
                      </Typography>
                      <Typography fontSize={"14px"} fontWeight={"400"}>
                        {prd?.offerPrice}
                      </Typography>
                    </Box>
                  </Box>
                </Linktext>
                <Colortext>
                  <Typography fontSize={"14px"} fontWeight={"400"}>
                  {prd?.createdAt ? format(new Date(prd.createdAt), "MM/dd/yyyy") : ""}
                  </Typography>
                </Colortext>
                <Colortext>
                  <Switch
                    checked={prd?.dealOfTheDay}
                    // onChange={() => setToggle1(!toggle1)}
                    sx={{
                      "& .MuiSwitch-switchBase.Mui-checked": {
                        color: "blue",
                      },
                      "& .MuiSwitch-switchBase.Mui-checked + .MuiSwitch-track":
                        {
                          backgroundColor: "blue",
                        },
                    }}
                  />
                </Colortext>
                <Colortext>
                  <IconButton>
                    <MoreVertIcon />
                  </IconButton>
                  {/* <span
                    className="deletebtn"
                    onClick={() => handleOpen(customer)}
                  >
                    <svg
                      width="20"
                      height="20"
                      viewBox="0 0 20 20"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        fill-rule="evenodd"
                        clip-rule="evenodd"
                        d="M4.2634 6.45975C4.60781 6.43679 4.90563 6.69738 4.92859 7.04179L5.31187 12.7911C5.38675 13.9143 5.44011 14.6958 5.55725 15.2838C5.67088 15.8542 5.82949 16.1561 6.05733 16.3692C6.28518 16.5824 6.59697 16.7206 7.17364 16.796C7.76814 16.8738 8.55148 16.875 9.67718 16.875H10.3217C11.4474 16.875 12.2307 16.8738 12.8252 16.796C13.4019 16.7206 13.7137 16.5824 13.9415 16.3692C14.1694 16.1561 14.328 15.8542 14.4416 15.2838C14.5587 14.6958 14.6121 13.9143 14.687 12.7911L15.0702 7.04179C15.0932 6.69738 15.391 6.43679 15.7354 6.45975C16.0799 6.48271 16.3404 6.78053 16.3175 7.12494L15.9313 12.9181C15.86 13.987 15.8025 14.8505 15.6675 15.528C15.5272 16.2324 15.2885 16.8208 14.7955 17.2821C14.3025 17.7433 13.6995 17.9423 12.9873 18.0355C12.3023 18.1251 11.4369 18.125 10.3656 18.125H9.63324C8.56191 18.125 7.69655 18.1251 7.01151 18.0355C6.2993 17.9423 5.69635 17.7433 5.20335 17.2821C4.71036 16.8208 4.47167 16.2324 4.33134 15.528C4.19636 14.8505 4.13881 13.987 4.06757 12.9181L3.68136 7.12494C3.6584 6.78053 3.91899 6.48271 4.2634 6.45975Z"
                        fill="#C63A22"
                      />
                      <path
                        fill-rule="evenodd"
                        clip-rule="evenodd"
                        d="M8.6288 1.87503L8.59049 1.87502C8.41016 1.8749 8.25306 1.8748 8.1047 1.89849C7.51862 1.99208 7.01146 2.35762 6.73734 2.88403C6.66795 3.01728 6.61836 3.16636 6.56145 3.33747L6.54935 3.37382L6.46844 3.61654C6.45262 3.66401 6.44821 3.67709 6.44437 3.6877C6.29844 4.09113 5.92009 4.36383 5.49121 4.3747C5.47993 4.37498 5.46612 4.37503 5.41609 4.37503H2.91602C2.57084 4.37503 2.29102 4.65485 2.29102 5.00003C2.29102 5.34521 2.57084 5.62503 2.91602 5.62503L5.42322 5.62503L5.43717 5.62503H14.5617L14.5756 5.62503L17.0828 5.62503C17.4279 5.62503 17.7078 5.34521 17.7078 5.00003C17.7078 4.65485 17.4279 4.37503 17.0828 4.37503H14.5828C14.5327 4.37503 14.5189 4.37498 14.5076 4.3747C14.0788 4.36383 13.7004 4.09111 13.5545 3.68768C13.5507 3.67715 13.5461 3.66378 13.5304 3.61654L13.4495 3.37382L13.4374 3.33745C13.3805 3.16634 13.3309 3.01727 13.2615 2.88403C12.9874 2.35762 12.4802 1.99208 11.8941 1.89849C11.7458 1.8748 11.5887 1.8749 11.4084 1.87502L11.37 1.87503H8.6288ZM7.61983 4.1129C7.5871 4.20337 7.54907 4.29085 7.50614 4.37503H12.4927C12.4498 4.29085 12.4117 4.20338 12.379 4.11292L12.3468 4.01846L12.2636 3.7691C12.1877 3.54117 12.1702 3.49469 12.1528 3.46137C12.0614 3.2859 11.8924 3.16405 11.697 3.13285C11.6599 3.12693 11.6103 3.12503 11.37 3.12503H8.6288C8.38854 3.12503 8.33892 3.12693 8.30181 3.13285C8.10645 3.16405 7.9374 3.2859 7.84602 3.46137C7.82867 3.49469 7.81118 3.54118 7.7352 3.7691L7.65203 4.01861C7.63951 4.05619 7.62977 4.08543 7.61983 4.1129Z"
                        fill="#C63A22"
                      />
                    </svg>
                  </span> */}
                </Colortext>
              </tr>
            ))}
          </tbody>
        </table>
        <Pagination
          currentPage={page}
          totalPages={totalPages}
          onPageChange={setPage}
        />
      </div>
    </Clist>
  );
};

export default ProductList;
