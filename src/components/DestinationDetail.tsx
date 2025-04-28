import React from "react";
import { useLocation } from "react-router-dom";
import { Box, Typography, useMediaQuery } from "@mui/material";
import Banner from "./Banner";
import Header from "./Header";
import SearchCard from "./SearchCard";
import YachtsList from "./YachtsList";
import { searchYachts } from "../utils/boatApi";
import { getOneWeekLaterDate, getTodayDate } from "../utils/getTodayDate";
import { useDispatch } from "react-redux";
import { setSearchResultsSlice } from "../store/searchSlice";
import { getDefaultDateRange, normalizeDateToUTC } from "../utils/dateUtils";

const DestinationDetail: React.FC = () => {
  const location = useLocation();
  const dispatch = useDispatch();
  const isSmallScreen = useMediaQuery("(max-width: 900px)"); // Detect small screens

  React.useEffect(() => {
    const country: any = location.pathname.split("/").pop();

    // If dateRange is not selected, set default dates
    const [checkIn, checkOut] = getDefaultDateRange();

    const selectedCheckIn = normalizeDateToUTC(checkIn);
    const selectedCheckOut = normalizeDateToUTC(checkOut);

    if (country) {
      let beds: any = 0;
      let yachtType: any = "";
      searchYachts(
        selectedCheckIn,
        selectedCheckOut,
        country,
        "EUR",
        yachtType,
        beds
      ).then((res) => {
        dispatch(setSearchResultsSlice(res));
      });
    }
  }, [location]);

  const { destination } = location.state || {}; // Get the destination from state

  // If no destination is passed, show a fallback message
  if (!destination) {
    return <Typography variant="h6">No destination data available</Typography>;
  }

  return (
    <Box>
      <Header />
      {!isSmallScreen && (
        <Banner>
          <SearchCard />
        </Banner>
      )}
      {isSmallScreen && (
        <Box  >
          <SearchCard />
        </Box>
      )}
      {/* Add Destinations section here */}
      <YachtsList />
    </Box>
  );
};

export default DestinationDetail;
