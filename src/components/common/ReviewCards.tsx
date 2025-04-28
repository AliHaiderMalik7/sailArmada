import React from "react";
import { Box, Typography } from "@mui/material";
import StarIcon from "@mui/icons-material/Star";

const reviews = [
  {
    title: "Excellent",
    rating: 5,
    source: "Google",
    logo: "https://d2h7hm4130kene.cloudfront.net/__1686225225__/images/gicon.png",
  },
  {
    title: "Excellent",
    rating: 5,
    source: "Trustpilot",
    logo: "https://cdn.trustpilot.net/brand-assets/4.3.0/logo-white.svg",
  },
  {
    title: "Excellent",
    rating: 5,
    source: "sail armada",
    logo: "https://sailarmada.com/wp-content/uploads/2022/05/Logo-Alb-Transparent-200X44-px.png", // Replace with actual logo
  },
];

const ReviewCards = () => {
  return (
    <Box
      sx={{
        display: { xs: "none", sm: "flex" }, // Hide on mobile, show on small and up
        justifyContent: "center",
        gap: "1rem",
        flexWrap: "wrap",
        marginTop: "20px",
      }}
    >
      {reviews.map((review, index) => (
        <Box
          key={index}
          sx={{
            display: "flex",
            alignItems: "center",
            backgroundColor: "rgba(0, 0, 0, 0.7)", // Semi-transparent dark background
            borderRadius: "12px",
            padding: "8px 16px", // Slim padding
            gap: "0.5rem",
            minWidth: "320px", // Match card size
          }}
        >
          {/* Text Section */}
          <Box sx={{ flex: 1, textAlign: "left",display: "flex", }}>
            <Typography
              variant="subtitle1"
              sx={{ color: "#fff", fontWeight: "bold", fontSize: "1rem" }}
            >
              {review.title}
            </Typography>
            <Box sx={{ display: "flex", gap: "2px", marginTop: "4px" }}>
              {Array.from({ length: review.rating }).map((_, idx) => (
                <StarIcon key={idx} sx={{ color: "gold", fontSize: "18px" }} />
              ))}
            </Box>
            
          </Box>

          {/* Logo Section */}
          <Box
            component="img"
            src={review.logo}
            alt={review.source}
            sx={{
              width: "60px",
              height: "45px",
              objectFit: "contain",
            }}
          />
          <Typography
              variant="caption"
              sx={{ color: "#ccc", fontSize: "0.75rem" }}
            >
              {review.source}
            </Typography>
        </Box>
      ))}
    </Box>
  );
};

export default ReviewCards;
