import React, { useState, useEffect } from "react";
import {
  Box,
  Grid,
  Card,
  CardMedia,
  CardContent,
  Typography,
  Pagination,
  Breadcrumbs,
} from "@mui/material";
import { useSelector } from "react-redux";
import { RootState } from "../store/store";
import { useNavigate } from "react-router-dom";
import Loader from "./common/Loader";
import { Link as RouterLink } from "react-router-dom"; // Import Link from React Router
import { ChevronLeft } from "@mui/icons-material";
import { useTranslation } from "react-i18next";


const YachtsList = () => {
  const searchData = useSelector((state: RootState) => state.search);
  const [currentPage, setCurrentPage] = useState(1);
  const [isLoading, setIsLoading] = useState(true);
  const yachtsPerPage = 8;
    const { t } = useTranslation() as any;

  const navigate = useNavigate(); 

  const handlePageChange = (
    event: React.ChangeEvent<unknown>,
    value: number
  ) => {
    setCurrentPage(value);
  };

  const handleCardClick = (yacht: any) => {
    localStorage.setItem("selectedYacht", JSON.stringify(yacht));
    navigate("/yacht-details", { state: { from: "null" } });
  };

  const indexOfLastYacht = currentPage * yachtsPerPage;
  const indexOfFirstYacht = indexOfLastYacht - yachtsPerPage;
  const currentYachts =
    searchData?.searchResults?.results?.slice(
      indexOfFirstYacht,
      indexOfLastYacht
    ) || [];

  useEffect(() => {
    const timeout = setTimeout(() => {
      setIsLoading(false);
    }, 3000);

    // Clean up the timeout if the component is unmounted before the timeout ends
    return () => clearTimeout(timeout);
  }, []); 

  // If the loader is true, show the Loader component
  if (isLoading) {
    return (
      <Box
        sx={{ padding: "2rem 4rem" }}
        style={{ display: "flex", justifyContent: "center" }}>
        
          <Loader />
      </Box>
    );
  }


  
  
  return (
    <>
      {searchData?.searchResults?.results && (
        <Box sx={{ padding: "2rem 4rem" }}>
          <Breadcrumbs
            aria-label="breadcrumb"
            style={{
              marginBottom: "16px",
              display: "flex",
              alignItems: "center",
            }}>
            <RouterLink
              to="/"
              style={{
                textDecoration: "none",
                color: "#969090",
                fontWeight: "500",
                display: "inline-flex", // Ensure icon and text are in the same line
                alignItems: "center", // Vertically align the icon with the text
              }}>
              <ChevronLeft
                style={{ fontSize: "24px", color: "gray", marginRight: "8px" }}
              />
              Home
            </RouterLink>
          </Breadcrumbs>
          <Typography
            variant="h4"
            sx={{ fontWeight: "bold", marginBottom: "1rem" }}>
            {searchData.searchResults?.results[0]?.location?.country}:{" "}
            {searchData?.searchResults?.results?.length}{" "}
            {t("dest_boats_count_title")}
          </Typography>
          <Typography
            variant="body1"
            color="textSecondary"
            sx={{ marginBottom: "2rem" }}>
            {t("dest_boats_title")}
          </Typography>

          <Grid container spacing={3}>
            {currentYachts.map((yacht: any) => (
              <Grid item xs={12} sm={6} md={4} lg={3} key={yacht.id}>
                <Card
                  onClick={() => handleCardClick(yacht)}
                  sx={{
                    borderRadius: "12px",
                    overflow: "hidden",
                    width: "100%", // Ensures the card takes full width
                    height: "100%", // Ensures consistent height
                    cursor: "pointer",
                    display: "flex",
                    flexDirection: "column", // Stack content vertically
                  }}>
                  <CardMedia
                    component="img"
                    height="200" // Adjust height if needed
                    image={
                      yacht.yacht.images[0]?.url || "/placeholder-image.jpg"
                    } // Fallback image
                    alt={yacht.name}
                    sx={{
                      objectFit: "contain", // Ensure full image is shown
                      width: "100%", // Stretch to full width
                      backgroundColor: "#f5f5f5", // Optional background color
                    }}
                  />
                  <CardContent>
                    <Typography variant="body2" sx={{ fontWeight: "bold" }}>
                      {yacht.yacht.name} - {yacht.location.country}
                    </Typography>
                    <Typography variant="body2" color="textSecondary">
                      {yacht?.yacht?.cabins} cabins | {yacht?.yacht?.berths}{" "}
                      beds | year {yacht.yacht.year}
                    </Typography>
                    <Typography
                      variant="body2"
                      sx={{ marginTop: "0.5rem", fontWeight: "bold" }}>
                      from {yacht.price}€ per week
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>

          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              marginTop: "2rem",
            }}>
            <Pagination
              count={Math.ceil(
                (searchData?.searchResults?.results?.length || 0) /
                  yachtsPerPage
              )}
              page={currentPage}
              onChange={handlePageChange}
              shape="rounded"
              color="primary"
              size="large"
            />
          </Box>
        </Box>
      )}
    </>
  );
};

export default YachtsList;
