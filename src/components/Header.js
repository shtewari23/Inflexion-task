  import React, { useState } from "react";
  import {
    AppBar,
    Toolbar,
    Button,
    Box,
    useMediaQuery,
    useTheme,
  } from "@mui/material";
  import { styled } from "@mui/material/styles";
  import SearchIcon from "@mui/icons-material/Search";
  import { ReactComponent as InflexionLogo } from "../assets/Inflexion-logo.svg";

  const StyledAppBar = styled(AppBar)(() => ({
    height: "96px",
    backgroundColor: "transparent",
    boxShadow: "none",

  }));

  const StyledToolbar = styled(Toolbar)(({ theme }) => ({
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    minHeight: 100,
    padding: theme.spacing(0, 3),
    flexWrap: "wrap",
    gap: theme.spacing(1),

      [theme.breakpoints.down("sm")]: {
    position: "relative",         // or "absolute" based on use-case
    bottom: 18,                 // applies only on mobile
  },

  // Optional: styles for larger screens
  [theme.breakpoints.up("sm")]: {
    bottom: 8.5,
  },
  }));

  const LogoBox = styled(Box)(({ theme }) => ({
    display: "flex",
    alignItems: "center",
    marginLeft: "35px",
    flexShrink: 0,
    height:'38.25px',
    width: "39px",
    marginTop: "21px",



    [theme.breakpoints.down("sm")]: {
      marginLeft: 5,


    },
  }));

    const SearchContainer = styled(Box)(({ theme }) => ({
      position: "relative",
      borderRadius: 16,
      border: "1px solid #3D4452",
      backgroundColor: "#202329",
      height: 56,
      width: 800,
      marginTop: "21px",
      marginLeft:'50px',

      display: "flex",
      alignItems: "center",
        paddingRight: 30,
      fontFamily: "'Helvetica Now Display', sans-serif",

      [theme.breakpoints.down("lg")]: {
        width: 380,

        paddingRight: 8,
      },

      [theme.breakpoints.down("sm")]: {
        width: 48,
          marginLeft:88,
          height: 48,

      },
    }));

    const SearchIconWrapper = styled(Box)(({ theme }) => ({
      position: "absolute",
      left: 8,
      pointerEvents: "none",
      color: "#B7BCC7",
      width:20.57,
      height:20.57,
      [theme.breakpoints.down("sm")]: {
        left: "50%",
        transform: "translate(-50%, -50%)",

        top: "50%",
        color: "#FFFFFF", // icon color white

      },
    }));

    const StyledInput = styled("input")(({ theme }) => ({
      border: "none",
      outline: "none",
      width: "100%",
      height: "100%",
      fontFamily: "'Helvetica Now Display', sans-serif",
      fontWeight: 400,
      fontSize: 16,
      backgroundColor: "transparent",
      color: "#B7BCC7",
      paddingLeft: 25,
      "::placeholder": {
        color: "#B7BCC7",
        whiteSpace: "nowrap",
      },
      [theme.breakpoints.down("sm")]: {
        fontSize: 14,
        lineHeight: "40px",
        paddingLeft: 6, // Remove extra padding, since container already has it
        paddingRight: 8,
        color: "#B7BCC7",
      },
    }));

  const SubscribeButton = styled(Button)(({ theme }) => ({
    backgroundColor: "#2A71FA",
    height: 57,
    borderRadius: 40,
    fontFamily: "'Helvetica Neue', sans-serif",
    fontWeight: 500,
    fontSize: 20,
    textTransform: "none",
    color: "#FFFFFF",
    flexShrink: 0,
    marginTop: "21px",

    [theme.breakpoints.up("sm")]: {
      width: 165,
    },
    [theme.breakpoints.down("sm")]: {
      width: "118px",
      height: "48.24px",
      fontSize: 14,
      marginLeft: "16px",
      borderRadius:33.71
    },
  }));



  export default function Header() {

    const [searchText, setSearchText] = useState("");
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
   

    return (
      <StyledAppBar position="static">
        <StyledToolbar>
          <LogoBox>
            <InflexionLogo width="39" height="38.5" />
          </LogoBox>

          <SearchContainer component="form"  noValidate autoComplete="off">
          {isMobile && searchText === "" && (
              <SearchIconWrapper>
                <SearchIcon />
              </SearchIconWrapper>
            )}

            <StyledInput
              type="search"
              placeholder={
                isMobile ? "" : "Search companies, executives..."
              }
              value={searchText}
              onChange={(e) => setSearchText(e.target.value)}
            />
          </SearchContainer>

          <Box>
            <SubscribeButton variant="contained">Subscribe</SubscribeButton>
          </Box>
        </StyledToolbar>
      </StyledAppBar>
    );
  }
