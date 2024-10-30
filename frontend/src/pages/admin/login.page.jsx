import { useState } from 'react';
import {
    Box,
    Paper,
    Typography,
    TextField,
    Button,
    IconButton,
} from '@mui/material';
import Grid from '@mui/material/Grid';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import { login } from '../../service/auth.service';
import { useNavigate } from 'react-router-dom';
import { ADMIN_WISHES_PATH } from '../../constants/routerPaths';

// Import the login function from the login file

const LoginPage = () => {
    const navigate = useNavigate()

    const [showPassword, setShowPassword] = useState(false);
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    const togglePasswordVisibility = () => {
        setShowPassword((prevShowPassword) => !prevShowPassword);
    };

    const handleLogin = async () => {
        setError('');
        try {
            await login(username, password).then(() => {
                navigate(ADMIN_WISHES_PATH)
            });
        } catch (error) {
            setError(error.response?.data?.message || 'Login failed. Please try again.');
        }
    };

    return (
        <Box
            minHeight="100vh"
            display="flex"
            alignItems="center"
            justifyContent="center"
            py="6vh"
            px="4vw"
            fontFamily="sans-serif"
        >
            <Grid container spacing={4} maxWidth="90%" alignItems="center" justifyContent="space-between">
                {/* Image Section */}
                <Grid item xs={12} md={6} display="flex" justifyContent="center" alignItems="center">
                    <Box
                        component="img"
                        src="https://upload.wikimedia.org/wikipedia/vi/2/2d/Logo_Tr%C6%B0%E1%BB%9Dng_%C4%90%E1%BA%A1i_h%E1%BB%8Dc_FPT.svg"
                        alt="University Logo"
                        sx={{
                            width: { xs: '60%', md: '80%' },
                            height: { xs: '40vh', md: '35vh' },
                            objectFit: 'contain',
                            borderRadius: 2,
                            maxWidth: '80%',
                        }}
                    />
                </Grid>
                <Grid item xs={12} md={5}>
                    <Paper
                        elevation={4}
                        sx={{
                            border: '1px solid',
                            borderColor: 'grey.300',
                            padding: '5%',
                            borderRadius: 2,
                            boxShadow: '0px 2px 22px -4px rgba(93,96,127,0.2)',
                            maxWidth: '100%',
                            mx: 'auto',
                        }}
                    >
                        <form onSubmit={(e) => { e.preventDefault(); handleLogin(); }}>
                            <Box mb={4}>
                                <Typography variant="h3" color="text.primary" fontWeight="bold">
                                    Đăng Nhập
                                </Typography>
                                <Typography variant="body1" color="text.secondary" mt={2}>
                                    Đăng nhập để tiếp tục sử dụng hệ thống
                                </Typography>
                            </Box>

                            {/* Username Field */}
                            <Box mb={3}>
                                <Typography variant="body1" color="text.primary" mb={1}>
                                    User name
                                </Typography>
                                <Box position="relative">
                                    <TextField
                                        name="username"
                                        variant="outlined"
                                        placeholder="Enter user name"
                                        required
                                        fullWidth
                                        value={username}
                                        onChange={(e) => setUsername(e.target.value)}
                                        InputProps={{
                                            endAdornment: <AccountCircleIcon sx={{ color: 'grey.500' }} />,
                                        }}
                                    />
                                </Box>
                            </Box>

                            {/* Password Field */}
                            <Box mb={3}>
                                <Typography variant="body1" color="text.primary" mb={1}>
                                    Password
                                </Typography>
                                <Box position="relative">
                                    <TextField
                                        name="password"
                                        type={showPassword ? 'text' : 'password'}
                                        variant="outlined"
                                        placeholder="Enter password"
                                        required
                                        fullWidth
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                        InputProps={{
                                            endAdornment: (
                                                <IconButton
                                                    onClick={togglePasswordVisibility}
                                                    edge="end"
                                                    sx={{ color: 'grey.500' }}
                                                >
                                                    {showPassword ? <VisibilityOffIcon /> : <VisibilityIcon />}
                                                </IconButton>
                                            ),
                                        }}
                                    />
                                </Box>
                            </Box>

                            {/* Error Message */}
                            {error && (
                                <Box mb={3}>
                                    <Typography variant="body2" color="error">
                                        {error}
                                    </Typography>
                                </Box>
                            )}

                            <Button
                                variant="contained"
                                fullWidth={true}
                                sx={{ py: '1.5vh', mt: 2, textTransform: 'none', boxShadow: 4, background: '#f27024' }}
                                onClick={handleLogin}
                            >
                                Đăng Nhập
                            </Button>
                        </form>
                    </Paper>
                </Grid>


            </Grid>
        </Box>
    );
}

export default LoginPage;
