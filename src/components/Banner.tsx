import React from 'react';
import { Box } from '@mui/material';
import bannerImage from '../assets/images/cover.jpg'; // Importing the image from assets

interface BannerProps {
  children: React.ReactNode;
}

const Banner: React.FC<BannerProps> = ({ children }) => {
  return (
    <Box
      sx={{
        backgroundImage: `url(${bannerImage})`, // Using the imported image
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        height: '100vh',
        width: '100%',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        position: 'relative',
        zIndex: 1,
      }}
    >
      <Box
        sx={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundColor: 'rgba(0, 0, 0, 0.4)', // Optional overlay
          zIndex: -1,
        }}
      />
      {children}
    </Box>
  );
};

export default Banner;
