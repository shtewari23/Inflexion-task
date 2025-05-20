  import React, { useState, useEffect, useMemo } from "react";
  import { Link } from "react-router-dom";
import { Skeleton } from "@mui/material";

  import {
    Box,
    Card,
    CardContent,
    Typography,
    Avatar,
    Button,
  } from "@mui/material";
  import axios from "axios";
  import { useSelector } from "react-redux";
  import clipboardIcon from '../assets/icons/clipboard.svg'; // adjust path
  import micIcon from '../assets/icons/mic-icon.svg'; // adjust path
  import Suscribe from './Suscribe'
    import { ReactComponent as InflexionLogo } from "../assets/Inflexion-logo.svg";

  const getAvatarUrl = (name) =>
    `https://ui-avatars.com/api/?name=${encodeURIComponent(name)}&background=0D8ABC&color=fff`;

  const TalkCard = ({ talk }: { talk: any   }) => {
    const [expanded, setExpanded] = useState(false);

    const { listItems } = useMemo(() => {
      const parser = new DOMParser();
      const doc = parser.parseFromString(talk.investor_note || "", "text/html");
      const list = Array.from(doc.querySelectorAll("ul li")).map(
        (li) => li.textContent
      );
      return { listItems: list };
    }, [talk.investor_note]);

    const visibleItems = expanded ? listItems : listItems.slice(0, 3);
    const showSeeMore = listItems.length > 3 && !expanded;

    return (
    <Card
    variant="outlined"
    sx={{
      maxWidth: 700,
      width: {
        xs: 300,    // on extra small (mobile) screens: width = 300px
        sm: "100%", // on small and above screens: full width up to maxWidth
      },
      minHeight: 345,
      borderRadius: "28px",
      p: 3,
      boxShadow: "0 0 8px rgba(0,0,0,0.05)",
      borderColor: "#E5E7EB",
      mx: "1",   // centers horizontally
    
    }}
  >

        <CardContent sx={{ p: 0 }}>
          {/* Header */}
          <Box
            display="flex"
            flexDirection={{ xs: "column", sm: "row" }}
            alignItems={{ xs: "flex-start", sm: "flex-start" }}
            gap={2}
            mb={2}
          >
            <Avatar
              alt={talk.executive_name}
              src={getAvatarUrl(talk.executive_name)}
              sx={{ width: 48, height: 48 }}
            />
            <Box textAlign="left" flex={1}>
            <Typography
    gutterBottom
    sx={{
      fontFamily: "Helvetica Now Display",
      fontWeight: 700,
      fontSize: {xs:'18px' ,sm:'20px'},
      
      lineHeight: "24px",
      letterSpacing: "0%",
      verticalAlign: "middle",
      color:'#10181E'
    }}
  >
    {talk.title}
  </Typography>

        <Typography
    sx={{
      fontFamily: "Helvetica Now Display",
      fontWeight: 500,
      fontSize: {xs:'12px' ,sm:'16px'},
      lineHeight: "21.8px",
      letterSpacing: "0%",
      verticalAlign: "middle",
      color: "#667085",
      display: "flex",
      alignItems: "center",
      flexWrap: "wrap", // allows wrapping on smaller screens if needed
    }}
  >

      <Link
                to={`/content/${talk.id}`}
                style={{
                  color: "#667085",
                  textDecoration: "none",
                  cursor: "pointer",
                  fontWeight: 500,
                  marginRight: 4,
                }}>
    {talk.executive_name} </Link>&nbsp;•&nbsp; {talk.company_name} &nbsp;•&nbsp;

    <span style={{ display: "inline-flex", alignItems: "center" }}>
      <img
        src={micIcon}
        alt="Mic icon"
        style={{ width: 16, height: 16, marginRight: 4 }}
      />
      PODCAST
    </span>

    &nbsp;•&nbsp; {talk.published_date}
  </Typography>

            </Box>
          </Box>

          {/* Description */}
  <Typography
    mt={2}
    textAlign="left"
    sx={{
      fontFamily: "Helvetica Now Display",
      fontWeight: 500,
      fontSize: "18px",
            fontSize: {xs:'16px' ,sm:'18px'},

      lineHeight: "28px",
      letterSpacing: "0.2px",
      color: "#667085",
      display: expanded ? "block" : "-webkit-box",
      WebkitLineClamp: expanded ? "none" : 4,
      WebkitBoxOrient: "vertical",
      overflow: expanded ? "visible" : "hidden",
      textOverflow: "ellipsis",
      maxHeight: expanded ? "none" : "120px", // approx 4 lines * 28px line-height + padding
    }}
  >
    {talk.description}
  </Typography>



          {/* Bullet List with inline See more */}
        <Box
    component="ul"
    sx={{
      pl: 2,
      mt: 2,
      mb: 2,
      textAlign: "left",
      fontFamily: "Helvetica Now Display",
      fontWeight: 500,
      fontSize: "18px",
      lineHeight: "30px",
      letterSpacing: "0.2px",
      verticalAlign: "middle",
    }}
  >

            {visibleItems.map((item, index) => {
                const isThird = index === 2;

              if (index === visibleItems.length - 1 && showSeeMore) {
                return (
        <Box
          component="li"
          key={index}
          sx={{
            fontFamily: "Helvetica Now Display",
            fontWeight: 500,
            fontSize: "18px",
            lineHeight: "30px",
            letterSpacing: "0.2px",
            verticalAlign: "middle",
            mb: 1,
          }}
        >
          <Box
            component="span"
            sx={{
              display: "inline-block",
              maxWidth: "calc(100% - 220px)",
              whiteSpace: "nowrap",
              overflow: "hidden",
              textOverflow: "ellipsis",
              verticalAlign: "middle",
              fontSize: "18px",

              // Gradient text only on third item
            background: isThird
        ? "linear-gradient(180deg, #000000 0%, rgba(255, 255, 255, 0.6) 100%)"
        : "none",

      WebkitBackgroundClip: isThird ? "text" : "unset",
      WebkitTextFillColor: isThird ? "transparent" : "unset",
      backgroundClip: isThird ? "text" : "unset",
      textFillColor: isThird ? "transparent" : "unset",
            }}
          >
            {item}
                    </Box>
                    <Button
                      size="small"
      onClick={() => setExpanded(true)}
                      sx={{
                        p: 0,
                        ml: 1,
                        fontSize: 16,
                        textTransform: "none",
                        color: "#667085",
                        fontWeight: 500,
                        minWidth: "unset",
                        verticalAlign: "middle",
                      }}
                    >
                      See more
                    </Button>
                  </Box>
                );
              }

              return (
                <Box
                  component="li"
                  key={index}
                  sx={{
                    fontWeight:500,
                    fontSize: "18px",
                    color: "#1B1E23",
                                      background: index === 2 ?'linear-gradient(180deg, rgba(254, 254, 254, 0) 0%, #FFFFFF 100%)':'1B1E23',

                  }}
                >
                  {item}
                </Box>
              );
            })}
          </Box>

          {/* Show less button */}
          {expanded && (
            <Box mt={1} textAlign="left">
              <Button
                size="small"
                onClick={() => setExpanded(false)}
              sx={{
                        p: 0,
                        ml: 1,
                        fontSize: 16,
                        textTransform: "none",
                        color: "#667085",
                        fontWeight: 500,
                        minWidth: "unset",
                        verticalAlign: "middle",
                      }}
              >
                Show less
              </Button>
            </Box>
          )}

          {/* Full Summary CTA */}
          
              <Link to={`/summary/${talk.id}`} style={{ textDecoration: "none" , color:'#0A0A0A'}}>

          <Box
            mt={4}
            display="flex"
            alignItems="center"
            justifyContent="center"
            borderRadius="999px"
            bgcolor="#F3F4F6"
            px={2}
            py={1.5}
            sx={{
              transition: "0.2s",
              cursor: "pointer",
              "&:hover": { bgcolor: "#E5E7EB" },
            }}
          >
      <Typography
    fontWeight={700}
    fontSize="18px"
    sx={{
      display: "flex",
      alignItems: "center",
      fontFamily: "Helvetica Now Display"
    }}
  >

    <Box
      component="img"
      src={clipboardIcon}
      alt="clipboard icon"
      sx={{ width: 16, height: 20, mr: 1 }}
    />
    Full Summary
  </Typography>


          </Box>
          </Link>
        </CardContent>
      </Card>
    );
  };

  const PodcastFeed = () => {
    const [talks, setTalks] = useState([]);
    const selectedTabs = useSelector((state) => state.tabs?.selectedTabs || []);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
      const fetchTalks = async () => {
        try {
          setLoading(true);
          const baseUrl = "http://54.237.104.114:8100/api/contents?limit=10&offset=0";
          const searchTerm = selectedTabs.length
            ? `&search_term=${encodeURIComponent(selectedTabs.join(" "))}`
            : "";
          const { data } = await axios.get(baseUrl + searchTerm);

          if (data.status === "success") {
            const mapped = data.data.map((item) => ({
  id: item._id,
  title: item.title,
  description: item.description,
  investor_note: item.investor_note,
  executive_name: item.executive_name, // Placeholder
  company_name: item.company_name, // Placeholder
  published_date: item.published_date.split("T")[0], // Extracted date
  thumnailUrl: item.thumbnail_url
}));

            setTalks(mapped);
          }
        } catch (e) {
          console.error("Failed to fetch talks", e);
        } finally {
          setLoading(false);
        }
      };

      fetchTalks();
    }, [selectedTabs]);

