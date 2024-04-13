import React, { useEffect, useId, useState } from "react";
import {useLocation} from 'react-router-dom';
import Navbar from './components/NavBar.js';
import './History.css';
import { experimentalStyled as styled } from '@mui/material/styles';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Unstable_Grid2';
import Box from '@mui/material/Box';
import SearchResultItem from "./SearchResultItem.js";


const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: 'transparent',
    padding: theme.spacing(2),
    textAlign: 'center',
    color: theme.palette.text.secondary,
  }));
  


export default function SearchResults() {
    const location = useLocation();

    const query = location.state.query;
    const results = location.state.results;

    const [myres, setmyres] = useState([]);

      return (
      <Box sx={{ flexGrow: 1 }}>

        <Navbar defaultValue ={query}/>

      <Box sx={{ flexGrow: 1, padding: 5 }}>  
  
      <Grid container spacing={{ xs: 2, md: 3 }} columns={{ xs: 4, sm: 8, md: 12 }}>
        {Array.from(results.Search).map((result, index) => (
  
          <Grid xs={2} sm={4} md={4} key={index + result.imdbID}>
            <SearchResultItem 
            title = {result.Title}
            image = {result.Poster}
            id = {result.imdbID}
            />
          </Grid>
        ))}
      </Grid>
      </Box>
    </Box>
  );
    }