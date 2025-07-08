
import Menu from '@mui/material/Menu';
import Container from '@mui/material/Container';
import Button from '@mui/material/Button';
import MenuItem from '@mui/material/MenuItem';
import streamora_logo from '../../assets/streamora_logo.png';
import {useLocation, useNavigate} from "react-router";
import {useLogin} from "../../useEffect/Login.tsx";
import {Avatar} from '@mui/material';
import {deepOrange} from '@mui/material/colors';
import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';


import MenuIcon from '@mui/icons-material/Menu';

import { useState } from 'react';

import ResearchInput from "../../components/header/ResearchInput.tsx";


const Header = () => {
    console.log("Header mounted");


    const [query, setQuery] = useState<string>("");


    const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
    const open = Boolean(anchorEl);
    const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };
    const {isLoggedIn,logout} = useLogin();
    const navigate = useNavigate();
    const pages = [{name: "Acceuil", navigation: "/"},
        {name: "Films", navigation: "/movies"},
        {name: "Favorite", navigation: "/favorite"},
        {name: "Acteur", navigation: "/pepole"},]

    const location = useLocation();


    const [anchorElNav, setAnchorElNav] = React.useState<null | HTMLElement>(null);


    const handleOpenNavMenu = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorElNav(event.currentTarget);
    };


    const handleCloseNavMenu = () => {
        setAnchorElNav(null);
    };

    const handleQueryChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        event.preventDefault();
        setQuery(event.target.value);
    }

    return (
        <AppBar position="sticky" sx={{background: 'black'}}>
            <Container maxWidth="xl">
                <Toolbar disableGutters>

                    <Box sx={{flexGrow: 1, display: {xs: 'flex', md: 'none'}}}>

                        <IconButton
                            size="large"
                            aria-label="account of current user"
                            aria-controls="menu-appbar"
                            aria-haspopup="true"
                            onClick={handleOpenNavMenu}
                            color="inherit"
                        >
                            <MenuIcon/>
                        </IconButton>
                        <Box sx={{flexGrow: 1, display: 'flex', justifyContent: 'center'}}>
                            <Box
                                component="img"
                                src={streamora_logo}
                                alt="Logo"
                                sx={{height: 50}}
                            />
                        </Box>
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
                            sx={{display: {xs: 'block', md: 'none'}}}
                        >
                            {pages.map((page, index) => (
                                <MenuItem key={index} onClick={() => {
                                    handleCloseNavMenu()
                                    if (page.name === "Favorite") {
                                        if (isLoggedIn) {
                                            navigate(page.navigation);
                                        } else {

                                            navigate("/login");
                                        }
                                    } else {
                                        navigate(page.navigation);
                                    }
                                }}>
                                    <Typography sx={{textAlign: 'center'}} key={index}>{page.name}</Typography>
                                </MenuItem>
                            ))}
                        </Menu>
                    </Box>


                    <Box sx={{flexGrow: 1, display: {xs: 'none', md: 'flex'}, alignItems: 'center'}}>

                        <Box
                            component="img"
                            src={streamora_logo}
                            alt="Logo"
                            sx={{my: 2, height: 40}}
                        />
                        <Box sx={{flexGrow: 1, display: 'flex', justifyContent: 'center'}}>
                            {pages.map((page, index) => {
                                const isActive = location.pathname === page.navigation;

                                return (
                                    <Button
                                        key={index}
                                        onClick={() => {
                                            if (page.name === "Favorite") {
                                                if (isLoggedIn) {
                                                    navigate(page.navigation);
                                                } else {

                                                    navigate("/login");
                                                }
                                            } else {
                                                navigate(page.navigation);
                                            }
                                        }}
                                        sx={{
                                            my: 2, display: 'block',
                                            color: isActive ? 'red' : 'white',
                                        }}
                                    >
                                        {page.name}
                                    </Button>
                                );
                            })}
                        </Box>
                        <ResearchInput></ResearchInput>
                        <Box>
                            {!isLoggedIn ? (
                                    <>
                                        <Button variant="outlined" onClick={() => navigate('/login')}>sign in</Button>
                                        <Button variant="outlined" onClick={() => navigate('/register')}>register</Button>
                                    </>
                                )
                                : (

                                    <div>
                                        <Avatar sx={{bgcolor: deepOrange[500]}} id="basic-button"
                                                aria-controls={open ? 'basic-menu' : undefined}
                                                aria-haspopup="true"
                                                aria-expanded={open ? 'true' : undefined}
                                                onClick={handleClick}>N</Avatar>
                                        <Menu
                                            id="basic-menu"
                                            anchorEl={anchorEl}
                                            open={open}
                                            onClose={handleClose}
                                            slotProps={{
                                                list: {
                                                    'aria-labelledby': 'basic-button',
                                                },
                                            }}
                                        >
                                            <MenuItem onClick={handleClose}>Profile</MenuItem>
                                            <MenuItem onClick={
                                                handleClose}>My account</MenuItem>
                                            <MenuItem onClick={async () => {
                                                await logout()
                                                handleClose
                                            }}>Logout</MenuItem>
                                        </Menu>
                                    </div>)
                            }

                        </Box>
                    </Box>


                </Toolbar>
            </Container>
        </AppBar>
    );
};

export default Header;
