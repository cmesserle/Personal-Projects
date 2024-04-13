import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import FormControl from '@mui/material/FormControl';
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

export default function QuestionDisplay({question, answer}) {
    const nav = useNavigate();
    const [answerInput, setAnswerInput] = useState("");

    //TODO: add for loop that only allows three attempts before being routed to signup page
    const AnswerCheck = () => {
        if (answerInput === answer) {
            nav('/home');
        } else {
            alert(`Answer not correct`)
            return
        }
    }

    const handleKeyPress = e => {
        if (e.key === 'Enter') {
          AnswerCheck();
        }
    };

    const handleChangeAnswer = (e) => {
        setAnswerInput(e.target.value);
    };

    return (
        <div className='question'>
            <p>{question}</p>
            <div className='answer'>
                <Box
                component="form"
                className="FormBox"
                sx={{
                '& .MuiTextField-root': { m: 1, width: '25ch' },
                '& label': {
                    color: '#F6F6F6',
                  },
                  '& .MuiOutlinedInput-notchedOutline': {
                    borderColor: '#F6F6F6',
                  },
                  '&:hover .MuiOutlinedInput-notchedOutline': {
                    borderColor: '#F6F6F6',
                  },
                  '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                    borderColor: '#F6F6F6',
                  },
                  '& input': {
                    color: '#FFEC3E',
                  },
                }}
                noValidate
                autoComplete="off"
                >
                <FormControl>
                <TextField
                id="answerInput"
                label="Answer"
                value={answerInput}
                type="answer"
                onChange={handleChangeAnswer}
                onKeyDown= {handleKeyPress}/>
                </FormControl>
                </Box>
            </div>
        </div>
    )
}