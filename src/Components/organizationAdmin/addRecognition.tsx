import React, { useEffect, useState } from "react";
import {
  Box,
  Typography,
  TextField,
  Button,
  Chip,
  InputAdornment,
  Autocomplete,
} from "@mui/material";
import AddPhotoAlternateIcon from "@mui/icons-material/AddPhotoAlternate";
import SearchIcon from "@mui/icons-material/Search";
import { styled } from "@mui/material/styles";
import gold from "../../Assets/Organzations/Vector.png";
import authInstance from "../../authInstance";
import Loader from "../../loader";
import { useAppContext } from "../../contexts/appcontext";

const UploadBox = styled(Box)(({ theme }) => ({
  border: "1px dashed #ccc",
  borderRadius: "12px",
  height: "325px",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  textAlign: "center",
  flexDirection: "column",
  color: "#777",
  cursor: "pointer",
  backgroundColor: "#fafafa",
}));

type FormState = {
  title: string;
  points: string;
  description: string;
  teamMembers: { name: string; customerId: string }[]; // changed
  tags: string[];
  last_date: string;
};

const AddRecognition = () => {
  type FormField = keyof FormState;
  const { setRefresh } = useAppContext();
  const [loader, setLoader] = useState(false);
  const [form, setForm] = useState<FormState>({
    title: "",
    points: "",
    tags: [],
    description: "",
    teamMembers: [],
    last_date: "",
  });
  type Customer = {
    name: string;
    email: string;
    [key: string]: any; // optionally support extra fields
  };
  const [tagInput, setTagInput] = useState("");
  const [image, setImage] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const [allCustomers, setAllCustomers] = useState<Customer[]>([]);
  const handleChange =
    (field: FormField) => (e: React.ChangeEvent<HTMLInputElement>) => {
      setForm({ ...form, [field]: e.target.value });
    };
  const handleFileUpload = async (file: any) => {
    const formData = new FormData();
    formData.append("image", file);

    try {
      const response = await authInstance.post(
        `${process.env.REACT_APP_BASE_URL}/superAdmin/organizations/uploadimages`,
        formData
      );
      return response.data;
    } catch (err) {
      console.error("Upload failed", err);
      throw err;
    }
  };
  const handleDelete = (field: "teamMembers" | "tags", index: number) => {
    const updated = [...form[field]];
    updated.splice(index, 1);
    setForm({ ...form, [field]: updated });
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setImage(file);
      setPreview(URL.createObjectURL(file));
    }
  };

  const handleKeyPress =
    (field: "tags") => (e: React.KeyboardEvent<HTMLInputElement>) => {
      if (e.key === "Enter") {
        e.preventDefault();
        const value = (e.target as HTMLInputElement).value.trim();
        if (value && !form.tags.includes(value)) {
          setForm({ ...form, tags: [...form.tags, value] });
          (e.target as HTMLInputElement).value = "";
        }
      }
    };

  const fetchAllCustomer = async () => {
    const data = sessionStorage.getItem("user");
    const orgId = JSON.parse(data || "{}").orgId;
    try {
      const response = await authInstance.get(
        `/admin/customer/list?orgId=${orgId}`
      );
      if (response?.status == 200) {
        setAllCustomers(response?.data?.data);
      }
    } catch (error) {
      console.log(error, "error");
    }
  };

  useEffect(() => {
    fetchAllCustomer();
  }, []);

  const handleSubmit = async () => {
    try {
      const data = sessionStorage.getItem("user");
      const orgId = JSON.parse(data || "{}").orgId;
      if (!form.title || !form.description) {
        alert("Please fill in required fields");
        return;
      }
      setLoader(true);
      const profilePic = await handleFileUpload(image);
      const payload = {
        ...form,
        saved: "true",
        assign: form.teamMembers,
        status: "pending",
        orgId: orgId,
        images: profilePic.imageUrl,
      };
      const response = await authInstance.post(
        `/admin/recognition/create`,
        payload
      );
      setForm({
        title: "",
        points: "",
        description: "",
        teamMembers: [],
        tags: [],
        last_date: "",
      });
      setImage(null);
      setPreview(null);
    } catch (error) {
      console.log(error, "error");
    } finally {
      setLoader(false);
      setRefresh(true)
    }
  };

  return (
    <Box p={4} borderRadius={3} bgcolor="#fff">
      <Box display={"flex"} justifyContent={"space-between"}>
        <Typography fontSize={18} fontWeight={500} color="#252525" mb={3}>
          Create Recognition
        </Typography>
        <TextField
          label="Coins"
          variant="standard"
          value={form.points}
          sx={{
            "& input": {
              color: "#5D5D5D80 !important",
              fontSize: "14px",
              padding: "9px 10px",
            },
          }}
          onChange={handleChange("points")}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <img height={20} width={20} src={gold} alt="coin" />
              </InputAdornment>
            ),
          }}
        />
      </Box>
      <Box display="flex"  flexWrap="wrap" gap={4}>
        <Box p={2} flex={1} minWidth="280px">
          <label htmlFor="upload-image">
            <span>
              <UploadBox>
                {preview ? (
                  <img
                    src={preview}
                    alt="preview"
                    style={{ maxHeight: "100%", maxWidth: "100%" }}
                  />
                ) : (
                  <>
                    <AddPhotoAlternateIcon
                      sx={{ fontSize: 40, color: "#6A6AFB" }}
                    />
                    <Typography mt={1} fontSize={14}>
                      Drop your images here, or{" "}
                      <Typography
                        component="span"
                        color="#6A6AFB"
                        fontWeight={600}
                        sx={{ cursor: "pointer" }}
                      >
                        browse
                      </Typography>
                      <br />
                      <Typography variant="caption" color="text.secondary">
                        Supports PNG, JPEG & WEBP up to 40MB
                      </Typography>
                    </Typography>
                  </>
                )}
                <input
                  id="upload-image"
                  type="file"
                  hidden
                  accept="image/png, image/jpeg, image/webp"
                  onChange={handleImageUpload}
                />
              </UploadBox>
            </span>
          </label>
        </Box>

        {/* Form Fields */}
        <Box
          flex={2}
          minWidth="300px"
          display="flex"
          flexDirection="column"
          gap={2}
        >
          <TextField
            label="Title"
            fullWidth
            value={form.title}
            onChange={handleChange("title")}
            variant="standard"
            sx={{
              "& input": {
                color: "#5D5D5D80 !important",
                fontSize: "14px",
                padding: "9px 10px",
              },
            }}
          />

          <TextField
            label="Write Description"
            variant="standard"
            multiline
            minRows={3}
            value={form.description}
            onChange={handleChange("description")}
            fullWidth
          />

          <Box display="flex" gap={2}>
            {/* Team Members */}
            <Box flex={1}>
              <Autocomplete
                options={allCustomers}
                getOptionLabel={(option: Customer) => `${option.name} `}
                filterSelectedOptions
                onChange={(_, value: Customer | null) => {
                  if (
                    value &&
                    !form.teamMembers.find(
                      (member) => member.customerId === value.customerId
                    )
                  ) {
                    setForm({
                      ...form,
                      teamMembers: [
                        ...form.teamMembers,
                        { name: value.name, customerId: value.customerId },
                      ],
                    });
                  }
                }}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    variant="standard"
                    label="Assign To Team Members"
                    fullWidth
                    InputProps={{
                      ...params.InputProps,
                      startAdornment: (
                        <InputAdornment position="start">
                          <SearchIcon sx={{ color: "#A0A0A0" }} />
                        </InputAdornment>
                      ),
                    }}
                  />
                )}
              />

              <Box mt={1} display="flex" flexWrap="wrap" gap={1}>
                {form.teamMembers.map((member, i) => (
                  <Chip
                    key={member.customerId}
                    label={member.name}
                    onDelete={() => handleDelete("teamMembers", i)}
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
            </Box>

            {/* Tags */}
            <Box flex={1}>
              <TextField
                label="Tag"
                variant="standard"
                fullWidth
                value={tagInput}
                onChange={(e) => setTagInput(e.target.value)}
                onKeyPress={(e) => {
                  if (e.key === "Enter") {
                    e.preventDefault();
                    const value = tagInput.trim();
                    if (value && !form.tags.includes(value)) {
                      setForm({ ...form, tags: [...form.tags, value] });
                      setTagInput("");
                    }
                  }
                }}
              />

              <Box mt={1} display="flex" flexWrap="wrap" gap={1}>
                {form.tags.map((tag, i) => (
                  <Chip
                    key={i}
                    label={tag}
                    onDelete={() => handleDelete("tags", i)}
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
            </Box>
          </Box>

          {/* Date + Buttons */}
          <Box display="flex" justifyContent="space-between" gap={2} mt={2}>
            <TextField
              type="date"
              label="Last Date"
              variant="standard"
              value={form.last_date}
              onChange={handleChange("last_date")}
              InputLabelProps={{
                shrink: true,
              }}
            />
            <Box display="flex" gap={2}>
              <Button
                sx={{
                  borderRadius: "8px",
                  color: "#0039F4",
                  fontWeight: "500",
                  border: "1px solid #E4E6F6",
                  textTransform: "capitalize",
                  padding: "4px 16px !important",
                }}
              >
                Cancel
              </Button>
              <Button
                sx={{
                  borderRadius: "8px",
                  fontWeight: "500",
                  border: "1px solid #E4E6F6",
                  bgcolor: "#F4F6FF",
                  color: "#0039F4",
                  textTransform: "capitalize",
                  padding: "4px 16px !important",
                }}
              >
                Draft
              </Button>
              {loader ? (
                <Loader />
              ) : (
                <Button
                  variant="contained"
                  onClick={handleSubmit}
                  sx={{
                    borderRadius: "8px",
                    fontWeight: "500",
                    padding: "4px 16px !important",
                    bgcolor: "#0039F4",
                    color: "#fff",
                    textTransform: "capitalize",
                  }}
                >
                  Publish
                </Button>
              )}
            </Box>
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default AddRecognition;
