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
import user from "../../Assets/Organzations/Group 289627.png";
import gold from "../../Assets/Organzations/Vector.png";
import heart from "../../Assets/Organzations/Vector (2).png";
import flash from "../../Assets/Organzations/primary.png";
import imge from "../../Assets/Organzations/Frame 1321317070 (1).png";
import joys from "../../Assets/Organzations/Frame 1321317070.png";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import EditTaskModal from "./modals/editTask";
import authInstance from "../../authInstance";
import { useAppContext } from "../../contexts/appcontext";
type Recognition = {
  id: number;
  user: string;
  role: string;
  date: string;
  last_date: string;
  title: string;
  description: string;
  image: string[];
  likes: number;
  assign: { name: string; customerId: string }[];
  status: "ongoing" | "completed" | "claimed" | "draft";
  points: number;
  isCurrentUser: boolean;
};

const StatusChip = ({
  status,
}: {
  status: "ongoing" | "completed" | "claimed" | "draft";
}) => {
  let color: "default" | "info" | "success" | "warning" = "default";
  let label = status;

  switch (status) {
    case "ongoing":
      color = "info";
      break;
    case "completed":
      color = "success";
      break;
    case "claimed":
      color = "warning";
      break;
  }

  return (
    <Chip
      label={label}
      sx={{
        fontSize: "16px",
        borderRadius: "4px",
        color: label === "completed" ? "#23BD40" : "#3768E3",
        fontWeight: "500",
        textTransform: "capitalize",
        padding: "6px 8px !important",
        background: label === "completed" ? "#E6FDE5" : "#E8EFFD",
      }}
      size="small"
    />
  );
};

const RecognitionCard = ({
  data,
  onEdit,
}: {
  data: Recognition;
  onEdit: (task: Recognition) => void;
}) => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex((prev) => (prev + 1) % data?.image?.length);
    }, 4000);
    return () => clearInterval(interval);
  }, [data?.image?.length]);
  return (
    <>
      <Card elevation={0} sx={{ borderRadius: 4 }}>
        <CardContent>
          <Box display="flex" justifyContent="space-between">
            <Box display="flex" alignItems="center" gap={1}>
              <Avatar />
              <Box>
                <Typography fontSize={18} color="#252525" fontWeight={500}>
                  {data.user}
                </Typography>
                <Typography fontSize={16} color="#9C9C9C">
                  {data.role}
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
              {data?.title}{" "}
              {data?.isCurrentUser && (
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
          {data?.image?.length > 0 && (
            <Box
              position="relative"
              mb={2}
              mt={2}
              sx={{ overflow: "hidden", borderRadius: 2 }}
            >
              <img
                src={data?.image[currentImageIndex]}
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
                    (prev) => (prev + 1) % data?.image?.length
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
                ? `${data?.assign[0]?.name}.. +${data?.assign?.length - 1}`
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
            <StatusChip status={data?.status} />
            <Typography variant="caption">
              <span style={{ color: "#9C9C9C" }}>Last Date: </span> {data?.last_date}
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
            {data?.status === "completed" ? (
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

const StepperList = () => {
  const { refresh, setRefresh } = useAppContext();
  const [tab, setTab] = useState(0);
  const [open, setOpen] = useState(false);
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [recognitions, setRecognitions] = useState<Recognition[]>([]);
  const [selectedTask, setSelectedTask] = useState(null);
  const tabStatusMap = ["", "ongoing", "completed", "claimed", "draft"];
  const status = tabStatusMap[tab];

  const handleEdit = (task: any) => {
    setSelectedTask(task);
    setOpen(true);
  };

  const onClose = () => {
    setOpen(false);
  };
  const fetchAllRecognitions = async () => {
    const data = JSON.parse(sessionStorage.getItem("user") || "{}");

    try {
      const res = await authInstance.get(
        `/admin/recognition/list?status=${status}&page=${page}&pageSize=${pageSize}&orgId=${data?.orgId}`
      );

      if (res?.status === 200 && Array.isArray(res.data)) {
        setRecognitions(res.data);
      } else {
        setRecognitions([]); // fallback when no data
      }
    } catch (error) {
      console.error("Error fetching recognitions:", error);
      setRecognitions([]); // prevent .map() error in UI on failure
    }
  };

  useEffect(() => {
    fetchAllRecognitions();
  }, [status, page, pageSize, refresh]);

  return (
    <Box p={2}>
      <Tabs
        value={tab}
        onChange={(e, val) => {
          setTab(val);
          setPage(1);
        }}
        sx={{
          background: "#d8d8d85e",
          borderRadius: "16px",
          width: "fit-content",
          minHeight: "unset",
          "& .MuiTabs-indicator": {
            display: "none",
          },
        }}
      >
        {["All Recognitions", "ongoing", "completed", "claimed", "draft"].map(
          (label, index) => (
            <Tab
              key={label}
              label={label}
              sx={{
                textTransform: "capitalize",
                backgroundColor: tab === index ? "white" : "transparent",
                color:
                  tab === index ? "#414141 !important" : "#7F8493 !important",
                borderRadius: "12px",
                minHeight: "unset",
                py: 1,
                px: 2,
              }}
            />
          )
        )}
      </Tabs>

      <Grid container spacing={2} mt={1}>
        {recognitions?.length === 0 ? (
          <Typography mt={2} ml={3}>
            No recognitions found.
          </Typography>
        ) : (
          <Grid container spacing={2} mt={1}>
            {recognitions?.map((rec, i) => (
              <Grid item xs={12} md={6} key={i}>
                <RecognitionCard data={rec} onEdit={handleEdit} />
              </Grid>
            ))}
          </Grid>
        )}
      </Grid>
      {selectedTask && (
        <EditTaskModal open={open} onClose={onClose} task={selectedTask} />
      )}
    </Box>
  );
};

export default StepperList;
