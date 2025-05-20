import React, { useState, useMemo } from "react";
import {
  Box,
  Card,
  CardContent,
  Typography,
  Avatar,
  Button,
} from "@mui/material";

const getAvatarUrl = (name: string) =>
  `https://ui-avatars.com/api/?name=${encodeURIComponent(name)}&background=0D8ABC&color=fff`;

const TalkCard = ({ talk }: { talk: any }) => {
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
  const listItemStyle = {
    fontFamily: "Helvetica Now Display",
    fontWeight: 500,
    fontSize: "20px",
    lineHeight: "32px",
    letterSpacing: "0.2px",
    verticalAlign: "middle",
    color: "#374151",
    mb: 1,
  };

  return (
    <Card
      variant="outlined"
      sx={{
        maxWidth: 500,
        minHeight: 345,
        width: "100%",
        borderRadius: "28px",
        p: 3,
        boxShadow: "0 0 8px rgba(0,0,0,0.05)",
        borderColor: "#E5E7EB",
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
                fontSize: "20px",
                lineHeight: "24px",
                letterSpacing: "0%",
                verticalAlign: "middle",
                color: "#10181E",
              }}
            >
              {talk.title}
            </Typography>

            <Typography
              sx={{
                fontFamily: "Helvetica Now Display",
                fontWeight: 500,
                fontSize: "16px",
                lineHeight: "21.8px",
                letterSpacing: "0%",
                verticalAlign: "middle",
                color: "red",
              }}
            >
              {talk.executive_name} • {talk.company_name} •{" "}
              <Typography
                component="span"
                sx={{
                  fontFamily: "Helvetica Now Display",
                  fontWeight: 500,
                  fontSize: "16px",
                  lineHeight: "21.8px",
                  letterSpacing: "0%",
                  verticalAlign: "middle",
                  color: "#667085",
                }}
              >
                PODCAST
              </Typography>{" "}
              • {talk.published_date}
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
            display: "-webkit-box",
            WebkitLineClamp: 4,
            WebkitBoxOrient: "vertical",
            overflow: "hidden",
            textOverflow: "ellipsis",
            maxHeight: expanded ? "none" : "200px",
          }}
        >
          {talk.description}
        </Typography>

        {/* Bullet List */}
        <Box component="ul" sx={{ pl: 2, mt: 2, mb: 2, textAlign: "left" }}>
          {visibleItems.map((item, index) => {
            // If this is the last visible item and we need to show See More
            if (index === visibleItems.length - 1 && showSeeMore) {
              return (
                <Box
                  component="li"
                  key={index}
                  sx={{
                    ...listItemStyle,
                    fontWeight: "normal", // remove font weight bold for last item
                    position: "relative",
                    background:
                      "linear-gradient(180deg, rgba(254,254,254,0) 0%, #FFFFFF 100%)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                  }}
                >
                  <Box
                    component="span"
                    sx={{
                      display: "inline-block",
                      maxWidth: "calc(100% - 900px)",
                      whiteSpace: "nowrap",
                      overflow: "hidden",
                      textOverflow: "ellipsis",
                      verticalAlign: "middle",
                      
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
                      fontSize: "18px",
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
                  ...listItemStyle,
                  fontWeight: index === 0 ? "normal" : listItemStyle.fontWeight,
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
                fontSize: 14,
                textTransform: "none",
                color: "#3B82F6",
                fontWeight: 500,
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
            fontWeight={600}
            fontSize="0.95rem"
            sx={{ display: "flex", alignItems: "center" }}
          >
            Full Summary
          </Typography>
        </Box>
      </CardContent>
    </Card>
  );
};

export default TalkCard;
