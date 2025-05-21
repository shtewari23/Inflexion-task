import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import {
  Box,
  Typography,
  Container,
  Button,
  Skeleton,
} from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import TalkCard from "./PodcastCard";
import Suscribe from "./Suscribe";

const ContentDetail = () => {
  const { contentId } = useParams();
  const [talk, setTalk] = useState(null);
  const [talksByPerson, setTalksByPerson] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    if (!contentId) return;

    const fetchContent = async () => {
      try {
        setLoading(true);

        const { data } = await axios.get(
          `${process.env.REACT_APP_API_BASE_URL}/api/contents/${contentId}`
        );

        if (data.status === "success") {
          const content = data.data;

          const mainTalk = {
            id: content._id,
            title: content.title,
            description: content.description,
            investor_note: content.investor_note,
            executive_name: content.executive_name,
            company_name: content.company_name,
            published_date: content.published_date.split("T")[0],
            thumbnailUrl: content.thumbnail_url,
          };

          setTalk(mainTalk);

          const talksResponse = await axios.get(
            `${process.env.REACT_APP_API_BASE_URL}/api/contents?limit=10&offset=0&search_term=${encodeURIComponent(
              content.executive_name
            )}`
          );

          if (talksResponse.data.status === "success") {
            const filteredTalks = talksResponse.data.data
              .filter((t) => t.executive_name === content.executive_name)
              .map((item) => ({
                id: item._id,
                title: item.title,
                description: item.description,
                investor_note: item.investor_note,
                executive_name: item.executive_name,
                company_name: item.company_name,
                published_date: item.published_date.split("T")[0],
                thumbnailUrl: item.thumbnail_url,
              }));

            setTalksByPerson(filteredTalks);
          }
        }
      } catch (e) {
        console.error("Failed to fetch content detail", e);
      } finally {
        setLoading(false);
      }
    };

    fetchContent();
  }, [contentId]);

  return (
    <>

      <Box
        sx={{
          backgroundColor: "white",
          borderRadius: "28px",
          width: "100%",
          minHeight: "100vh",
        }}
      >
        {/* Top Section */}
        <Box sx={{ px: 3, pt: 4 }}>
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

          {/* Executive Info */}
          <Box
            sx={{
              mt: { xs: 2, sm: -4 },
              textAlign: "left",
              maxWidth: 900,
              mx: "auto",
              px: 2,
                    ml:{xs:0,sm:'3%' , md:'7%' , lg:'22%'}

            }}
          >
          {loading ? (
    <>
      <Skeleton
        width="40%"
        height={30}
        sx={{
          mt: { xs: 2, sm: -4 },
          alignItems: "left",
          ml: { xs: 0, sm: "3%", md: "7%", lg: "22%" },
        }}
      />
      <Skeleton
        width="20%"
        height={20}
        sx={{
         
          ml: { xs: 0, sm: "3%", md: "7%", lg: "22%" },
        }}
      />
              </>
            ) : (
              <>
                <Typography
                  variant="h5"
                  fontWeight={600}
                  fontSize={{ xs: "22px", md: "26px" }}
                >
                  {talk?.executive_name}
                </Typography>
                <Typography
                  variant="body2"
                  sx={{ fontSize: "14px", color: "gray", mt: 0.5 }}
                >
                  {talk?.company_name} ・ {talksByPerson.length} Talks
                </Typography>
              </>
            )}
          </Box>
        </Box>

        {/* Content Feed */}
        <Container
          maxWidth={false}
          disableGutters
          sx={{
            px: 2,
            py: 4,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: 4,
          }}
        >
          {/* Main Talk Card */}
          {loading ? (
            <Skeleton
              variant="rectangular"
              width="100%"
              height={300}
              sx={{ maxWidth: 900, borderRadius: 4 }}
            />
          ) : (
            <TalkCard talk={talk} />
          )}

          {/* Other Talks */}
          <Box
            sx={{
              display: "flex",
              flexWrap: "wrap",
              gap: 3,
              justifyContent: "center",
              maxWidth: 900,
              width: "100%",
            }}
          >
            {loading
              ? Array.from({ length: 3 }).map((_, idx) => (
                  <Skeleton
                    key={idx}
                    variant="rectangular"
                    width={280}
                    height={180}
                    sx={{ borderRadius: 2 }}
                  />
                ))
              : talksByPerson.map((talkItem, index) => (
                  <React.Fragment key={talkItem.id}>
                    <TalkCard talk={talkItem} />
                    {(index + 1) % 4 === 0 && <Suscribe />}
                  </React.Fragment>
                ))}
          </Box>
        </Container>
      </Box>
    </>
  );
};

export default ContentDetail;
