import React from 'react';
import { Box, Typography } from '@mui/material';

const Reviews: React.FC = () => {
  return (
    <Box sx={{ mt: 4 }}>
      <Typography variant="h6">Reviews</Typography>
      <Box sx={{ display: 'flex', alignItems: 'center', mt: 2 }}>
        <img src="https://upload.wikimedia.org/wikipedia/commons/2/26/Trustpilot_Logo.png" alt="TrustPilot" style={{ height: '40px', marginRight: '10px' }} />
        <Box>
          <Typography variant="body1">TrustScore 4.9 | 654 reviews</Typography>
          <Typography variant="body2">Showing our 5-star reviews</Typography>
        </Box>
      </Box>
    </Box>
  );
};

export default Reviews;
