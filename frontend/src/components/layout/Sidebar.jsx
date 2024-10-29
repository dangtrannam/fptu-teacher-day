import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Drawer, IconButton, List, ListItem, ListItemIcon, ListItemText, Box, Button } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import DashboardIcon from '@mui/icons-material/Dashboard';
import PeopleIcon from '@mui/icons-material/People';
import LogoutIcon from '@mui/icons-material/Logout';
import { logout } from '../../service/auth.service';
import { ADMIN_WISHES_PATH, ADMIN_TRACKINGS_PATH } from '../../constants/routerPaths';

const SideBar = ({ onToggle }) => {
    const [isOpen, setIsOpen] = useState(true);
    const navigate = useNavigate();

    const toggleSidebar = () => {
        setIsOpen(!isOpen);
    };

    const handleLogout = () => {
        logout()
        navigate('/login');
    };

    useEffect(() => {
        onToggle(isOpen);
    }, [isOpen, onToggle]);

    return (
        <>
            <IconButton
                onClick={toggleSidebar}
                sx={{
                    position: 'fixed',
                    top: 8,
                    left: 8,
                    zIndex: 1300,
                }}
                color="warning"
            >
                <MenuIcon fontSize="large" />
            </IconButton>
            <Drawer
                anchor="left"
                open={isOpen}
                onClose={toggleSidebar}
                variant="persistent"
                sx={{
                    '& .MuiDrawer-paper': {
                        width: 240,
                        backgroundColor: '#3c3d3c',
                        color: '#ffffff',
                    },
                }}
            >
                <Box display="flex" flexDirection="column" height="100%" p={2}>
                    <Box display="flex" flexDirection="column" alignItems="center" mb={2}>
                        <Box
                            component="img"
                            alt="Profile"
                            src="https://fpt.edu.vn/Content/images/assets/Logo-FU-03.png"
                            sx={{ width: 100, height: 48, mb: 1 }} // Adjusted width and height to fit sidebar
                        />
                    </Box>
                    <List>
                        <ListItem
                            button={true}
                            component={Link}
                            to={ADMIN_WISHES_PATH}
                            sx={{
                                backgroundColor: location.pathname === ADMIN_WISHES_PATH ? '#374151' : 'transparent',
                                color: location.pathname === ADMIN_WISHES_PATH ? '#f27024' : '#ffffff',
                                '&:hover': {
                                    backgroundColor: '#9ca3af',
                                    color: '#f27024',
                                },
                            }}
                        >
                            <ListItemIcon>
                                <PeopleIcon sx={{ color: location.pathname === '/admin/users-management/' ? '#f27024' : '#9ca3af' }} />
                            </ListItemIcon>
                            <ListItemText primary="Lời chúc" />
                        </ListItem>
                        <ListItem
                            button={true}
                            component={Link}
                            to={ADMIN_TRACKINGS_PATH}
                            sx={{
                                backgroundColor: location.pathname === ADMIN_TRACKINGS_PATH ? '#374151' : 'transparent',
                                color: location.pathname === ADMIN_TRACKINGS_PATH ? '#f27024' : '#ffffff',
                                '&:hover': {
                                    backgroundColor: '#9ca3af',
                                    color: '#f27024',
                                },
                            }}
                        >
                            <ListItemIcon>
                                <DashboardIcon sx={{ color: location.pathname === ADMIN_TRACKINGS_PATH ? '#f27024' : '#9ca3af' }} />
                            </ListItemIcon>
                            <ListItemText primary="Trackings" />
                        </ListItem>
                    </List>
                    <Box mt="auto">
                        <Button
                            onClick={handleLogout}
                            startIcon={<LogoutIcon />}
                            fullWidth={true}
                            sx={{
                                color: '#9ca3af',
                                justifyContent: 'flex-start',
                                '&:hover': {
                                    backgroundColor: '#374151',
                                },
                            }}
                        >
                            Logout
                        </Button>
                    </Box>
                </Box>
            </Drawer>
        </>
    );
};

export default SideBar;
