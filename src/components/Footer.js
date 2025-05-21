import React from 'react';
import { Box, Typography, Grid, useMediaQuery } from '@mui/material';
import { Instagram, YouTube, LinkedIn, Twitter } from '@mui/icons-material';
import { useTheme } from '@mui/material/styles';
import footer from '../assets/icons/footer.svg'
const Footer = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const commonStyles = {
    fontFamily: "'Helvetica Neue', Helvetica, Arial, sans-serif",
    fontWeight: 400,
    fontSize: "14px",
    lineHeight: "24px",
    letterSpacing: 0,
    verticalAlign: "middle",
    textTransform: "uppercase",
    color: "#928C97",
    cursor: "pointer",
  };

  return (
    <Box
      sx={{
        backgroundColor: '#000',
        color: '#aaa',
        px: 4,
        py: isMobile ? 4 : 6,
        mt: 8,
                m: isMobile ? 0 : 0,

      }}
    >
      <Grid container justifyContent="space-between" alignItems="center" spacing={isMobile ? 4 : 2}>
        {isMobile ? (
          <>
            <Grid item xs={12}>
              <Box display="flex" justifyContent="flex-start" gap={3} sx={{   p: 2,}} > {/* Left aligned */}
                <Instagram fontSize="medium" />
                <YouTube fontSize="medium" />
                <LinkedIn fontSize="medium" />
                <Twitter fontSize="medium" />
              </Box>
            </Grid>
            <Grid item xs={12}>
              <Box
                sx={{
                  display: "flex",
                  gap: "24px",
                  justifyContent: "flex-start",  /* Left aligned */
                  alignItems: "center",
                  p: 2,
                }}
              >
                <Typography sx={commonStyles}>
                  © 2024 Inflexion.AI
                </Typography>
                <Typography sx={commonStyles}>
                  Terms of Use
                </Typography>
                <Typography sx={commonStyles}>
                  Privacy Policy
                </Typography>
              </Box>
            </Grid>
          </>
        ) : (
          <>
            <Grid item>
              <Box display="flex" alignItems="center" gap={4}>
                <Typography variant="body2">© 2024 Inflexion.AI</Typography>
                <Typography variant="body2">Terms of Use</Typography>
                <Typography variant="body2">Privacy Policy</Typography>
              </Box>
            </Grid>
            <Grid item>
              <Box display="flex" gap={3}>
                <Instagram fontSize="small" />
                <YouTube fontSize="small" />
                <LinkedIn fontSize="small" />
                <Twitter fontSize="small" />
              </Box>
            </Grid>
          </>
        )}
      </Grid>

      {/* Footer Image at the Bottom */}
      <Box mt={isMobile ? 6 : 8} display="flex" justifyContent={isMobile ? 'center' : 'flex-start'}>
        <img
          src={footer} // 🔁 Replace this URL
          alt="Inflexion Transcribe"
          style={{ width: isMobile ? '80%' : '100%', maxWidth: 1200 }}
        />
      </Box>
    </Box>
  );
};

export default Footer;
