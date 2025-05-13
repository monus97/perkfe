import React from 'react';
import { Box, Grid, Typography, IconButton } from '@mui/material';
import FacebookIcon from '@mui/icons-material/Facebook';
import InstagramIcon from '@mui/icons-material/Instagram';
import TwitterIcon from '@mui/icons-material/Twitter';

const Footer = () => {
  const links = ['About us', 'Why us', 'Security', 'Testimonials'];

  return (
    <Box sx={{ backgroundColor: '#1E1E1E', color: '#fff', p: 5 }}>
      <Grid container spacing={8}  sx={{padding:"60px" }}>
        {/* Logo and Description */}
        <Grid item xs={12} sm={6} md={3}>
          <Typography  fontWeight="bold" fontSize={40} mb={2}>LOGO</Typography>
          <Typography fontSize={18} color="#FFFFFF" mb={2}>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            t ur adipiscing elit, sed do eiusmod.
          </Typography>
          <Box display="flex" gap={2}>
            <IconButton sx={{ backgroundColor: '#fff' }}>
              <FacebookIcon sx={{ color: '#000' }} />
            </IconButton>
            <IconButton sx={{ backgroundColor: '#fff' }}>
              <InstagramIcon sx={{ color: '#000' }} />
            </IconButton>
            <IconButton sx={{ backgroundColor: '#fff' }}>
              <TwitterIcon sx={{ color: '#000' }} />
            </IconButton>
          </Box>
        </Grid>

        {/* Link Sections */}
        {['Categories', 'Quick Links', 'Blogs', 'Contact Us'].map((title) => (
          <Grid item xs={6} sm={6} md={2} key={title}>
            <Typography fontSize={24} fontWeight="bold" mb={2}>
              {title}
            </Typography>
            {links.map((link) => (
              <Typography
            fontSize={16}
                color="#fff"
                key={link}
                mb={1}
              >
                {link}
              </Typography>
            ))}
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default Footer;
