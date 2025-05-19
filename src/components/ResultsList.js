import React from 'react';
import { useSelector } from 'react-redux';
import { Box, Typography, Card, CardContent } from '@mui/material';

const demoTalks = [
  {
    id: '1',
    title: 'OpenAI on Compute Infrastructure Growth',
    speaker: 'Sam Altman',
    company: 'OpenAI',
    category: 'Technology',
    date: '19 FEB, 2025',
    summary: 'Sam Altman discusses the future of AI infrastructure scaling...',
  },
  {
    id: '2',
    title: 'Microsoft’s AI Commitment',
    speaker: 'Satya Nadella',
    company: 'Microsoft',
    category: 'Business',
    date: '15 FEB, 2025',
    summary: 'Satya Nadella shares Microsoft’s long-term AI strategy...',
  },
  {
    id: '3',
    title: 'Nvidia and the Future of GPUs',
    speaker: 'Jensen Huang',
    company: 'Nvidia',
    category: 'Science',
    date: '10 FEB, 2025',
    summary: 'Jensen Huang dives into the role of GPUs in accelerating AI...',
  },
];

export default function ResultsList() {
  const selectedTab = useSelector((state) => state.search.selectedTab);

  const filteredTalks =
    selectedTab === 'All' || selectedTab === ''
      ? demoTalks
      : demoTalks.filter((talk) => talk.category.toLowerCase() === selectedTab.toLowerCase());

  return (
    <Box p={3}>
      {filteredTalks.length === 0 ? (
        <Typography color="white" fontSize={18}>
          No talks found under this tab.
        </Typography>
      ) : (
        filteredTalks.map((talk) => (
          <Card
            key={talk.id}
            sx={{
              backgroundColor: '#1E1E1E',
              color: '#FFFFFF',
              mb: 2,
              borderRadius: 2,
              boxShadow: '0px 2px 10px rgba(0, 0, 0, 0.3)',
            }}
          >
            <CardContent>
              <Typography variant="h6" fontWeight="bold" mb={1}>
                {talk.title}
              </Typography>
              <Typography variant="subtitle2" color="#B7BCC7" gutterBottom>
                {talk.speaker} • {talk.company} • {talk.date}
              </Typography>
              <Typography variant="body2" color="#CCCCCC">
                {talk.summary}
              </Typography>
            </CardContent>
          </Card>
        ))
      )}
    </Box>
  );
}
