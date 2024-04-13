import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import FormControl from '@mui/material/FormControl';
import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Button from '@mui/material/Button';
import './Login.css'


export default function LoginForm() {
  const [triggered, setTriggered] = useState(false);
  const [usernameInput, setUsernameInput] = useState("");
  const [passwordInput, setPasswordInput] = useState("");
  const [firstnameInput, setFirstnameInput] = useState("");
  const [lastnameInput, setLastnameInput] = useState("");
  const [emailInput, setEmailInput] = useState("");
  const [questionInput, setQuestionInput] = useState("");
  const [answerInput, setAnswerInput] = useState("");

  const nav = useNavigate();

  const handleChangeUsername = e => {
    setUsernameInput(e.target.value);
  };

  const handleChangePassword = e => {
    setPasswordInput(e.target.value);
  };

  const handleChangeFirstName = e => {
    setFirstnameInput(e.target.value);
  };

  const handleChangeLastName = e => {
    setLastnameInput(e.target.value);
  };

  const handleChangeEmail = e => {
    setEmailInput(e.target.value);
  };

  const handleChangeQuestion = e => {
    setQuestionInput(e.target.value);
  };

  const handleChangeAnswer = e => {
    setAnswerInput(e.target.value);
  };

  const fetchCreds = async () => {
    console.log(`doing something`)

    let userID='';

    try {
      const response = await fetch('http://localhost:4000/user_new', {
        method: "POST",
        body: JSON.stringify({
            firstName: firstnameInput,
            lastName: lastnameInput,
            email: emailInput,
            username: usernameInput,
            password: passwordInput,
            question: questionInput,
            answer: answerInput,
        }),
        headers: {
            'Content-type': 'application/json; charset=UTF-8',
        },
      });
      console.log(questionInput);
      console.log(answerInput);
      console.log(response);
      const jsonData = await response.json();
      userID = (jsonData.user_id);
      console.log(jsonData)
    } catch (error) {
      console.log('Error fetching data:', error);
    }
    nav('/home')
  }

  useEffect( () => {
    console.log(`working`)
  }, [triggered]); 

  const handleTrigger = () => {
    setTriggered(true);
    fetchCreds()
  };

  const handleKeyPress = e => {
    if (e.key === 'Enter') {
      handleTrigger();
    }
  };

  return (
    <div>
    <div className="container flex">
        <div className="item">
            <header>
                <h2>Join the club!</h2>
            </header>
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
                    id="firstnameInput"
                    label="First Name"
                    value={firstnameInput}
                    type="firstname"
                    onChange={handleChangeFirstName}
                    onKeyDown={handleKeyPress}
                    />
                </FormControl>
                <FormControl>
                    <TextField
                    id="lastnameInput"
                    label="Last Name"
                    value={lastnameInput}
                    type="lastname"
                    onChange={handleChangeLastName}
                    onKeyDown={handleKeyPress}
                    />
                </FormControl>
                <FormControl>
                    <TextField
                    id="emailInput"
                    label="Email"
                    value={emailInput}
                    type="email"
                    onChange={handleChangeEmail}
                    onKeyDown={handleKeyPress}
                    />
                </FormControl>
                <FormControl>
                    <TextField
                    id="usernameInput"
                    label="Username"
                    value={usernameInput}
                    type="username"
                    onChange={handleChangeUsername}
                    onKeyDown={handleKeyPress}
                    />
                </FormControl>
                <FormControl>
                    <TextField
                    id="passwordInput"
                    label="Password"
                    value={passwordInput}
                    type="password"
                    onChange={handleChangePassword}
                    onKeyDown={handleKeyPress}
                    />
                </FormControl>
                <FormControl>
                    <TextField
                    id="questionInput"
                    label="Recovery Question"
                    value={questionInput}
                    type="question"
                    onChange={handleChangeQuestion}
                    onKeyDown={handleKeyPress}
                    />
                </FormControl>
                <FormControl>
                    <TextField
                    id="answerInput"
                    label="Recovery Answer"
                    value={answerInput}
                    type="answer"
                    onChange={handleChangeAnswer}
                    onKeyDown={handleKeyPress}
                    />
                </FormControl>
            </Box>
            <div className='buttons'>
                <Button onClick={handleTrigger} variant="contained">Sign Up</Button>
            </div>
        </div>
    </div>
    </div>
    
  );
}