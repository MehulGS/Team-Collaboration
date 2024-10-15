import React, { useState } from 'react';
import { TextField, Button, Container, Typography, Paper, Grid, Box } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import axios from 'axios';

const Register = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleRegister = async () => {
    try {
      await axios.post("http://localhost:5000/api/users/register", { name, email, password });
      navigate('/');
    } catch (error) {
      console.error('Registration failed', error);
    }
  };

  return (
    <Box sx={{ backgroundColor: 'black', minHeight: '100vh', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
      <Container maxWidth="sm">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <Paper elevation={6} sx={{ padding: '40px', borderRadius: '10px', backgroundColor: '#1e1e1e', color: '#fff' }}>
            <Typography variant="h4" align="center" gutterBottom sx={{ color: '#fff' }}>
              Create an Account
            </Typography>
            <Typography variant="body1" align="center" color="textprimary" gutterBottom>
              Join us today by filling out the form below.
            </Typography>
            <Grid container spacing={3} marginTop={2}>
              <Grid item xs={12}>
                <TextField
                  label="Name"
                  variant="outlined"
                  fullWidth
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  InputLabelProps={{ style: { color: '#fff' } }}
                  sx={{ input: { color: 'white' } }}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  label="Email"
                  variant="outlined"
                  fullWidth
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  InputLabelProps={{ style: { color: '#fff' } }}
                  sx={{ input: { color: 'white' } }}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  label="Password"
                  variant="outlined"
                  fullWidth
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  InputLabelProps={{ style: { color: '#fff' } }}
                  sx={{ input: { color: 'white' } }}
                />
              </Grid>
              <Grid item xs={12}>
                <motion.div whileHover={{ scale: 1.05 }}>
                  <Button
                    onClick={handleRegister}
                    variant="contained"
                    color="primary"
                    fullWidth
                    sx={{ padding: '10px', fontSize: '16px' }}
                  >
                    Register
                  </Button>
                </motion.div>
              </Grid>
            </Grid>
          </Paper>
        </motion.div>
      </Container>
    </Box>
  );
};

export default Register;