if (loading) {
  return (
    <Box
      display="flex"
      flexWrap="wrap"
      justifyContent="center"
      gap={3}
      mt={4}
    >
      {[...Array(3)].map((_, i) => (
        <Card
          key={i}
          variant="outlined"
          sx={{
            maxWidth: 700,
            width: {
              xs: 300,
              sm: "100%",
            },
            maxHeight: 345,
            borderRadius: "28px",
            p: 3,
            boxShadow: "0 0 8px rgba(0,0,0,0.05)",
            borderColor: "#E5E7EB",
          }}
        >
          <CardContent sx={{ p: 0 }}>
            {/* Header Skeleton */}
            <Box
              display="flex"
              flexDirection={{ xs: "column", sm: "row" }}
              gap={2}
              mb={2}
            >
              <Skeleton variant="circular" width={48} height={48} />
              <Box flex={1}>
                <Skeleton height={28} width="80%" />
                <Skeleton height={20} width="60%" />
              </Box>
            </Box>

            {/* Description Skeleton */}
            <Skeleton height={20} width="100%" />
            <Skeleton height={20} width="95%" sx={{ mt: 1 }} />
            <Skeleton height={20} width="90%" sx={{ mt: 1 }} />

            {/* Bullet points Skeleton */}
            <Box mt={2}>
              <Skeleton height={20} width="80%" />
              <Skeleton height={20} width="75%" sx={{ mt: 1 }} />
              <Skeleton height={20} width="70%" sx={{ mt: 1 }} />
            </Box>

            {/* CTA Skeleton */}
            <Skeleton
              variant="rectangular"
              width={160}
              height={36}
              sx={{ mt: 4, borderRadius: "999px" }}
            />
          </CardContent>
        </Card>
      ))}
    </Box>
  );
}

    return (
      <Box display="flex" flexDirection="column" gap={4} alignItems="center" py={4}>
        {talks.map((talk, index) => (
          <React.Fragment key={talk.id}>
            <TalkCard talk={talk} />
            {/* Insert Suscribe after every 4th talk (i.e. indexes 3, 7, 11, ...) */}
            {(index + 1) % 4 === 0 && <Suscribe />}
          </React.Fragment>
        ))}
      </Box>

    );
  };

  export default PodcastFeed;
