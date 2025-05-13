import axios from "axios";
import React, { useState, useEffect, ChangeEvent, DragEvent } from "react";
import { useNavigate, useParams } from "react-router-dom";
import styled from "styled-components";
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
import SearchIcon from "@mui/icons-material/Search";
import {
  Box,
  Button,
  Checkbox,
  Chip,
  FormControl,
  FormControlLabel,
  FormHelperText,
  Grid2,
  InputLabel,
  MenuItem,
  OutlinedInput,
  Select,
  TextField,
  Typography,
  InputAdornment,
} from "@mui/material";

import SizeSelectorCard from "./addProductAttributes";
import authInstance from "../../../authInstance";
import { toast } from "react-toastify";
import Loader from "../../../loader";

ChartJS.register(ArcElement, Legend, BarElement, CategoryScale, LinearScale);

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
type Category = {
  categoryId: string;
  _id: string;
  image: string;
  name: string;
  description: string;
  featured: boolean;
  isSubCategory: boolean;
};

type SizeAttribute = {
  size: string;
  value: string;
  unit: string;
};
type QuantityAttribute = {
  unit: string;
  value: string;
};
type ColorAttribute = {
  name: string;
  hex: string;
};

type Attributes = {
  size: SizeAttribute[];
  quantity: QuantityAttribute; // Changed from array to object
  color: ColorAttribute[];
};

interface FileWithPreview extends File {
  preview?: string;
}

