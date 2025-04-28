import React, { useState, useEffect } from "react";
import { Box, TextField, Button, Typography, Switch } from "@mui/material";
import { reserveThisBoat } from "../../utils/boatApi";
import { DatePicker } from "antd";
import dayjs from "dayjs";

const { RangePicker } = DatePicker;

interface BookingWidgetProps {
  id: string | number;
  discount: any;
  price: any;
  handleOpenModal: any;
  formData: {
    checkIn: string;
    checkOut: string;
    name: string;
    surname: string;
    email: string;
    notes: string;
  };
  setFormData: React.Dispatch<React.SetStateAction<any>>;
}

const BookingWidget: React.FC<BookingWidgetProps> = ({
  id,
  price,
  discount,
  handleOpenModal,
  formData,
  setFormData,
}) => {
  const [skipper, setSkipper] = useState(false);

  const totalPrice = price - (price * discount) / 100;

  // Handle input changes for formData
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prevFormData: any) => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  const toggleSkipper = () => setSkipper((prev) => !prev);

  const reserveBoat = async () => {
    try {
      const data = {
        date_from: formData.checkIn,
        date_to: formData.checkOut,
        yacht_id: id,
        customer_name: formData.name,
        customer_email: formData.email,
      };
      const response = await reserveThisBoat(data);
      console.log("Reservation successful:", response);
    } catch (error) {
      console.error("Error during reservation:", error);
    }
  };

  return (
    <Box
      sx={{
        p: 3,
        borderRadius: "8px",
        boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
        backgroundColor: "#fff",
      }}
    >
      <Typography variant="h6" gutterBottom>
        Your selection price
      </Typography>
      <Box sx={{ display: "flex", justifyContent: "space-between", mb: 2 }}>
        <RangePicker
          size="large"
          style={{
            width: "100%",
            border: "1px solid #ccc",
            borderRadius: "8px",
            padding: "10px 12px",
            display: "flex",
            alignItems: "center",
            fontSize: "14px",
            background: "#ffffff",
            boxShadow: "none",
            height: "56px",
          }}
          format="DD/MM/YYYY"
          placeholder={["Check-in", "Check-out"]}
          onChange={(dates) =>
            setFormData((prevFormData: any) => ({
              ...prevFormData,
              checkIn: dates && dates[0] ? dates[0].format("YYYY-MM-DD") : "",
              checkOut: dates && dates[1] ? dates[1].format("YYYY-MM-DD") : "",
            }))
          }
          value={
            formData.checkIn && formData.checkOut
              ? [dayjs(formData.checkIn), dayjs(formData.checkOut)]
              : undefined
          }
          disabledDate={(current) =>
            current && current.isBefore(dayjs().startOf("day"))
          }
          separator={
            <div
              style={{
                width: "1px",
                height: "24px",
                backgroundColor: "#e0e0e0",
                margin: "0 12px",
              }}
            />
          }
        />
      </Box>
      <Box sx={{ display: "flex", justifyContent: "space-between", mb: 1 }}>
        <Typography>Price:</Typography>
        <Typography>{price}</Typography>
      </Box>
      <Box sx={{ display: "flex", justifyContent: "space-between", mb: 1 }}>
        <Typography>Discount:</Typography>
        <Typography>{discount}%</Typography>
      </Box>
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          mb: 2,
        }}
      >
        <Typography>Skipper:</Typography>
        <Switch checked={skipper} onChange={toggleSkipper} />
      </Box>
      <Box sx={{ display: "flex", justifyContent: "space-between", mb: 1 }}>
        <Typography variant="h6">Total:</Typography>
        <Typography variant="h6">{totalPrice.toFixed(2)}</Typography>
      </Box>
      <Typography variant="caption" color="gray">
        Excluding mandatory services
      </Typography>
      <Button
        variant="contained"
        color="error"
        fullWidth
        disabled={formData?.checkIn && formData?.checkOut ? false : true}
        onClick={reserveBoat}
        sx={{ mt: 2, borderRadius: "30px" }}
      >
        Make a Reservation
      </Button>
      <Box sx={{ mt: 2 }}>
        <table style={{ width: "100%" }}>
          <tbody>
            <tr>
              <td colSpan={2}>
                <div
                  style={{
                    fontSize: "12px",
                    padding: "12px 0px 0px 0px",
                    background:
                      "url('https://d2h7hm4130kene.cloudfront.net/__1530659716__/images/greencheck.svg') left center no-repeat",
                    width: "100%",
                    boxSizing: "border-box",
                    paddingLeft: "46px",
                    backgroundSize: "35px",
                  }}
                >
                  <b>Confirmed Availability</b>
                  <br />
                  Updated availability and pricing. You can book immediately.
                  <br />
                  <span title="2025-01-07T06:47:47.125">Updated: now</span>
                </div>
                <div
                  style={{
                    width: "100%",
                    textAlign: "center",
                    lineHeight: "9px",
                    paddingBottom: "5px",
                    color: "rgb(162, 161, 161)",
                  }}
                ></div>
                <div
                  style={{
                    fontSize: "12px",
                    padding: "6px 0px 0px 0px",
                    background:
                      "url('https://d2h7hm4130kene.cloudfront.net/__1530659716__/images/timer.png') left center no-repeat",
                    width: "100%",
                    boxSizing: "border-box",
                    paddingLeft: "46px",
                    backgroundSize: "35px",
                  }}
                >
                  <b>This boat is in high demand!</b>
                  <br />
                  5+ people are also thinking of booking this boat.
                </div>
                &nbsp;
              </td>
            </tr>
          </tbody>
        </table>
      </Box>
    </Box>
  );
};

export default BookingWidget;
