import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import Container from '@mui/material/Container';
import Button from '@mui/material/Button';
import Tooltip from '@mui/material/Tooltip';
import MenuItem from '@mui/material/MenuItem';
import { styled, alpha } from '@mui/material/styles';
import SearchIcon from '@mui/icons-material/Search';
import InputBase from '@mui/material/InputBase';  
import {Link, useNavigate} from "react-router-dom"

const pages = [{
  title: 'Home',
  path: '/home'
}, {
  title: 'To Watch',
  path: '/to-watch'
}, {
  title: 'Watched',
  path: '/history'
}];

const settings = [{
  title: 'Profile',
  path: '/profile'
}, {
  title: 'Logout',
  path: '/'
}];

function NavBar({defaultValue}) {
  const [anchorElNav, setAnchorElNav] = React.useState(null);
  const [anchorElUser, setAnchorElUser] = React.useState(null);
  let searchInput = "";

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  const nav = useNavigate();

  const handleSearch = () => {
      fetch(`http://www.omdbapi.com/?s=${searchInput.replaceAll(' ', '+')}&apikey=ad06e2f2`)
        .then((response) => response.json())
        .then(json => {
          if (json.Search.length > 0) {
            nav("/search", {state: {results: json, query: searchInput}})
          }
        });

      //nav("/search", {state: {raw: searchInput, query: formattedSearch}})
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
        width: '20ch',
        '&:focus': {
          width: '25ch',
        },
      },
    },
  }));


  return (
    <AppBar elevation={0} position="static"  sx={{ bgcolor: "transparent", padding: "10px"}}>
      <Container maxWidth="l">
        <Toolbar disableGutters>
        <img width="50" height="50" src="https://img.icons8.com/ios-filled/50/FFEC3E/kitty.svg" alt="kitty"/>
          <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
            <IconButton
              size="medium"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleOpenNavMenu}
              color="inherit"
            >
              <MenuIcon />
            </IconButton>

            <Menu
              id="menu-appbar"
              anchorEl={anchorElNav}
              anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'left',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'left',
              }}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
              sx={{
                display: { xs: 'block', md: 'none' },
              }}
            >
              {pages.map((page) => (
                <MenuItem key={page.title} onClick={handleCloseNavMenu}>
                  <Typography>
                    <Link to={`${page.path}`}>
                    {page.title}
                    </Link>
                  </Typography>
                </MenuItem>
              ))}
            </Menu>
          </Box>

          <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
            {pages.map((page) => (
              <Button
                key={page.title}
                onClick={handleCloseNavMenu}
                sx={{ my: 2, 
                display: 'block', 
                padding: '10px', 
                margin: '20px', 
                color: '#FFEC3E',
                a: {fontSize: '26px', padding: '5px'}}}
              >
                <Link to={`${page.path}`}>
                    {page.title}
                </Link>              
                </Button>
            ))}
          </Box>

        <Box sx={{ flexGrow: 0.02, display: { xs: 'none', md: 'flex' } }}>
          <Search>
            <SearchIconWrapper>
              <SearchIcon />
            </SearchIconWrapper>
            <StyledInputBase
              placeholder="Search for new movie..."
              defaultValue={defaultValue}
              onChange={(e) => {
                searchInput = e.target.value;
              }}
              onKeyDown={(e) => {
                if (e.key === 'Enter') {
                  handleSearch();
                }
              }}
              inputProps={{ 'aria-label': 'search' }}
            />
          </Search>
          </Box>

          <Box sx={{ flexGrow: 0 }}>
            <Tooltip title="Open settings">
              <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                <img width="50" height="50" src="https://img.icons8.com/ios-glyphs/30/FFEC3E/cat-profile--v1.svg" alt="cat-profile--v1"/>
              </IconButton>
            </Tooltip>
            <Menu
              sx={{ mt: '50px', a: {
                '&:hover': {
                  color: "black"},
                color: 'black', 
                fontSize: '15px', 
                padding: '0px'}}}

              id="menu-appbar"
              anchorEl={anchorElUser}
              anchorOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              open={Boolean(anchorElUser)}
              onClose={handleCloseUserMenu}
            >
              {settings.map((setting) => (
                <MenuItem key={setting.title} onClick={handleCloseUserMenu}   sx={{ padding: '10px'}}>
                  <Typography textAlign="center" sx={{ padding: '5px'}}>
                <Link to={`${setting.path}`}>
                    {setting.title}
                </Link>         
                  </Typography>
                </MenuItem>
              ))}
            </Menu>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
}

export default NavBar;