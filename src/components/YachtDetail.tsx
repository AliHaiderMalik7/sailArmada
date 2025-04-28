import React, { useEffect, useState } from "react";
import {
  Grid,
  Box,
  Typography,
  Breadcrumbs,
  useMediaQuery,
} from "@mui/material";
import { useLocation, useNavigate } from "react-router-dom";
import BookingWidget from "./common/BookingWidget";
import ImageSlider from "./common/ImageSlider";
import YachtInfo from "./common/YachtInfo";
import { getYachtDetails } from "../utils/boatApi";
import { Link } from "react-router-dom";
import { Link as RouterLink } from "react-router-dom"; // Import Link from React Router
import ReservationModal from "./ReservationModal";

const YachtDetail: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [yacht, setYacht] = useState<any>(location.state?.yacht);
  const [yachtAvailability, setYachtAvailability] = useState<any>();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const isSmallScreen = useMediaQuery("(max-width: 900px)"); // Detects screen size

  const from = location.state;
  useEffect(() => {
    console.log("i am calledddddddddddd");
  }, [navigate]);

  const [formData, setFormData] = useState({
    checkIn: "",
    checkOut: "",
    name: "",
    surname: "",
    email: "",
    notes: "",
  });

  useEffect(() => {
    
    if (localStorage.getItem("selectedYacht")) {
      let data: any = localStorage.getItem("selectedYacht");
      const parsedData = JSON.parse(data);

      // Extract dateFrom and dateTo and set them to formData
      setFormData((prev) => ({
        ...prev,
        checkIn: parsedData.dateFrom || "", // Set default to empty if not found
        checkOut: parsedData.dateTo || "", // Set default to empty if not found
      }));
      setYacht(JSON.parse(data));
    }
  }, [location]);

  

  useEffect(() => {
    console.log("form data is ", formData);
  }, [formData]);

  // Handle input changes
  // const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
  //   const { name, value } = e.target;
  //   setFormData((prevFormData) => ({
  //     ...prevFormData,
  //     [name]: value,
  //   }));
  // };
  useEffect(() => {
    console.log("navigation called");
    if (!yacht) {
      const storedYacht = localStorage.getItem("selectedYacht");
      if (storedYacht) {
        setYacht(JSON.parse(storedYacht));
      } else {
        navigate("/search-results");
      }
    }
  }, [yacht, navigate]);

  React.useEffect(() => {
    if (yacht) {
      let data = {
        id: yacht.yachtId,
        year: yacht.yacht.year,
      };
      getYachtDetails(data).then((res) => {
        if (res?.status === 200) {
          setYachtAvailability(res?.data?.availability_summary);
        }
      });
    }
  }, [yacht]);

  if (!yacht) {
    return <Typography variant="h6">Loading yacht data...</Typography>;
  }

  const images = yacht.yacht?.images.map((img: { url: string }) => img.url);
  const yachtDetails = {
    year: yacht.yacht.year,
    cabins: yacht.yacht.cabins,
    beds: yacht.yacht.berths,
    guests: yacht.yacht.max_people_on_board,
    bathrooms: yacht.yacht.wc,
    amenities: yacht.yacht.equipment_json,
    engine: yacht.yacht.engine,
    water_capacity: yacht.yacht.water_capacity,
    sail_type: yacht.yacht.genoa_type,
    fuel_capacity: yacht.yacht.fuel_capacity,
    length: yacht.yacht.length,
    services: yacht.obligatoryExtras,
    yachtAvailability: yachtAvailability,
    additionalServices: yacht?.yacht?.products[0]?.extras,
    location: yacht?.location,
    id: yacht?.yacht?.id,
  };

  // This would allow you to programmatically go back, but within a RouterLink
  const goBack = () => navigate(-1);

  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  return (
    <Box sx={{ position: "fixed", top: 0, left: 0, right: 0, zIndex: 1000 }}>
      <ReservationModal
        open={isModalOpen}
        onClose={handleCloseModal}
        images={yacht?.yacht?.images}
        name={yacht?.yacht?.name}
        kind={yacht?.yacht?.kind}
        price={yacht?.price}
        formData={formData}
        setFormData={setFormData}
        id={yacht.yachtId}
      />

      <Box
        sx={{
          backgroundColor: "#0077cc",
          color: "white",
          padding: "0.5rem 2rem",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}>
        <Box sx={{ display: "flex", alignItems: "center" }}>
          <Typography
            variant="h4"
            sx={{ fontWeight: "bold", marginRight: "1rem" }}
            component={Link}
            to="/"
            style={{ textDecoration: "none", color: "inherit" }}>
            Sail Armada
          </Typography>
          {!isSmallScreen && (
            <Typography variant="subtitle1">
              boat rent, a new way to live the sea
            </Typography>
          )}
        </Box>

        <Box sx={{ display: "flex", alignItems: "center", gap: "1rem" }}>
          <Typography variant="body1" sx={{ fontWeight: "bold" }}>
          +40 744276232
          </Typography>
          <Box sx={{ fontSize: "1.5rem" }}>🌐</Box>
        </Box>
      </Box>
      <Box sx={{ mt: 4, mb: 6, maxWidth: "1200px", mx: "auto" }}>
        <Breadcrumbs
          aria-label="breadcrumb"
          sx={{
            "@media (max-width: 1200px)": {
              padding: "1rem", // Add padding for small screens
            },
          }}
          separator={
            <span style={{ color: "gray", fontSize: "14px" }}> &gt; </span>
          }>
          <RouterLink
            to="/"
            style={{
              textDecoration: "none",
              color: "#969090",
              fontWeight: "500",
            }}>
            Home
          </RouterLink>
          {from === "yachtsLists" ? (
            <RouterLink
              to="/search-results"
              style={{
                textDecoration: "none",
                color: "#969090",
                fontWeight: "500",
              }}>
              Yachts List
            </RouterLink>
          ) : (
            <RouterLink
              to="#"
              onClick={goBack}
              style={{
                textDecoration: "none",
                color: "#969090",
                fontWeight: "500",
              }}>
              Yachts List
            </RouterLink>
          )}

          <Typography color="#969090" style={{ fontWeight: "500" }}>
            {yacht.yacht.name} {yacht.yacht.kind} - {yacht.location.country}
          </Typography>
        </Breadcrumbs>

        <Typography
          variant="h5"
          sx={{
            padding: "0", // Default padding
            "@media (max-width: 1200px)": {
              padding: "1rem", // Padding for small screens
            },
          }}>
          {yacht.yacht.name} {yacht.yacht.kind} - {yacht.location.country}
        </Typography>
        <Grid container spacing={4} style={{ marginTop: "2px" }}>
          <Grid item xs={12} md={8}>
            <ImageSlider images={images} />
            <YachtInfo {...yachtDetails} />
          </Grid>

          {/* Booking Widget */}
          <Grid item xs={12} md={4}>
            <BookingWidget
              id={yacht.yachtId}
              price={yacht?.startPrice}
              discount={yacht?.discountPercentage}
              handleOpenModal={handleOpenModal}
              formData={formData}
              setFormData={setFormData}
            />
          </Grid>
        </Grid>
      </Box>
    </Box>
  );
};

export default YachtDetail;
