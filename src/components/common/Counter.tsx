import React from 'react';
import { Box, IconButton, Typography, ButtonGroup } from '@mui/material';
import RemoveIcon from '@mui/icons-material/Remove';
import AddIcon from '@mui/icons-material/Add';

interface CounterProps {
  value: number;
  onChange: (newValue: number) => void;
}

const Counter: React.FC<CounterProps> = ({ value, onChange }) => {
  const handleIncrement = () => onChange(value + 1);
  const handleDecrement = () => {
    if (value > 0) {
      onChange(value - 1); // Prevent value from going below 0
    }
  };

  return (
    <Box
      sx={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        border: '1px solid #e0e0e0',
        borderRadius: '8px',
        width: '100%',
        height: '56px', // Match the height of the input fields
        padding: '0.5rem',
        boxSizing: 'border-box',
      }}
       
    >
      <ButtonGroup size="small" sx={{ flexGrow: 1 }} >
        {/* Decrement Button */}
        <IconButton
          onClick={handleDecrement}
          sx={{
            borderRadius: '50%',
            border: '1px solid #e0e0e0',
            margin: '0 0.5rem',
          }}
        >
          <RemoveIcon />
        </IconButton>

        {/* Display Current Value */}
        <Typography
          variant="h6"
          sx={{
            flexGrow: 1,
            textAlign: 'center',
            fontWeight: 'bold',
          }}
        >
          {value}
        </Typography>

        {/* Increment Button */}
        <IconButton
          onClick={handleIncrement}
          sx={{
            borderRadius: '50%',
            border: '1px solid #e0e0e0',
            margin: '0 0.5rem',
          }}
        >
          <AddIcon />
        </IconButton>
      </ButtonGroup>
    </Box>
  );
};

export default Counter;
