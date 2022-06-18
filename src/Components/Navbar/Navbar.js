
import React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import Container from '@mui/material/Container';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import Tooltip from '@mui/material/Tooltip';
import MenuItem from '@mui/material/MenuItem';
import AdbIcon from '@mui/icons-material/Adb';
import { Link } from "react-router-dom"
import { signOut } from 'firebase/auth';
import auth from '../../firebase.init';
import swal from "sweetalert"
import { useAuthState } from 'react-firebase-hooks/auth';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';



const Navbar = () => {
    const [anchorElNav, setAnchorElNav] = React.useState(null);

    const [user] = useAuthState(auth)
    const handleOpenNavMenu = (event) => {
        setAnchorElNav(event.currentTarget);
    };


    const handleCloseNavMenu = () => {
        setAnchorElNav(null);
    };


    return (
        <AppBar position="sticky">
            <Container maxWidth="xl">
                <Toolbar disableGutters>
                    <Typography
                        variant="h6"
                        noWrap
                        component="a"
                        href="/"
                        sx={{
                            mr: 2,
                            display: { xs: 'none', md: 'flex' },
                            fontFamily: 'monospace',
                            fontWeight: 700,
                            letterSpacing: '.3rem',
                            color: 'inherit',
                            textDecoration: 'none',
                        }}
                    >
                        EUBRICS
                    </Typography>

                    <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
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
                                display: { xs: 'block', md: 'none' },
                            }}
                        >
                            {


                                !user ? <div >

                                    <MenuItem onClick={handleCloseNavMenu}>
                                        <Typography textAlign="center">
                                            <Link style={{ color: "black", textDecoration: "none" }} to="/login">
                                                SIGN IN
                                            </Link>
                                        </Typography>

                                    </MenuItem>
                                    <MenuItem onClick={handleCloseNavMenu}>
                                        <Typography textAlign="center">
                                            <Link style={{ color: "black", textDecoration: "none" }} to="/register">
                                                SIGN UP
                                            </Link>
                                        </Typography>

                                    </MenuItem>
                                </div> : <div>

                                    <MenuItem onClick={handleCloseNavMenu}>
                                        <Typography textAlign="center">
                                            <Link style={{ color: "black", textDecoration: "none" }} to="/behaviors">
                                               Behaviors
                                            </Link>
                                        </Typography>

                                    </MenuItem>
                                    <MenuItem onClick={async () => {
                                        handleCloseNavMenu()
                                        await signOut(auth)
                                        swal("SUCCESS", "Sign out successful", "success")
                                    }
                                    }>
                                        <Typography textAlign="center">
                                            <Link style={{ color: "black", textDecoration: "none" }} to="/countries">
                                                SIGN OUT
                                            </Link>
                                        </Typography>

                                    </MenuItem>
                                </div>
                            }



                        </Menu>
                    </Box>
                    <Typography
                        variant="h5"
                        noWrap
                        component="a"
                        href=""
                        sx={{
                            mr: 2,
                            display: { xs: 'flex', md: 'none' },
                            flexGrow: 1,
                            fontFamily: 'monospace',
                            fontWeight: 700,
                            letterSpacing: '.3rem',
                            color: 'inherit',
                            textDecoration: 'none',
                        }}
                    >
                        EUBRICS
                    </Typography>
                    <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
                        {
                            !user ? <div style={{display:"flex"}}>
                                <Button

                                    onClick={handleCloseNavMenu}
                                    sx={{ my: 2, color: 'white', display: 'block' }}
                                >
                                    <Link style={{ color: "white", textDecoration: "none" }} to="/login">
                                        SIGN IN
                                    </Link>
                                </Button>
                                <Button

                                    onClick={handleCloseNavMenu}
                                    sx={{ my: 2, color: 'white', display: 'block' }}
                                >
                                    <Link style={{ color: "white", textDecoration: "none" }} to="/register">
                                        REGISTER
                                    </Link>
                                </Button>

                            </div> : <div style={{display:"flex"}}>
                                <Button

                                    onClick={() => {
                                        signOut(auth)
                                        swal("Success", "LOG OUT SUCCESS", "success")
                                    }

                                    }
                                    sx={{ my: 2, color: 'white', display: 'block' }}
                                >
                                    SIGN OUT
                                </Button>
                                <Button

                                    sx={{ my: 2, color: 'white', display: 'block' }}
                                >
                                    <Link to="/behaviors" style={{ color: "white", textDecoration: "none" }}>
                                        Behaviors
                                    </Link>
                                </Button>
                            </div>
                        }

                    </Box>

                    <Box sx={{ flexGrow: 0 }}>
                        <Tooltip title="Your photo">
                            <IconButton sx={{ p: 0 }}>
                                {
                                    user?.photoURL ? <Avatar alt="user name" src={user.photoURL} /> :
                                        <Avatar>
                                            <AccountCircleIcon />
                                        </Avatar>
                                }
                            </IconButton>
                        </Tooltip>

                    </Box>
                </Toolbar>
            </Container>
        </AppBar>
    );
};

export default Navbar;