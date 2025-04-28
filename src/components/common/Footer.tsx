import React from "react";
import { Box, Grid, Typography } from "@mui/material";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";

const Footer: React.FC = () => {
  const { t } = useTranslation() as any;
  const navigate = useNavigate();

  const handleNavigation = (path: string) => {
    navigate(path);
  };

  return (
    <Box
      sx={{
        backgroundColor: "#0077cc",
        color: "white",
        textAlign: "center",
        position: "relative",
        bottom: 0,
        left: 0,
        right: 0,
        width: "100%",
        mt: "2rem",
      }}>
      {/* Columns Section */}
      <Grid container spacing={4} justifyContent="center" mb={2}>
        {/* First Column */}
        <Grid item xs={12} sm={6} md={2}>
          <Typography variant="h6" gutterBottom mb={1}>
            {t("service")}
          </Typography>
          <Typography
            variant="body2"
            mb={1}
            sx={{ cursor: "pointer" }}
            onClick={() => handleNavigation("/general")}>
            {t("about")}
          </Typography>
          <Typography
            variant="body2"
            mb={1}
            sx={{ cursor: "pointer" }}
            onClick={() => handleNavigation("/faq")}>
            {t("FAQ")}
          </Typography>
          <Typography variant="body2" mb={1} sx={{ cursor: "pointer" }}>
            {t("reviews")}
          </Typography>
          <Typography variant="body2" mb={1} sx={{ cursor: "pointer" }}>
            {t("blog")}
          </Typography>
        </Grid>

        {/* Second Column */}
        <Grid item xs={12} sm={6} md={3}>
          <Typography variant="h6" mb={1} gutterBottom>
            {t("top_dest")}
          </Typography>
          <Typography variant="body2" mb={1} sx={{ cursor: "pointer" }}>
            {t("spain")}
          </Typography>
          <Typography variant="body2" mb={1} sx={{ cursor: "pointer" }}>
            {t("france")}
          </Typography>
          <Typography variant="body2" mb={1} sx={{ cursor: "pointer" }}>
            {t("crotia")}
          </Typography>
          <Typography variant="body2" mb={1} sx={{ cursor: "pointer" }}>
            {t("turkey")}
          </Typography>
          <Typography variant="body2" mb={1} sx={{ cursor: "pointer" }}>
            {t("italy")}
          </Typography>
          <Typography variant="body2" mb={1} sx={{ cursor: "pointer" }}>
            {t("greece")}
          </Typography>
        </Grid>

        {/* Third Column */}
        <Grid item xs={12} sm={6} md={3}>
          <Typography variant="h6" gutterBottom mb={1}>
            {t("boat_type")}
          </Typography>
          <Typography variant="body2" mb={1} sx={{ cursor: "pointer" }}>
            {t("boat_type_1")}
          </Typography>
          <Typography variant="body2" mb={1} sx={{ cursor: "pointer" }}>
            {t("boat_type_2")}
          </Typography>
          <Typography variant="body2" mb={1} sx={{ cursor: "pointer" }}>
            {t("boat_type_3")}
          </Typography>
        </Grid>

        {/* Fourth Column */}
        <Grid item xs={12} sm={6} md={3}>
          <Typography
            variant="h6"
            gutterBottom
            onClick={() => handleNavigation("/contact")}>
            {t("contacts")}
          </Typography>
          <Typography variant="body2" mb={1} sx={{ cursor: "pointer" }}>
            {t("tos")}
          </Typography>
          <Typography variant="body2" mb={1} sx={{ cursor: "pointer" }}>
            {t("guides")}
          </Typography>
          <Typography variant="body2" mb={1} sx={{ cursor: "pointer" }}>
            {t("partners")}
          </Typography>
        </Grid>
      </Grid>

      {/* Bottom Section */}
      <Typography variant="body1" style={{ marginTop: "50px" }}>
        {t("footer_title")}
      </Typography>
      <Typography variant="body2">
        Contact: +40 7442762326 | hello@sailarmada.com
      </Typography>
    </Box>
  );
};

export default Footer;
