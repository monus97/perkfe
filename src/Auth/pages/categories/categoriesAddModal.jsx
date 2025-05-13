import React, { useEffect, useRef, useState } from "react";
import UploadImageIcon from "../../../Assets/Organzations/UploadImageIcon.png";
import axios from "axios";
import {
  Box,
  Checkbox,
  Chip,
  Divider,
  FormControl,
  InputLabel,
  MenuItem,
  OutlinedInput,
  Select,
  TextField,
  Typography,
} from "@mui/material";
import SizeAndColor from "./sizeandcolor";
import authInstance from "../../../authInstance";
import Loader from "../../../loader";
import { toast } from "react-toastify";

const CategoriesAddModal = ({ handleClose }) => {
  const fileInputRef = useRef(null);
  const [imagePreview, setImagePreview] = useState(null);
  const [base64Image, setBase64Image] = useState(null);
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [isSubCategory, setIsSubCategory] = useState(false);
  const [categoryList, setCategoryList] = useState([]);
  const [imageFile, setImageFile] = useState(null);
  const [loader, setLoader] = useState(false);
  const [attributes, setAttributes] = useState({
    size: [],
    quantity: [],
    color: [],
  });
  const [formValues, setFormValues] = useState({
    name: "",
    description: "",
  });
  const { name, description } = formValues;
  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormValues((prevValues) => ({
      ...prevValues,
      [name]: value,
    }));
  };

  const handleFileUpload = async (data) => {
    const formData = new FormData();
    formData.append("image", data);

    try {
      const response = await authInstance.post(
        `${process.env.REACT_APP_BASE_URL}/superAdmin/organizations/uploadimages`,
        formData
      );
      return response.data;
    } catch (err) {
      console.error("Upload failed", err);
    }
  };

  const handleChange = (event) => {
    const {
      target: { value },
    } = event;
    const selectedObjects = value.map((catId) => {
      const found = categoryList.find((c) => c.categoryId === catId);
      return {
        name: found?.name || "",
        categoryId: found?.categoryId,
      };
    });

    setSelectedCategories(selectedObjects);
  };

  const handleFileSelect = async (event) => {
    const file = event.target.files[0];
    if (file) {
      setImageFile(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result);
        setBase64Image(reader.result.split(",")[1]);
      };
      reader.readAsDataURL(file);
    }
  };
  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoader(true);
    const imageUpload = await handleFileUpload(imageFile);
    const payload = {
      ...formValues,
      parentcategory: selectedCategories,
      attributes: attributes,
      featured: true,
      isSubCategory: isSubCategory,
      image: imageUpload?.imageUrl,
    };
    try {
      const response = await authInstance.post(
        `${process.env.REACT_APP_BASE_URL}/superAdmin/category/add`,
        payload
      );
      if (response.status == 200) {
        toast("Successfully added", {
          position: "top-right",
          autoClose: 3000,
          type: "success",
        });
        handleClose();
      }
    } catch (error) {
      console.error(error);
    } finally {
      setLoader(false);
    }
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

  const handleSelect = (event) => {
    const checked = event.target.checked;
    if (checked) {
      fetchAllCategories();
    }
    setIsSubCategory(checked);

    setSelectedCategories([]);
  };

  return (
    <div>
      <div className="modal-overlay">
        <div className="modal-content">
          <span className="close" onClick={handleClose}>
            &times;
          </span>
          <Typography fontSize={18} fontWeight={500} className="org text-start">
            Add Category / Subcategory
          </Typography>
          <Divider
            sx={{ my: 2, borderBottomWidth: 1, borderColor: "#6e6e6e" }}
          />
          <form className="organization-form">
            <div className="d-flex mb-3">
              <div
                className="left-fileupload"
                style={{ flex: 1 }}
                onClick={() => fileInputRef.current.click()}
              >
                {imagePreview ? (
                  <img
                    src={imagePreview}
                    alt="Preview"
                    style={{
                      width: "200px",
                      height: "150px",
                      objectFit: "cover",
                      borderRadius: "8px",
                    }}
                  />
                ) : (
                  <>
                    <img src={UploadImageIcon} alt="" />
                    <p>
                      Drop your images here, Or{" "}
                      <span className="browse-link">browse</span>
                      <br />
                      <span className="fileContentTwo">
                        {" "}
                        Supports PNG, JPEG and WEBP upto 40MB
                      </span>
                    </p>
                  </>
                )}

                <input
                  ref={fileInputRef}
                  type="file"
                  style={{ display: "none" }} // Hide the file input
                  onChange={handleFileSelect} // Handle file selection
                  accept="image/*" // Optional: Only allow image files
                />
              </div>
              <div
                className="d-flex flex-column  text-start"
                style={{ flex: 1, padding: "0rem 1rem 0rem 1rem" }}
              >
                <Typography fontSize={14} mb={1}>
                  Category Name
                </Typography>
                <TextField
                  placeholder="Enter"
                  fullWidth
                  name="name"
                  value={name}
                  onChange={handleInputChange}
                  size="small"
                  inputProps={{ maxLength: 20 }}
                />

                <Box display="flex" alignItems="center">
                  <Checkbox onChange={handleSelect} />
                  <Typography fontSize={14}>
                    Is this is a subcategory?
                  </Typography>
                </Box>

                <Typography fontSize={14} mb={1}>
                  Parent Category Name
                </Typography>
                <FormControl fullWidth size="small">
                  <InputLabel>Select</InputLabel>
                  <Select
                    multiple
                    disabled={!isSubCategory}
                    value={selectedCategories.map((c) => c.categoryId)}
                    onChange={(e) => handleChange(e)}
                    input={<OutlinedInput label="Select" />}
                    renderValue={(selected) => (
                      <Box sx={{ display: "flex", flexWrap: "wrap", gap: 0.5 }}>
                        {selected.map((value) => (
                          <Chip
                            key={value}
                            label={
                              categoryList.find((c) => c.categoryId === value)
                                ?.name || value
                            }
                            sx={{
                              fontSize: "12px !important",
                              background: "#F7F9FC",
                              color: "#4F4D55",
                              border: "0.6px solid #8AA4FA",
                              borderRadius: "4px",
                              p: "0px !important",
                            }}
                            // onDelete={() =>
                            //   setSelectedCategories(
                            //     (prev) =>
                            //     prev.filter((c) => c.categoryId !== value)
                            //   )
                            // }
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
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "end",
                    gap: 1,
                    mt: 1,
                    flexWrap: "wrap",
                  }}
                >
                  {selectedCategories?.map((category, index) => (
                    <Chip
                      key={index}
                      label={category?.name}
                      onDelete={() =>
                        setSelectedCategories((prev) =>
                          prev.filter(
                            (c) => c.categoryId !== category?.categoryId
                          )
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
              </div>
            </div>

            <Box>
              <Typography textAlign={"start"} fontSize={14} mb={1}>
                Description
              </Typography>
              <TextField
                placeholder=""
                fullWidth
                name="description"
                value={description}
                onChange={handleInputChange}
                size="small"
                multiline
                minRows={3}
                inputProps={{ maxLength: 100 }}
              />
            </Box>

            <Box>
              <Typography textAlign={"start"} fontSize={14} mt={2}>
                Select Attributes
              </Typography>
              <Divider
                sx={{ my: 2, borderBottomWidth: 1, borderColor: "#6e6e6e" }}
              />
              <SizeAndColor setAttributes={setAttributes} />
            </Box>

            {loader ? (
              <Box display={"flex"} justifyContent={"end"}>
                <Loader />
              </Box>
            ) : (
              <div className="modal-buttons text-end">
                <button
                  type="button"
                  className="btn cancel-button me-3"
                  onClick={handleClose}
                  style={{ boxShadow: "0px 4px 6px #1018280D" }}
                >
                  Cancel
                </button>

                <button
                  type="submit"
                  className="btn save-button"
                  onClick={handleSubmit}
                >
                  Submit
                </button>
              </div>
            )}
          </form>
        </div>
      </div>
    </div>
  );
};

export default CategoriesAddModal;
