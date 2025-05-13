import { Box, Typography, MenuItem, Menu, Button } from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { useEffect, useState } from "react";
import home from "../../../Assets/products/home.png";
import user from "../../../Assets/Organzations/user.png";
import { useNavigate } from "react-router-dom";
const RecognitionHeader = ({ activeData, setActiveData }) => {
  const [anchorEl, setAnchorEl] = useState(null);
  const [roleType, setRoleType] = useState("");
  const navigate = useNavigate();
  const handleMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleNavigation = () => {
    navigate("/store/details");
  };

  const navItems = [
    "All Recognitions",
    "ongoing",
    "completed",
    "claimed",
    "drafts",
  ];

  useEffect(() => {
    const data = sessionStorage.getItem("user");
    if (data) {
      const user = JSON.parse(data);
      setRoleType(user.role);
    }
  }, []);

  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        p: "0rem 4.5rem",
        bgcolor: "#fff",
      }}
    >
      <Box sx={{ display: "flex", alignItems: "center", gap: "15px" }}>
        {navItems?.map((item, i) => (
          <Typography
            key={i}
            sx={{
              bgcolor: activeData === item && "#f7f8fa",
              borderRadius: "6px",
              padding: "4px 10px",
              cursor: "pointer",
              textTransform: "capitalize",
            }}
            onClick={() => setActiveData(item)}
            fontSize={18}
            color="#323232"
          >
            {item}
          </Typography>
        ))}
      </Box>

      {/* Right Side - Icons */}
      <Box sx={{ display: "flex", alignItems: "center", gap: 3 }}>
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            gap: 1,
            cursor: "pointer",
          }}
        >
          <img src={home} width={20} height={20} />
          <Typography onClick={handleNavigation} fontSize={20} fontWeight={400}>
            Go To Store
          </Typography>
        </Box>

        <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
          <img src={user} width={20} height={20} />
          <Button
            onClick={handleMenuOpen}
            endIcon={<ExpandMoreIcon />}
            sx={{
              fontSize: 14,
              color: "#2f2f2f",
              textTransform: "none",
              minWidth: "auto",
              fontSize: "20px",
              fontWeight: "400",
            }}
          >
            Sign In
          </Button>
          <Menu
            anchorEl={anchorEl}
            open={Boolean(anchorEl)}
            onClose={handleMenuClose}
          >
            <MenuItem onClick={handleMenuClose}>Login</MenuItem>
            <MenuItem onClick={handleMenuClose}>Register</MenuItem>
          </Menu>
        </Box>
      </Box>
    </Box>
  );
};

export default RecognitionHeader;
