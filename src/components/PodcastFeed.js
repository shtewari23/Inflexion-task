  import React from 'react';
  import { useSelector } from 'react-redux';
  import { Box } from '@mui/material';
  import TalkCard from './PodcastCard';
  import mockTalks from '../mock/podcasts.json';

  export default function Feed() {

    const selectedTab  = useSelector((state) => state.tabs?.selectedTab || 'All');
    const searchTerms  = useSelector((state) => state.search?.terms || []);

  
    let visibleTalks = mockTalks;
  if (selectedTab && selectedTab !== 'All') {
    visibleTalks = visibleTalks.filter(
      (talk) =>
        talk.company.toLowerCase() === selectedTab.toLowerCase() ||
        talk.speaker.toLowerCase() === selectedTab.toLowerCase() ||
        talk.title.toLowerCase().includes(selectedTab.toLowerCase())
    );
  }


    /* ------------------------------------------------------------------
    * 3. If you still support free-text chips, filter by those as well
    * ------------------------------------------------------------------ */
    if (Array.isArray(searchTerms) && searchTerms.length > 0) {
      visibleTalks = visibleTalks.filter((talk) =>
        searchTerms.some((term) =>
          [talk.title, talk.speaker, talk.company]
            .join(' ')
            .toLowerCase()
            .includes(term.toLowerCase())
        )
      );
    }

    /* ------------------------------------------------------------------
    * 4. Render
    * ------------------------------------------------------------------ */
    return (
      <Box mt={4}>
        {visibleTalks.length === 0 ? (
          <Box  fontSize={18}>
            No talks found{selectedTab !== 'All' ? ` for “${selectedTab}”.` : '.'}
          </Box>
        ) : (
          visibleTalks.map((talk) => <TalkCard key={talk.id} talk={talk} />)
        )}
      </Box>
    );
  }
