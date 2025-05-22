import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  Box,
  Chip,
  IconButton,
  useMediaQuery,
  Collapse,
} from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ExpandLessIcon from '@mui/icons-material/ExpandLess';
import CloseIcon from '@mui/icons-material/Close';
import {
  setAllTabs,
  toggleSelectedTab,
  unselectTab,
} from '../redux/searchSlice';
import { fetchCompanies, fetchExecutives } from '../api/searchApi';

export default function TabsHeader() {
  const dispatch = useDispatch();
  const allTabs = useSelector((state) => state.tabs.allTabs);
  const selectedTabs = useSelector((state) => state.tabs.selectedTabs);
  const isMobile = useMediaQuery('(max-width:640px)');
  const [showMore, setShowMore] = useState(false);

  useEffect(() => {
    const getTabs = async () => {
      try {
        const [executivesRes, companiesRes] = await Promise.all([
          fetchExecutives(),
          fetchCompanies(),
        ]);
        const combined = [...new Set([...(executivesRes || []), ...(companiesRes || [])])];
        dispatch(setAllTabs(combined));
      } catch (error) {
        console.error('Error fetching tabs:', error);
      }
    };
    getTabs();
  }, [dispatch]);

  const visibleCount = isMobile ? 2 : 4;
  const visibleTabs = allTabs.slice(0, visibleCount);
  const overflowTabs = allTabs.slice(visibleCount);

  const handleChipClick = (tab) => dispatch(toggleSelectedTab(tab));
  const handleUnselect = (event, tab) => {
    event.stopPropagation();
    dispatch(unselectTab(tab));
  };
const renderChip = (tab) => {
  const isSelected = selectedTabs.includes(tab);
  return (
    <Chip
      key={tab}
      label={tab}
      onClick={() => handleChipClick(tab)}
      onDelete={(e) => {
        if (isSelected) {
          e.stopPropagation();
          dispatch(unselectTab(tab));
        }
      }}
      deleteIcon={
        <CloseIcon
          sx={{
            fontSize: 12,
            visibility: isSelected ? 'visible' : 'hidden', // keep space but hide when not selected
          }}
        />
      }
      variant="outlined"
      sx={{
        borderRadius: '44px',
        px: 2,
        height: '42px',
        fontSize: '0.875rem',
        fontWeight: 500,
        whiteSpace: 'nowrap',
        flexShrink: 0,
        boxSizing: 'border-box',
        borderColor: '#ccc',
        borderWidth: '1px',
        maxWidth:{xs:'40%'},
        borderStyle: 'solid',
        backgroundColor: isSelected ? '#1a1a1a' : 'white',
        color: isSelected ? 'white' : '#1a1a1a',
        paddingRight: '2px', // always reserve space for delete icon
      
      }}
    />
  );
};


  return (
    <Box
      sx={{
        mt: 4,
        px: 2,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        mx: '0',
        width:'100%',
      }}
    >
      {/* Top Row: Visible Chips + Expand/Collapse Button */}
      <Box
        sx={{
          display: 'flex',
          justifyContent: { xs: 'flex-start', sm: 'center' },
          flexWrap: 'wrap',
          gap: '10px',
          alignItems: 'center',
          ml:{xs:'0%',sm:'10%' ,lg:'50%'},
          width: '100%',
                      justifyContent: 'flex-start',

        }}
      >
        {visibleTabs.map(renderChip)}

        {overflowTabs.length > 0 && (
          <IconButton
            onClick={() => setShowMore((prev) => !prev)}
            sx={{
              height: 42,
              width: 42,
              borderRadius: '50%',
              border: '1px solid #ccc',
              backgroundColor: 'white',
              flexShrink: 0,
            }}
            aria-label={showMore ? 'Show less' : 'Show more'}
          >
            {showMore ? <ExpandLessIcon /> : <ExpandMoreIcon />}
          </IconButton>
        )}
      </Box>

      {/* Bottom Row: Overflow Chips (responsive) */}
      <Collapse in={showMore} timeout="auto" unmountOnExit>
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'flex-start',
            flexWrap: 'wrap',
            gap: '10px',
            mt: 1,
            width: { xs: '80%', sm: '48%' },
            ml: { xs: '9%', sm: '25%' },
            px: { xs: 0, sm: 0 },
          }}
        >
          {overflowTabs.map(renderChip)}
        </Box>
      </Collapse>
    </Box>
  );
}
