import React, { useEffect, useState } from "react";
import './History.css';
import './Profile.css';
import header from './header.png';
import Navbar from './components/NavBar.js';
import { experimentalStyled as styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Unstable_Grid2';
import Typography from '@mui/material/Typography';
import Rating from '@mui/material/Rating';
import Slider, { SliderThumb } from '@mui/material/Slider';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import useMediaQuery from '@mui/material/useMediaQuery';
import { useTheme } from '@mui/material/styles';

const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: 'transparent',
    padding: theme.spacing(2),
    textAlign: 'center',
    color: theme.palette.text.secondary,
  }));

  const PrettoSlider = styled(Slider)({
    marginLeft: '10px',
    color: '#FFEC3E',
    height: 8,
    '& .MuiSlider-track': {
      border: 'none',
    },
    '& .MuiSlider-thumb': {
      height: 20,
      width: 20,
      backgroundColor: '#FFEC3E',
      border: '2px solid currentColor',
      '&:focus, &:hover, &.Mui-active, &.Mui-focusVisible': {
        boxShadow: 'inherit',
      },
      '&:before': {
        display: 'none',
      },
    },
    '& .MuiSlider-valueLabel': {
      color: 'black',
      lineHeight: 1.2,
      fontSize: 14,
      background: 'unset',
      padding: 0,
      width: 32,
      height: 32,
      borderRadius: '50% 50% 50% 0',
      backgroundColor: '#FFEC3E',
      transformOrigin: 'bottom left',
      transform: 'translate(50%, -100%) rotate(-45deg) scale(0)',
      '&:before': { display: 'none' },
      '&.MuiSlider-valueLabelOpen': {
        transform: 'translate(50%, -100%) rotate(-45deg) scale(1)',
      },
      '& > *': {
        transform: 'rotate(45deg)',
      },
    },
  });
  
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
  

export default function ToWatch() {
    const [ToWatch, SetToWatch] = useState([])
    const [progress, setProgress] = useState(0)
    const [randomFilm, setRandomFilm] = React.useState({})


    useEffect(() => {
        fetch("http://localhost:4000/all-toWatch/1/")
          .then((response) => response.json())
          .then((ToWatch) => {
            SetToWatch(ToWatch);
          });
      }, []);

      useEffect(() => {
        console.log(randomFilm)
      }, [randomFilm]);


      const StyledRating = styled(Rating)({
        '& .MuiRating-iconFilled': {
          color: '#FFEC3E',
        }
    })

    const [open, setOpen] = React.useState(false);
    const theme = useTheme();
    const fullScreen = useMediaQuery(theme.breakpoints.down('md'));
  
    const handleClickOpen = () => {
      fetch("http://localhost:4000/random-film/1/")
          .then((response) => response.json())
          .then((randomFilm) => {
            setRandomFilm(randomFilm);
          });
      setOpen(true);
    };
  
    const handleClose = () => {
      setOpen(false);
    };

    return (
    <Box sx={{ flexGrow: 1 }}>

      <div style = {{backgroundImage: `url(${header})`, 
      backgroundRepeat: "no-repeat",
      backgroundSize: "cover",
      height: '500px',
      backgroundColor: 'rgba(0, 0, 0, 0.9)'
    }}>
        <Navbar/> 
          <header style = {{justifyContent: 'start', lineHeight: '150px', alignItems: 'flex-start', paddingLeft: '120px'}}>
            <h1 style = {{color:'#FFEC3E'}}> To Watch </h1>
            <h3>Too many options? </h3>
            <button className="StyledButton1" onClick={handleClickOpen}> Pick for me! </button> 
            <Dialog
               PaperProps={{ style: { backgroundColor: '#181818'} }}
               fullScreen={fullScreen}
               open={open}
               onClose={handleClose}
               aria-labelledby="responsive-dialog-title"
            >
              <DialogTitle id="responsive-dialog-title" sx={{color: '#FFEC3E', fontSize: '30px'}}>
                {randomFilm.title}
              </DialogTitle>
              <DialogContent style = {{alignItems: 'center'}}>
               <img src={randomFilm.thumbnail} center/>
              </DialogContent>
              <DialogActions>
                <button className="StyledButton1"  onClick={handleClose} autoFocus>
                  Close
                </button>
              </DialogActions>
          </Dialog>    

          </header>
      </div>

    <Box sx={{ flexGrow: 1, padding: 5 }}>  

        <Grid container spacing={{ xs: 2, md: 3 }} columns={{ xs: 4, sm: 8, md: 12 }}>
            {Array.from(ToWatch).map((movie, index) => (

          <Grid xs={2} sm={4} md={4} key={index}>
          <Item>
          <div className="filmCell">
            <div classname="filmCover">
              <img src={movie.thumbnail} alt="movie cover"/>
            </div>
            <div className="textInfo">
              <h2>{movie.title}</h2>
              <p>{movie.description}</p>
            <div className="horizontal">
                <StyledRating name="read-only" 
                value={1}
                max={1} />
                <Typography component="legend" sx={{color: 'white'}}><b>IMDB Rating:</b> {movie.rating}</Typography>
            </div>
            <div className="horizontal">
              <p><b>Runtime: </b>{movie.length} mins</p>
            </div>
            <Box sx={{ m: 0.5}} />
                <Typography>Progress: </Typography>
                <PrettoSlider
                sx={{width: '80%'}}
                  valueLabelDisplay="auto"
                  aria-label="pretto slider"
                  defaultValue={movie.progress}
                  onChange={(event, newValue) => {
                    if (typeof newValue === 'number') {
                      fetch(`http://localhost:4000/update-stats/1/${movie.movieId}`, {
                        headers: {
                          Accept: "application/json",
                          "Content-Type": "application/json"
                        },
                        method: "PATCH",	
                        body: JSON.stringify({
                          progress: newValue
                        })
                      })
                      .then (() => setProgress(newValue)
                      )
                    }
                  }}
                />
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