interface UploadResponse {
  url: string;
  [key: string]: any; // for any additional properties in the response
}
const AddProduct = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const tabs = ["General Details", "Attributes"];
  const [selected, setSelected] = useState("General Details");
  const [loader, setLoader] = useState(false);
  const [creator_id, setCreator_id] = useState<{ _id?: string } | null>(null);
  const [categoryList, setCategoryList] = useState<Category[]>([]);
  const [selectedCategories, setSelectedCategories] = useState<Category[]>([]);
  const [selectedSubCategories, setSelectedSubCategories] = useState<
    Category[]
  >([]);
  const [selectedTax, setSelectedTax] = React.useState<string>("");
  const [dealOfTheDay, setDealOfTheDay] = useState<boolean>(false);
  const [prepaid, setPrepaid] = useState<boolean>(false);
  const [cashOnDelivery, setCashOnDelivery] = useState<boolean>(false);
  const [keywords, setKeywords] = React.useState([
    "Keyword one here",
    "Keyword two here",
  ]);
  const [attributes, setAttributes] = useState<Attributes>({
    size: [],
    quantity: { unit: "", value: "" }, // Changed from array to object
    color: [],
  });

  const initialState = {
    productName: "",
    description: "",
    brandName: "",
    actualPrice: "",
    offerPrice: "",
  };
  const [formData, setFormData] = useState(initialState);
  const { productName, description, brandName, actualPrice, offerPrice } =
    formData;
  const handleOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };
  const handleDelete = (chipToDelete: any) => {
    setKeywords((chips) => chips.filter((chip) => chip !== chipToDelete));
  };

  const tabChange = (tab: string) => {
    setSelected(tab);
  };

  const fetchAllCategories = async () => {
    try {
      const response = await authInstance.get(`/superAdmin/category/list`);
      if (response?.status == 200) {
        setCategoryList(response?.data);
      }
    } catch (error) {
      console.log(error, "error");
    }
  };

  useEffect(() => {
    fetchAllCategories();
    const data = sessionStorage.getItem("user");
    const parsed = JSON.parse(data || "{}");
    setCreator_id(parsed);
  }, []);

  // Function you already have
  const [selectedFiles, setSelectedFiles] = useState<FileWithPreview[]>([]);
  const [isDragging, setIsDragging] = useState<boolean>(false);
  const [uploadedUrls, setUploadedUrls] = useState<string[]>([]);
  // Handle file selection
  const [selectedFile, setSelectedFile] = useState<File[]>([]);
  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const filesArray = Array.from(e.target.files) as File[];
      setSelectedFile(filesArray);
      processFiles(filesArray);
    }
  };

  // Handle drag events
  const handleDragEnter = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(true);
  };

  const handleDragLeave = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
  };

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);

    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      const filesArray = Array.from(e.dataTransfer.files) as File[];
      processFiles(filesArray);
    }
  };

  // Process selected files and create previews
  const processFiles = (files: File[]) => {
    const validFiles = files.filter(
      (file) =>
        ["image/png", "image/jpeg", "image/webp"].includes(file.type) &&
        file.size <= 40 * 1024 * 1024
    );

    if (validFiles.length === 0) {
      alert("Please upload only PNG, JPEG, or WEBP images up to 40MB");
      return;
    }
    const filesWithPreview = validFiles.map((file) => ({
      ...file,
      preview: URL.createObjectURL(file),
    }));
    setSelectedFiles((prev) => [...prev, ...filesWithPreview]);
  };
  const handleUpload = async () => {
    if (selectedFiles.length === 0) return;

    const urls: string[] = [];
    try {
      for (const file of selectedFile) {
        const response = await handleFileUpload(file);
        if (response?.imageUrl) {
          urls.push(response?.imageUrl);
        }
      }
      setUploadedUrls(urls);
      return urls;
    } catch (error) {
      console.error("Upload error:", error);
      alert("Some files failed to upload");
    }
  };
  interface FileWithPreview extends File {
    preview: string;
  }
  const handleFileUpload = async (file: File): Promise<UploadResponse> => {
    const formData = new FormData();
    formData.append("image", file);

    try {
      const response = await authInstance.post<UploadResponse>(
        `${process.env.REACT_APP_BASE_URL}/superAdmin/organizations/uploadimages`,
        formData
      );
      return response.data;
    } catch (err) {
      console.error("Upload failed", err);
      throw err;
    }
  };

  React.useEffect(() => {
    return () => {
      selectedFiles.forEach((file) => {
        if (file.preview) {
          URL.revokeObjectURL(file.preview);
        }
      });
    };
  }, [selectedFiles]);
  const handleSubmit = async (e: React.MouseEvent<HTMLButtonElement>) => {
    setLoader(true);
    e.preventDefault();
    const uploadedImageUrls = await handleUpload();
    try {
      const payload = {
        user_id: creator_id?._id,
        ...formData,
        category: selectedCategories,
        subCategory: selectedSubCategories,
        tax: selectedTax,
        keywordSearch: keywords,
        attributes: attributes,
        dealOfTheDay: dealOfTheDay,
        prepaid: prepaid,
        cashOnDelivery: cashOnDelivery,
        images: uploadedImageUrls || [],
      };
      const response = await authInstance.post(
        `${process.env.REACT_APP_BASE_URL}/superAdmin/products/add`,
        payload
      );
      if (response.status == 200) {
        toast("Successfully added", {
          position: "top-right",
          autoClose: 3000,
          type: "success",
        });
        navigate("/store/products");
      }
    } catch (error) {
      console.error(error);
    } finally {
      setLoader(false);
    }
  };
  const handleChange = (event: any) => {
    const {
      target: { value },
    } = event;
    const selectedObjects = value.map((catId: any) => {
      const found = categoryList.find((c) => c.categoryId === catId);
      return {
        name: found?.name || "",
        categoryId: found?.categoryId,
      };
    });

    setSelectedCategories(selectedObjects);
  };
  const handleSubOnchangeChange = (event: any) => {
    const {
      target: { value },
    } = event;
    const selectedObjects = value.map((catId: any) => {
      const found = categoryList.find((c) => c.categoryId === catId);
      return {
        name: found?.name || "",
        categoryId: found?.categoryId,
      };
    });
    setSelectedSubCategories(selectedObjects);
  };
  return (
    <Div>
      <div className="breadcrumb">
        <span>
          Store
          <span className="p-3">{">"}</span>
        </span>
        <span>
          Products
          <span className="seperator p-3">{">"}</span>
        </span>
        <span>
          Add Products
          <span className="seperator p-3"></span>
        </span>
      </div>
      <Box display={"flex"} m={"25px 0px"} justifyContent={"space-between"}>
        <Box>
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
        </Box>
        {loader ? (
          <Box>

          <Loader />
          </Box>
        ) : (
          <Box alignItems={"center"} sx={{ display: "flex", gap: "10px" }}>
            <Box
              sx={{ background: "#ffff" }}
              borderRadius={"8px"}
              boxShadow={"box-shadow: 0px 1px 2px rgba(16, 24, 40, 0.05)"}
            >
              <Button
                sx={{ color: "#000000", fontSize: "16px", fontWeight: "500" }}
              >
                Cancel
              </Button>
            </Box>
            <Box sx={{ background: "#0039F4" }} borderRadius={"8px"}>
              <Button
                sx={{
                  color: "#FFF",
                  fontSize: "16px",
                  fontWeight: "500",
                  borderRadius: "8px",
                }}
                onClick={handleSubmit}
              >
                Save
              </Button>
            </Box>
          </Box>
        )}
      </Box>

      {selected == "General Details" && (
        <Grid2 container spacing={2} size={{ xs: 12, md: 12 }}>
          <Grid2
            sx={{
              background: "#fff",
              border: "1.5px solid #F4F4F4",
              borderRadius: "16px",
            }}
            p={3}
            size={{ xs: 12, md: 6 }}
          >
            <Typography
              mb={2}
              fontSize={"19px"}
              fontWeight={"500"}
              color="#0A090B"
            >
              Images
            </Typography>
            <Grid2 container spacing={2} size={{ xs: 12, md: 12 }}>
              <Grid2
                sx={{
                  borderRadius: "8px",
                }}
                height={"284px"}
                size={{ xs: 12, md: 5 }}
              >
                <Box
                  height={"100%"}
                  sx={{
                    borderRadius: "8px",
                    backgroundColor: isDragging ? "#f0f0f0" : "transparent",
                    border: isDragging
                      ? "2px dashed #0039F4"
                      : "1px dashed #71717A",
                    position: "relative",
                    overflow: "hidden",
                  }}
                  display={"flex"}
                  flexDirection={"column"}
                  justifyContent={"center"}
                  alignItems={"center"}
                  onDragEnter={handleDragEnter}
                  onDragLeave={handleDragLeave}
                  onDragOver={handleDragOver}
                  onDrop={handleDrop}
                >
                  {/* Show first preview image if available */}
                  {selectedFiles.length > 0 && selectedFiles[0].preview && (
                    <Box
                      position="absolute"
                      top={0}
                      left={0}
                      width="100%"
                      height="100%"
                      display="flex"
                      zIndex={1300}
                      justifyContent="center"
                      alignItems="center"
                      sx={{
                        zIndex: 1,
                      }}
                    >
                      <img
                        src={selectedFiles[0].preview}
                        alt="Preview"
                        style={{
                          maxWidth: "100%",
                          maxHeight: "100%",
                          objectFit: "contain",
                        }}
                      />
                    </Box>
                  )}

                  {/* Upload controls (appear on top of preview) */}
                  <Box
                    sx={{
                      display: "flex",
                      flexDirection: "column",
                      alignItems: "center",
                      zIndex: 2,
                      backgroundColor: "transparent",
                      padding: "16px",
                      borderRadius: "8px",
                    }}
                  >
                    <input
                      type="file"
                      id="file-upload"
                      style={{ display: "none" }}
                      multiple
                      accept="image/png, image/jpeg, image/webp"
                      onChange={handleFileChange}
                    />
                    <label htmlFor="file-upload">
                      <img
                        src={imgdumm}
                        alt="icon"
                        style={{ cursor: "pointer" }}
                      />
                    </label>
                    <Typography
                      fontSize={"12px"}
                      fontWeight={"400"}
                      color="#2D2B32"
                      textAlign={"center"}
                    >
                      Drop your images here, or{" "}
                      <span
                        style={{
                          color: "#0039F4",
                          cursor: "pointer",
                          fontSize: "14px",
                          fontWeight: "600",
                        }}
                        onClick={() =>
                          document.getElementById("file-upload")?.click()
                        }
                      >
                        browse
                      </span>
                    </Typography>
                    <Typography
                      fontSize={"10px"}
                      fontWeight={"400"}
                      color="#7F7D83"
                      textAlign={"center"}
                    >
                      Supports PNG, JPEG & WEBP up to 40MB
                    </Typography>
                  </Box>
                </Box>
              </Grid2>
              <Grid2 container size={{ xs: 12, md: 7 }}>
                {selectedFiles?.slice(1, 5).map((file, index) => (
                  <Grid2
                    position={"relative"}
                    sx={{
                      borderRadius: "8px",
                    }}
                    border="1px dashed #71717A"
                    size={{ xs: 12, md: 6 }}
                    display={"flex"}
                    justifyContent={"center"}
                    alignItems={"center"}
                    key={index}
                    height="135px"
                  >
                    {file.preview && (
                      <>
                        <img
                          src={file.preview}
                          alt={`preview-${index}`}
                          style={{
                            maxWidth: "100%",
                            maxHeight: "100%",
                            objectFit: "contain",
                          }}
                        />
                      </>
                    )}
                  </Grid2>
                ))}
              </Grid2>
            </Grid2>
          </Grid2>

          <Grid2
            sx={{
              background: "#fff",
              border: "1.5px solid #F4F4F4",
              borderRadius: "16px",
              p: 3, // padding
              boxShadow: "0px 1px 2px rgba(16, 24, 40, 0.05)",
            }}
            size={{ xs: 12, md: 6 }}
          >
            <Typography
              mb={2}
              fontSize={"19px"}
              fontWeight={"500"}
              color="#0A090B"
            >
              Product info
            </Typography>

            <Box mb={3}>
              <Typography fontSize={14} mb={1}>
                Product Name
              </Typography>
              <TextField
                placeholder="Enter"
                fullWidth
                value={productName}
                onChange={handleOnChange}
                name="productName"
                size="small"
                inputProps={{ maxLength: 20 }}
              />
              <FormHelperText sx={{ fontSize: "16px", color: "#999999" }}>
                Do not exceed 20 characters when entering the product name
              </FormHelperText>
            </Box>

            <Box>
              <Typography fontSize={14} mb={1}>
                Description
              </Typography>
              <TextField
                placeholder=""
                fullWidth
                size="small"
                value={description}
                onChange={handleOnChange}
                name="description"
                multiline
                minRows={3}
                inputProps={{ maxLength: 100 }}
              />
              <FormHelperText sx={{ fontSize: "16px", color: "#999999" }}>
                Ensure product description does not exceed 100 characters
              </FormHelperText>
            </Box>
          </Grid2>
          <Grid2
            sx={{
              background: "#fff",
              border: "1.5px solid #F4F4F4",
              borderRadius: "16px",
              p: 3,
              boxShadow: "0px 1px 2px rgba(16, 24, 40, 0.05)",
            }}
            size={{ xs: 12, md: 6 }}
          >
            <Typography
              mb={2}
              fontSize={"19px"}
              fontWeight={"500"}
              color="#0A090B"
            >
              Brand & Category
            </Typography>

            {/* Brand Name & Category */}
            <Box display="flex" gap={2} mb={1}>
              <Box flex={1}>
                <Typography fontSize={14} mb={1}>
                  Brand Name
                </Typography>
                <TextField
                  fullWidth
                  size="small"
                  value={brandName}
                  onChange={handleOnChange}
                  name="brandName"
                  placeholder="Enter"
                />
              </Box>
              <Box flex={1}>
                <Typography fontSize={14} mb={1}>
                  Category
                </Typography>
                <FormControl fullWidth size="small">
                  <InputLabel>Select</InputLabel>
                  <Select
                    multiple
                    value={selectedCategories.map((c) => c.categoryId)}
                    onChange={(e) => handleChange(e)}
                    input={<OutlinedInput label="Select" />}
                    renderValue={(selected) => (
                      <Box sx={{ display: "flex", flexWrap: "wrap", gap: 0.5 }}>
                        {selected.map((value) => (
                          <Chip
                            sx={{
                              fontSize: "12px !important",
                              background: "#F7F9FC",
                              color: "#4F4D55",
                              border: "0.6px solid #8AA4FA",
                              borderRadius: "4px",
                              p: "0px !important",
                            }}
                            // onDelete={() =>
                            //   setSelectedCategories((prev) =>
                            //     prev.filter((c) => c !== value)
                            //   )
                            // }
                            key={value}
                            label={
                              categoryList.find((c) => c.categoryId === value)
                                ?.name || value
                            }
                          />
                        ))}
                      </Box>
                    )}
                  >
                    {categoryList
                      .filter((c) => c.isSubCategory === false) // optional filtering
                      .map((category) => (
                        <MenuItem
                          key={category._id}
                          value={category.categoryId}
                        >
                          {category.name}
                        </MenuItem>
                      ))}
                  </Select>
                </FormControl>
              </Box>
            </Box>
            <Box
              sx={{
                display: "flex",
                justifyContent: "end",
                gap: 1,
                flexWrap: "wrap",
              }}
            >
              {selectedCategories.map((category, index) => (
                <Chip
                  key={index}
                  label={category?.name}
                  onDelete={() =>
                    setSelectedCategories((prev) =>
                      prev.filter((c) => c.categoryId !== category?.categoryId)
                    )
                  }
                  variant="outlined"
                  size="small"
                  sx={{
                    fontSize: "12px !important",
                    background: "#F7F9FC",
                    color: "#4F4D55",
                    border: "0.6px solid #8AA4FA",
                    borderRadius: "4px",
                    p: "0px !important",
                  }}
                />
              ))}
            </Box>
            {/* Sub Category */}
            <Box mb={1}>
              <Typography fontSize={14} mb={1}>
                Sub Category
              </Typography>
              <FormControl fullWidth size="small">
                <InputLabel>Select</InputLabel>
                <Select
                  multiple
                  value={selectedSubCategories.map((c) => c.categoryId)}
                  onChange={(e) => handleSubOnchangeChange(e)}
                  input={<OutlinedInput label="Select" />}
                  renderValue={(selected) => (
                    <Box sx={{ display: "flex", flexWrap: "wrap", gap: 0.5 }}>
                      {selected.map((value) => (
                        <Chip
                          sx={{
                            fontSize: "12px !important",
                            color: "#4F4D55",
                            background: "#F7F9FC",
                            border: "0.6px solid #8AA4FA",
                            borderRadius: "4px",
                            p: "0px !important",
                          }}
                          // onDelete={() =>
                          //   setSelectedSubCategories((prev) =>
                          //     prev.filter((c) => c !== value)
                          //   )
                          // }
                          key={value}
                          label={
                            categoryList.find((c) => c.categoryId === value)
                              ?.name || value
                          }
                        />
                      ))}
                    </Box>
                  )}
                >
                  {categoryList
                    .filter((c) => c.isSubCategory === true) // optional filtering
                    .map((category) => (
                      <MenuItem key={category._id} value={category.categoryId}>
                        {category.name}
                      </MenuItem>
                    ))}
                </Select>
              </FormControl>
            </Box>

            {/* Display Selected Categories */}
            <Box mt={1} sx={{ display: "flex", gap: 1, flexWrap: "wrap" }}>
              {selectedSubCategories.map((category, index) => (
                <Chip
                  key={index}
                  label={category?.name}
                  onDelete={() =>
                    setSelectedSubCategories((prev) =>
                      prev.filter((c) => c.categoryId !== category?.categoryId)
                    )
                  }
                  variant="outlined"
                  size="small"
                  sx={{
                    background: "#F7F9FC",
                    fontSize: "12px !important",
                    color: "#4F4D55",
                    border: "0.6px solid #8AA4FA",
                    borderRadius: "4px",
                    p: "0px !important",
                  }}
                />
              ))}
            </Box>
          </Grid2>
          <Grid2
            sx={{
              background: "#fff",
              border: "1.5px solid #F4F4F4",
              borderRadius: "16px",
              p: 3,
              boxShadow: "0px 1px 2px rgba(16, 24, 40, 0.05)",
            }}
            size={{ xs: 12, md: 6 }}
          >
            <Typography
              mb={2}
              fontSize={"19px"}
              fontWeight={"500"}
              color="#0A090B"
            >
              Pricing
            </Typography>

            {/* Brand Name & Category */}
            <Box display="flex" gap={2} mb={1}>
              <Box flex={1}>
                <Typography fontSize={14} mb={1}>
                  Actual Price
                </Typography>
                <TextField
                  fullWidth
                  size="small"
                  onChange={handleOnChange}
                  value={actualPrice}
                  name="actualPrice"
                  placeholder="Enter"
                />
              </Box>
              <Box flex={1}>
                <Typography fontSize={14} mb={1}>
                  Offer Price
                </Typography>
                <TextField
                  fullWidth
                  size="small"
                  onChange={handleOnChange}
                  value={offerPrice}
                  name="offerPrice"
                  placeholder="Enter"
                />
              </Box>
            </Box>
            <Grid2 container spacing={2} mb={1}>
              <Grid2 size={{ xs: 12, md: 6 }} mb={1}>
                <Typography fontSize={14} mb={1}>
                  {" Tax(%)"}
                </Typography>
                <FormControl fullWidth size="small">
                  <InputLabel>Select</InputLabel>
                  <Select
                    value={selectedTax ? `${selectedTax}% GST` : ""}
                    onChange={(e) => setSelectedTax(e.target.value as string)}
                    input={<OutlinedInput label="Select" />}
                    renderValue={(selected) => (
                      <Box sx={{ display: "flex", flexWrap: "wrap", gap: 0.5 }}>
                        {selected && (
                          <Chip
                            sx={{
                              fontSize: "14px !important",
                              color: "#876E1C",
                              border: "1px solid #876E1C",
                              borderRadius: "4px",
                              p: "0px !important",
                              backgroundColor: "#FFEECF",
                            }}
                            key={selected}
                            label={selected}
                          />
                        )}
                      </Box>
                    )}
                  >
                    <MenuItem value="10">10% GST</MenuItem>
                    <MenuItem value="15">15% GST</MenuItem>
                    <MenuItem value="20">20% GST</MenuItem>
                  </Select>
                </FormControl>
              </Grid2>
              <Grid2 size={{ xs: 12, md: 6 }} mb={1}>
                <Typography color="#0039F4" fontSize={14} mt={4.5}>
                  Create New Tax
                </Typography>
              </Grid2>
            </Grid2>
          </Grid2>
          <Grid2
            sx={{
              background: "#fff",
              border: "1.5px solid #F4F4F4",
              borderRadius: "16px",
              padding: "24px",
            }}
            size={{ xs: 12, md: 6 }}
          >
            <Typography
              mb={2}
              fontSize={"19px"}
              fontWeight={"500"}
              color="#0A090B"
            >
              Others
            </Typography>

            <Grid2 container spacing={2}>
              <Grid2 sx={{ xs: 12, sm: 4 }}>
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={dealOfTheDay}
                      onChange={(e) => setDealOfTheDay(e.target.checked)}
                    />
                  }
                  sx={{
                    "& .MuiFormControlLabel-label": {
                      fontSize: "14px",
                      fontWeight: 400,
                    },
                  }}
                  label="Deal of The Day"
                />
              </Grid2>
              <Grid2 sx={{ xs: 12, sm: 4 }}>
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={prepaid}
                      onChange={(e) => setPrepaid(e.target.checked)}
                    />
                  }
                  sx={{
                    "& .MuiFormControlLabel-label": {
                      fontSize: "14px",
                      fontWeight: 400,
                    },
                  }}
                  label="Prepaid"
                />
              </Grid2>
              <Grid2 sx={{ xs: 12, sm: 4 }}>
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={cashOnDelivery}
                      onChange={(e) => setCashOnDelivery(e.target.checked)}
                    />
                  }
                  sx={{
                    "& .MuiFormControlLabel-label": {
                      fontSize: "14px",
                      fontWeight: 400,
                    },
                  }}
                  label="Cash on Delivery"
                />
              </Grid2>

              <Grid2 size={{ xs: 12, md: 12, sm: 12 }}>
                <FormControl fullWidth>
                  <Typography variant="body2" mb={1}>
                    Keyword
                  </Typography>
                  <TextField
                    placeholder="Search"
                    fullWidth
                    variant="outlined"
                    InputProps={{
                      endAdornment: (
                        <InputAdornment position="end">
                          <SearchIcon />
                        </InputAdornment>
                      ),
                      sx: {
                        borderRadius: "8px",
                      },
                    }}
                  />
                </FormControl>
              </Grid2>

              <Grid2 size={{ xs: 12 }}>
                <Box mt={1} display="flex" gap={1} flexWrap="wrap">
                  {keywords.map((keyword, index) => (
                    <Chip
                      key={index}
                      label={keyword}
                      sx={{
                        background: "#F7F9FC",
                      }}
                      onDelete={() => handleDelete(keyword)}
                      variant="outlined"
                    />
                  ))}
                </Box>
              </Grid2>
            </Grid2>
          </Grid2>
        </Grid2>
      )}
      {selected == "Attributes" && (
        <Link className="containr mt-3 p-3">
          <SizeSelectorCard setAttributes={setAttributes} />
        </Link>
      )}
    </Div>
  );
};

export default AddProduct;
