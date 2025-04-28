import React from "react";
import { Box, Typography, TextField, Button, Grid, Link } from "@mui/material";
import { useNavigate } from "react-router-dom";

const ContactUs = () => {
  const navigate = useNavigate(); 

  return (
    <Box>
      <Box
        sx={{
          backgroundColor: "#0077ff",
          color: "#fff",
          padding: "10px 16px",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}>
        <Typography
          variant="h5"
          sx={{
            fontWeight: "bold",
            textTransform: "lowercase",
            cursor: "pointer", 
          }}
          onClick={() => navigate("/")} 
        >
          sail armada
        </Typography>
        <Typography variant="body1" sx={{ fontWeight: "bold" }}>
          +40 74 4276 232
        </Typography>
      </Box>
      <Box
        sx={{
          maxWidth: "900px",
          margin: "0 auto",
          padding: "20px",
        }}>
        {/* Title */}
        <Typography
          variant="h4"
          sx={{
            fontWeight: "bold",
            marginBottom: "16px",
            textAlign: { xs: "center", md: "left" },
          }}>
          How contact us
        </Typography>

        {/* Contact Details */}
        <Box
          sx={{
            marginBottom: "24px",
            textAlign: { xs: "center", md: "left" },
          }}>
          <Typography variant="body1">
            Call center: <strong>+40 74 4276 232</strong>
          </Typography>
          <Typography variant="body1">
            Skype:{" "}
            <Link href="https://sailarmada.com" target="_blank" rel="noopener">
              sailarmda.com
            </Link>
          </Typography>
          <Typography variant="body1">
            e-mail:{" "}
            <Link
              href="mailto:info@sailarmada.com"
              target="_blank"
              rel="noopener">
              info@sailarmda.com
            </Link>
          </Typography>
        </Box>

        {/* Instruction */}
        <Typography variant="body1" sx={{ marginBottom: "16px" }}>
          If you wish more details please send your question or comment in the
          space below and we will reply to you as soon as possible:
        </Typography>

        {/* Form */}
        <Box component="form" noValidate autoComplete="off">
          <Grid container spacing={2}>
            {/* Email */}
            <Grid item xs={12} md={12}>
              <TextField
                fullWidth
                variant="outlined"
                label="Your email"
                type="email"
                placeholder="Enter your email"
                InputLabelProps={{
                  shrink: true,
                }}
              />
            </Grid>

            {/* Phone */}
            <Grid item xs={12} md={12}>
              <TextField
                fullWidth
                variant="outlined"
                label="Your phone"
                type="tel"
                placeholder="Enter your phone number"
                InputLabelProps={{
                  shrink: true,
                }}
              />
            </Grid>

            {/* Message */}
            <Grid item xs={12}>
              <TextField
                fullWidth
                multiline
                rows={6}
                variant="outlined"
                label="Message"
                placeholder="Type your message here"
                InputLabelProps={{
                  shrink: true,
                }}
              />
            </Grid>
          </Grid>

          {/* Submit Button */}
          <Box
            sx={{
              marginTop: "16px",
              textAlign: { xs: "center", md: "left" },
            }}>
            <Button
              variant="contained"
              sx={{
                backgroundColor: "#0077ff",
                color: "#fff",
                "&:hover": { backgroundColor: "#005bb5" },
                paddingX: "24px",
                paddingY: "8px",
                textTransform: "none",
                fontSize: "16px",
              }}>
              Send
            </Button>
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default ContactUs;
