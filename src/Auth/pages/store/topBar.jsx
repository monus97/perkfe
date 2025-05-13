import { Box, InputBase, Typography } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import vector6 from "../../../Assets/Organzations/Group.png";
import green from "../../../Assets/products/Group.png";
import { useEffect, useState } from "react";
const StoreTopbar = () => {
  const [roleType, setRoleType] = useState("");
    useEffect(()=>{
      const data = sessionStorage.getItem('user')
      if(data){
        const user = JSON.parse(data)
        setRoleType(user.role)
      }
    },[])
  return (
    <Box
      display={"flex"}
      justifyContent={"space-between"}
      padding={"20px 4.5rem"}
      textAlign={"center"}
    >
      <Typography
        color="#000000"
        fontSize={20}
        fontWeight={500}
        display={"flex"}
        alignItems={"center"}
      >
        Your Company Logo
      </Typography>
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          border: "1px solid #e5e5e5",
          borderRadius: "12px",
          padding: "8px 16px",
          width: "100%",
          maxWidth: 500,
          bgcolor: "#F7F8FA",
        }}
      >
        <InputBase
          placeholder="Search Products.."
          sx={{
            ml: 1,
            flex: 1,

            fontSize: "20px",
            color: "#ccc",
            "&::placeholder": {
              color: "#e0e0e0",
              opacity: 1,
            },
          }}
        />
        <SearchIcon sx={{ color: "#8787aa", fontSize: 28 }} />
      </Box>
      <Box display={"flex"} gap={2}>
        <Box display={"flex"} alignItems={"center"}>
          <Typography
            display={"flex"}
            fontSize={22}
            color="#1C1C1C"
            alignItems={"center"}
            gap={2}
            fontWeight={700}
          >
            {" "}
            <Box
              bgcolor={"#F3F1F7"}
              borderRadius={"4px"}
              width={39}
              height={39}
            >
              <img width={28} height={28} src={vector6} />
            </Box>
            7561.66
          </Typography>
        </Box>
        {roleType !== "admin" && (
          <Box display={"flex"} alignItems={"center"}>
            <Typography
              display={"flex"}
              fontSize={22}
              color="#1C1C1C"
              alignItems={"center"}
              gap={2}
              fontWeight={700}
            >
              {" "}
              <Box
                bgcolor={"#F3F1F7"}
                borderRadius={"4px"}
                width={39}
                height={39}
              >
                <img width={28} height={28} src={green} />
              </Box>
              7561.66
            </Typography>
          </Box>
        )}
      </Box>
    </Box>
  );
};
export default StoreTopbar;
