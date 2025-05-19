import { useState } from 'react';
import {
  Box,
  Typography,
  Button,
  Paper,
  Avatar,
  useMediaQuery,
} from '@mui/material';
import LinkIcon from '@mui/icons-material/Link';
import MicIcon from '@mui/icons-material/Mic';
import micSvg from '../assets/icons/mic-icon.svg';

const talks = [
  {
    id: '1',
    title: 'Open AI on Compute Infrastructure Growth',
    speaker: 'Sam Altman',
    company: 'Open AI',
    date: '19 FEB, 2025',
    summary:
      'A significant, multi-year commitment involving a multi-billion dollar investment. This strategic initiative is designed to drive cutting-edge research, foster innovation, and bring transformative AI capabilities to the global ecosystem. Partnering with leading tech companies to build scalable compute and infrastructure for next-gen AI workloads.',
    fullText: [
      'This strategic initiative is designed to drive cutting-edge research.',
      'Foster innovation, & bring transformative AI capabilities to the global ecosystem.',
      'Partner with leading tech companies to build scalable compute.',
    ],
  },
];

function TalkCard({ talk }) {
  const [expanded, setExpanded] = useState(false);
  const isMobile = useMediaQuery('(max-width:600px)');



  return (
    <Box
      sx={{
        p: isMobile ? 2 : 3,
        my: 0,
        borderRadius: 5,
        border: '1px solid #D3D8DE',
        maxWidth: 620,
        mx: 'auto',
        bgcolor: '#F9FAFB',
        position: 'relative',
        minHeight:'345px'
      }}
    >
      {/* Top Row: Avatar + title */}
      <Box display="flex" gap={2} alignItems="center" mb={2}>
        <Avatar sx={{ width: 48, height: 48 }} alt={talk.speaker} src="" />
        <Box>
         <Typography
  sx={{
    fontFamily: '"Helvetica Now Display", sans-serif',
    fontWeight: 700,
    fontSize: '20px',
    lineHeight: '24px',
    letterSpacing: '0%',

  }}
>
  {talk.title}
</Typography>

          <Typography
  color="text.secondary"
  mt={0.5}
  sx={{
    fontFamily: '"Helvetica Now Display", sans-serif',
    fontWeight: 500,
    fontSize: '16px',
    lineHeight: '21.8px',
    letterSpacing: '0%',
    gap:'20px'
  }}
>
  {talk.speaker} • {talk.company} &nbsp; • &nbsp;
<img
  src={micSvg}
  alt="Microphone"
  width={16}
  height={16}
  style={{ verticalAlign: 'middle' }}
/> PODCAST • {talk.date}
</Typography>

        </Box>
      </Box>

      {/* Summary Section */}
   {!expanded ? (
 <Typography
  color="#667085"
  sx={{
    fontFamily: '"Helvetica Now Display", sans-serif',
    fontWeight: 500,
    fontSize: '18px',
    lineHeight: '28px',
    letterSpacing: '0.2px',
    verticalAlign: 'middle',
    textAlign: 'left',

    display: '-webkit-box',
    WebkitBoxOrient: 'vertical',
    WebkitLineClamp: 4,    // show max 4 lines
    overflow: 'hidden',
  }}
>
  {talk.description}

    {talk.summary}{' '}
    <Box
      component="span"
      onClick={() => setExpanded(true)}
      sx={{
        color: '#667085',
        fontWeight: 500,
        fontSize: 18,
        cursor: 'pointer',
        textDecoration: 'underline',
        lineHeight:33,
        ml: 0.5,
      }}
    >
      See more
    </Box>
  </Typography>
) : (
  <Box>
    <Typography
      color="text.secondary"
      sx={{ lineHeight: 1.6, textAlign: 'left' }}
    >
      {talk.summary}
    </Typography>

    <Box component="ul" sx={{ pl: 2, mt: 1, color: 'text.secondary', textAlign: 'left' }}>
      {talk.fullText.map((item, idx) => (
        <li key={idx}>
          <Typography sx={{ mb: 0.5 }}>
            {item}
          </Typography>
        </li>
      ))}
    </Box>
  </Box>
)}

         

      {/* Full Summary Button */}
      <Box
        sx={{
          mt: 4,
          position: 'relative',
          display: 'flex',
          justifyContent: 'center',
        }}
      >
        <Button
          
          fullWidth
          sx={{
            borderRadius: 99,
            textTransform: 'none',
            fontWeight: 500,
            px: 3,
            py: 1.5,
            bgcolor: '#F3F4F6',
            color: 'text.primary',
            fontSize: 15,
            justifyContent: 'center',
          }}
        >
          Full Summary 
        </Button>

        
      </Box>
    </Box>
  );
}



export default function TalkList() {
  return (
    <Box sx={{ py: 4, px: 2 }}>
      {talks.map((talk) => (
        <TalkCard key={talk.id} talk={talk} />
      ))}
    </Box>
  );
}
