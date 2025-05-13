import React, { useEffect, useState } from "react";
import styled from "styled-components";
import axios from "axios";
// import "./product.css";

import {
  Box,
  Modal,
  Typography,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import Categories from "./categories/categories";
import SubCategories from "./categories/subCategories";

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
const ProductCategories = () => {
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [customerList, setCustomerList] = useState<any[]>([]);
  const [page, setPage] = useState(1);
  const tabs = ["Categories", "SubCategories"];
    const [selected, setSelected] = useState("Categories");
  const [pageSize, setPageSize] = useState(10);
  const [totalPages, setTotalPages] = useState(1);
  const [modalValue, setModalValue] = useState<any>({});
  const navigate = useNavigate();
  useEffect(() => {
    getCustomerList();
  }, [searchTerm, page]);

  const tabChange = (tab: string) => {
    setSelected(tab);
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
      {selected === "Categories" && <Categories />}
      {selected === "SubCategories" && <SubCategories />}
    </Clist>
  );
};

export default ProductCategories;
