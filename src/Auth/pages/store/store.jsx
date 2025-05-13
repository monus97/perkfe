import { Box, Typography } from "@mui/material";
import StoreTopbar from "./topBar";
import StoreHeader from "./storeHeader";
import HeroSection from "./heroSection";
import MainContent from "./mainContent";
import LookSection from "./lookSection";
import MenSection from "./mensSection";
import WomenSection from "./womensSection";
import OfferSection from "./offer";
import MobileSection from "./mobileSection";
import Footer from "./footer";
import { useNavigate } from "react-router-dom";
import authInstance from "../../../authInstance";
import { useEffect, useState } from "react";

const StoreDetails = () => {
  const navigate = useNavigate();
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const handleNavigate = (id) => {
    navigate(`/store/product-details?id=${id}`);
  };

  const fetchAllProducts = async () => {
    try {
      const products = await authInstance.get(`/user/getTopDeals`);
      if (products?.status === 200) {
        setProducts(products?.data);
      }
    } catch (error) {
      console.log(error, "error");
    }
  };
  const fetchAllCategories = async () => {
    try {
      const categories = await authInstance.get(`/user/getFeaturedCategory`);
      if (categories?.status === 200) {
        setCategories(categories?.data);
      }
    } catch (error) {
      console.log(error, "error");
    }
  };
  useEffect(() => {
    fetchAllProducts();
    fetchAllCategories();
  }, []);

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
      <HeroSection />
      <MainContent products={products} handleNavigate={handleNavigate} />
      <LookSection />
      <Box
        mt={8}
        display={"flex"}
        flexDirection={"column"}
        justifyContent={"center"}
        alignItems={"center"}
      >
        <Typography fontSize={40} fontWeight={700}>
          Explore Trendy, Comfortable, and Quality Fashion{" "}
        </Typography>
        <Typography fontSize={40} fontWeight={700}>
          for Every Occasion
        </Typography>
        <Typography fontSize={20} fontWeight={400} color="#4B4B4B">
          Explore Trendy, Comfortable, and Quality Fashion for Every Occasion
        </Typography>
      </Box>
      <MenSection categories={categories} handleNavigate={handleNavigate} />
      {/* <WomenSection categories={categories} handleNavigate={handleNavigate} /> */}
      <OfferSection />
      <Box mt={10}>
        <MobileSection />
      </Box>
      <Footer />
    </Box>
  );
};

export default StoreDetails;
