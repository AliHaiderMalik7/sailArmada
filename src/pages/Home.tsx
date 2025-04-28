import React, { useRef } from "react";
import { Box, useMediaQuery } from "@mui/material";
import Header from "../components/Header";
import Banner from "../components/Banner";
import SearchCard from "../components/SearchCard";
import Destinations from "../components/Destinations";
import { fetchdestinations } from "../utils/boatApi";
import { useSelector } from "react-redux";
import { RootState } from "../store/store";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import Footer from "../components/common/Footer";
import ReviewCards from "../components/common/ReviewCards";
import CookieConsentBanner from "../components/general/CookieConsentBanner";
import { message } from "antd";

interface Destination {
  code: string;
  country: string;
  value: number; // Adjust based on API response
  imageURL: string;
}


const Home = () => {
  const navigate = useNavigate();
  const [destinations, setDestinations] = React.useState<Destination[]>([]); // Correct type
  const [loader, setLoader] = React.useState<boolean>(true);
  const searchResults = useSelector(
    (state: RootState) => state.search.searchResults
  );
  const isFirstRender = useRef(true);

  // Hooks to check screen size
  const isSmallScreen = useMediaQuery("(max-width:900px)");
  const isVerySmallScreen = useMediaQuery("(max-width:600px)");

  const countryMap: any = {
    ES: "Spain",
    FR: "France",
    GR: "Greece",
    HR: "Croatia",
    IT: "Italy",
    TR: "Turkey",
  };

  React.useEffect(() => {
    if (isFirstRender.current) {
      isFirstRender.current = false;
      return;
    }
    if (searchResults?.count > 0) {
      navigate("/search-results");
    }
    if (!isFirstRender.current && searchResults.count === 0) {
      toast.error("No boats available!");
    }
  }, [searchResults]);

  React.useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetchdestinations();

        if (res?.status === 200) {
          const imageUrls = [
            "/assets/images/1.jpg",
            "/assets/images/2.jpg",
            "/assets/images/3.jpg",
            "/assets/images/4.jpg",
            "/assets/images/5.jpg",
            "/assets/images/6.jpg",
          ];

          const result: Destination[] = Object.entries(res.data).map(
            ([code, value], index) => ({
              code,
              country: countryMap[code], // Ensure `countryMap` is defined
              value: Number(value), // Convert value to a number if necessary
              imageURL: imageUrls[index % imageUrls.length],
            })
          );

          setDestinations(result);
        } else {
          message.error("Failed to fetch destinations");
        }
      } catch (error) {
        console.error("Error fetching destinations:", error);
        message.error("Error fetching destinations. Please try again later.");
      } finally {
        setLoader(false); // Ensure the loader stops in both success and failure cases
      }
    };

    fetchData();
  }, []);

  return (
    <Box>
      <Header />
      {!isSmallScreen && (
        <Banner>
          <SearchCard />
          <Box
            sx={{
              position: "absolute",
              bottom: "32px",
              left: "50%",
              transform: "translateX(-50%)",
              width:"100%"
            }}>
            <ReviewCards />
          </Box>
        </Banner>
      )}

      {isSmallScreen && (
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            marginBottom:"20px",
            marginTop:"20px",
          }}>
          <SearchCard />
          <Box
            sx={{
              display: "flex",
              flexWrap: "wrap",
              justifyContent: "center",
              gap: "16px",
            }}>
            <ReviewCards />
          </Box>
        </Box>
      )}

      <Destinations destinations={destinations} loader={loader} />
      <Footer />
      <CookieConsentBanner />

    </Box>
  );
};

export default Home;
