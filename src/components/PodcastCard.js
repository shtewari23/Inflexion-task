import React, { useState, useMemo } from "react";
import {
  Box,
  Card,
  CardContent,
  Typography,
  Avatar,
  Button,
} from "@mui/material";
import clipboardIcon from '../assets/icons/clipboard.svg'
import micIcon from '../assets/icons/mic-icon.svg'
const getAvatarUrl = (name) =>
  `https://ui-avatars.com/api/?name=${encodeURIComponent(name)}&background=0D8ABC&color=fff`;

const TalkCard = ({ talk, index }) => {
  const [expanded, setExpanded] = useState(false);

  const { listItems } = useMemo(() => {
    const parser = new DOMParser();
    const doc = parser.parseFromString(talk.investor_note || "", "text/html");
    const list = Array.from(doc.querySelectorAll("ul li")).map(
      (li) => li.textContent || ""
    );
    return { listItems: list };
  }, [talk.investor_note]);

  const visibleItems = expanded ? listItems : listItems.slice(0, 3);
  const showSeeMore = listItems.length > 3 && !expanded;

  // Common list item styles

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
     
    {talk.executive_name} &nbsp;•&nbsp; {talk.company_name} &nbsp;•&nbsp;

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
      </CardContent>
    </Card>
  );
};

export default TalkCard;
