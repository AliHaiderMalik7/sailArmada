import React from "react";
import {
  Box,
  Grid,
  Card,
  CardContent,
  CardMedia,
  Typography,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Loader from "./common/Loader";
import { setSelectedLocation } from "../store/searchSlice";
import { useDispatch } from "react-redux";
import { useTranslation } from "react-i18next";

const Destinations = (props: any) => {
  const { destinations, loader } = props;
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { t } = useTranslation() as any;
  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down("md"));

  const handleCardClick = (destination: any) => {
    dispatch(setSelectedLocation(destination));
    navigate(`/destination/${destination.code}`, { state: { destination } });
  };

  const sliderSettings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: false,
  };

  return (
    <Box
      sx={{
        padding: isSmallScreen ? "3rem 2rem" : "4rem 8rem", 
      }}>
      <Typography
        variant="h4"
        sx={{ fontWeight: "bold", marginBottom: "1rem" }}>
        {t("dest_title")}
      </Typography>
      <Typography variant="subtitle1" sx={{ marginBottom: "2rem" }}>
        {t("dest_desc")}
      </Typography>

      {loader ? (
        <div
          className="w-full"
          style={{ display: "flex", justifyContent: "center" }}>
          <Loader />
        </div>
      ) : isSmallScreen ? (
        <Slider {...sliderSettings}>
          {destinations?.map((destination: any) => (
            <Box
              key={destination.name}
              onClick={() => handleCardClick(destination)}
              sx={{ cursor: "pointer", padding: "0 1rem" }} 
            >
              <Card
                sx={{
                  borderRadius: "16px",
                  overflow: "hidden",
                  position: "relative",
                  transition: "transform 0.3s ease, box-shadow 0.3s ease",
                  "&:hover": {
                    transform: "scale(1.05)",
                    boxShadow: "0px 8px 20px rgba(0, 0, 0, 0.3)",
                  },
                }}>
                <CardMedia
                  component="img"
                  height="200"
                  image={destination.imageURL}
                  alt={destination.name}
                  sx={{ objectFit: "cover" }}
                />
                <CardContent
                  sx={{
                    position: "absolute",
                    bottom: 0,
                    left: 0,
                    width: "100%",
                    height: "100%",
                    background:
                      "linear-gradient(180deg, rgba(0,0,0,0) 60%, rgba(0,0,0,0.8) 100%)",
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "flex-end",
                    padding: "1rem",
                    color: "white",
                  }}>
                  <Typography
                    variant="h6"
                    sx={{
                      fontWeight: "bold",
                      textShadow: "1px 1px 4px rgba(0, 0, 0, 0.6)",
                    }}>
                    {destination.country}
                  </Typography>
                  <Typography
                    variant="subtitle1"
                    sx={{
                      textShadow: "1px 1px 4px rgba(0, 0, 0, 0.6)",
                    }}>
                    {destination.value} boats
                  </Typography>
                </CardContent>
              </Card>
            </Box>
          ))}
        </Slider>
      ) : (
        <Grid container spacing={6}>
          {destinations?.map((destination: any) => (
            <Grid
              item
              xs={12}
              sm={12}
              md={6}
              lg={4}
              key={destination.name}
              onClick={() => handleCardClick(destination)}
              sx={{ cursor: "pointer" }}>
              <Card
                sx={{
                  borderRadius: "16px",
                  overflow: "hidden",
                  position: "relative",
                  transition: "transform 0.3s ease, box-shadow 0.3s ease",
                  "&:hover": {
                    transform: "scale(1.05)",
                    boxShadow: "0px 8px 20px rgba(0, 0, 0, 0.3)",
                  },
                }}>
                <CardMedia
                  component="img"
                  height="200"
                  image={destination.imageURL}
                  alt={destination.name}
                  sx={{ objectFit: "cover" }}
                />
                <CardContent
                  sx={{
                    position: "absolute",
                    bottom: 0,
                    left: 0,
                    width: "100%",
                    height: "100%",
                    background:
                      "linear-gradient(180deg, rgba(0,0,0,0) 60%, rgba(0,0,0,0.8) 100%)",
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "flex-end",
                    padding: "1rem",
                    color: "white",
                  }}>
                  <Typography
                    variant="h6"
                    sx={{
                      fontWeight: "bold",
                      textShadow: "1px 1px 4px rgba(0, 0, 0, 0.6)",
                    }}>
                    {destination.country}
                  </Typography>
                  <Typography
                    variant="subtitle1"
                    sx={{
                      textShadow: "1px 1px 4px rgba(0, 0, 0, 0.6)",
                    }}>
                    {destination.value} boats
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      )}
    </Box>
  );
};

export default Destinations;
