import React, { useState, useEffect } from "react";
import {
  Box,
  Grid,
  Typography,
  CircularProgress,
  Button,
  CardContent,
  Card,
  CardMedia,
  Breadcrumbs,
} from "@mui/material";
import { useTranslation } from "react-i18next";

import { useLocation, useNavigate } from "react-router-dom";
import { YachtDetails, PaginatedYachtResponse } from "../types/YachtDetails";
import HeaderWithSearch from "../components/common/HeaderWithSearch";
import MapboxMap from "../components/MapboxMap";
import { searchYachts } from "../utils/boatApi";
import { getTodayDate, getOneWeekLaterDate } from "../utils/getTodayDate";
import { useSelector } from "react-redux";
import { RootState } from "../store/store";
import { Link as RouterLink } from "react-router-dom"; // Import Link from React Router
import { ChevronLeft } from "@mui/icons-material";
import Tooltip from "@mui/material/Tooltip";
import { Carousel } from "antd";

interface YachtLocation {
  id: number;
  latitude: number;
  longitude: number;
}

const SearchResults: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate(); // Use useNavigate for routing
  const searchData = useSelector((state: RootState) => state.search);

  // State to hold search results, loading state, and pagination
  const [searchResults, setSearchResults] = useState<any>(
    searchData?.searchResults?.results
  );
  const [loading, setLoading] = useState<boolean>(false);
  const [page, setPage] = useState<number>(1); // Current page
  const [totalPages, setTotalPages] = useState<number>(1); // Total number of pages
  // State for hovered yacht coordinates
  const [hoveredLocation, setHoveredLocation] = useState<{
    latitude: number;
    longitude: number;
  } | null>(null);
  const today = getTodayDate();
  const oneWeekLater = getOneWeekLaterDate();
  const { t } = useTranslation() as any;

  // Initial search parameters state, without setSearchParams
  const [searchParams, setSearchParams] = useState({
    checkIn: today,
    checkOut: oneWeekLater,
    country: searchData.selectedLocation?.countryName,
    boatType: "",
    city: searchData.selectedLocation?.city,
    beds: 0,
    baseFromId: searchData.selectedLocation?.id,
  });

  const [clusterYachts, setClusterYachts] = useState<YachtLocation[]>([]);

  const handleClusterClick = (clusterYachts: YachtLocation[]) => {
    setClusterYachts(clusterYachts);
  };

  // Extract yacht locations from searchResults
  const yachtLocations = searchResults
    ?.filter((yacht: any) => yacht.location) // Only include yachts with valid location
    ?.map((yacht: any) => ({
      id: yacht?.yachtId,
      latitude: yacht?.location?.latitude,
      longitude: yacht?.location?.longitude,
    }));

  const handleYachtHover = (latitude: number, longitude: number) => {
    setHoveredLocation({ latitude, longitude });
  };

  useEffect(() => {
    if (location.state?.searchResults) {
      // If there are search results passed from the search page, set them
      setSearchResults(searchData?.searchResults?.results || []);
      setTotalPages(Math.ceil(searchData?.searchResults?.results / 20)); // Assuming 10 results per page
    } else {
      // Otherwise, initiate a search for the first page
      // handleSearch(
      //   searchParams.checkIn,
      //   searchParams.checkOut,
      //   searchParams.country,
      //   searchParams.boatType,
      //   searchParams.beds,
      //   searchParams.city,
      //   searchParams.baseFromId,
      //   page
      // );
    }
  }, [page]);
  // Utility function to format a date as YYYY-MM-DD
  const formatDate = (date: Date | string): string => {
    if (typeof date === "string") return date; // If it's already a string, return it
    return date.toISOString();
  };
  // Function to handle search, including pagination
  const handleSearch = async (
    checkIn: string,
    checkOut: string,
    country: string,
    boatType: string,
    beds: number,
    city: string,
    baseFromId: any,
    page: number
  ) => {
    setLoading(true);

    try {
      // Call the searchYachts API
      const yachtResults = await searchYachts(
        formatDate(checkIn) || today,
        formatDate(checkOut) || oneWeekLater,
        country || "",
        "EUR", // Default currency
        boatType || "",
        beds,
        page, // Pass the current page
        city,
        baseFromId
      );

      // Check if yachtResults is null
      if (!yachtResults) {
        console.error("Search returned no results");
        setSearchResults([]); // Set search results to an empty array
        setTotalPages(0); // Reset pagination
        return;
      }

      // If results exist, update the state
      setSearchResults(yachtResults.results); // Update the search results
      setTotalPages(Math.ceil(yachtResults.count / 20)); // Update total pages based on the result count
    } catch (error) {
      console.error("Search failed", error);
    } finally {
      setLoading(false); // Always stop loading spinner
    }
  };

  // Reset pagination and initiate a new search when triggered from HeaderWithSearch
  const handleNewSearch = (
    checkIn: string,
    checkOut: string,
    country: string,
    boatType: string,
    beds: number,
    city: string,
    baseFromId: number
  ) => {
    setPage(1); // Reset to the first page
    setSearchParams({
      checkIn,
      checkOut,
      country,
      boatType,
      beds,
      city,
      baseFromId,
    }); // Update the search params
    handleSearch(
      checkIn,
      checkOut,
      country,
      boatType,
      beds,
      city,
      baseFromId,
      1
    ); // Call search for the first page
  };

  const handlePageChange = (newPage: number) => {
    setPage(newPage); // Update the page number in state
    handleSearch(
      searchParams.checkIn,
      searchParams.checkOut,
      searchParams.country,
      searchParams.boatType,
      searchParams.beds,
      searchParams.city,
      searchParams.baseFromId,
      newPage
    ); // Re-fetch results for the new page
  };

  const handleYachtClick = (yacht: YachtDetails) => {
    // Store the selected yacht details in localStorage

    localStorage.setItem("selectedYacht", JSON.stringify(yacht));

    // Navigate to the yacht details page
    navigate(`/yacht-details`, { state: { from: "yachtsLists" } });
  };

  return (
    <Box>
      <HeaderWithSearch onSearch={handleNewSearch} />

      <Box
        sx={{
          paddingTop: "2rem",
          paddingLeft: "7rem",
          paddingRight: "7rem",
          "@media (max-width: 900px)": {
            paddingTop: "2rem",
            paddingLeft: "2rem",
            paddingRight: "2rem",
          },
        }}
      >
        <Breadcrumbs
          aria-label="breadcrumb"
          style={{
            marginBottom: "16px",
            display: "flex",
            alignItems: "center",
          }}
        >
          <RouterLink
            to="/"
            style={{
              textDecoration: "none",
              color: "#969090",
              fontWeight: "500",
              display: "inline-flex",
              alignItems: "center",
            }}
          >
            <ChevronLeft
              style={{ fontSize: "24px", color: "gray", marginRight: "8px" }}
            />
            Home
          </RouterLink>
        </Breadcrumbs>

        <Typography
          sx={{ marginBottom: "1rem", fontSize: "24px", fontWeight: "600" }}
        >
          {t("available_text")}
        </Typography>
        <Grid container spacing={3}>
          <Grid item xs={12} md={4}>
            {/*  */}

            {/* MapboxMap Component */}
            <MapboxMap
              yachtLocations={yachtLocations}
              hoveredLocation={hoveredLocation}
              onClusterClick={handleClusterClick}
            />
          </Grid>

          <Grid item xs={12} md={8}>
            {loading ? (
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  height: "70vh",
                }}
              >
                <CircularProgress />
              </Box>
            ) : (
              <Box
                sx={{
                  maxHeight: "70vh",
                  overflowY: "auto",
                  paddingRight: "1rem",
                }}
              >
                {searchResults?.map((yacht: any, index: any) => (
                  <Card
                    key={`${index}}`}
                    sx={{
                      display: "flex",
                      mb: "1.5rem",
                      borderRadius: "16px",
                      overflow: "hidden",
                      height: "240px",
                    }}
                  >
                    <Box
                      sx={{
                        width: "250px",
                        height: "100%",
                        position: "relative",
                      }}
                    >
                      <Carousel arrows infinite={false} dots={false}>
                        {(
                          yacht?.yacht?.images || [
                            {
                              url: "https://d2h7hm4130kene.cloudfront.net/__1574423637__/images/zone/9_small_2x_q90.webp",
                            },
                          ]
                        ).map((image: any, imgIndex: number) => (
                          <Box
                            key={imgIndex}
                            sx={{ width: "100%", height: "100%" }}
                          >
                            <CardMedia
                              component="img"
                              height="100%"
                              image={image.url}
                              alt={yacht?.yacht?.name || "Yacht Image"}
                              sx={{ objectFit: "cover" }}
                            />
                          </Box>
                        ))}
                      </Carousel>
                    </Box>

                    <CardContent
                      sx={{
                        display: "flex",
                        flexDirection: "column",
                        justifyContent: "space-between",
                        width: "100%",
                      }}
                    >
                      <Box>
                        <Typography
                          variant="h6"
                          sx={{
                            fontWeight: "bold",
                            mb: "0.5rem",
                            cursor: "pointer",
                          }}
                          onClick={() => handleYachtClick(yacht)}
                          onMouseEnter={() =>
                            handleYachtHover(
                              yacht?.location?.latitude,
                              yacht?.location?.longitude
                            )
                          }
                          onMouseLeave={() => setHoveredLocation(null)}
                        >
                          {yacht?.yacht?.model || "Yacht Name"}{" "}
                          <Box
                            component="span"
                            sx={{
                              ml: 1,
                              display: "inline-block",
                              position: "relative",
                            }}
                          >
                            <Tooltip
                              title={
                                <Box>
                                  <Typography
                                    variant="subtitle1"
                                    sx={{ fontWeight: 500 }}
                                  >
                                    Confirmed Availability
                                  </Typography>
                                  <Typography variant="body2">
                                    Updated availability and pricing. You can
                                    book immediately.
                                  </Typography>
                                </Box>
                              }
                              arrow
                              placement="top"
                              sx={{
                                "& .MuiTooltip-tooltip": {
                                  backgroundColor: "#fff", // Set background to white
                                  color: "#393c3d", // Text color
                                  border: "1px solid #e0e0e0", // Optional border
                                  boxShadow: "0px 2px 8px rgba(0, 0, 0, 0.1)", // Optional shadow
                                  fontSize: "14px",
                                },
                                "& .MuiTooltip-arrow": {
                                  color: "#fff", // Match arrow color to tooltip background
                                },
                              }}
                            >
                              <img
                                src="https://d2h7hm4130kene.cloudfront.net/__1530659716__/images/greencheck.svg"
                                alt="Confirmed Availability"
                                style={{
                                  height: "14px",
                                  position: "relative",
                                  top: "0px",
                                  cursor: "pointer",
                                }}
                              />
                            </Tooltip>
                          </Box>
                        </Typography>
                        <Typography
                          variant="body2"
                          sx={{ color: "#666", mb: "0.5rem" }}
                        >
                          {yacht.startBase} → {yacht.endBase}
                        </Typography>

                        <Typography
                          variant="body2"
                          sx={{
                            color: "#666",
                            alignItems: "center",
                            flexWrap: "wrap",
                          }}
                        >
                          <img
                            src="https://d2h7hm4130kene.cloudfront.net/__1607705537__/images/smallboat.svg"
                            alt="Small Boat"
                            style={{
                              width: "14px",
                              height: "14px",
                              marginRight: "8px", // Adds spacing between the icon and text
                              position: "relative",
                              top: "2px",
                            }}
                          />
                          year {yacht?.yacht?.year} · Catamarans ·{" "}
                          {yacht?.yacht?.cabins} cabins · length{" "}
                          {yacht?.yacht?.length} ·{yacht?.yacht?.kind} ·
                          Generator · Inverter · Air condition · Heating
                        </Typography>

                        <Box
                          sx={{
                            display: "inline-block",
                            padding: "0.25rem 0.75rem",
                            border: "1px solid #ccc",
                            borderRadius: "16px",
                            color: "#666",
                            fontWeight: "bold",
                            fontSize: "14px",
                            backgroundColor: "#ffffff",
                            marginTop: "20px"
                          }}
                        >
                          {yacht.discountPercentage
                            ? yacht.discountPercentage > 15
                              ? `🔥 -${yacht.discountPercentage}% Super Discount!`
                              : `-${yacht.discountPercentage}% Discount`
                            : "No Discount"}
                        </Box>
                      </Box>

                      <Box
                        sx={{
                          display: "flex",
                          justifyContent: "end",
                          alignItems: "center",
                          mt: "1rem",
                        }}
                      >
                        <Box>
                          <Typography
                            variant="body2"
                            sx={{
                              color: "#666",
                              textDecoration: "line-through",
                            }}
                          >
                            {yacht.startPrice}€
                          </Typography>
                          <Typography
                            variant="h6"
                            sx={{ fontWeight: "bold", color: "#000" }}
                          >
                            from {yacht.price}€
                          </Typography>
                        </Box>
                      </Box>
                    </CardContent>
                  </Card>
                ))}

                {/* Pagination Controls */}
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "center",
                    mt: "2rem",
                  }}
                >
                  {/* Previous Button */}
                  <Button
                    variant="contained"
                    onClick={() => handlePageChange(page - 1)}
                    disabled={page <= 1} // Disable if on the first page
                    sx={{ mr: 2 }}
                  >
                    Previous
                  </Button>

                  <Typography sx={{ pt: 1 }}>
                    Page {page} of {totalPages}
                  </Typography>

                  {/* Next Button */}
                  <Button
                    variant="contained"
                    onClick={() => handlePageChange(page + 1)}
                    disabled={page >= totalPages} // Disable if on the last page
                    sx={{ ml: 2 }}
                  >
                    Next
                  </Button>
                </Box>
              </Box>
            )}
          </Grid>
        </Grid>
      </Box>
    </Box>
  );
};

export default SearchResults;
