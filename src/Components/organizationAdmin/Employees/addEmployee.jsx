import React, { useState } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField,
  MenuItem,
  Typography,
  Box,
  Grid,
  IconButton,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import upload from "../../../Assets/Organzations/UploadImageIcon.png";
import authInstance from "../../../authInstance";
import Loader from "../../../loader";
const roles = ["Manager", "Sales Lead", "Product Designer"];

const AddEmployeeModal = ({ open, handleClose }) => {
  const [formData, setFormData] = useState({
    name: "",
    role: "",
    mobile: "",
    email: "",
    street: "",
    city: "",
    state: "",
    country: "",
    pincode: "",
    pointBalance: "",
  });
  const [file, setFile] = useState(null);
  const [loader, setLoader] = useState(false);
  const [imagePreview, setImagePreview] = useState(null);

  const handleFileUpload = async (file) => {
    const formData = new FormData();
    formData.append("image", file);

    try {
      const response = await authInstance.post(
        `/superAdmin/organizations/uploadimages`,
        formData
      );
      return response.data;
    } catch (err) {
      console.error("Upload failed", err);
      throw err;
    }
  };
  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === "pointBalance") {
      const numericValue = Number(value);
      const maxBalance = Number(org?.pointsBalanced || 0);

      // Only allow if value is less than or equal to org balance
      if (numericValue > maxBalance) return;
    }
    setFormData((prev) => ({ ...prev, [name]: value }));
  };
  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFile(file);
      const imageUrl = URL.createObjectURL(file);
      setImagePreview(imageUrl);
    }
  };
  const data = sessionStorage.getItem("details");
  const org = JSON.parse(data || "{}");
  const handleSubmit = async () => {
    try {
      setLoader(true);
      const response = await handleFileUpload(file);
      let logo;
      if (response?.imageUrl) {
        logo = response?.imageUrl;
      }
      const payload = {
        ...formData,
        image: logo,
        orgId: org.orgId,
      };

      const res = await authInstance.post(`/admin/customer/add`, payload);
      console.log("Form Submitted:", res);
    } catch (error) {
      console.log(error, "error");
    } finally {
      setLoader(false);
    }

    handleClose();
  };

  return (
    <Dialog
      open={open}
      PaperProps={{
        sx: {
          backgroundColor: "#FBFBFB", // Set background color
          boxShadow: "none", // Remove paper shadow
          borderRadius: 2,
        },
      }}
      onClose={handleClose}
      maxWidth="md"
      fullWidth
    >
      <DialogTitle>
        <Box display="flex" justifyContent="space-between" alignItems="center">
          <Typography variant="h6">Add Employee</Typography>
          <IconButton onClick={handleClose}>
            <CloseIcon />
          </IconButton>
        </Box>
      </DialogTitle>
      <DialogContent dividers>
        <Grid container spacing={2}>
          <Grid item xs={12} md={6}>
            <Box
              sx={{
                border: "2px dashed #ccc",
                borderRadius: 2,
                height: 180,
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                cursor: "pointer",
                position: "relative",
                overflow: "hidden",
                textAlign: "center",
                bgcolor: "#fff",
              }}
              onClick={() => document.getElementById("fileUpload").click()}
              onDragOver={(e) => {
                e.preventDefault();
                e.stopPropagation();
              }}
              onDrop={(e) => {
                e.preventDefault();
                const file = e.dataTransfer.files[0];
                if (file && file.type.startsWith("image/")) {
                  const imageUrl = URL.createObjectURL(file);
                  setImagePreview(imageUrl);
                }
              }}
            >
              {imagePreview ? (
                <img
                  src={imagePreview}
                  alt="Preview"
                  style={{
                    maxHeight: "100%",
                    maxWidth: "100%",
                    objectFit: "cover",
                  }}
                />
              ) : (
                <>
                  <img src={upload} alt="Upload icon" />
                  <Typography>
                    Drop your images here, or{" "}
                    <span style={{ color: "#4160FC", cursor: "pointer" }}>
                      browse
                    </span>
                  </Typography>
                  <Typography fontSize={10} color="#7F7D83" fontWeight={400}>
                    Supports PNG, JPEG & WEBP up to 40MB
                  </Typography>
                </>
              )}
              <input
                type="file"
                accept="image/png, image/jpeg, image/webp"
                id="fileUpload"
                style={{ display: "none" }}
                onChange={handleImageUpload}
              />
            </Box>
          </Grid>
          <Grid item xs={12} md={6}>
            <TextField
              label="Employee Name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              fullWidth
              margin="normal"
              variant="standard"
              sx={{
                "& input": {
                  fontSize: "14px",
                  padding: "9px 10px",
                },
                "& .MuiInputLabel-root": {
                  color: "#5D5D5D80", // <-- your label color here
                  fontSize: "14px",
                  padding: "0px 10px",
                },
                bgcolor: "#fff",
                borderRadius: "6px",
              }}
            />
            <TextField
              select
              label="Role"
              name="role"
              value={formData.role}
              onChange={handleChange}
              fullWidth
              margin="normal"
              variant="standard"
              sx={{
                "& input": {
                  fontSize: "14px",
                  padding: "9px 10px",
                },
                "& .MuiInputLabel-root": {
                  color: "#5D5D5D80", // <-- your label color here
                  fontSize: "14px",
                  padding: "0px 10px",
                },
                bgcolor: "#fff",
                borderRadius: "6px",
              }}
            >
              {roles.map((role, index) => (
                <MenuItem key={index} value={role}>
                  {role}
                </MenuItem>
              ))}
            </TextField>
          </Grid>
          <Grid item xs={12} md={6}>
            <TextField
              label="Contact Number"
              name="mobile"
              type="tel"
              value={formData.mobile}
              onChange={(e) => {
                const input = e.target.value;
                const digitsOnly = input.replace(/\D/g, ""); // Remove non-digits
                if (digitsOnly.length <= 10) {
                  setFormData((prev) => ({
                    ...prev,
                    mobile: digitsOnly,
                  }));
                }
              }}
              fullWidth
              variant="standard"
              sx={{
                "& input": {
                  fontSize: "14px",
                  padding: "9px 10px",
                },
                "& .MuiInputLabel-root": {
                  color: "#5D5D5D80", // <-- your label color here
                  fontSize: "14px",
                  padding: "0px 10px",
                },
                bgcolor: "#fff",
                borderRadius: "6px",
              }}
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <TextField
              label="Email Address"
              name="email"
              value={formData.email}
              onChange={handleChange}
              fullWidth
              variant="standard"
              sx={{
                "& input": {
                  fontSize: "14px",
                  padding: "9px 10px",
                },
                "& .MuiInputLabel-root": {
                  color: "#5D5D5D80", // <-- your label color here
                  fontSize: "14px",
                  padding: "0px 10px",
                },
                bgcolor: "#fff",
                borderRadius: "6px",
              }}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              label="Street Address"
              name="street"
              value={formData.street}
              onChange={handleChange}
              fullWidth
              variant="standard"
              sx={{
                "& input": {
                  fontSize: "14px",
                  padding: "9px 10px",
                },
                "& .MuiInputLabel-root": {
                  color: "#5D5D5D80", // <-- your label color here
                  fontSize: "14px",
                  padding: "0px 10px",
                },
                bgcolor: "#fff",
                borderRadius: "6px",
              }}
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <TextField
              label="City"
              name="city"
              value={formData.city}
              onChange={handleChange}
              fullWidth
              variant="standard"
              sx={{
                "& input": {
                  fontSize: "14px",
                  padding: "9px 10px",
                },
                "& .MuiInputLabel-root": {
                  color: "#5D5D5D80", // <-- your label color here
                  fontSize: "14px",
                  padding: "0px 10px",
                },
                bgcolor: "#fff",
                borderRadius: "6px",
              }}
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <TextField
              label="State"
              name="state"
              value={formData.state}
              onChange={handleChange}
              fullWidth
              variant="standard"
              sx={{
                "& input": {
                  fontSize: "14px",
                  padding: "9px 10px",
                },
                "& .MuiInputLabel-root": {
                  color: "#5D5D5D80", // <-- your label color here
                  fontSize: "14px",
                  padding: "0px 10px",
                },
                bgcolor: "#fff",
                borderRadius: "6px",
              }}
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <TextField
              label="Country"
              name="country"
              value={formData.country}
              onChange={handleChange}
              fullWidth
              variant="standard"
              sx={{
                "& input": {
                  fontSize: "14px",
                  padding: "9px 10px",
                },
                "& .MuiInputLabel-root": {
                  color: "#5D5D5D80", // <-- your label color here
                  fontSize: "14px",
                  padding: "0px 10px",
                },
                bgcolor: "#fff",
                borderRadius: "6px",
              }}
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <TextField
              label="PIN Code"
              name="pincode"
              value={formData.pincode}
              onChange={handleChange}
              fullWidth
              variant="standard"
              sx={{
                "& input": {
                  fontSize: "14px",
                  padding: "9px 10px",
                },
                "& .MuiInputLabel-root": {
                  color: "#5D5D5D80", // <-- your label color here
                  fontSize: "14px",
                  padding: "0px 10px",
                },
                bgcolor: "#fff",
                borderRadius: "6px",
              }}
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <TextField
              label="Grant Green Coins"
              name="pointBalance"
              value={formData.pointBalance}
              onChange={handleChange}
              fullWidth
              type="number"
              variant="standard"
              sx={{
                "& input": {
                  fontSize: "14px",
                  padding: "9px 10px",
                },
                "& .MuiInputLabel-root": {
                  color: "#5D5D5D80", // <-- your label color here
                  fontSize: "14px",
                  padding: "0px 10px",
                },
                bgcolor: "#fff",
                borderRadius: "6px",
              }}
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <Box display="flex" alignItems="center" height="100%">
              <Typography color="#9C9C9C" fontSize={14} fontWeight={400}>
                Available Balance:{" "}
                <b
                  style={{
                    color: "#209C58",
                    fontSize: "20px",
                    fontWeight: "600",
                  }}
                >
                  {org?.pointsBalanced || 0}
                </b>
              </Typography>
            </Box>
          </Grid>
        </Grid>
      </DialogContent>
      <DialogActions>
        <Button
          onClick={handleClose}
          sx={{
            borderRadius: "8px",
            bgcolor: "#fff",
            color: "#0039F4",
            fontWeight: "500",
            textTransform: "capitalize",
            padding: "4px 16px !important",
            boxShadow: "0px 1px 2px rgba(16, 24, 40, 0.05)",
          }}
        >
          Cancel
        </Button>
        {loader ? (
          <Loader />
        ) : (
          <Button
            onClick={handleSubmit}
            sx={{
              borderRadius: "8px",
              color: "#fff",
              bgcolor: "#0039F4",
              fontWeight: "500",
              boxShadow: "0px 1px 2px rgba(16, 24, 40, 0.05)",
              textTransform: "capitalize",
              padding: "4px 16px !important",
            }}
          >
            Submit
          </Button>
        )}
      </DialogActions>
    </Dialog>
  );
};

export default AddEmployeeModal;
