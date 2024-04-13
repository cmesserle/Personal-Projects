import * as React from 'react';
import './History.css';
import Navbar from './components/NavBar.js';
import { experimentalStyled as styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Unstable_Grid2';
import Typography from '@mui/material/Typography';
import Rating from '@mui/material/Rating';
import StarIcon from '@mui/icons-material/Star.js';
import TextField from '@mui/material/TextField';
import header2 from './header2.png';

  
  const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: 'transparent',
    padding: theme.spacing(2),
    textAlign: 'center',
    color: theme.palette.text.secondary,
  }));
  
  const StyledRating = styled(Rating)({
    '& .MuiRating-iconFilled': {
      color: '#FFEC3E',
    },
    '& .MuiRating-iconHover': {
      color: '#FFEC3E',
    },
  
    '& .MuiRating-iconEmpty': {
      color: 'grey'
    }
  });
  
    function History() {

      const [watched, setWatched] = React.useState([])
      const [ignored, forceUpdate] = React.useState(false)

      React.useEffect(() => {
        fetch("http://localhost:4000/all-watched/1/")
        .then((response) => response.json())
        .then((watchedFilms) => {
          setWatched(watchedFilms);
        });
      }, []);

      React.useEffect(() => {
      }, [forceUpdate])

      return (
      <Box sx={{ flexGrow: 1 }}>

      <div style = {{backgroundImage: `url(${header2})`, 
            backgroundRepeat: "no-repeat",
            backgroundSize: "cover",
            height: '450px',
            backgroundColor: 'rgba(2, 0, 0, 0.1)'
          }}> 
          <Navbar />
          <header style = {{justifyContent: 'start', lineHeight: '150px', alignItems: 'flex-start', paddingLeft: '120px'}}>
            <h1 style = {{color:'#FFEC3E'}}> Watched </h1>
            <h3></h3>
          </header>
      </div>

      <Box sx={{ flexGrow: 1, padding: 5 }}>  
  
      <Grid container spacing={{ xs: 2, md: 3 }} columns={{ xs: 4, sm: 8, md: 12 }}>
        {Array.from(watched).map((movie, index) => (
  
          <Grid xs={2} sm={4} md={4} key={index}>
            <Item>
            <div className="filmCell">
              <div classname="filmCover">
                <img src={movie.thumbnail} alt="movie poster"/>
              </div>
              <div className="textInfo">
                <h2>{movie.title}</h2>
                <Typography component="legend" sx={{color: 'white'}}>Rating</Typography>
                  <StyledRating
                    value={movie.rating}
                    name="customized-color"
                    getLabelText={(value) => `${value} Heart${value !== 1 ? 's' : ''}`}
                    precision={0.5}
                    icon={<StarIcon fontSize="inherit" />}
                    onChange={(event, newValue) => {
                      if (newValue != null) {
                       fetch(`http://localhost:4000/update-stats/1/${movie.movieId}`, {
                         headers: {
                           Accept: "application/json",
                           "Content-Type": "application/json"
                         },
                         method: "PATCH",	

                         body: JSON.stringify({
                           rating: newValue
                         })
                       }).then((response) => {
                          setWatched(watched);
                       })
                       watched[index].rating = newValue
                       forceUpdate(!ignored)
                      }

                   }}
                  />

                <Box
                  component="form"
                  sx={{
                    '& .MuiTextField-root': { m: 1, width: '25ch' },
                    paddingTop: '25px'
                  }}
                  noValidate
                  autoComplete="off"
                >
                <TextField
                  className=''
                  id="outlined-multiline-flexible"
                  defaultValue={movie.review}
                  label="Review"
                  variant="outlined"
                  multiline
                  InputProps={{
                    style: {color: 'white'}
                    }
                  }
                  InputLabelProps={{
                    style: { color: '#fff'
                    },
                  }}
                  sx={{
                    '& .MuiOutlinedInput-root': {
                      '& fieldset': {
                        borderColor: '#FFEC3E', 
                      },
                      '&:hover fieldset': {
                        borderColor: '#FFEC3E', 
                      },
                    },
                    '& .MuiFormLabel-root': {
                      borderColor: '#FFEC3E',
                    }

                  }}
                  maxRows={15}

                  onChange={(event) => {
                    if (event.target.value != null) {
                     fetch(`http://localhost:4000/update-stats/1/${movie.movieId}`, {
                       headers: {
                         Accept: "application/json",
                         "Content-Type": "application/json"
                       },
                       method: "PATCH",	

                       body: JSON.stringify({
                         review: event.target.value
                       })
                     })
                    }
                 }}
                />
                </Box>
              </div>
            </div>
            </Item>
          </Grid>
        ))}
  
      </Grid>
      </Box>
    </Box>
  );
    }
  
  
  export default History;