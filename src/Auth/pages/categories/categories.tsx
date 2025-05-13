import Pagination from "../../../Components/Pagination/Pagination";
import React, { useEffect, useState } from "react";
import styled from "styled-components";
import axios from "axios";
import tshirt from "../../../Assets/products/Rectangle 3504.png";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import { Box, IconButton, Switch, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";
import CategoriesAddModal from "./categoriesAddModal";
import authInstance from "../../../authInstance";
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

type Category = {
  categoryId: string;
  image: string;
  name: string;
  description: string;
  featured: boolean;
  productCount: number;
};
const Categories = () => {
  const navigate = useNavigate();
  const [sortOrder, setSortOrder] = useState<string>("asc");
  const [filterCount, setFilterCount] = useState<number>(0);
  const [toggle1, setToggle1] = React.useState(true);
  const [categoryList, setCategoryList] = useState<Category[]>([]);
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [totalPages, setTotalPages] = useState(1);
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [openModel, setOpenModel] = useState(false);
  const handleClose = () => {
    setOpenModel(false);
  };

  useEffect(() => {
    fetchAllCategories();
  }, [searchTerm, page]);

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
  };

  const handleSortToggle = () => {
    setSortOrder((prev) => (prev === "asc" ? "desc" : "asc"));
  };

  const handleFilterToggle = () => {
    setOpenModel(true);
  };

  const navigateToDetails = (id: string) => {};

  const fetchAllCategories = async () => {
    try {
      const response = await authInstance.get(
        `/superAdmin/category/list?key=${searchTerm}&page=${page}&pageSize=${pageSize}`
      );
      if (response?.status == 200) {
        const filteredData = response?.data?.filter(
          (item: any) => item?.isSubCategory == false
        );
        setCategoryList(filteredData);
        const total = Math.ceil(filteredData?.length / pageSize);
        setTotalPages(total);
      }
    } catch (error) {
      console.log(error, "error");
    }
  };

  return (
    <div className="containr mt-3 p-3">
      <div style={{ display: "flex", justifyContent: "space-between" }}>
        <div>
          <Typography fontSize={18} fontWeight={500} color="#0A090B">
            Category List
          </Typography>{" "}
          <br />
          <Typography mt={"-15px"} color="#4F4D55">
            List of all categories and its sub categories
          </Typography>
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
            <button onClick={handleFilterToggle} className="bg-blue btn buttn">
              + Categories
            </button>
          </div>
        </div>
      </div>
      <table className="table mt-4 ">
        <thead style={{ backgroundColor: "red !important" }}>
          <tr className="table-light">
            <Colortext>
              <Typography>CATEGORY</Typography>
            </Colortext>
            <Colortext>
              {" "}
              <Typography className="">SUBCATEGORY</Typography>
            </Colortext>
            <Colortext>
              {" "}
              <Typography>FEATURED PRODUCTS</Typography>
            </Colortext>
            <Colortext>
              {" "}
              <Typography>PRODUCTS</Typography>
            </Colortext>
            <Colortext>
              {" "}
              <Typography>FEATURED</Typography>
            </Colortext>
            <Colortext>
              {" "}
              <Typography>ACTION</Typography>
            </Colortext>
          </tr>
        </thead>
        <tbody className="tableBody">
          {categoryList?.map((category: Category, index) => (
            <tr key={index}>
              <Linktext onClick={() => navigateToDetails(category?.categoryId)}>
                <Box
                  sx={{ display: "flex", alignItems: "center", gap: "20px" }}
                  className="customerId"
                >
                  <Box height={"62px"} width={"62px"}>
                    <img width={"100%"} src={category?.image} alt="icon" />
                  </Box>
                  <Box>
                    <Typography sx={{ fontSize: "16px",  }}>
                      {category?.name}
                    </Typography>
                    <Typography
                      fontWeight={"400"}
                      sx={{ fontSize: "14px", color: "#B2B2B2" }}
                    >
                      {category?.description}
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
                  432
                </Typography>
              </Colortext>
              <Linktext>
                <Typography
                  fontSize={"14px"}
                  fontWeight={"400"}
                  color="#4F4D55"
                >
                  543
                </Typography>
              </Linktext>
              <Linktext>
                <Typography
                  fontSize={"14px"}
                  fontWeight={"400"}
                  color="#4F4D55"
                >
                  {category?.productCount}
                </Typography>
              </Linktext>

              <Colortext>
                <Switch
                  checked={category?.featured}
                  onChange={() => setToggle1(!toggle1)}
                  sx={{
                    "& .MuiSwitch-switchBase.Mui-checked": {
                      color: "blue",
                    },
                    "& .MuiSwitch-switchBase.Mui-checked + .MuiSwitch-track": {
                      backgroundColor: "blue",
                    },
                  }}
                />
              </Colortext>
              <Colortext>
                <IconButton>
                  <MoreVertIcon />
                </IconButton>
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
      {openModel && <CategoriesAddModal handleClose={handleClose} />}
    </div>
  );
};

export default Categories;
