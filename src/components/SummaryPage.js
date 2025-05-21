    import React, { useEffect, useState } from "react";
    import axios from "axios";
    import { useNavigate } from "react-router-dom";
    import {
    Box,
    Chip,
    CircularProgress,
    Container,
    Grid,
    List,
    ListItem,
    ListItemButton,
    ListItemText,
    Typography,
    Divider,
    Avatar,Button,
    Skeleton, Stack
    } from "@mui/material";
    import { useParams } from "react-router-dom";
    import micIcon from '../assets/icons/mic-icon.svg'
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import {
 
  IconButton,
  Drawer,
  useMediaQuery,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import { useTheme } from "@mui/material/styles";
import Join from './JoinTeam'
const items = [
  "Key Takeaways",
  "Keywords",
  "Fresh KPIs",
  "Punch Quotes",
  "Table of Contents",
];

    const SidebarNav = () => {
  const [selected, setSelected] = useState("");
  const [open, setOpen] = useState(false);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  const handleClick = (text) => {
    setSelected(text);
    if (isMobile) setOpen(false); // close drawer on mobile
  };

  const renderList = () => (
<List sx={{ mt: { sm: 15, xs: 8 },

 }}>
      {items.map((text) => {
        const isActive = selected === text;
        return (
          <ListItem
            sx={{ display: "list-item", p: 1    ,                  cursor:'crosshair'
}}
            key={text}
          >
            <ListItemButton
              component="a"
              href={`#${text.toLowerCase().replace(/ /g, "-")}`}
              onClick={() => handleClick(text)}
              sx={{
                bgcolor: isActive ? "#E0E9FB" : "transparent",
                "&:hover": { bgcolor: "#E0E9FB" },
                borderRadius: 16,
              }}
            >
              <ListItemText
                primary={
                  <Typography
                    sx={{
                      fontFamily: "Helvetica Now Display",
                      fontWeight: 500,
                      fontSize: "20px",
                      lineHeight: "20px",
                      textTransform: "capitalize",
                      color: isActive ? "#2A71FA" : "#595C64",
                                       cursor:'crosshair'

                    }}
                  >
                    {text}
                  </Typography>
                }
              />
            </ListItemButton>
          </ListItem>
        );
      })}
    </List>
  );

  if (isMobile) {
    return (
      <>
        <IconButton
          onClick={() => setOpen(true)}
          sx={{ position: "fixed", top: 20, left: 20, zIndex: 1300 }}
        >
          <MenuIcon />
        </IconButton>
        <Drawer anchor="left" open={open} onClose={() => setOpen(false)}>
          <Box sx={{ width: 250, mt: 2 }}>{renderList()}</Box>
        </Drawer>
      </>
    );
  }

  return (
    <Box
      sx={{
        width: 200,
        position: "sticky",
        top: 100,
        mr: 4,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      {renderList()}
    </Box>
  );
};


    const SummaryPage = () => {
          const navigate = useNavigate();

    const { id } = useParams();
    const [talk, setTalk] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchSummary = async () => {
        try {
            const { data } = await axios.get(`${process.env.REACT_APP_API_BASE_URL}/api/contents/${id}`);
            if (data.status === "success") {
            setTalk(data.data);
            }
        } catch (error) {
            console.error("Failed to fetch full summary", error);
        } finally {
            setLoading(false);
        }
        };

        fetchSummary();
    }, [id]);

  if (loading) {
  return (
     <Box
  sx={{
    width: "100%",
    minHeight: "100vh",
    display: "flex",
    // vertical center
    margin: "0 auto",
          backgroundColor: "white",
         // fallback horizontal centering
  }}
>
  <Container
    maxWidth={false}
    disableGutters
    sx={{
      borderRadius: "28px",
      width: "50%",
      minHeight: "100vh",
      px: { xs: 1, sm: 2 },
      justifyContent: "center", // horizontal center
    alignItems: "center",     
      mt: 3,
    }}
  >
    <Box px={{ xs: 2, md: 4 }} pt={4}>
      <Stack spacing={4}>
        {[...Array(3)].map((_, index) => (
          <Box key={index} sx={{ display: "flex", gap: 2 }}>
            <Skeleton variant="circular" width={56} height={56} />
            <Box sx={{ flex: 1 }}>
              <Skeleton variant="text" width="60%" height={30} />
              <Skeleton variant="text" width="80%" height={20} />
              <Skeleton variant="rectangular" height={120} sx={{ mt: 1, borderRadius: 2 }} />
            </Box>
          </Box>
        ))}
      </Stack>
    </Box>
    </Container>
    </Box>  
  );
}

    if (!talk) {
        return <Typography>Error loading content</Typography>;
    }

    // Parse investor_note HTML string safely
    const parser = new DOMParser();
    const doc = parser.parseFromString(talk.investor_note, "text/html");

    // --- Key Takeaways ---
    const bottomLineHeading = Array.from(doc.querySelectorAll("p, h1, h2, h3")).find((el) =>
        el.textContent.toLowerCase().includes("bottom-line")
    );
    let keyTakeawaysList = null;
    if (bottomLineHeading) {
        keyTakeawaysList =
        bottomLineHeading.nextElementSibling?.tagName === "UL" ? bottomLineHeading.nextElementSibling : null;
    }
    const keyTakeaways = keyTakeawaysList
        ? Array.from(keyTakeawaysList.querySelectorAll("li")).map((li) => li.textContent)
        : [];

    // --- People Mentioned ---
    // Render talk.people_mentioned (array of strings)
const extractPeopleMentioned = (doc)=> {
  const h1 = doc.querySelector("h1");
  if (!h1) return [];
  const emDashSplit = h1.textContent.split("—");
  if (emDashSplit.length < 2) return [];
  return emDashSplit[1].split("×").map(name => name.trim());
};

const peopleMentioned = talk.people_mentioned || extractPeopleMentioned(doc);
    // --- Keywords ---
    const keywordsHeading = Array.from(doc.querySelectorAll("h3")).find((h3) =>
        h3.textContent.toLowerCase().includes("keywords")
    );
    const keywordsList = keywordsHeading?.nextElementSibling;
    const keywords = keywordsList
        ? Array.from(keywordsList.querySelectorAll("li")).map((li) => li.textContent)
        : [];

    // --- Fresh KPIs Table ---
    // Extract first <table> element HTML
    const tableElement = doc.querySelector("table");
    const tableHTML = tableElement ? tableElement.outerHTML : null;

    // --- Catalyst Calendar ---
    const catalystHeading = Array.from(doc.querySelectorAll("h3")).find((h3) =>
        h3.textContent.toLowerCase().includes("catalyst calendar")
    );
    const catalystList = catalystHeading?.nextElementSibling;
    const catalystItems = catalystList
        ? Array.from(catalystList.querySelectorAll("li")).map((li) => li.textContent)
        : [];

    // --- Tone & Risk Snapshot ---
    const toneRiskHeading = Array.from(doc.querySelectorAll("h3")).find((h3) =>
        h3.textContent.toLowerCase().includes("tone & risk snapshot")
    );
    // Sentiment: Usually next <p>
    const sentimentP = toneRiskHeading?.nextElementSibling;
    // Risks: usually next <ul>
    const riskUl = sentimentP?.nextElementSibling;

    // --- Punch Quotes ---
    const punchHeading = Array.from(doc.querySelectorAll("h3, h2")).find((h) =>
        h.textContent.toLowerCase().includes("punch quotes")
    );
    const punchParagraph = punchHeading?.nextElementSibling;

    // Instead of just innerHTML, parse punch quotes as array of strings,
    // Usually punch quotes are within <strong> or <p>
    let punchQuotes = [];
    if (punchParagraph) {
        // Try extract text inside <strong> or fallback text content split by lines
        const strongs = punchParagraph.querySelectorAll("strong");
        if (strongs.length > 0) {
        punchQuotes = Array.from(strongs).map((el) => el.textContent.trim());
        } else {
        punchQuotes = punchParagraph.textContent.split(/\n|•/).map((s) => s.trim()).filter(Boolean);
        }
    }

    // --- Table of Contents ---
    // Look for heading with "Table of Contents"
 

  // Find the <h2> with specific text
  const tocHeader = Array.from(doc.querySelectorAll('h2')).find(
    (el) => el.textContent.trim() === 'Chronological Detail (Investor-Focused ToC)'
  );

  // Find the next sibling <ul> which contains the ToC items
  const tocList = tocHeader ? tocHeader.nextElementSibling : null;

  // Extract text from each <li>
  const tocItems = tocList
    ? Array.from(tocList.querySelectorAll('li')).map((li) => li.textContent.trim())
    : [];

    return  (
    <Box sx={{ width: "100%" }}>
      <Container
        maxWidth={false}
        disableGutters
        sx={{
          backgroundColor: "white",
          borderRadius: "28px",
          width: "100%",
          minHeight: "100vh",
          px: { xs: 0, sm: 2 },
          mt: 4
        }}
      >
        <Grid container spacing={4} p={{ xs: 2, sm: 4 }}>

          <Grid item xs={12} md={2}>
<Button
            onClick={() => navigate("/")}
            sx={{
              minWidth: "36px",
              padding: 1,
              borderRadius: "50%",
              border: "1px solid #ccc",
              color: "black",
            }}
          >
            <ArrowBackIcon />
          </Button>
            <SidebarNav />
          </Grid>

        
 <Grid
  item
  xs={12}
  md={10}
  sx={{
    margin: "0 auto",
    maxWidth: { xs: "100%", sm: "750px", md: "800px" },
    mt: { xs: 2, md: 0 },
    px: { xs: 0, md: 0 },
  }}
>
 <Box
  sx={{
    display: "flex",
    alignItems: "flex-start", // Align avatar with first line of text
    pl: { xs: 0, md: 0 },
    gap: 2,
  }}
>
  {/* Avatar */}
  <Avatar
    alt="Speaker"
    src={talk.avatar || "/default-avatar.jpg"}
    sx={{ width: 56, height: 56, mt: "4px" }} // adjust mt to better center
  />

  {/* Title */}
  <Typography
    gutterBottom
    sx={{
      fontFamily: "Helvetica Now Display",
      fontWeight: 700,
      fontSize: { xs: "24px", sm: "30px", md: "35px" },
      lineHeight: { xs: "32px", sm: "40px", md: "48px" },
      letterSpacing: "0%",
    }}
  >
    {talk.title}
  </Typography>
</Box>

            {/* Executive Name, Company Name, Date */}
            <Box textAlign="left" flex={1} pl={{ xs: 1, md: 2 }} mt={2} mb={4}>
              <Typography
                sx={{
                  fontFamily: "Helvetica Now Display",
                  fontWeight: 500,
                  fontSize: { xs: "12px", sm: "16px" },
                  lineHeight: "21.8px",
                  letterSpacing: "0%",
                  verticalAlign: "middle",
                  color: "#667085",
                  display: "flex",
                  alignItems: "center",
                  flexWrap: "wrap",
                }}
              >
                {talk.executive_name} &nbsp;•&nbsp; {talk.company_name} &nbsp;•&nbsp;
                <span
                  style={{
                    display: "inline-flex",
                    alignItems: "center",
                    fontSize: "14px",
                  }}
                >
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

            <Typography
              variant="body1"
              mt={2}
              mb={3}
              pl={{ xs: 0, md: 2 }}
              sx={{
                fontFamily: "Helvetica Now Display",
                fontWeight: 500,
                fontSize: { xs: "14px", md: "18px" },
                lineHeight: { xs: "24px", md: "30px" },
                letterSpacing: "0.2px",
                verticalAlign: "middle",
                color: "#475467",
              }}
            >
              {talk.description}
            </Typography>

            {/* YouTube Embed */}
            <Box
              sx={{
                width: "100%",
                maxWidth: { xs: "100%", sm: "746px" },
                height: { xs: "215px", sm: "383px" },
                borderRadius: "32px",
                overflow: "hidden",
                mb: 4,
                mx: "auto",
              }}
            >
              <iframe
                width="100%"
                height="100%"
                src={`https://www.youtube.com/embed/${talk.video_id}`}
                title="YouTube video player"
                frameBorder="0"
                allowFullScreen
              />
            </Box>

            <Box sx={{ pl: { xs: 1, md: 4 } }}>
              {/* Disclosure */}
              <Typography
                variant="caption"
                display="block"
                gutterBottom
                sx={{
                  fontFamily: "Helvetica Now Display",
                  fontWeight: 500,
                  fontStyle: "italic",
                  fontSize: "11px",
                  lineHeight: "21.8px",
                  letterSpacing: "0%",
                  verticalAlign: "middle",
                  mt: 2,
                  color: "#667085",
                }}
              >
                ORIGINALLY POSTED BY @{talk.author?.toUpperCase()} ON YOUTUBE. ALL RIGHTS
                OF THE ORIGINAL AUDIO ARE OWNED BY THE ORIGINAL PUBLISHER.
              </Typography>
              <Typography
                variant="caption"
                display="block"
                gutterBottom
                sx={{
                  fontFamily: "Helvetica Now Display",
                  fontWeight: 500,
                  fontStyle: "italic",
                  fontSize: "11px",
                  lineHeight: "21.8px",
                  letterSpacing: "0%",
                  verticalAlign: "middle",
                  mt: 2,
                  color: "#667085",
                }}
              >
                THE BELOW IS PURELY FOR EDUCATION PURPOSES AND SHOULD NOT BE TAKEN OR
                USED AS FINANCIAL ADVICE. BY READING THE BELOW YOU ACKNOWLEDGE AND
                INDEMNIFY INFLEXION TRANSCRIBE OF ANY LIABILITY OF ACTING ON THE BELOW
                AND AGREE TO DO YOU OWN INDEPENDENT RESEARCH ON THE TOPIC.
              </Typography>
              <Typography
                variant="caption"
                display="block"
                gutterBottom
                sx={{
                  fontFamily: "Helvetica Now Display",
                  fontWeight: 500,
                  fontStyle: "italic",
                  fontSize: "11px",
                  lineHeight: "21.8px",
                  letterSpacing: "0%",
                  verticalAlign: "middle",
                  mt: 2,
                  mb: 4,
                  color: "#667085",
                }}
              >
                THE ACTUAL CONTENTS HAS ALSO BEEN CREATED WITH THE AID OF AI (AND HUMANS)
                BUT THE ACCURACY CAN NOT BE GUARANTEED. PLEASE CHECK AND VERIFY ALL
                STATEMENTS FOR ACCURACY.
              </Typography>
            </Box>

            {/* Key Takeaways */}
            <Box id="key-takeaways" mb={4}>
              <Typography
                variant="h4"
                gutterBottom
                sx={{
                  fontFamily: "Helvetica Now Display",
                  fontWeight: 700,
                  fontSize: "20px",
                  lineHeight: "36px",
                  textTransform: "uppercase",
                  color: "#667085",
                }}
              >
                Key Takeaways
              </Typography>
              {keyTakeaways.length === 0 && <Typography>No key takeaways found.</Typography>}
              <List sx={{ pl: 2 }}>
                {keyTakeaways.map((item, idx) => (
                  <ListItem
                    key={idx}
                    sx={{
                      display: "list-item",
                      listStyleType: "square",
                      pl: 2,
                    }}
                  >
                    <ListItemText
                      primary={item}
                      sx={{
                        fontFamily: "Helvetica Now Display",
                        fontWeight: 500,
                        fontSize: "20px",
                        lineHeight: "32px",
                        letterSpacing: "0.2px",
                        verticalAlign: "middle",
                        color: "#1B1E23",
                        m: 0,
                      }}
                    />
                  </ListItem>
                ))}
              </List>
            </Box>

            <Divider sx={{ mb: 6 }} />

            {/* People Mentioned */}
            <Box id="people-mentioned" mb={4} mt={2}>
              <Typography
                variant="h4"
                gutterBottom
                sx={{
                  fontFamily: "Helvetica Now Display",
                  fontWeight: 700,
                  fontSize: "20px",
                  lineHeight: "30px",
                  letterSpacing: "0.5px",
                  verticalAlign: "middle",
                  textTransform: "uppercase",
                  color: "#667085",
                  mt: 2,
                  mb: 2,
                }}
              >
                People Mentioned
              </Typography>
              {peopleMentioned.length === 0 && (
                <Typography sx={{ mt: 2, mb: 2 }}>No people mentioned.</Typography>
              )}
              <Box sx={{ display: "flex", gap: 1, flexWrap: "wrap"  ,mt:3,mb:6   }}>
                {peopleMentioned.map((person, idx) => (
                  <Chip key={idx} label={person} sx={{width: "140px",
                        height: "32px",
                        borderRadius: "44px",
                        padding: "5px 10px",
                        fontFamily: "Helvetica Now Display",
                        fontWeight: 500,
                        fontSize: "16px",
                        lineHeight: "21.8px",
                        letterSpacing: "0%",
                        verticalAlign: "middle",
                        border: "1px solid #E2E5EA",
                        color:'#242424' }}/>
                ))}
              </Box>
            </Box>

            <Divider sx={{ mb: 6 }} />

            <Box id="fresh-kpis" mb={4}>

                    <Typography
    variant="h4"
    gutterBottom
    sx={{
        fontFamily: "Helvetica Now Display",
        fontWeight: 700,
        fontSize: "20px",
        lineHeight: "30px",
        letterSpacing: "0.5px",
        verticalAlign: "middle",
        textTransform: "uppercase",
        color: "#667085",
        mt: 2,
        mb:4
    }}
    >
                    Analyst Toolbox
                </Typography>
                <Typography
                    variant="h4"
                    gutterBottom
                    sx={{
                    fontFamily: "Helvetica Now Display",
                    fontWeight: 700,
                    fontSize: "20px",
                    lineHeight: "32px",
                    color: "#344054",
                    mb:3
                    }}
                >
                    Table 1 - Fresh KPIs & Guidance
                </Typography>
                {tableHTML ? (
                    <Box
    sx={{
        overflowX: "auto",
        "& table": {
        width: "100%",
        borderCollapse: "collapse",
        fontFamily: "Helvetica Now Display",
        borderRadius: "12px",
        overflow: "hidden", // to clip the border-radius on the table content
        },
        "& th, & td": {
        border: "1px solid #EAECF0",
        padding: "8px",
        },
        "& th": {
        backgroundColor: "#f5f5f5",
        fontFamily: "Helvetica Now Display",
        fontWeight: 700,
        fontSize: "14px",
        lineHeight: "16.92px",
        letterSpacing: "0%",
        color: "#667085",
        textAlign: "left",
        },
        "& td": {
        fontFamily: "Helvetica Now Display",
        fontWeight: 500,
        fontSize: "16px",
        lineHeight: "18.8px",
        letterSpacing: "0%",
        color: "#10181E",
        },
    }}
    dangerouslySetInnerHTML={{ __html: tableHTML }}
    />

                ) : (
                    <Typography>No KPI data available.</Typography>
                )}
                </Box>  

            {/* Catalyst Items */}
            {catalystItems.length > 0 && (
              <Box id="catalyst-items" mb={6} mt={6}>
                <Typography
                  variant="h4"
                  gutterBottom
                  sx={{
                    fontFamily: "Helvetica Now Display",
                    fontWeight: 700,
                    fontSize: "20px",
                    lineHeight: "32px",
                    letterSpacing: "0.5px",
                    verticalAlign: "middle",
                    color: "#000000",
                    mb: 2,
                  }}
                >
                  Catalyst Calendar
                </Typography>
                <List sx={{ pl: 2 , }}>
                  {catalystItems.map((item, idx) => (
                    <ListItem
                      key={idx}
                      sx={{
                        display: "list-item",
                        listStyleType: "square",
                        pl: 2,
                      }}
                    >
                      <ListItemText
                        primary={item}
                        sx={{
                          fontFamily: "Helvetica Now Display",
                          fontWeight: 500,
                          fontSize: "20px",
                          lineHeight: "32px",
                          letterSpacing: "0.2px",
                          verticalAlign: "middle",
                          color: "#1B1E23",
                          m: 0,
                        }}
                      />
                    </ListItem>
                  ))}
                </List>
              </Box>
            )}

            {/* Sentiment Paragraph (if present) */}
             <Box id="tone-risk-snapshot" mb={6}>
                <Typography
                    variant="h4"
                    gutterBottom
                    sx={{
                    fontFamily: "Helvetica Now Display",
                    fontWeight: 700,
                    fontSize: "20px",
                    lineHeight: "32px",
                    color: "#000000",
                    mb:2
                    }}
                >
                    Tone & Risk Snapshot
                </Typography>
                {sentimentP && (
                    <Typography
                    sx={{
                        fontFamily: "Helvetica Now Display",
                        fontWeight: 500,
                        fontSize: "20px",
                        lineHeight: "18.8px",
                        letterSpacing: '0%',
                        verticalAlign: "middle",
                        color: "#10181E",
                        mb: 4,
                    }}
                    >
                    Sentiment:{sentimentP.textContent}
                    </Typography>
                )}
                {riskUl && (
                    <>
                    <Typography
                        sx={{
                        fontFamily: "Helvetica Now Display",
                        fontWeight: 500,
                        fontSize: "20px",
                        lineHeight: "18.8px",
                        color: "#10181E",
                        mb: 2,
                        
                        }}
                    >
                        Risk flagged:
                    </Typography>
    <List sx={{ pl: 2 }}>
    {Array.from(riskUl.querySelectorAll("li")).map((li, idx) => (
        <ListItem
        key={idx}

        sx={{
            display: 'list-item',        // make it behave like <li>
            listStyleType: 'square',     // square bullets
            fontFamily: 'Helvetica Now Display',
            fontWeight: 500,
            fontSize: '20px',
            lineHeight: '32px',
            letterSpacing: '0.2px',
            verticalAlign: 'middle',
            color: '#1B1E23',
            pl: 2,                       // add left padding for bullet
        }}
        >
        <ListItemText primary={li.textContent} />
        </ListItem>
    ))}
    </List>

                    </>
                )}
                </Box>


            {/* Punch Quotes */}
            {punchQuotes.length > 0 && (
              <Box id="punch-quotes" mb={6}>
                <Typography
                  variant="h4"
                  gutterBottom
                  sx={{
                    fontFamily: "Helvetica Now Display",
                    fontWeight: 700,
                    fontSize: "20px",
                    lineHeight: "32px",
                    letterSpacing: "0px",
                    verticalAlign: "middle",
                    color: "#000000",
                    mb: 2,
                  }}
                >
                  Punch Quotes
                </Typography>
                <List sx={{ pl: 2 }}>
                  {punchQuotes.map((quote, idx) => (
                    <ListItem
                      key={idx}
                      sx={{
                        display: "list-item",
                        listStyleType: "square",
                        pl: 2,
                      }}
                    >
                      <ListItemText
                        primary={quote}
                        sx={{
                          fontFamily: "Helvetica Now Display",
                          fontWeight: 500,
                          fontSize: "20px",
                          lineHeight: "32px",
                          letterSpacing: "0.2px",
                          verticalAlign: "middle",
                          color: "#1B1E23",
                          m: 0,
                        }}
                      />
                    </ListItem>
                  ))}
                </List>
              </Box>
              
            )}
             <Divider sx={{ mb: 6 }} />
    <Box mt={6}>
                <Typography
                id={"keywords"}
                    variant="h6"
                    gutterBottom
                    sx={{
                    fontFamily: "Helvetica Now Display",
                    fontWeight: 700,
                    fontSize: "20px",
                    lineHeight: "30px",
                    letterSpacing: "0.5px",
                    verticalAlign: "middle",
                    textTransform: "uppercase",
                    color:"#667085"
                    }}
                >
                    Keywords
                </Typography>
                <Box sx={{ display: "flex", flexWrap: "wrap", gap: 2, mt:3 }}>
                    {talk.keywords?.map((word, i) => (
                    <Chip
                        key={i}
                        label={word}
                        variant="outlined"
                        sx={{
                        width: "140px",
                        height: "32px",
                        borderRadius: "44px",
                        padding: "5px 10px",
                        fontFamily: "Helvetica Now Display",
                        fontWeight: 500,
                        fontSize: "16px",
                        lineHeight: "21.8px",
                        letterSpacing: "0%",
                        verticalAlign: "middle",
                        border: "1px solid #E2E5EA",
                        color:'#242424'
                        }}
                    />
                    ))}
                </Box>
                </Box>
               
    <Divider sx={{ mb: 6 ,mt:6 }} />
              <Box id="table-of-contents" mb={8}>
                <Typography
                    variant="h4"
                    gutterBottom
                    sx={{
                    fontFamily: "Helvetica Now Display",
                    fontWeight: 700,
                    fontSize: "20px",
                    lineHeight: "30px",
                    letterSpacing: "0.5px",
                    verticalAlign: "middle",
                    color:"#667085",
                    mb:3
                    }}
                >
                    Table of Contents
                </Typography>
                  {tocItems.length === 0 && (
                <Typography sx={{ mt: 2, mb: 2 ,pl:1    ,
                     }}>No Data Present.</Typography>
              )}
    <List sx={{ pl: 2 }}>
      {tocItems.map((item, idx) => {
        const firstSpaceIndex = item.indexOf(" ");
        const firstWord =
          firstSpaceIndex !== -1 ? item.slice(0, firstSpaceIndex) : item;
        const restText =
          firstSpaceIndex !== -1 ? item.slice(firstSpaceIndex + 1) : "";

        // Color for first word, different for first row (idx === 0)
        const firstWordColor = idx === 0 ? "#2A71FA" : "#667085";

        return (
          <ListItem
            key={idx}
            sx={{
              display: "list-item",
              listStyleType: "square",
              pl: 2,
            }}
          >
            <ListItemText
              primary={
                <span
                  style={{
                    fontFamily: "Helvetica Now Display",
                    fontWeight: 500,
                    fontSize: "20px",
                    lineHeight: "32px",
                    letterSpacing: "0.2px",
                    verticalAlign: "middle",
                    color: "#1B1E23",
                    margin: 0,
                  }}
                >
                  <span style={{ color: firstWordColor }}>{firstWord}</span>{" "}
                  {restText}
                </span>
              }
            />
          </ListItem>
        );
      })}
    </List>

                </Box>
                <Join/>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
};
        


    export default SummaryPage;
