import React from "react";
import { Box, Container, Typography } from "@mui/material";
import OrderCard from "./myOrder";
import StoreTopbar from "../../../Auth/pages/store/topBar";
import StoreHeader from "../../../Auth/pages/store/storeHeader";
import Footer from "../../../Auth/pages/store/footer";
import imgs from "../../../Assets/Rectangle3426.png";
import noorder from "../../../Assets/Noorders.png";
const OrdersPage = () => {
  const data = [{ name: "" }];
  return (
    <Box>
      <Box
        sx={{
          position: "sticky",
          top: 0,
          zIndex: 1100,
          backgroundColor: "#fff",
          boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.1)",
        }}
      >
        <StoreTopbar />
        <StoreHeader />
      </Box>
      {data.length > 2 ? (
      <Box display={"flex"} alignItems={"center"} flexDirection={"column"} justifyContent={"center"} sx={{ py: 7, px: 10 }}>
        <>
        <img width={400}  src={noorder}/>
        </>
        <Typography fontWeight={600} fontSize={28}>No Orders Yet!</Typography>
      </Box>
      ) : (
        <Box sx={{ py: 7, px: 10 }}>
          <OrderCard
            title="Arriving Tomorrow 5PM"
            subtitle="Package was handed to resident"
            product={{
              name: "Spigen Ultra Hybrid Cover Case",
              description:
                "Spigen Ultra Hybrid Cover Case Designed for Samsung Galaxy Buds2 Pro",
              image: imgs,
            }}
            date="17 November 2023"
            total="555.50"
            shipTo="Robert Fox"
            items={2}
            orderId="4088121593"
          />
          <OrderCard
            title="Order Delivered Monday"
            subtitle="Package was handed to resident"
            product={{
              name: "Spigen Ultra Hybrid Cover Case",
              description:
                "Spigen Ultra Hybrid Cover Case Designed for Samsung Galaxy Buds2 Pro",
              image: imgs,
            }}
            date="17 November 2023"
            total="555.50"
            shipTo="Robert Fox"
            items={1}
            orderId="4088121593"
          />
        </Box>
      )}
      <Footer />
    </Box>
  );
};

export default OrdersPage;
