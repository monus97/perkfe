import { Box, Typography, MenuItem, Menu, Button } from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { useEffect, useState } from "react";
import union from "../../../Assets/Organzations/Union.png";
import crt from "../../../Assets/Organzations/Cart Large.png";
import user from "../../../Assets/Organzations/user.png";
import file from "../../../Assets/Organzations/file.png";
import { useNavigate } from "react-router-dom";
import StoreTopbar from "./topBar";
const StoreHeader = () => {
  const [anchorEl, setAnchorEl] = useState(null);
  const [roleType, setRoleType] = useState("");
  const navigate = useNavigate();
  const handleMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleMenuClose = () => {
    setAnchorEl(null);
  };
  const handleMyOrder = ()=>{
    navigate("/user/orders")
  }

  const handleNavigation = () => {
    navigate("/store");
  };

  useEffect(() => {
    const data = sessionStorage.getItem("user");
    if (data) {
      const user = JSON.parse(data);
      setRoleType(user.role);
    }
  }, []);

  const handleNavigateRecgnitionTask = () => {
    navigate("/recognition-tasks");
  };
  const handleNavigateToCart = () => {
    navigate("/user/cart");
  };

  const navItems = ["Men's", "Women's", "Kids", "Accessories", "Ethnic Wear"];

  return (
    <>
      
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
          <Button
            endIcon={<ExpandMoreIcon />}
            sx={{ fontSize: 18, color: "#323232", textTransform: "none" }}
          >
            All Categories
          </Button>

          {navItems.map((item, i) => (
            <Typography key={i} fontSize={18} color="#323232">
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
            <img src={union} width={20} height={20} />
            <Typography
              onClick={handleNavigation}
              fontSize={20}
              fontWeight={400}
            >
              Dashboard
            </Typography>
          </Box>
          {roleType !== "admin" && (
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                gap: 1,
                cursor: "pointer",
              }}
              onClick={handleNavigateRecgnitionTask}
            >
              <img src={file} width={20} height={20} />
              <Typography fontSize={20} fontWeight={400}>
                Recognitions
              </Typography>
            </Box>
          )}

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
              <MenuItem onClick={handleMyOrder}>My Order</MenuItem>
            </Menu>
          </Box>

          <Box
            sx={{
              cursor: "pointer",
              display: "flex",
              alignItems: "center",
              gap: 1,
            }}
          >
            <img src={crt} width={20} height={20} />
            <Typography
              onClick={handleNavigateToCart}
              fontSize={20}
              fontWeight={400}
            >
              Cart
            </Typography>
          </Box>
        </Box>
      </Box>
    </>
  );
};

export default StoreHeader;
