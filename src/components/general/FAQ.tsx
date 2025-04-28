import React from "react";
import { Box, Grid, Typography, List, ListItem, ListItemText } from "@mui/material";

const FAQ = () => {
  const faqQuestions = [
    "What is a right type of the boat for my vacation?",
    "Is it necessary to have a boat license to book a boat?",
    "Can I book only one cabin on board of the boat?",
    "Are the published prices for weekly rental?",
    "What is included in the price?",
    "What is excluded from the price?",
    "How much is spent on fuel?",
    "How much does the berth in the port or marina cost?",
    "Whose are the boats?",
    "Are boats insured?",
    "What is the time of check in and check out?",
    "How does a booking with a skipper work? And with a hostess?",
    "What optional services can be ordered?",
    "What is APA?",
    "How is the itinerary decided?",
    "How is the sailing vacation organized?",
    "How do we plan the accommodation in the cabins?",
    "Is it possible to cook on board of the boat?",
    "What should I bring on the boat?",
    "Can I use and charge my electronic devices on board?",
    "How does the boat bathroom work?",
    "What should I do if something does not work on the boat?",
    "What to expect if there are children on board?",
    "Can we bring our animal friends on board?",
  ];

  return (
    <Box>
      {/* Main Layout */}
      <Grid container spacing={2} sx={{ margin: "0 auto", padding: "20px 10px" }}>

        {/* Right Content */}
        <Grid item xs={12} md={9}>
          {/* FAQ Questions and Answers */}
          {faqQuestions.map((question, index) => (
            <Box key={index} sx={{ marginBottom: "20px" }}>
              <Typography variant="h6" sx={{ fontWeight: "bold", marginBottom: "8px" }}>
                {question}
              </Typography>
              <Typography variant="body1" sx={{ color: "#333" }}>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer nec odio. Praesent
                libero. Sed cursus ante dapibus diam. Sed nisi. Nulla quis sem at nibh elementum
                imperdiet. Duis sagittis ipsum.
              </Typography>
            </Box>
          ))}
        </Grid>
      </Grid>
    </Box>
  );
};

export default FAQ;
