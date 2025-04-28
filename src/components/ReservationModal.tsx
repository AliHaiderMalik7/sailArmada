import React, { useState } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField,
  Typography,
  Box,
  Grid,
} from "@mui/material";
import { reserveThisBoat } from "../utils/boatApi";

interface ReservationModalProps {
  open: boolean;
  onClose: () => void;
  images: any;
  name: any;
  kind: any;
  formData: any;
  setFormData: any;
  price: any;
  id:any
}

const ReservationModal: React.FC<ReservationModalProps> = ({
  open,
  onClose,
  images,
  name,
  kind,
  formData,
  setFormData,
  price,
  id
}) => {
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev: any) => ({
      ...prev,
      [name]: value,
    }));
  };

   const reserveBoat = async () => {
     if (!formData.name || !formData.email) {
       alert("Name and Email are required!");
       return;
     }

     try {
       let data = {
         date_from: formData.checkIn,
         date_to: formData.checkOut,
         yacht_id: id,
         customer_name: formData.name,
         customer_email: formData.email,
       };

       await reserveThisBoat(data);
       alert("Reservation successful!");

       // Clear form data and close the modal
       setFormData({
         checkIn: "",
         checkOut: "",
         name: "",
         email: "",
         surname: "",
         notes: "",
       });
       onClose();
     } catch (error) {
       console.error("Error during reservation:", error);
       alert("Reservation failed. Please try again.");
     }
   };

  return (
    <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
      <DialogTitle>Make a Reservation</DialogTitle>
      <DialogContent>
        {/* Yacht Details */}
        <Box display="flex" alignItems="center" mb={2}>
          <img
            src={images[0]?.url} // Replace with yacht image
            alt="Yacht"
            style={{ width: "80px", height: "80px", marginRight: "16px" }}
          />
          <Box>
            <Typography variant="h6">
              {name} {kind}
            </Typography>
            <Typography variant="body2">
              {formData?.checkIn} - {formData.checkOut}, {name}
            </Typography>
            <Typography variant="body2" color="textSecondary">
              {price} Excluding mandatory services
            </Typography>
          </Box>
        </Box>

        {/* Confirmed Availability */}
        <Typography color="success.main" mb={2}>
          ✔️ Confirmed Availability!
        </Typography>
        <Typography variant="body2" mb={3}>
          Please complete the request form below to block this offer now and
          prevent other customers from booking it.
        </Typography>
        <Typography variant="body2" mb={3}>
          Don't worry: no fee will be charged, and you will have two days to
          confirm your booking.
        </Typography>

        {/* Form Fields */}
        <Grid container spacing={2}>
          {/* Name and Surname in the Same Row */}
          <Grid item xs={6}>
            <TextField
              label="Name"
              name="name"
              value={formData.name}
              onChange={handleInputChange}
              fullWidth
              variant="outlined"
              margin="dense"
            />
          </Grid>
          <Grid item xs={6}>
            <TextField
              label="Surname"
              name="surname"
              value={formData.surname || ""}
              onChange={handleInputChange}
              fullWidth
              variant="outlined"
              margin="dense"
            />
          </Grid>
          {/* Email Address */}
          <Grid item xs={12}>
            <TextField
              label="Email Address"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
              fullWidth
              variant="outlined"
              margin="dense"
              type="email"
            />
          </Grid>
          {/* Notes */}
          <Grid item xs={12}>
            <TextField
              label="Notes (Optional)"
              name="notes"
              value={formData.notes || ""}
              onChange={handleInputChange}
              fullWidth
              variant="outlined"
              margin="dense"
              multiline
              rows={3}
            />
          </Grid>
        </Grid>

        {/* Agreement Text */}
        <Typography variant="body2" mt={3}>
          By clicking “Send request,” you agree with our Conditions and Privacy
          Policy.
        </Typography>
      </DialogContent>

      {/* Actions */}
      <DialogActions>
        <Button onClick={onClose} style={{ color: "black" }}>
          Cancel
        </Button>
        <Button variant="contained" color="primary" onClick={reserveBoat}>
          Send Request
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default ReservationModal;

