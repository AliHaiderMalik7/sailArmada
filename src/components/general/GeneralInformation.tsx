import React from "react";
import { Box, Grid, Typography, List, ListItem, ListItemText } from "@mui/material";

const GeneralInformation: React.FC = () => {
  // Left Navigation Menu Item

  return (
    <Box>
      {/* Main Content */}
      <Grid container spacing={2} sx={{ margin: "0 auto", padding: "20px" }}>

        {/* Right Content Section */}
        <Grid item xs={12} md={9}>
  
          {/* Company Details */}
          <Box sx={{ marginBottom: "16px" }}>
            <Typography variant="h6" sx={{ fontWeight: "bold" }}>
              The Company
            </Typography>
            <Typography variant="body1" sx={{ marginTop: "8px", color: "#333" }}>
              Service provider company for users based in the European Economic Area (EEA):
              <br />
              <br />
              <strong>SailArmada d.o.o.</strong>
              <br />
              Ulica Osvobodilne fronte 1 <br />
              6000 Koper - Capodistria, Slovenia <br />
              Identification number: 8747563000 <br />
              Tax number: 78790261
            </Typography>
          </Box>

          {/* Mission */}
          <Box sx={{ marginBottom: "16px" }}>
            <Typography variant="h6" sx={{ fontWeight: "bold" }}>
              Our mission
            </Typography>
            <Typography variant="body1" sx={{ marginTop: "8px", color: "#333" }}>
              Offer to all customers an easy way to choose and book a boat in the best destinations
              in the world, whatever the budget at their disposal.
            </Typography>
          </Box>

          {/* Philosophy */}
          <Box sx={{ marginBottom: "16px" }}>
            <Typography variant="h6" sx={{ fontWeight: "bold" }}>
              Our philosophy
            </Typography>
            <Typography variant="body1" sx={{ marginTop: "8px", color: "#333" }}>
            SailArmada is a website that is equally easy to use and full of information. We
              guarantee the best prices and offer the widest choice of boats anywhere in the world.
              <br />
              <br />
              Our Customer Support provides a dedicated multilingual service, which can be tailored
              to any kind of customer.
            </Typography>
          </Box>

          {/* Contact Details */}
          <Box>
            <Typography variant="h6" sx={{ fontWeight: "bold" }}>
              Contacts
            </Typography>
            <Typography variant="body1" sx={{ marginTop: "8px", color: "#333" }}>
              Call center: +44 20 3005 4676 <br />
              Skype: aailarmada.com <br />
              E-mail: info@sailarmada.com
            </Typography>
          </Box>

          {/* Footer Note */}
          <Typography
            variant="body2"
            sx={{
              marginTop: "20px",
              color: "#888",
              fontStyle: "italic",
            }}
          >
            *Source: Google Analytics for sites sailarmada.com, sailarmada.net, sailarmada.de, etc.,
            Worldwide 2015.
          </Typography>
        </Grid>
      </Grid>
    </Box>
  );
};

export default GeneralInformation;
