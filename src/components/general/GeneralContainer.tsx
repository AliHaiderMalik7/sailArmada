import React, { useState } from "react";
import {
  Box,
  Grid,
  Typography,
  List,
  ListItem,
  ListItemText,
} from "@mui/material";

// Import all the components dynamically
import GeneralInformation from "./GeneralInformation";
import FAQ from "./FAQ";
import ContactUs from "./ContactUs";
import CookieInformative from "./CookieInformation";
import PrivacyPolicy from "./PrivacyPolicy";
import { useNavigate } from "react-router-dom";

const GeneralContainer = () => {

const navigate = useNavigate();
  const menuItems = [
    { label: "General Informations", component: <GeneralInformation /> },
    { label: "Frequently Asked Questions", component: <FAQ /> },
    { label: "Contact Us", component: <ContactUs /> },
    { label: "Cookie informative", component: <CookieInformative /> },
    { label: "Privacy Policy", component: <PrivacyPolicy /> },
  ];

  // State to track the selected menu item
  const [selectedItem, setSelectedItem] = useState(menuItems[0].label);

  return (
    <Box>
      {/* Header */}
      <Box
        sx={{
          backgroundColor: "#0077ff",
          color: "#fff",
          padding: "10px 16px",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <Typography
          variant="h5"
          sx={{ fontWeight: "bold", textTransform: "lowercase" }}
           onClick={() => navigate("/")}
        >
          sail armada
        </Typography>
        <Typography variant="body1" sx={{ fontWeight: "bold" }}>
        +40 74 4276 232
        </Typography>
      </Box>

      {/* Main Layout */}
      <Grid
        container
        spacing={2}
        sx={{ padding: "20px 10px" }}
      >
        {/* Left Navigation */}
        <Grid item xs={12} md={3} sx={{ borderRight: "1px solid #eee" }}>
          <Typography
            variant="h6"
            sx={{ fontWeight: "bold", marginBottom: "10px" }}
          >
            General Informations
          </Typography>
          <List>
            {menuItems.map((item) => (
              <ListItem
                key={item.label}
                component="button" // Explicitly render as a button
                onClick={() => setSelectedItem(item.label)}
                sx={{
                  backgroundColor:
                    selectedItem === item.label ? "#f0f0f0" : "inherit",
                  borderRadius: "4px",
                  marginBottom: "4px",
                  border: "none", // Remove default button border
                  textAlign: "left", // Align text like a list item
                  cursor: "pointer", // Show pointer cursor
                  padding: "8px 16px", // Add padding to match ListItem style
                  color: "inherit",
                  width: "100%", // Ensure full width
                  display: "block",
                }}
              >
                <ListItemText
                  primary={item.label}
                  primaryTypographyProps={{
                    fontWeight: selectedItem === item.label ? "bold" : "normal",
                    color: selectedItem === item.label ? "#0077ff" : "#000",
                  }}
                />
              </ListItem>
            ))}
          </List>
        </Grid>

        {/* Right Content */}
        <Grid item xs={12} md={9}>
          <Typography
            variant="h4"
            sx={{ fontWeight: "bold", marginBottom: "16px" }}
          >
            {selectedItem}
          </Typography>

          {/* Dynamically Render the Selected Component */}
          {menuItems.find((item) => item.label === selectedItem)?.component}
        </Grid>
      </Grid>
    </Box>
  );
};

export default GeneralContainer;
