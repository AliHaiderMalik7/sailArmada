import React, { useRef, useState } from "react";
import Slider from "react-slick";
import {
  Card,
  CardContent,
  IconButton,
  Box,
  Button,
  useMediaQuery,
} from "@mui/material";
import { ArrowForward, ArrowBack } from "@mui/icons-material";

const SliderComponent = (props: any) => {
  const { yachtAvailability } = props;
  const sliderRef: any = useRef(null);
  const isSmallScreen = useMediaQuery("(max-width: 600px)"); // Detect small screens
  const [showSlider, setShowSlider] = useState(!isSmallScreen); // Default slider visibility based on screen size

  const settings = {
    infinite: false,
    slidesToShow: 4,
    slidesToScroll: 4,
    responsive: [
      {
        breakpoint: 960,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };

  return (
    <Box
      sx={{
        padding: "16px", // Add padding around the component
        backgroundColor: "white",
      }}>
      <Box
        sx={{
          backgroundColor: "white",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          position: "relative",
          minHeight: "200px", // Ensures space for the "Show Cards" button
        }}>
        {/* Show Cards Button */}
        {!showSlider && (
          <Button
            variant="contained"
            color="primary"
            onClick={() => setShowSlider(true)}
            sx={{
              zIndex: 10,
              position: "absolute",
              top: "50%",
              transform: "translateY(-50%)",
              padding: "8px 16px",
              borderRadius: "20px",
            }}>
            Show Availabilty
          </Button>
        )}

        {/* Slider */}
        {showSlider && (
          <>
            {/* Left Arrow */}
            <IconButton
              sx={{
                position: "absolute",
                left: isSmallScreen ? "5px" : "-20px",
                zIndex: 10,
                "&:hover": {
                  backgroundColor: "transparent",
                  color: "inherit",
                },
                "& .MuiSvgIcon-root": { pointerEvents: "none" },
              }}
              onClick={() => sliderRef.current.slickPrev()}>
              <ArrowBack />
            </IconButton>

            <Box
              sx={{ flexGrow: 1, maxWidth: "calc(100% - 40px)", padding: 0 }}>
              <Slider ref={sliderRef} {...settings}>
                {yachtAvailability?.map((item: any) => (
                  <div key={item.id}>
                    <Card
                      sx={{
                        marginRight: "10px",
                        padding: 0,
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                        border: "1px solid #ccc",
                        borderRadius: "8px",
                      }}>
                      <CardContent
                        sx={{
                          padding: "8px",
                          display: "flex",
                          flexDirection: "column",
                          alignItems: "center",
                        }}>
                        <Box sx={{ textAlign: "center" }}>
                          <div style={{ fontSize: "14px", marginTop: "12px" }}>
                            {item.date_range}
                          </div>
                          <div
                            style={{
                              marginTop: "10px",
                              color:
                                item.status === "Available" ? "green" : "red",
                              fontWeight: "bold",
                            }}>
                            {item.status}
                          </div>
                        </Box>
                      </CardContent>
                    </Card>
                  </div>
                ))}
              </Slider>
            </Box>

            {/* Right Arrow */}
            <IconButton
              sx={{
                position: "absolute",
                right: isSmallScreen ? "5px" : "-20px",
                zIndex: 10,
                "&:hover": {
                  backgroundColor: "transparent",
                  color: "inherit",
                },
                "& .MuiSvgIcon-root": { pointerEvents: "none" },
              }}
              onClick={() => sliderRef.current.slickNext()}>
              <ArrowForward />
            </IconButton>
          </>
        )}
      </Box>
    </Box>
  );
};

export default SliderComponent;
