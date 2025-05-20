import React, { useState, useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Box, Chip, useMediaQuery } from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import CloseIcon from '@mui/icons-material/Close';
import { setAllTabs, toggleSelectedTab, unselectTab } from '../redux/searchSlice';
import { fetchCompanies, fetchExecutives } from '../api/searchApi';

export default function TabsHeader() {
  const dispatch = useDispatch();

  const allTabs = useSelector((state) => state.tabs.allTabs);
  const selectedTabs = useSelector((state) => state.tabs.selectedTabs);

  const isMobile = useMediaQuery('(max-width:640px)');
  const [showOverflow, setShowOverflow] = useState(false);
  const containerRef = useRef(null);

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

  const handleChipClick = (tab) => {
    dispatch(toggleSelectedTab(tab));
  };

  const handleUnselect = (event, tab) => {
    event.stopPropagation();
    dispatch(unselectTab(tab));
  };

  const toggleOverflow = () => setShowOverflow((prev) => !prev);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (containerRef.current && !containerRef.current.contains(event.target)) {
        setShowOverflow(false);
      }
    };

    if (showOverflow) {
      document.addEventListener('mousedown', handleClickOutside);
    }
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [showOverflow]);

  const renderChip = (tab) => {
    const isSelected = selectedTabs.includes(tab);
    return (
      <Chip
        key={tab}
        label={tab}
        onClick={() => handleChipClick(tab)}
        onDelete={isSelected ? (e) => handleUnselect(e, tab) : undefined}
        deleteIcon={isSelected ? <CloseIcon sx={{ fontSize: 16 }} /> : null}
        variant={isSelected ? 'filled' : 'outlined'}
        sx={{
          borderRadius: '44px',
          minWidth: isMobile ? '150px' : '180px',
          height: '42px',
          fontSize: '0.875rem',
          backgroundColor: isSelected ? '#1a1a1a' : 'white',
          color: isSelected ? 'white' : '#1a1a1a',
          border: '1px solid #ccc',
          flexShrink: 0,
          '& .MuiChip-deleteIcon': {
            color: isSelected ? 'white' : '#888',
            ml: 0.5,
          },
        }}
      />
    );
  };

  return (
    <Box ref={containerRef} sx={{ display: 'flex', flexDirection: 'column', gap: 1, mt: 4, px: 2 }}>
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          gap: 1,
          overflowX: isMobile ? 'hidden' : 'auto',
          whiteSpace: 'nowrap',
          '&::-webkit-scrollbar': { display: 'none' },
        }}
      >
        {visibleTabs.map(renderChip)}

        {overflowTabs.length > 0 && (
          <Chip
            label={<ExpandMoreIcon />}
            onClick={toggleOverflow}
            sx={{
              width: 42,
              height: 42,
              borderRadius: '50%',
              border: '1px solid #ccc',
              backgroundColor: 'white',
              transform: showOverflow ? 'rotate(180deg)' : 'rotate(0deg)',
              transition: 'transform 0.3s ease',
              flexShrink: 0,
            }}
          />
        )}
      </Box>

      {showOverflow && overflowTabs.length > 0 && (
        <Box
          sx={{
            display: 'flex',
            flexWrap: 'wrap',
            gap: 1,
            mt: 1,
            px: 1,
            width: isMobile ? '350px' : '750px',
          }}
        >
          {overflowTabs.map(renderChip)}
        </Box>
      )}
    </Box>
  );
}