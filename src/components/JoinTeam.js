import { Box, Typography, TextField, Button, useMediaQuery } from "@mui/material";
import InflexionLogo from "../assets/Inflexion-logo.svg";
import micIcon from '../assets/icons/mic-icon.svg'
const InflexionSignup = () => {
  const isMobile = useMediaQuery("(max-width:600px)");

  return (
    <Box
      sx={{
        width: "100%",
        maxWidth: 700,
        bgcolor: "black",
        borderRadius: "28px",
        p: { xs: "14px", sm: "40px" },
        boxSizing: "border-box",
        display: "flex",
        flexDirection: "column",
        gap: "24px",
      }}
    >
      {/* Header Row */}
      <Box
        display="flex"
        flexDirection={isMobile ? "column" : "row"}
        alignItems={isMobile ? "flex-start" : "center"}
        gap="16px"
      >
       
        <Box
          display="flex"
          flexDirection="column"
          gap={0.5}
          sx={{ textAlign: isMobile ? "left" : "left", width: "100%" }}
        >
          <Typography
            sx={{
              fontFamily: `"Helvetica Now Display", Helvetica, sans-serif`,
              fontWeight: 800,
              fontSize: "28px",
              lineHeight: "36px",
              color: "#FFFFFF",
            }}
          >
Do you want to include this in your data room?          </Typography>
          
        </Box>
      </Box>

      {/* Body Text */}
      <Typography
        sx={{
          fontFamily: `"Helvetica Now Display", Helvetica, sans-serif`,
          fontWeight: 400,
          fontSize: "18px",
          lineHeight: "28px",
          color: "#FFFFFF",
    textAlign: { xs: "left",}, // left align on mobile, default on larger screens
          mr: { xs: 0, sm: 12 },
        }}
      >
        Join the “Inflexion” point today.
      </Typography>

      {/* Email Input */}
      <TextField
        fullWidth
        variant="outlined"
        placeholder="olivia@newui.com"
        type="email"
        InputProps={{
          sx: {
            height: 56,
            borderRadius: "14px",
            backgroundColor: "#fff",
            px: "16px",
            fontFamily: `"Helvetica Now Display", Helvetica, sans-serif`,
            fontSize: "16px",
            color: "#4B5563",
            border: "none",
            boxShadow: "inset 0 1px 2px rgba(0,0,0,0.06)",
            "& fieldset": { border: "none" },
          },
        }}
      />

      {/* Subscribe Button */}
      <Button
        variant="contained"
        sx={{
width: {
  xs: "100%",  // mobile and up
  md: "50%"  // medium screens and up override xs
}, mb:2,
          height: 48,
          bgcolor: "#2A71FA",
          borderRadius: "999px",
          textTransform: "none",
          fontWeight: 600,
          fontSize: "16px",
          fontFamily: `"Helvetica Now Display", Helvetica, sans-serif`,
          "&:hover": {
            bgcolor: "#1F5EEA",
          },
        }}
      >
        Book a call with our team
      </Button>
    </Box>
  );
};

export default InflexionSignup;
