import React, { useState, useEffect } from 'react';
import { 
    Container, 
    Typography, 
    TextField, 
    Button, 
    List, 
    ListItem, 
    ListItemText, 
    Select, 
    MenuItem, 
    FormControl, 
    InputLabel, 
    Card, 
    CardContent, 
    CardHeader, 
    Fade, 
    Box 
} from '@mui/material';
import { createTask, getTasks, getUsers } from '../common/api';
import { Link } from 'react-router-dom';
import { createTheme, ThemeProvider } from '@mui/material/styles';

// Create a dark theme
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

const TaskManager = () => {
    const [title, setTitle] = useState('');
    const [userIds, setUserIds] = useState([]);
    const [tasks, setTasks] = useState([]);
    const [users, setUsers] = useState([]);

    const fetchUsers = async () => {
        try {
            const result = await getUsers();
            if (result) {
                setUsers(result.data);
            }
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        fetchUsers();
    }, []);

    const fetchTasks = async () => {
        const response = await getTasks();
        setTasks(response.data);
    };

    useEffect(() => {
        fetchTasks();
    }, []);

    const handleCreateTask = async () => {
        if (!title || userIds.length === 0) return;
        const newTask = { title, userIds };
        await createTask(newTask);
        setTitle('');
        setUserIds([]);
        fetchTasks();
    };

    const handleUserChange = (event) => {
        setUserIds(event.target.value);
    };

    return (
        <ThemeProvider theme={darkTheme}>
            <Container maxWidth="md" sx={{ mt: 5 }}>
                <Typography variant="h4" gutterBottom align="center" sx={{ color: darkTheme.palette.text.primary }}>
                    Task Manager
                </Typography>
                <Typography variant="h6" gutterBottom align="center" sx={{ color: darkTheme.palette.text.secondary }}>
                    <Link to="/dashboard" style={{ textDecoration: 'none', color: darkTheme.palette.primary.main }}>
                        Back To Dashboard
                    </Link>
                </Typography>

                {/* Create Task Card */}
                <Card variant="outlined" sx={{ marginBottom: '20px', backgroundColor: darkTheme.palette.background.paper }}>
                    <CardHeader 
                        title="Create New Task" 
                        sx={{ backgroundColor: darkTheme.palette.primary.main, color: 'white' }}
                    />
                    <CardContent>
                        <TextField
                            label="Task Title"
                            variant="outlined"
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                            fullWidth
                            margin="normal"
                            sx={{ '& .MuiOutlinedInput-root': { borderColor: darkTheme.palette.primary.main }}}
                        />

                        <FormControl fullWidth margin="normal">
                            <InputLabel>Users</InputLabel>
                            <Select
                                multiple
                                value={userIds}
                                onChange={handleUserChange}
                                label="Users"
                                renderValue={(selected) =>
                                    selected
                                        .map((userId) => users.find((user) => user._id === userId)?.name)
                                        .join(', ')
                                }
                                sx={{
                                    '& .MuiOutlinedInput-root': { borderColor: darkTheme.palette.primary.main },
                                    '&:hover .MuiOutlinedInput-root': { borderColor: darkTheme.palette.primary.dark },
                                }}
                            >
                                {users.map((user) => (
                                    <MenuItem key={user._id} value={user._id}>
                                        {user.name}
                                    </MenuItem>
                                ))}
                            </Select>
                        </FormControl>

                        <Button 
                            variant="contained" 
                            color="primary" 
                            onClick={handleCreateTask} 
                            sx={{ mt: 2, backgroundColor: darkTheme.palette.primary.main, '&:hover': { backgroundColor: darkTheme.palette.primary.dark }}}
                        >
                            Create Task
                        </Button>
                    </CardContent>
                </Card>

                {/* Task List */}
                <Typography variant="h5" gutterBottom align="center" style={{ marginTop: '20px', color: darkTheme.palette.text.primary }}>
                    Task List
                </Typography>

                <Fade in={tasks.length > 0} timeout={500}>
                    <List sx={{ animation: 'fade-in 1s' }}>
                        {tasks.map((task) => (
                            <ListItem key={task._id} sx={{ transition: 'background-color 0.3s', '&:hover': { backgroundColor: '#2b2b2b' } }}>
                                <ListItemText
                                    primary={task.title}
                                    secondary={`Assigned to: ${task.userIds.map((userId) =>
                                        users.find((user) => user._id === userId._id)?.name).join(', ')}`}
                                    sx={{ color: darkTheme.palette.text.primary }}
                                />
                            </ListItem>
                        ))}
                    </List>
                </Fade>
            </Container>
        </ThemeProvider>
    );
};

export default TaskManager;
