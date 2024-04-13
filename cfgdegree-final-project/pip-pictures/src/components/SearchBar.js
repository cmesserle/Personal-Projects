import React, { useEffect, useState, useRef } from "react";
import Box from '@mui/material/Box';
import { styled, alpha } from '@mui/material/styles';
import SearchIcon from '@mui/icons-material/Search';
import InputBase from '@mui/material/InputBase';  


export default function SearchBar() {

    let input = "";

    const fetchData = () => {
        fetch(`http://www.omdbapi.com/?s=${input.replaceAll(' ', '+')}&apikey=ad06e2f2`)
        .then((response) => response.json())
        .then(json => {
            console.log(json)
        });
    }

      const handleChange = (value) => {
        input = value;
    } 

    const Search = styled('div')(({ theme }) => ({
        position: 'relative',
        borderRadius: theme.shape.borderRadius,
        backgroundColor: alpha(theme.palette.common.white, 0.15),
        '&:hover': {
          backgroundColor: alpha(theme.palette.common.white, 0.25),
        },
        marginLeft: 0,
        width: '100%',
        [theme.breakpoints.up('sm')]: {
          marginLeft: theme.spacing(1),
          width: 'auto',
        },
      }));
      
      const SearchIconWrapper = styled('div')(({ theme }) => ({
        padding: theme.spacing(0, 2),
        height: '100%',
        position: 'absolute',
        pointerEvents: 'none',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }));
    
      const StyledInputBase = styled(InputBase)(({ theme }) => ({
        color: 'inherit',
        '& .MuiInputBase-input': {
          padding: theme.spacing(1.5, 1.5, 1.5, 0),
          paddingLeft: `calc(1em + ${theme.spacing(4)})`,
          transition: theme.transitions.create('width'),
          width: '100%',
          [theme.breakpoints.up('sm')]: {
            width: '12ch',
            '&:focus': {
              width: '20ch',
            },
          },
        },
      }));
    

return(

<Box sx={{ flexGrow: 0.02, display: { xs: 'none', md: 'flex' } }}>
    <Search>
    <SearchIconWrapper>
        <SearchIcon />
    </SearchIconWrapper>
    <StyledInputBase
        placeholder="Add to list..."
        inputProps={{ 'aria-label': 'search' }}
        onChange={(e) => handleChange(e.target.value)}
        onKeyDown={(e) => {
            if (e.key === 'Enter') {
              fetchData();
            }
          }}
    />
    </Search>
</Box>)
}