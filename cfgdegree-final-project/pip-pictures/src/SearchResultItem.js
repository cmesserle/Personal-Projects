import React, { useEffect, useId, useState } from "react";
import { experimentalStyled as styled } from '@mui/material/styles';
import Paper from '@mui/material/Paper';
import Rating from '@mui/material/Rating';
import './History.css';
import Typography from '@mui/material/Typography';
import './Profile.css';
import Button from '@mui/material/Button';



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


export default function SearchResultItem ({title,image,id}) {
    const [description, setDescription] = useState("");
    const [director, setDirector] = useState("");
    const [length, setLength] = useState(0);
    const [type, setType] = useState("");
    const [releaseDate, setReleaseDate] = useState("");
    const [alreadyAdded, setAlreadyAdded] = useState(false)
    const [imdbRating, setImdbRating] = useState(0);


    useEffect(() => {
        fetch(`http://localhost:4000/film_get/1/${id}`)
            .then((response) => response.json())
            .then((response) => {
                console.log('success ' + id)
               setAlreadyAdded(true)
            })
            .catch((err) => {
                console.log('error ' + id)
               setAlreadyAdded(alreadyAdded)
            })
            
        
        fetch(`http://www.omdbapi.com/?i=${id}&apikey=ad06e2f2`)
            .then((response) => response.json())
            .then((response) => {
                setDescription(response.Plot);
                setImdbRating(response.imdbRating);
                setDirector(response.Director);
                setLength(parseInt(response.Runtime.replace(/\D/g, '')));
                setType(response.Type);

                var inputDate = response.Released;

                var dateObj = new Date(inputDate);

                var year = dateObj.getFullYear();
                var month = ('0' + (dateObj.getMonth() + 1)).slice(-2); 
                var day = ('0' + dateObj.getDate()).slice(-2); 

                var outputDate = year + '-' + month + '-' + day;

                setReleaseDate(outputDate);
            })

    }, [])
    useEffect(() => {

    }, [alreadyAdded])
    console.log(id)
    return (
        <Item>
        <div className="filmCell">
          <div classname="filmCover">
            <img src={image} alt="movie poster"/>
          </div>
          <div className="textInfo">
            <h2>{title}</h2>    
            <p>{description}</p>
            <div className="horizontal">
                <StyledRating name="read-only" 
                value={1}
                max={1} />
                <Typography component="legend" sx={{color: 'white'}}><b>IMDB Rating:</b> {imdbRating}</Typography>
            </div>

            <p>{length} mins</p>
            {alreadyAdded ? 
                    <Button>
                        Already Added
                    </Button>

             : 
                <button className="StyledButton1"  onClick={()=>{
                    fetch(`http://localhost:4000/add-film/1/`, {
                        headers: {
                          Accept: "application/json",
                          "Content-Type": "application/json"
                        },
                        method: "POST",	
                        body: JSON.stringify({
                          imdbID: id,
                          Title: title,
                          Description: description,
                          Image: image,
                          Director: director,
                          Length: length,
                          Type: type,
                          ReleaseDate: releaseDate,
                          Rating: imdbRating,
                        })
                      }).then ((resp) => {
                        setAlreadyAdded(true)
                      })
                }} autoFocus>
                      Add to List
                </button>
            }

          </div>
        </div>
        </Item>
    )
}