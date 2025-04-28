import React from "react";
import {
  Box,
  Typography,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Link,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

const CookieInformation = () => {
  return (
    <Box sx={{ maxWidth: "900px", margin: "0 auto", padding: "20px" }}>

      {/* General Introduction */}
      <Typography variant="body1" sx={{ marginBottom: "16px" }}>
        This document informs Users about the technologies that help SailArmada to achieve the
        purposes described below. Such technologies allow the Owner to access and store information
        (for example by using a Cookie) or use resources (for example by running a script) on a
        User’s device as they interact with SailArmada.
      </Typography>

      <Typography variant="body1" sx={{ marginBottom: "16px" }}>
        For simplicity, all such technologies are defined as <strong>“Trackers”</strong> within this
        document – unless there is a reason to differentiate.
      </Typography>

      {/* How SailArmada Uses Trackers */}
      <Typography variant="h5" sx={{ fontWeight: "bold", marginTop: "24px" }}>
        How SailArmada uses Trackers
      </Typography>

      {/* Sections */}
      <Box>
        {/* Necessary */}
        <Accordion defaultExpanded>
          <AccordionSummary expandIcon={<ExpandMoreIcon />}>
            <Typography variant="h6" sx={{ fontWeight: "bold" }}>
              Necessary
            </Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Typography variant="body1">
            SailArmada uses so-called “technical” Cookies and other similar Trackers to carry out
              activities that are strictly necessary for the operation or delivery of the Service.
            </Typography>
          </AccordionDetails>
        </Accordion>

        {/* Functionality */}
        <Accordion>
          <AccordionSummary expandIcon={<ExpandMoreIcon />}>
            <Typography variant="h6" sx={{ fontWeight: "bold" }}>
              Functionality
            </Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Typography variant="body1">
            SailArmada uses Trackers to enable basic interactions and functionalities, allowing
              Users to access selected features of the Service and facilitating the User's
              communication with the Owner.
            </Typography>
            <Typography variant="body2" sx={{ marginTop: "8px" }}>
              Example:{" "}
              <Link href="https://crisp.chat/en/privacy/" target="_blank" rel="noopener">
                Crisp Widget
              </Link>{" "}
              (provided by Crisp IM SARL).
            </Typography>
          </AccordionDetails>
        </Accordion>

        {/* Experience */}
        <Accordion>
          <AccordionSummary expandIcon={<ExpandMoreIcon />}>
            <Typography variant="h6" sx={{ fontWeight: "bold" }}>
              Experience
            </Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Typography variant="body1">
            SailArmada uses Trackers to improve the quality of the user experience and enable
              interactions with external content, networks, and platforms.
            </Typography>
            <Typography variant="body2" sx={{ marginTop: "8px" }}>
              Example:{" "}
              <Link href="https://policies.google.com/privacy" target="_blank" rel="noopener">
                Google Maps widget
              </Link>{" "}
              (provided by Google Ireland Limited).
            </Typography>
          </AccordionDetails>
        </Accordion>

        {/* Measurement */}
        <Accordion>
          <AccordionSummary expandIcon={<ExpandMoreIcon />}>
            <Typography variant="h6" sx={{ fontWeight: "bold" }}>
              Measurement
            </Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Typography variant="body1">
              SailArmada uses Trackers to measure traffic and analyze User behavior to improve the
              Service.
            </Typography>
            <Typography variant="body2" sx={{ marginTop: "8px" }}>
              Example:{" "}
              <Link
                href="https://business.safety.google/privacy/"
                target="_blank"
                rel="noopener noreferrer"
              >
                Google Analytics
              </Link>{" "}
              (provided by Google LLC).
            </Typography>
          </AccordionDetails>
        </Accordion>

        {/* Marketing */}
        <Accordion>
          <AccordionSummary expandIcon={<ExpandMoreIcon />}>
            <Typography variant="h6" sx={{ fontWeight: "bold" }}>
              Marketing
            </Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Typography variant="body1">
              SailArmada uses Trackers to deliver personalized ads or marketing content and to
              measure their performance.
            </Typography>
            <Typography variant="body2" sx={{ marginTop: "8px" }}>
              Example:{" "}
              <Link
                href="https://policies.google.com/privacy"
                target="_blank"
                rel="noopener noreferrer"
              >
                Google Ads Remarketing
              </Link>{" "}
              (provided by Google LLC).
            </Typography>
          </AccordionDetails>
        </Accordion>
      </Box>

      {/* Footer Section */}
      <Box sx={{ marginTop: "32px" }}>
        <Typography variant="body2">
          <strong>Owner and Data Controller:</strong> SailArmada d.o.o., Ulica Osvobodilne fronte 1,
          6000 Koper - Capodistria, Slovenia
        </Typography>
        <Typography variant="body2">
          <strong>Contact email:</strong>{" "}
          <Link href="mailto:privacy@SailArmada.com">privacy@SailArmada.com</Link>
        </Typography>
      </Box>
    </Box>
  );
};

export default CookieInformation;
