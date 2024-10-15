import React, { useEffect, useState } from 'react';
import { useParams, useLocation } from 'react-router-dom';
import {
    Container,
    Typography,
    TextField,
    Button,
    Paper,
    List,
    ListItem,
    ListItemText,
    Divider,
    Avatar,
    Box,
    Slide,
    Grid
} from '@mui/material';
import io from 'socket.io-client';
import axios from 'axios';

const socket = io('http://localhost:5000');

const TaskChatRoom = () => {
    const { taskId } = useParams();
    const location = useLocation();
    const userId = location.state?.userId;

    const [messages, setMessages] = useState([]);
    const [message, setMessage] = useState('');
    const [users, setUsers] = useState([]);
    const [isSending, setIsSending] = useState(false);

    useEffect(() => {
        const fetchMessages = async () => {
            const response = await axios.get(`http://localhost:5000/api/message/${taskId}`);
            setMessages(response.data);
        };

        const fetchTaskUsers = async () => {
            const response = await axios.get(`http://localhost:5000/api/tasks/${taskId}/users`);
            setUsers(response.data);
        };

        fetchMessages();
        fetchTaskUsers();
    }, [taskId]);

    const sendMessage = async () => {
        if (message.trim() && !isSending) {
            const newMessage = {
                taskId,
                userId,
                content: message,
                timestamp: new Date().toISOString(),
            };

            setIsSending(true);
            socket.emit('taskMessage', newMessage);
            setMessages((prevMessages) => [...prevMessages, newMessage]);

            try {
                await axios.post('https://team-collobration-hub.onrender.com/api/message', newMessage);
                setMessage('');
            } catch (error) {
                console.error('Error saving message to server', error);
            } finally {
                setIsSending(false);
            }
        }
    };

    useEffect(() => {
        socket.emit('joinTaskRoom', { taskId });

        const handleMessage = (newMessage) => {
            setMessages((prevMessages) => [...prevMessages, newMessage]);
        };

        socket.on('message', handleMessage);

        return () => {
            socket.off('message', handleMessage);
        };
    }, [taskId]);

    return (
        <Container maxWidth="lg" sx={{ mt: 5 }}>
            <Typography variant="h4" gutterBottom align="center" sx={{ color: '#1976d2', fontSize: { xs: '1.5rem', md: '2.5rem' } }}>
                Task Chat Room
            </Typography>

            {/* Users Section */}
            <Paper elevation={3} sx={{ backgroundColor: '#f5f5f5', p: 3, mb: 4 }}>
                <Typography variant="h6" gutterBottom sx={{ fontSize: { xs: '1rem', md: '1.25rem' } }}>
                    Users Assigned to Task
                </Typography>
                <List>
                    <Grid container spacing={2}>
                        {users.map((user) => (
                            <Grid item xs={12} sm={6} md={4} key={user._id}>
                                <ListItem>
                                    <Avatar sx={{ mr: 2 }} />
                                    <ListItemText primary={user.name} />
                                </ListItem>
                            </Grid>
                        ))}
                    </Grid>
                </List>
            </Paper>

            {/* Chat Messages Section */}
            <Paper
                elevation={3}
                sx={{
                    maxHeight: { xs: '300px', md: '400px' },
                    overflowY: 'auto',
                    backgroundColor: '#e3f2fd',
                    p: 3,
                    mb: 4
                }}
            >
                <Typography variant="h6" gutterBottom sx={{ fontSize: { xs: '1rem', md: '1.25rem' } }}>
                    Messages
                </Typography>
                <List>
                    {messages.map((msg, index) => (
                        <Slide direction="up" in key={index} mountOnEnter unmountOnExit>
                            <ListItem>
                                <ListItemText
                                    primary={msg.content}
                                    secondary={`${msg.userId?.name || 'Unknown'} - ${msg.timestamp ? new Date(msg.timestamp).toLocaleTimeString() : 'No time'}`}
                                />
                                <Divider />
                            </ListItem>
                        </Slide>
                    ))}
                </List>
            </Paper>

            {/* Message Input */}
            <Box sx={{ display: 'flex', flexDirection: { xs: 'column', md: 'row' }, alignItems: 'center', mt: 3 }}>
            <TextField
    label="Type your message"
    value={message}
    onChange={(e) => setMessage(e.target.value)}
    fullWidth
    variant="outlined"
    sx={{
        '& .MuiOutlinedInput-root': {
            '& fieldset': {
                borderColor: '#ffffff', // Default border color
            },
            '&:hover fieldset': {
                borderColor: '#1976d2', // Border color on hover
            },
            '&.Mui-focused fieldset': {
                borderColor: '#1976d2', // Border color when focused
            },
        },
        mb: { xs: 2, md: 0 },
    }}
/>

                <Button
                    onClick={sendMessage}
                    variant="contained"
                    color="primary"
                    sx={{
                        ml: { xs: 0, md: 2 },
                        mt: { xs: 2, md: 0 },
                        backgroundColor: '#1976d2',
                        '&:hover': { backgroundColor: '#115293' }
                    }}
                >
                    Send
                </Button>
            </Box>
        </Container>
    );
};

export default TaskChatRoom;
