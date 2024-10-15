import React, { useEffect, useState } from 'react';
import { getUsers, getTasks } from '../common/api';
import { useNavigate } from 'react-router-dom';
import { Button, List, ListItem, ListItemText, FormControl, InputLabel, Select, MenuItem, Container, Typography, Card, CardContent, CardHeader, Box } from '@mui/material';
import { Fade } from '@mui/material';
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

const Dashboard = () => {
  const [users, setUsers] = useState([]);
  const [tasks, setTasks] = useState([]);
  const [selectedUser, setSelectedUser] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await getUsers();
        setUsers(response.data);
      } catch (error) {
        console.error("Error fetching users:", error);
      }
    };

    const fetchTasks = async () => {
      try {
        const response = await getTasks();
        setTasks(response.data);
      } catch (error) {
        console.error("Error fetching tasks:", error);
      }
    };

    fetchUsers();
    fetchTasks();
  }, []);

  const handleChatNavigation = (taskId) => {
    if (!selectedUser) {
      alert('Please select a user.');
      return;
    }
    navigate(`/task-chat/${taskId}`, { state: { userId: selectedUser } });
  };

  const handleAddTask = () => {
    navigate('/task-manager');
  };

  const handleAddUser = () => {
    navigate('/user-manager');
  };

  return (
    <ThemeProvider theme={darkTheme}>
      <Container maxWidth="lg" sx={{ mt: 5 }}>
        <Typography variant="h4" align="center" gutterBottom color='primary'>
          Dashboard
        </Typography>

        {/* Add Task Button */}
        <Box textAlign="center" mb={3}>
          <Button onClick={handleAddTask} variant="contained" color="primary">
            Add Task
          </Button>
        </Box>

        <Box display="flex" justifyContent="space-between" flexWrap="wrap" mb={4} gap={2}>

          {/* Users Card */}
          <Card variant="outlined" sx={{ flex: '1 1 100%', '@media (min-width: 600px)': { flex: '1 1 45%' }, marginBottom: '20px', backgroundColor: darkTheme.palette.background.paper }}>
            <CardHeader title="Users" sx={{ color: darkTheme.palette.text.primary }} />
            <CardContent>
              <Button onClick={handleAddUser} variant="contained" color="primary" sx={{ mb: 3 }}>
                Add User
              </Button>
              <List>
                {users.map((user) => (
                  <ListItem key={user._id}>
                    <ListItemText
                      primary={<strong>{user.name}</strong>}
                      secondary={<small>Email: {user.email}</small>}
                    />
                  </ListItem>
                ))}
              </List>
            </CardContent>
          </Card>

          {/* Tasks List Card */}
          <Card variant="outlined" sx={{ flex: '1 1 100%', '@media (min-width: 600px)': { flex: '1 1 45%' }, backgroundColor: darkTheme.palette.background.paper }}>
            <CardHeader title="Tasks List" sx={{ color: darkTheme.palette.text.primary }} />
            <CardContent>
              <List>
                {tasks.map((task) => (
                  <ListItem key={task._id} sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <Box flex="1">
                      <ListItemText
                        primary={task.title}
                        secondary={`Assigned to: ${task.userIds.map(userId => 
                          users.find(user => user._id === userId._id)?.name).join(', ')}`}
                      />
                    </Box>
                    
                    {/* User Selection */}
                    <FormControl sx={{ minWidth: 120 }}>
                      <InputLabel>User</InputLabel>
                      <Select
                        value={selectedUser}
                        onChange={(e) => setSelectedUser(e.target.value)}
                        label="User"
                      >
                        {users.map((user) => (
                          <MenuItem key={user._id} value={user._id}>
                            {user.name}
                          </MenuItem>
                        ))}
                      </Select>
                    </FormControl>

                    {/* Go to Chat Button with Fade Animation */}
                    <Fade in={true} timeout={500}>
                      <Button
                        variant="contained"
                        color="primary"
                        onClick={() => handleChatNavigation(task._id)}
                        sx={{ marginLeft: '8px' }}
                      >
                        Go to Chat
                      </Button>
                    </Fade>
                  </ListItem>
                ))}
              </List>
            </CardContent>
          </Card>
        </Box>
      </Container>
    </ThemeProvider>
  );
};

export default Dashboard;
