import React, { useEffect, useState } from "react";
import { useSelector } from 'react-redux';
import { connect } from 'react-redux';
import './Profile.css';
import NavBar from './components/NavBar.js';
import Box from '@mui/material/Box';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import TextField from '@mui/material/TextField';
import Rating from '@mui/material/Rating';
import StarIcon from '@mui/icons-material/Star.js';

const UserProfile = ({ isLoggedIn, userID, logout }) => {
  const userId = useSelector((state) => state.user_iD);
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [totalHoursWatched, setTotalHoursWatched] = useState(0);
  const [numFilmsWatched, setNumFilmsWatched] = useState(0);
  const [numReviews, setNumReviews] = useState(0);
  const [openEmailDialog, setOpenEmailDialog] = useState(false);
  const [openPasswordDialog, setOpenPasswordDialog] = useState(false);
  const [newEmail, setNewEmail] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [title, setTitle] = useState([]);
  const [user_rating, setRating] = useState([]);
  const { last_name, first_name } = userData;

  const handleOpenEmailDialog = () => {
    setOpenEmailDialog(true);
  };
  
  const handleCloseEmailDialog = () => {
    setOpenEmailDialog(false);
    setNewEmail('');
  };
  
  const handleOpenPasswordDialog = () => {
    setOpenPasswordDialog(true);
  };
  
  const handleClosePasswordDialog = () => {
    setOpenPasswordDialog(false);
    setNewPassword('');
  };
  
  const handleUpdateEmail = () => {
    fetch(`http://localhost:4000/user_update_email/${userData.user_id}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email: newEmail }),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        handleCloseEmailDialog();
      })
      .catch((error) => {
        console.error('Error updating email:', error);
      });
  };
  
  const handleUpdatePassword = () => {
    fetch(`http://localhost:4000/user_update_password/${userData.user_id}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ password: newPassword }),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        handleClosePasswordDialog();
      })
      .catch((error) => {
        console.error('Error updating password:', error);
      });
  };
  
  useEffect(() => {
    fetch(`http://localhost:4000/user_get/${userId}`)
      .then((response) => response.json())
      .then((data) => {
        const user = data[0];
        setUsername(user.username);
        setEmail(user.email);
        setUserData(user);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching user data:", error);
        setError('Error fetching user data. Please try again later: ' + error.message);
        setLoading(false);
      });

    fetch(`http://localhost:4000/profile_get/${userId}/review`)
      .then((response) => {
        if (response.status === 200) {
          return response.json();
        } else {
          throw new Error("Error fetching user rating");
        }
      })
      .then((data) => {
        const titles = data.map((review) => review.title);
        const ratings = data.map((review) => review.user_rating);
        setTitle(titles);
        setRating(ratings);
      })
      .catch((error) => {
        console.error("Error fetching user rating:", error);
        setError('Error fetching user rating. Please try again later: ' + error.message);
      });

    fetch(`http://localhost:4000/profile_get/${userId}/summary`)
      .then((response) => response.json())
      .then((data) => {
        const { totalLength, totalWatchedFilms, totalReviews } = data;
        setTotalHoursWatched(totalLength);
        setNumFilmsWatched(totalWatchedFilms);
        setNumReviews(totalReviews);
      })
      .catch((error) => {
        console.error("Error fetching user summary:", error);
      })
      .finally(() => {
        setLoading(false);
      });
  }, [userId]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div>
      <NavBar />
      <Box
        sx={{
          display: "grid",
          gridTemplateColumns: "1fr 1fr", 
          gap: "20px",
          padding: "20px",
          "@media (min-width: 1024px)": {
            gridTemplateColumns: "repeat(1, 1fr)", 
          },
        }}
      >
        <div className="profile-box">
          <div className="user-info">
            <img style={{ padding: 0 }} width="200" height="200" src="https://img.icons8.com/ios-glyphs/30/FFEC3E/cat-profile--v1.svg" alt="cat-profile--v1"/>
            <h2>{username}</h2>
          </div>
          <div className="user-stats">
            <h2>User stats</h2>
            <h4>Total hours watched: {totalHoursWatched}</h4>
            <h4>Number of films watched: {numFilmsWatched}</h4>
            <h4>Number of reviews: {numReviews}</h4>
          </div>
        </div>
            
        <div className="profile-box">
          <div className="account">
            <h2>Account Details</h2>
            <h4>Name: {first_name} {last_name}</h4>
            <h4>Email: {email}</h4>
            <button className="StyledButton1" onClick={handleOpenEmailDialog}>Update email</button>     
            <Dialog open={openEmailDialog} onClose={handleCloseEmailDialog}>
              <DialogTitle></DialogTitle>
              <DialogContent>
                <TextField 
                  label="Enter New Email"
                  value={newEmail}
                  onChange={(e) => setNewEmail(e.target.value)}
                />
              </DialogContent>
              <DialogActions>
                <button className="StyledButton1" onClick={handleCloseEmailDialog}>Cancel</button>
                <button className="StyledButton1" onClick={handleUpdateEmail}>Update</button>
              </DialogActions>
            </Dialog>

            <button className="StyledButton1" onClick={handleOpenPasswordDialog}>Update Password</button>
            <Dialog open={openPasswordDialog} onClose={handleClosePasswordDialog}>
              <DialogTitle>Update Password</DialogTitle>
              <DialogContent>
                <TextField 
                  label="Enter New Password"
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                />
              </DialogContent>
              <DialogActions>
                <button className="StyledButton1" onClick={handleClosePasswordDialog}>Cancel</button>
                <button className="StyledButton1"onClick={handleUpdatePassword}>Update</button>
              </DialogActions>
            </Dialog>
          </div>
      
          <div className="watched-films">
            <h2>Watched Films</h2>
            <table className="films-table">
              <tbody>
                {title.length > 0 && user_rating.length > 0 && title.map((filmTitle, index) => (
                  <tr key={index}>
                    <td>
                      <h4>{filmTitle}</h4>
                    </td>
                    <td>
                      <h4>
                        <Rating
                          value={user_rating[index]}
                          name={`rating-${index}`}
                          precision={0.5}
                          icon={<StarIcon fontSize="inherit" />}
                          readOnly
                        />
                      </h4>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </Box>
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    isLoggedIn: state.isLoggedIn,
    username: state.username,
    userID: state.userID,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    logout: () => {
      dispatch({ type: 'LOGOUT' });
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(UserProfile);