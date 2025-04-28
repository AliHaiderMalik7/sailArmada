import React, { useState } from "react";
import {
  Box,
  Typography,
  Popper,
  IconButton,
  ClickAwayListener,
} from "@mui/material";
import RemoveIcon from "@mui/icons-material/Remove";
import AddIcon from "@mui/icons-material/Add";

interface BedsSelectorProps {
  value: number;
  onChange: (newValue: number) => void;
}

const BedsSelector: React.FC<BedsSelectorProps> = ({ value, onChange }) => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null); // Control the popper's anchor element

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(anchorEl ? null : event.currentTarget); // Toggle the popper
  };

  const handleClickAway = () => {
    setAnchorEl(null); // Close the popper when clicking outside
  };

  const open = Boolean(anchorEl); // Popper is open if anchorEl is set
  const id = open ? "beds-popper" : undefined;

  const handleIncrement = () => onChange(value + 1);
  const handleDecrement = () => {
    if (value > 0) onChange(value - 1); // Ensure the value doesn't go below 0
  };

  return (
    <ClickAwayListener onClickAway={handleClickAway}>
      <Box>
        {/* TextField-like Box for displaying the current value */}
        <Box
          onClick={handleClick}
          sx={{
            border: "none",
            cursor: "pointer",
            backgroundColor: "#fff",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <Typography
            sx={{
              fontSize: "14px",
              color: "#555",
            }}
          >
            {value > 0 ? `${value} Bed${value > 1 ? "s" : ""}` : "Beds"}
          </Typography>
        </Box>

        {/* Popper (popup) for the increment and decrement buttons */}
        <Popper
          id={id}
          open={open}
          anchorEl={anchorEl}
          placement="bottom-start"
          disablePortal={false}
          modifiers={[
            {
              name: "offset",
              options: {
                offset: [0, 10], // Add a little offset below the field
              },
            },
          ]}
          sx={{
            zIndex: 1300, // Ensure Popper is visible
          }}
        >
          <Box
            sx={{
              border: "1px solid #ddd",
              borderRadius: "8px",
              padding: "1rem",
              backgroundColor: "white",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              width: "150px", // Adjust width to match your design
              boxShadow: "0px 2px 10px rgba(0, 0, 0, 0.1)",
              zIndex: 1300,
            }}
          >
            {/* Decrement Button */}
            <IconButton
              onClick={handleDecrement}
              sx={{
                borderRadius: "50%",
                backgroundColor: "#f9f9f9",
                "&:hover": {
                  backgroundColor: "#eee",
                },
              }}
            >
              <RemoveIcon />
            </IconButton>

            {/* Display Current Value */}
            <Typography
              variant="h6"
              sx={{
                margin: "0 1rem",
                fontWeight: "bold",
              }}
            >
              {value}
            </Typography>

            {/* Increment Button */}
            <IconButton
              onClick={handleIncrement}
              sx={{
                borderRadius: "50%",
                backgroundColor: "#f9f9f9",
                "&:hover": {
                  backgroundColor: "#eee",
                },
              }}
            >
              <AddIcon />
            </IconButton>
          </Box>
        </Popper>
      </Box>
    </ClickAwayListener>
  );
};

export default BedsSelector;
