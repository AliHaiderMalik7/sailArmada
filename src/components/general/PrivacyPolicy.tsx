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

const PrivacyPolicy = () => {
  return (
    <Box sx={{ maxWidth: "900px", margin: "0 auto", padding: "20px" }}>
      {/* Owner and Data Controller */}
      <Typography variant="h5" sx={{ fontWeight: "bold", marginTop: "16px" }}>
        Owner and Data Controller
      </Typography>
      <Typography variant="body1" sx={{ marginBottom: "16px" }}>
        SailArmada d.o.o.
        <br />
        Ulica Osvobodilne fronte 1
        <br />
        6000 Koper - Capodistria, Slovenia
        <br />
        Identification number: 8747563000
        <br />
        Tax number: 78709261
        <br />
        <strong>Owner contact email:</strong>{" "}
        <Link href="mailto:privacy@SailArmada.com">privacy@SailArmada.com</Link>
      </Typography>

      {/* Types of Data Collected */}
      <Typography variant="h5" sx={{ fontWeight: "bold", marginTop: "24px" }}>
        Types of Data collected
      </Typography>
      <Typography variant="body1" sx={{ marginBottom: "16px" }}>
        Among the types of Personal Data that SailArmada collects, there are: Cookies; Usage Data;
        first name; last name; phone number; address; country; email address; and geographic
        position.
      </Typography>

      {/* How Data is Processed */}
      <Typography variant="h5" sx={{ fontWeight: "bold", marginTop: "24px" }}>
        Mode and place of processing the Data
      </Typography>
      <Accordion>
        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
          <Typography variant="h6" sx={{ fontWeight: "bold" }}>
            Methods of processing
          </Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography variant="body1">
            The Owner takes appropriate security measures to prevent unauthorized access,
            disclosure, modification, or unauthorized destruction of the Data.
          </Typography>
        </AccordionDetails>
      </Accordion>

      <Accordion>
        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
          <Typography variant="h6" sx={{ fontWeight: "bold" }}>
            Place of processing
          </Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography variant="body1">
            The Data is processed at the Owner's operating offices and in other places where
            parties involved in the processing are located.
          </Typography>
        </AccordionDetails>
      </Accordion>

      <Accordion>
        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
          <Typography variant="h6" sx={{ fontWeight: "bold" }}>
            Retention time
          </Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography variant="body1">
            Personal Data shall be processed and stored as long as required for its purpose or by
            legal obligation.
          </Typography>
        </AccordionDetails>
      </Accordion>

      {/* Purposes of Processing */}
      <Typography variant="h5" sx={{ fontWeight: "bold", marginTop: "24px" }}>
        The purposes of processing
      </Typography>
      <Typography variant="body1" sx={{ marginBottom: "16px" }}>
        The Data concerning the User is collected to allow the Owner to provide its Service,
        respond to requests, and comply with legal obligations.
      </Typography>

      {/* Detailed Information */}
      <Typography variant="h5" sx={{ fontWeight: "bold", marginTop: "24px" }}>
        Detailed information on the processing of Personal Data
      </Typography>
      <Accordion>
        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
          <Typography variant="h6" sx={{ fontWeight: "bold" }}>
            Advertising
          </Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography variant="body1">
            This service allows User Data to be utilized for advertising communication purposes.
          </Typography>
          <Typography variant="body2" sx={{ marginTop: "8px" }}>
            Example:{" "}
            <Link
              href="https://policies.google.com/privacy"
              target="_blank"
              rel="noopener noreferrer"
            >
              Google Ads
            </Link>
          </Typography>
        </AccordionDetails>
      </Accordion>

      <Accordion>
        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
          <Typography variant="h6" sx={{ fontWeight: "bold" }}>
            Analytics
          </Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography variant="body1">
            Services in this section enable the Owner to monitor and analyze web traffic.
          </Typography>
          <Typography variant="body2" sx={{ marginTop: "8px" }}>
            Example:{" "}
            <Link
              href="https://business.safety.google/privacy/"
              target="_blank"
              rel="noopener noreferrer"
            >
              Google Analytics
            </Link>
          </Typography>
        </AccordionDetails>
      </Accordion>

      {/* User Rights */}
      <Typography variant="h5" sx={{ fontWeight: "bold", marginTop: "24px" }}>
        User Rights under GDPR
      </Typography>
      <Typography variant="body1">
        Users may exercise their rights regarding their Data, including:
      </Typography>
      <ul>
        <li>Withdraw consent at any time.</li>
        <li>Object to processing of their Data.</li>
        <li>Access, verify, and rectify their Data.</li>
        <li>Request Data deletion or transfer.</li>
      </ul>

      {/* Footer */}
      <Box sx={{ marginTop: "32px" }}>
        <Typography variant="body2">
          For further details or to exercise your rights, contact us at:{" "}
          <Link href="mailto:privacy@SailArmada.com">privacy@SailArmada.com</Link>
        </Typography>
        <Typography variant="body2" sx={{ marginTop: "8px" }}>
          Latest update: October 09, 2024
        </Typography>
      </Box>
    </Box>
  );
};

export default PrivacyPolicy;
