import React, { useEffect, useState } from "react";
import {
  Box,
  Card,
  CardContent,
  Typography,
  Avatar,
  Button,
  Chip,
  Tabs,
  Tab,
  Grid,
  IconButton,
  Divider,
} from "@mui/material";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import EditIcon from "@mui/icons-material/Edit";
import user from "../../../Assets/Organzations/Group 289627.png";
import gold from "../../../Assets/Organzations/Vector.png";
import heart from "../../../Assets/Organzations/Vector (2).png";
import flash from "../../../Assets/Organzations/primary.png";
import imge from "../../../Assets/Organzations/Frame 1321317070 (1).png";
import joys from "../../../Assets/Organzations/Frame 1321317070.png";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import EditTaskModal from "../../../Components/organizationAdmin/modals/editTask";
import authInstance from "../../../authInstance";
import { useAppContext } from "../../../contexts/appcontext";
import { useNavigate } from "react-router-dom";

const recognitions = [
  {
    id: 1,
    user: "Stephen George",
    role: "Digital Marketer",
    date: "Jan 2",
    title: "Achieve Sales Target For Q1",
    description:
      "Recognizing Outstanding Effort In Reaching 100% Of Sales Goals For The Quarter",
    image: [joys, imge],
    likes: 34,
    participants: ["Jane Smith", "Rajesh"],
    status: "Ongoing",
    reward: 55,
    isCurrentUser: false,
  },
  {
    id: 2,
    user: "Stephen George",
    role: "Digital Marketer",
    date: "Jan 2",
    title: "Achieve Sales Target For Q1",
    description:
      "Recognizing Outstanding Effort In Reaching 100% Of Sales Goals For The Quarter",
    image: [imge],
    likes: 34,
    participants: ["Jane Smith", "Rajesh"],
    status: "Completed",
    reward: 55,
    isCurrentUser: false,
  },
  {
    id: 3,
    user: "John Smith (You)",
    role: "Digital Marketer",
    date: "Jan 2",
    title: "Achieve Sales Target",
    description: "Recognizing Outstanding Effls For The Quarter",
    image: [joys, imge],
    likes: 34,
    participants: ["Jane Smith", "Rajesh", "test"],
    status: "Ongoing",
    reward: 55,
    isCurrentUser: true,
  },
];

const StatusChip = ({ status }) => {
  let label = status;
  let color;
  switch (status) {
    case "Ongoing":
      color = "info";
      break;
    case "Completed":
      color = "success";
      break;
    case "Claimed":
      color = "warning";
      break;
  }

  return (
    <Chip
      label={label}
      sx={{
        fontSize: "16px",
        borderRadius: "4px",
        color: label === "Completed" ? "#23BD40" : "#3768E3",
        fontWeight: "500",
        textTransform: "capitalize",
        padding: "6px 8px !important",
        background: label === "Completed" ? "#E6FDE5" : "#E8EFFD",
      }}
      size="small"
    />
  );
};

