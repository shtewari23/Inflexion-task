import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import Header from "./Header";

import {
  Box,
  Typography,
  CircularProgress,
  Chip,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  Grid,
  Container
} from "@mui/material";

const SidebarNav = () => (
  <Box
    sx={{
      width: 200,
      position: "sticky",
      top: 100,
      mr: 4,
    }}
  >
    <List>
      {["Key Takeaways", "Keywords", "Fresh KPIs", "Products", "Table of Contents"].map(
        (text) => (
          <ListItem key={text} disablePadding>
            <ListItemButton component="a" href={`#${text.toLowerCase().replace(/ /g, "-")}`}>
              <ListItemText primary={text} />
            </ListItemButton>
          </ListItem>
        )
      )}
    </List>
  </Box>
);

const SummaryPage = () => {
  const { id } = useParams();
  const [talk, setTalk] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchSummary = async () => {
      try {
        const { data } = await axios.get(
          `http://54.237.104.114:8100/api/contents/${id}`
        );
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
      <Box display="flex" justifyContent="center" alignItems="center" height="50vh">
        <CircularProgress />
      </Box>
    );
  }

  if (!talk) {
    return <Typography>Error loading content</Typography>;
  }

  return (
      <Box sx={{ width: '100%' }}>
      <Header />
      <Container
        maxWidth={false}
        disableGutters
        sx={{
          backgroundColor: 'white',
          borderRadius: '28px',
          width: '100%',
          minHeight: '100vh',
          px: 2,
          mt:4
        }}
      >
    <Grid container spacing={4} p={4}>
      <Grid item xs={12} md={2}>
        <SidebarNav />
      </Grid>

      <Grid item xs={12} md={10}>
        {/* Header */}
        <Typography variant="h5" fontWeight="bold" gutterBottom>
          {talk.title}
        </Typography>

        <Typography variant="body2" color="text.secondary" gutterBottom>
          {talk.executive_name} • {talk.company_name} •{" "}
          {new Date(talk.published_date).toLocaleDateString("en-US", {
            month: "short",
            day: "2-digit",
            year: "numeric",
          })}
        </Typography>

        <Typography variant="body1" mt={2} mb={3}>
          {talk.description}
        </Typography>

        {/* YouTube Embed */}
        <Box
          sx={{
            aspectRatio: "16/9",
            maxWidth: "100%",
            mb: 4,
            borderRadius: 2,
            overflow: "hidden",
          }}
        >
          <iframe
            width="100%"
            height="100%"
            src={`https://www.youtube.com/embed/${talk.video_id}`}
            title="YouTube video player"
            frameBorder="0"
            allowFullScreen
          ></iframe>
        </Box>

        {/* Disclosure */}
        <Typography variant="caption" color="text.secondary" display="block" gutterBottom>
          ORIGINALLY POSTED BY {talk.author?.toUpperCase()} ON YOUTUBE. ALL RIGHTS OF THE
          ORIGINAL AUDIO ARE OWNED BY THE ORIGINAL PUBLISHER.
        </Typography>
        <Typography variant="caption" color="text.secondary" display="block" gutterBottom>
          THE BELOW IS PURELY FOR EDUCATION PURPOSES AND SHOULD NOT BE TAKEN OR USED AS
          FINANCIAL ADVICE...
        </Typography>

        {/* Investor Note Content */}
        <Box
          id="key-takeaways"
          sx={{ mt: 6 }}
          dangerouslySetInnerHTML={{ __html: talk.investor_note }}
        />

        {/* People Mentioned */}
        <Box mt={6}>
          <Typography variant="h6" fontWeight={600} gutterBottom>
            People Mentioned
          </Typography>
          <Box sx={{ display: "flex", flexWrap: "wrap", gap: 1 }}>
            {[...new Set([talk.executive_name, ...talk.keywords.filter((kw) => kw.length < 25)])]
              .slice(0, 6)
              .map((name, i) => (
                <Chip key={i} label={name} variant="outlined" />
              ))}
          </Box>
        </Box>
      </Grid>
    </Grid>
    </Container>
    </Box>
  );
};

export default SummaryPage;
