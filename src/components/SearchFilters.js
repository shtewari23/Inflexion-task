import React, { useState, useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Box, Chip, useMediaQuery } from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import CloseIcon from '@mui/icons-material/Close';
import { setSelectedTab, removeTab } from '../redux/searchSlice';

export default function TabsHeader() {
  const dispatch = useDispatch();
  const { allTabs, selectedTab } = useSelector((state) => state.tabs || {});
  const safeTabs = Array.isArray(allTabs) ? allTabs : [];
  const currentSelected = typeof selectedTab === 'string' ? selectedTab : '';

  const isMobile = useMediaQuery('(max-width:640px)');
  const [showOverflow, setShowOverflow] = useState(false);
  const [isOverflowing, setIsOverflowing] = useState(false);

  const chipRowRef = useRef(null);
  const containerRef = useRef(null);

  const visibleTabs = isMobile ? safeTabs.slice(0, 2) : safeTabs.slice(0, 4);
  const overflowTabs = isMobile ? safeTabs.slice(2) : safeTabs.slice(4);

  useEffect(() => {
    const checkOverflow = () => {
      if (chipRowRef.current && !isMobile) {
        const { scrollWidth, clientWidth } = chipRowRef.current;
        setIsOverflowing(scrollWidth > clientWidth);
      }
    };

    checkOverflow();
    window.addEventListener('resize', checkOverflow);
    return () => window.removeEventListener('resize', checkOverflow);
  }, [safeTabs, isMobile]);

  useEffect(() => {
    function handleClickOutside(event) {
      if (containerRef.current && !containerRef.current.contains(event.target)) {
        setShowOverflow(false);
      }
    }

    if (showOverflow) {
      document.addEventListener('mousedown', handleClickOutside);
    } else {
      document.removeEventListener('mousedown', handleClickOutside);
    }

    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [showOverflow]);

  const handleChipClick = (tab) => {
    dispatch(setSelectedTab(tab));
  };

  const handleDelete = (tab) => {
    dispatch(removeTab(tab));
  };

  const toggleOverflow = () => {
    setShowOverflow((prev) => !prev);
  };

  return (
    <Box
      ref={containerRef}
      sx={{
        display: 'flex',
        flexDirection: 'column',
        gap: 1,
        mt: 4,
        px: 2,
        overflowX: 'hidden',
        justifyContent: 'center',
        alignContent: 'center',
      }}
    >
      <Box
        ref={chipRowRef}
        sx={{
          display: 'flex',
          alignItems: 'center',
          gap: 1,
          overflowX: isMobile ? 'hidden' : 'auto',
          whiteSpace: 'nowrap',
          scrollbarWidth: 'none',
          '&::-webkit-scrollbar': { display: 'none' },
        }}
      >
        {visibleTabs.map((tab) => (
          <Chip
            key={tab}
            label={tab}
            onClick={() => handleChipClick(tab)}
            onDelete={() => handleDelete(tab)}
            deleteIcon={<CloseIcon sx={{ fontSize: 16 }} />}
            variant={currentSelected === tab ? 'filled' : 'outlined'}
            sx={{
              borderRadius: '44px',
              minWidth: '150px',
              height: '42px',
              fontSize: '0.875rem',
              backgroundColor: currentSelected === tab ? '#1a1a1a' : 'white',
              color: currentSelected === tab ? 'white' : '#1a1a1a',
              border: '1px solid #ccc',
              flexShrink: 0,
              '& .MuiChip-deleteIcon': {
                color: currentSelected === tab ? 'white' : '#888',
                ml: 0.5,
              },
            }}
          />
        ))}

        {(isMobile ? safeTabs.length > 2 : safeTabs.length > 4) && (
          <Chip
            label={<ExpandMoreIcon />}
            onClick={toggleOverflow}
            variant="outlined"
            sx={{
              width: 42,
              height: 42,
              borderRadius: '50%',
              backgroundColor: 'white',
              border: '1px solid #ccc',
              cursor: 'pointer',
              flexShrink: 0,
              transform: showOverflow ? 'rotate(180deg)' : 'rotate(0deg)',
              transition: 'transform 0.3s ease',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              '& .MuiChip-label': { padding: 0 },
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
            maxWidth: '100%',
          }}
        >
          {overflowTabs.map((tab) => (
            <Chip
              key={tab}
              label={tab}
              onClick={() => {
                handleChipClick(tab);
                setShowOverflow(false);
              }}
              onDelete={() => handleDelete(tab)}
              deleteIcon={<CloseIcon sx={{ fontSize: 16 }} />}
              variant={currentSelected === tab ? 'filled' : 'outlined'}
              sx={{
                borderRadius: '44px',
                minWidth: '140px',
                height: '42px',
                fontSize: '0.875rem',
                backgroundColor: currentSelected === tab ? '#1a1a1a' : 'white',
                color: currentSelected === tab ? 'white' : '#1a1a1a',
                border: '1px solid #ccc',
                '& .MuiChip-deleteIcon': {
                  color: currentSelected === tab ? 'white' : '#888',
                  ml: 0.5,
                },
              }}
            />
          ))}
        </Box>
      )}
    </Box>
  );
}