const RecognitionCard = ({ data, onEdit }) => {
  const navigate = useNavigate();
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex((prev) => (prev + 1) % data?.images?.length);
    }, 4000); // Change image every 4 seconds
    return () => clearInterval(interval);
  }, [data?.images?.length]);
  return (
    <>
      <Card elevation={0} sx={{ borderRadius: 4 }}>
        <CardContent>
          <Box display="flex" justifyContent="space-between">
            <Box display="flex" alignItems="center" gap={1}>
              <Avatar />
              <Box>
                <Typography fontSize={18} color="#252525" fontWeight={500}>
                  {data?.organization?.name}
                </Typography>
                <Typography fontSize={16} color="#9C9C9C">
                  {data?.organization?.roleweweh9y}
                </Typography>
              </Box>
            </Box>
            <Typography color="#BFBFBF" fontSize={14}>
              {data.date}
            </Typography>
          </Box>
          <Box mt={2}>
            <Typography
              display={"flex"}
              justifyContent={"space-between"}
              alignItems={"center"}
              fontWeight={500}
              fontSize={18}
              color="#252525"
            >
              {data.title}{" "}
              {data.isCurrentUser && (
                <Box display="flex" justifyContent="flex-end">
                  <IconButton onClick={() => onEdit(data)} size="small">
                    <EditIcon fontSize="small" />
                  </IconButton>
                </Box>
              )}
            </Typography>

            <Typography mb={2} variant="body2" fontSize={16} color="#858585">
              {data.description}
            </Typography>
          </Box>
          {data?.images?.length > 0 && (
            <Box
              position="relative"
              mb={2}
              mt={2}
              sx={{ overflow: "hidden", borderRadius: 2 }}
            >
              <img
                src={data?.images[currentImageIndex]}
                alt="recognition"
                style={{
                  width: "100%",
                  height: "auto",
                  borderRadius: 8,
                  transition: "transform 0.5s ease-in-out",
                }}
              />
              <IconButton
                onClick={() =>
                  setCurrentImageIndex(
                    (prev) => (prev + 1) % data?.images?.length
                  )
                }
                sx={{
                  position: "absolute",
                  bottom: 8,
                  right: 8,
                  backgroundColor: "white",
                  boxShadow: 2,
                  "&:hover": { backgroundColor: "#eee" },
                }}
                size="small"
              >
                <ChevronRightIcon />
              </IconButton>
            </Box>
          )}
          <Divider sx={{ borderStyle: "dashed" }} />{" "}
          <Box display="flex" alignItems="center" p={"10px 0px"}>
            {/* <IconButton size="small">
            <FavoriteBorderIcon fontSize="small" />
          </IconButton> */}
            <img width={27} height={24} src={heart} />
            <Typography ml={1} color="#7B7B7B" fontSize={16}>
              {data?.likes}
            </Typography>
            <Box flexGrow={1} />
            <Typography color="#908D95" mr={1} fontSize={16}>
              {data?.assign?.length > 1
                ? `${data?.assign[0]}.. +${data?.assign?.length - 1}`
                : data?.assign[0]?.name}
            </Typography>
            <img src={user} width={20} height={25} />
          </Box>
          <Divider sx={{ borderStyle: "dashed" }} />
          <Box
            mt={2}
            display="flex"
            justifyContent="space-between"
            alignItems="center"
          >
            <StatusChip status={data.status} />
            <Typography variant="caption">
              <span style={{ color: "#9C9C9C" }}>Last Date: </span>{" "}
              {data?.last_date}
            </Typography>
            <Typography color="#9C9C9C" fontWeight={400} fontSize={14}>
              Reward{" "}
              <b
                style={{
                  color: "#3D3847",
                  fontSize: "18px",
                  fontWeight: "400",
                }}
              >
                <img width={15} height={15} src={gold} /> {data.points}
              </b>
            </Typography>
            {data.status === "completed" ? (
              <Button
                sx={{
                  bgcolor: "#0039F4",
                  color: "#fff",
                  borderRadius: "8px",
                  padding: "6px 10px",
                  textTransform: "capitalize",
                }}
              >
                Claim
              </Button>
            ) : (
              <Button
                sx={{
                  background: "#47DD4C",
                  border: "none",
                  borderRadius: "8px",
                  color: "#fff",
                  textTransform: "capitalize",
                  padding: "6px 10px",
                }}
                size="small"
              >
                <img
                  width={12}
                  height={17}
                  style={{ marginRight: "3px" }}
                  src={flash}
                />{" "}
                Boost
              </Button>
            )}
          </Box>
        </CardContent>
      </Card>
    </>
  );
};

const StepperDetailing = ({ activeData, setActiveData }) => {
  const { refresh } = useAppContext();
  const [open, setOpen] = useState(false);
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [selectedTask, setSelectedTask] = useState(null);
  const [recognitions, setRecognitions] = useState([]);

  const fetchAllRecognitions = async () => {
    const data = JSON.parse(sessionStorage.getItem("user") || "{}");

    try {
      const res = await authInstance.get(
        `/admin/recognition/list?status=${activeData}&page=${page}&pageSize=${pageSize}&orgId=${data?.orgId}`
      );

      if (res?.status === 200 && Array.isArray(res.data)) {
        setRecognitions(res.data);
      } else {
        setRecognitions([]);
      }
    } catch (error) {
      console.error("Error fetching recognitions:", error);
      setRecognitions([]);
    }
  };

  useEffect(() => {
    fetchAllRecognitions();
  }, [activeData, page, pageSize, refresh]);
  const handleEdit = (task) => {
    setSelectedTask(task);
    setOpen(true);
  };
  const onClose = () => {
    setOpen(false);
  };

  return (
    <Box p={2}>
      <Grid container spacing={2} mt={1}>
        {recognitions.map((rec) => (
          <Grid item xs={12} md={6} key={rec.id}>
            <RecognitionCard data={rec} onEdit={handleEdit} />
          </Grid>
        ))}
      </Grid>
      {selectedTask && (
        <EditTaskModal open={open} onClose={onClose} task={selectedTask} />
      )}
    </Box>
  );
};

export default StepperDetailing;
