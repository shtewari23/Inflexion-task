import { Box, Typography, TextField, Button, useMediaQuery } from "@mui/material";
import InflexionLogo from "../assets/Inflexion-logo.svg";
import micIcon from '../assets/icons/mic-icon.svg'
const InflexionSignup = () => {
  const isMobile = useMediaQuery("(max-width:600px)");

  return (
    <Box
      sx={{
        width: "100%",
        maxWidth: 750,
        bgcolor: "black",
        borderRadius: "28px",
        p: { xs: "14px", sm: "30px" },
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
          component="img"
          src={InflexionLogo }
          alt="Inflexion Logo"
          sx={{
            width: 56,
            height: 56,
            borderRadius: "50%",
            bgcolor: "#1E1E1E",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            padding: "10px",
          }}
        />
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
              fontSize: "20px",
              lineHeight: "28px",
              color: "#FFFFFF",
              textTransform: "uppercase",
            }}
          >
            Join the “Inflexion” Point today.
          </Typography>
          <Typography
            sx={{
              fontFamily: `"Helvetica Now Display", Helvetica, sans-serif`,
              fontWeight: 400,
              fontSize: "16px",
              lineHeight: "20px",
              color: "#667085",
              letterSpacing: "0.2px",
            }}
          >
            
            Inflexion Transcribe ·{" "}
<img
        src={micIcon}
        alt="Mic icon"
        style={{ width: 16, height: 16, marginRight: 4 }}
      />            
            <Box component="span" sx={{ fontWeight: 700 }}>
              NEWSLETTER
            </Box>{" "}
            · WEEKLY
          </Typography>
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
          mr: { xs: 0, sm: 12 }, // margin right 0 on mobile, 12 on larger screens
        }}
      >
        Never miss a (spoken) word from the world’s leading AI execs.
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
  md: "140px"  // medium screens and up override xs
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
        Subscribe
      </Button>
    </Box>
  );
};

export default InflexionSignup;
