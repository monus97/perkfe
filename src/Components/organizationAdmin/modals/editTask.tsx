import React, { useEffect, useRef, useState } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  Box,
  Typography,
  TextField,
  Avatar,
  IconButton,
  Button,
  Chip,
  InputAdornment,
  Divider,
} from "@mui/material";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import DeleteIcon from "@mui/icons-material/Delete";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import SearchIcon from "@mui/icons-material/Search";
import ClearIcon from "@mui/icons-material/Clear";
import gold from "../../../Assets/Organzations/Vector.png";
import imag from "../../../Assets/Organzations/img.png";
import dayjs from "dayjs";
type Recognition = {
  id: number;
  user: string;
  role: string;
  date: string;
  title: string;
  description: string;
  image: string[];
  likes: number;
  participants: string[];
  status: "Ongoing" | "Completed" | "Claimed" | "Draft";
  reward: number;
  isCurrentUser: boolean;
};
interface EditTaskModalProps {
  open: boolean;
  onClose: () => void;
  task: Recognition;
}

const EditTaskModal: React.FC<EditTaskModalProps> = ({
  open,
  onClose,
  task,
}) => {
  const [title, setTitle] = useState(task.title);
  const [description, setDescription] = useState(task.description);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  useEffect(() => {
    if (task) {
      setTitle(task.title);
      setDescription(task.description);
      setCurrentImageIndex(0);
    }
  }, [task]);

  const [selectedDate, setSelectedDate] = useState("2024-01-02");
  const inputRef = useRef<HTMLInputElement>(null);

  const handleIconClick = () => {
    inputRef.current?.showPicker(); // For modern browsers
    inputRef.current?.focus(); // Fallback
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSelectedDate(e.target.value);
  };

  const images = task.image;

  const handleNextImage = () => {
    setCurrentImageIndex((prev) => (prev + 1) % images.length);
  };

  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth="md">
      <Box display={"flex"} justifyContent={"space-between"}>
        <DialogTitle color="#252525" fontSize={16} fontWeight={500}>
          Edit Task
        </DialogTitle>
        <IconButton  onClick={onClose}>
          <ClearIcon />
        </IconButton>
      </Box>
      <DialogContent>
        <Box display="flex" gap={2}>
          <Box position="relative" width="50%">
            <img
              src={images[currentImageIndex]}
              alt="Slide"
              style={{ width: "100%", borderRadius: 12 }}
            />
            <Box
              position="absolute"
              bottom={10}
              right={10}
              display="flex"
              alignItems="center"
              justifyContent={"space-around"}
              width={"100%"}
              gap={1}
            >
              <IconButton sx={{ bgcolor: "#fff" }} size="small">
                <img width={12} height={12} src={imag} />
              </IconButton>
              <Box display={"flex"} alignItems={"center"} gap={"10px"}>
                <IconButton
                  size="small"
                  sx={{ bgcolor: "#fff" }}
                  onClick={() =>
                    setCurrentImageIndex(
                      (prev) => (prev - 1 + images.length) % images.length
                    )
                  }
                >
                  <ArrowBackIosNewIcon sx={{ fontSize: "12px" }} />
                </IconButton>
                <Typography color="#fff" variant="caption">
                  {currentImageIndex + 1}/{images.length}
                </Typography>
                <IconButton
                  sx={{ bgcolor: "#fff" }}
                  size="small"
                  onClick={handleNextImage}
                >
                  <ArrowForwardIosIcon sx={{ fontSize: "12px" }} />
                </IconButton>
              </Box>

              <IconButton sx={{ bgcolor: "#fff" }} size="small">
                <DeleteIcon sx={{ fontSize: "12px" }} />
              </IconButton>
            </Box>
          </Box>

          <Box flex={1} display="flex" flexDirection="column" gap={2}>
            <TextField
              fullWidth
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              label="Title"
              variant="standard"
              sx={{
                "& input": {
                  color: "#252525 !important", // Replace with your desired color
                  fontSize: "18px",
                  padding: "9px 10px",
                },
              }}
            />
            <TextField
              fullWidth
              variant="standard"
              multiline
              minRows={4}
              sx={{
                "& input": {
                  color: "#5D5D5D !important", // Replace with your desired color
                  fontSize: "18px",
                },
              }}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
          </Box>
        </Box>
        <Divider sx={{ mt: 2 }} />
        <Box mt={3} display="flex" alignItems="center" gap={2}>
          <Avatar />
          <Typography fontSize={14} color="#3D3847" fontWeight={500}>
            {task?.user}
          </Typography>
          <Box flexGrow={1} />
          <Typography fontSize={14} color="#9C9C9C ">
            Created On: <b style={{ color: "#3D3847" }}>2 Jan 2024</b>
          </Typography>
          <Box sx={{position:"relative"}}>

          <Typography
            variant="body2"
            display="flex"
            alignItems="center"
            gap={1}
            fontSize={14}
            color="#9C9C9C "
            

          >
            Last Date: <CalendarMonthIcon  onClick={handleIconClick}  fontSize="small" />{" "}
            <b style={{ color: "#3D3847" }}>
              {" "}
              {dayjs(selectedDate).format("D MMM YYYY")}
            </b>
          </Typography>
          <input
            ref={inputRef}
            type="date"
            value={selectedDate}
            onChange={handleChange}
            style={{
              position: "absolute",
              opacity: 0,
              width: 0,
              height: 0,
              pointerEvents: "none",
            }}
          />
          </Box>
        </Box>
        <Divider sx={{ mt: 2 }} />

        <Box mt={2}>
          <Typography fontSize={14} fontWeight={500} mb={0.5}>
            Assigned To:
          </Typography>
          <TextField
            placeholder="Assign To Team Members"
            variant="standard"
            fullWidth
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <SearchIcon fontSize="small" />
                </InputAdornment>
              ),
            }}
          />
          <Box mt={1} display="flex" gap={1} flexWrap="wrap">
            {task?.participants.map((name, i) => (
              <Chip
                key={i}
                label={name}
                sx={{
                  fontSize: "12px !important",
                  background: "#F7F9FC",
                  color: "#4F4D55",
                  border: "0.6px solid #8AA4FA",
                  borderRadius: "4px",
                  p: "0px !important",
                }}
                onDelete={() => {}}
              />
            ))}
          </Box>
        </Box>

        <Box mt={3} display="flex" alignItems="center" gap={2}>
          <Box display="flex" alignItems="center" gap={1}>
            <Typography color="gold">
              <img width={16} height={16} src={gold} />
            </Typography>
            <Typography fontSize={18} fontWeight={400}>
              {task?.reward}
            </Typography>
          </Box>
          <Chip
            label={task?.status}
            sx={{
              fontSize: "16px",
              borderRadius: "4px",
              color: "#3768E3",
              fontWeight: "500",
              textTransform: "capitalize",
              padding: "6px 8px !important",
              background: "#E8EFFD",
            }}
            color="primary"
          />
          <Box padding={"2px"} borderRadius={"8px"} bgcolor={"#0039F4"}>
            <IconButton sx={{ color: "#fff" }}>
              <ArrowForwardIosIcon sx={{ fontSize: "12px" }} />
            </IconButton>
          </Box>
          <Box flexGrow={1} />
          <Button
          onClick={onClose}
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
              padding: "4px 16px !important",
              bgcolor: "#0039F4",
              color: "#fff",
              textTransform: "capitalize",
            }}
            onClick={() => alert("Saved")}
          >
            Save
          </Button>
        </Box>
      </DialogContent>
    </Dialog>
  );
};

export default EditTaskModal;
