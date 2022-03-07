import * as React from 'react';
import {Routes, Route, Link} from 'react-router-dom';
import {useDispatch} from 'react-redux';
import {styled, alpha} from '@mui/material/styles';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import InputBase from '@mui/material/InputBase';
import Paper from '@mui/material/Paper';
import SearchIcon from '@mui/icons-material/Search';
import Button from '@mui/material/Button';
import JobsPage from './pages/JobsPage';
import IconButton from '@mui/material/IconButton';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import MenuItem from '@mui/material/MenuItem';
import CssBaseline from '@mui/material/CssBaseline';
import {changeState} from './features/SearchSlice';

const pages = [
  {
    'name': 'Jobs',
    'url': '/',
  },
  {
    'name': 'Plan',
    'url': '/',
  },
  {
    'name': 'Apply',
    'url': '/',
  },
  {
    'name': 'Destroy',
    'url': '/',
  },
];

const Search = styled('div')(({theme}) => ({
  'position': 'relative',
  'borderRadius': theme.shape.borderRadius,
  'backgroundColor': alpha(theme.palette.common.white, 0.15),
  '&:hover': {
    backgroundColor: alpha(theme.palette.common.white, 0.25),
  },
  'marginRight': theme.spacing(2),
  'marginLeft': 0,
  'width': '100%',
  [theme.breakpoints.up('sm')]: {
    marginLeft: theme.spacing(3),
    width: 'auto',
  },
}));

const SearchIconWrapper = styled('div')(({theme}) => ({
  padding: theme.spacing(0, 2),
  height: '100%',
  position: 'absolute',
  pointerEvents: 'none',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
}));

const StyledInputBase = styled(InputBase)(({theme}) => ({
  'color': 'inherit',
  '& .MuiInputBase-input': {
    padding: theme.spacing(1, 1, 1, 0),
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('md')]: {
      width: '20ch',
    },
  },
}));

export default function App() {
  const dispatch = useDispatch();
  const [anchorElNav, setAnchorElNav] = React.useState(null);

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  return (
    <React.Fragment>
      <CssBaseline />
      <Container maxWidth="lg">
        <AppBar position="static">
          <Container maxWidth="xl">
            <Toolbar disableGutters>
              <Typography
                variant="h6"
                noWrap
                component="div"
                sx={{mr: 2, display: {xs: 'none', md: 'flex'}}}
              >
                Terraform API
              </Typography>

              <Box sx={{flexGrow: 1, display: {xs: 'flex', md: 'none'}}}>
                <IconButton
                  size="large"
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
                    display: {xs: 'block', md: 'none'},
                  }}
                >
                  {pages.map((page) => (
                    <MenuItem
                      key={page.name}
                      component={Link}
                      to={page.url}
                    >
                      <Typography textAlign="center">
                        {page.name}
                      </Typography>
                    </MenuItem>
                  ))}
                </Menu>
              </Box>
              <Typography
                variant="h6"
                noWrap
                component="div"
                sx={{flexGrow: 1, display: {xs: 'flex', md: 'none'}}}
              >
                Terraform API
              </Typography>
              <Box sx={{flexGrow: 1, display: {xs: 'none', md: 'flex'}}}>
                {pages.map((page) => (
                  <Button
                    component={Link}
                    to={page.url}
                    key={page.name}
                    sx={{my: 2, color: 'white', display: 'block'}}
                  >
                    {page.name}
                  </Button>
                ))}
              </Box>
              <Box sx={{flexGrow: 0}}>
                <Search>
                  <SearchIconWrapper>
                    <SearchIcon />
                  </SearchIconWrapper>
                  <StyledInputBase
                    placeholder="Search by Job ID"
                    inputProps={{'aria-label': 'search'}}
                    onChange={(txt) => {
                      dispatch(changeState(txt.target.value));
                    }}
                  />
                </Search>
              </Box>
            </Toolbar>
          </Container>
        </AppBar>
      </Container>
      <Container maxWidth="lg">
        <Paper>
          <Container
            maxWidth="md"
            disableGutters
            style={{padding: '50px'}}
          >
            <Routes>
              <Route
                path="/"
                element={<JobsPage />}
              />
            </Routes>
          </Container>
        </Paper>
      </Container>
    </React.Fragment>
  );
}
