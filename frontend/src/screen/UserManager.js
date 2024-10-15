import React, { useState, useEffect } from 'react';
import { 
    Container, 
    Typography, 
    TextField, 
    Button, 
    List, 
    ListItem, 
    ListItemText, 
    Paper, 
    Slide, 
    Divider, 
    Box, 
    Snackbar,
    Alert,
    AppBar,
    Toolbar,
    CssBaseline,
    Grid
} from '@mui/material';
import { Add as AddIcon } from '@mui/icons-material';
import axios from 'axios';
import { createTheme, ThemeProvider } from '@mui/material/styles';

// Create dark theme
const darkTheme = createTheme({
    palette: {
        mode: 'dark',
        primary: {
            main: '#90caf9',
        },
        background: {
            default: '#121212',
            paper: '#1d1d1d',
        },
        text: {
            primary: '#ffffff',
            secondary: '#90caf9',
        },
    },
});

const UserManager = () => {
    const [users, setUsers] = useState([]);
    const [newUserName, setNewUserName] = useState('');
    const [newUserEmail, setNewUserEmail] = useState('');
    const [newUserPassword, setNewUserPassword] = useState('');
    const [snackbarOpen, setSnackbarOpen] = useState(false);
    const [snackbarMessage, setSnackbarMessage] = useState('');
    const [snackbarSeverity, setSnackbarSeverity] = useState('success');

    // Fetch users
    const fetchUsers = async () => {
        try {
            const response = await axios.get('http://localhost:7890/api/users');
            setUsers(response.data);
        } catch (error) {
            console.error('Error fetching users:', error);
        }
    };

    useEffect(() => {
        fetchUsers();
    }, []);

    const handleAddUser = async () => {
        if (newUserName.trim() && newUserEmail.trim() && newUserPassword.trim()) {
            const newUser = { name: newUserName, email: newUserEmail, password: newUserPassword };
            try {
                const response = await axios.post('https://team-collobration-hub.onrender.com/api/users/register', newUser);
                setUsers((prevUsers) => [...prevUsers, response.data]);
                setNewUserName('');
                setNewUserEmail('');
                setNewUserPassword('');

                setSnackbarMessage('User created successfully!');
                setSnackbarSeverity('success');
                setSnackbarOpen(true);
            } catch (error) {
                console.error('Error creating user:', error);
                setSnackbarMessage('Error creating user. Please try again.');
                setSnackbarSeverity('error');
                setSnackbarOpen(true);
            }
        } else {
            setSnackbarMessage('Please fill all fields.');
            setSnackbarSeverity('warning');
            setSnackbarOpen(true);
        }
    };

    const handleCloseSnackbar = () => {
        setSnackbarOpen(false);
    };

    return (
        <ThemeProvider theme={darkTheme}>
            <CssBaseline />
            <Container component="main" maxWidth="sm" sx={{ marginTop: '2rem' }}>
                {/* AppBar */}
                <AppBar position="static" sx={{ backgroundColor: darkTheme.palette.primary.main }}>
                    <Toolbar>
                        <Typography variant="h6" color="inherit">
                            User Management
                        </Typography>
                    </Toolbar>
                </AppBar>

                {/* User Creation Form */}
                <Paper elevation={3} sx={{ marginTop: '1rem', padding: '2rem', backgroundColor: darkTheme.palette.background.paper }}>
                    <Typography variant="h6" gutterBottom sx={{ color: darkTheme.palette.text.primary }}>
                        Create New User
                    </Typography>
                    <Box sx={{ display: 'flex', flexDirection: 'column', marginBottom: '16px' }}>
                        <TextField
                            label="Name"
                            value={newUserName}
                            onChange={(e) => setNewUserName(e.target.value)}
                            variant="outlined"
                            fullWidth
                            sx={{ marginBottom: '8px', '& .MuiOutlinedInput-root': { borderColor: darkTheme.palette.primary.main }}}
                        />
                        <TextField
                            label="Email"
                            value={newUserEmail}
                            onChange={(e) => setNewUserEmail(e.target.value)}
                            variant="outlined"
                            fullWidth
                            sx={{ marginBottom: '8px', '& .MuiOutlinedInput-root': { borderColor: darkTheme.palette.primary.main }}}
                        />
                        <TextField
                            label="Password"
                            type="password"
                            value={newUserPassword}
                            onChange={(e) => setNewUserPassword(e.target.value)}
                            variant="outlined"
                            fullWidth
                            sx={{ marginBottom: '8px', '& .MuiOutlinedInput-root': { borderColor: darkTheme.palette.primary.main }}}
                        />
                        <Button 
                            variant="contained" 
                            color="primary" 
                            onClick={handleAddUser} 
                            startIcon={<AddIcon />}
                            sx={{ marginTop: '16px', backgroundColor: darkTheme.palette.primary.main, '&:hover': { backgroundColor: darkTheme.palette.primary.dark } }}
                        >
                            Add User
                        </Button>
                    </Box>
                </Paper>

                {/* User List */}
                <Typography variant="h6" gutterBottom sx={{ color: darkTheme.palette.text.primary, marginTop: '16px' }}>
                    User List
                </Typography>
                <Paper elevation={3} sx={{ maxHeight: '400px', overflowY: 'auto', padding: '1rem', backgroundColor: darkTheme.palette.background.paper }}>
                    <List>
                        {users.map((user) => (
                            <Slide direction="up" in key={user._id} mountOnEnter unmountOnExit>
                                <ListItem>
                                    <ListItemText 
                                        primary={user.name} 
                                        secondary={user.email} 
                                        primaryTypographyProps={{ fontWeight: 'bold', color: darkTheme.palette.primary.main }}
                                    />
                                    <Divider sx={{ backgroundColor: darkTheme.palette.primary.main }} />
                                </ListItem>
                            </Slide>
                        ))}
                    </List>
                </Paper>

                {/* Snackbar for notifications */}
                <Snackbar 
                    open={snackbarOpen} 
                    autoHideDuration={6000} 
                    onClose={handleCloseSnackbar}
                    anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
                >
                    <Alert onClose={handleCloseSnackbar} severity={snackbarSeverity}>
                        {snackbarMessage}
                    </Alert>
                </Snackbar>
            </Container>
        </ThemeProvider>
    );
};

export default UserManager;
