import React, { useState, useRef } from "react";
import Slider from "react-slick";
import { Box, IconButton } from "@mui/material";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

interface ImageSliderProps {
  images: string[];
}

const ImageSlider: React.FC<ImageSliderProps> = ({ images }) => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const sliderRef = useRef<any>(null);

  const NextArrow = ({ onClick }: { onClick?: () => void }) => (
    <IconButton
      onClick={onClick}
      sx={{
        position: "absolute",
        top: "50%",
        right: "15px",
        zIndex: 2,
        transform: "translateY(-50%)",
        backgroundColor: "rgba(0, 0, 0, 0.6)",
        color: "white",
        "&:hover": {
          backgroundColor: "rgba(255, 255, 255, 0.8)",
          color: "black",
        },
        width: "40px",
        height: "40px",
      }}>
      <ArrowForwardIosIcon />
    </IconButton>
  );

  const PrevArrow = ({ onClick }: { onClick?: () => void }) => (
    <IconButton
      onClick={onClick}
      sx={{
        position: "absolute",
        top: "50%",
        left: "15px",
        zIndex: 2,
        transform: "translateY(-50%)",
        backgroundColor: "rgba(0, 0, 0, 0.6)",
        color: "white",
        "&:hover": {
          backgroundColor: "rgba(255, 255, 255, 0.8)",
          color: "black",
        },
        width: "40px",
        height: "40px",
      }}>
      <ArrowBackIosIcon />
    </IconButton>
  );

  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    afterChange: (index: number) => setCurrentSlide(index),
    nextArrow: <NextArrow />,
    prevArrow: <PrevArrow />,
  };

  const handleThumbnailClick = (index: number) => {
    setCurrentSlide(index);
    if (sliderRef.current) {
      sliderRef.current.slickGoTo(index);
    }
  };

  return (
    <Box sx={{ width: "100%", position: "relative" }}>
      {/* Main Image Container */}
      <Box
        sx={{
          backgroundColor: "black", // Black background
          padding: "16px",
          borderRadius: "8px",
        }}>
        <Slider ref={sliderRef} {...settings}>
          {images.map((img, index) => (
            <Box
              key={index}
              component="img"
              src={img}
              alt={`Image ${index}`}
              sx={{
                width: "100%",
                height: "350px",
                borderRadius: "8px",
                objectFit: "contain",
              }}
            />
          ))}
        </Slider>
      </Box>

      {/* Thumbnails */}
      <Box
        sx={{
          display: "flex",
          justifyContent: "flex-start",
          marginTop: "10px",
          gap: "8px",
          overflowX: "scroll",
          maxWidth: "100%",
          paddingBottom: "10px",
          "&::-webkit-scrollbar": {
            display: "none",
          },
          scrollbarWidth: "none",
        }}>
        {images.map((img, index) => (
          <Box
            key={index}
            component="img"
            src={img}
            alt={`Thumbnail ${index}`}
            onClick={() => handleThumbnailClick(index)}
            sx={{
              width: "60px",
              height: "60px",
              borderRadius: "4px",
              objectFit: "cover",
              cursor: "pointer",
              border:
                index === currentSlide ? "2px solid #1976d2" : "2px solid #ccc",
              opacity: index === currentSlide ? 1 : 0.5,
              transition: "opacity 0.3s ease, border 0.3s ease",
              flexShrink: 0,
            }}
          />
        ))}
      </Box>
    </Box>
  );
};

export default ImageSlider;
