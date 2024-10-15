import React, { useState } from 'react';
import { TextField, Button, Container, Typography, Paper, Grid, Link, CircularProgress, Box } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const Login = ({ onLoginSuccess }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleLogin = async () => {
    setLoading(true);
    setError('');

    if (!email || !password) {
      setError('Please enter both email and password.');
      setLoading(false);
      return;
    }

    try {
      const response = await axios.post("http://localhost:5000/api/users/login", { email, password });
      onLoginSuccess(response.data);
      localStorage.setItem('token', response.data.token);
      navigate('/dashboard');
    } catch (error) {
      setError('Invalid email or password. Please try again.');
      setLoading(false);
    }
  };

  const handleRegisterRedirect = () => {
    navigate('/register'); // Navigate to registration page
  };

  return (
    <Box sx={{ backgroundColor: 'black', minHeight: '100vh', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
      <Container maxWidth="sm">
        <Paper elevation={3} sx={{ padding: '30px', borderRadius: '10px', backgroundColor: '#1e1e1e', color: '#fff' }}>
          <Typography variant="h4" align="center" gutterBottom sx={{ color: '#fff' }}>
            Welcome Back!
          </Typography>
          <Typography variant="body1" align="center" color="textprimary" gutterBottom>
            Please login to your account to continue.
          </Typography>

          {error && (
            <Typography variant="body2" color="error" align="center" gutterBottom>
              {error}
            </Typography>
          )}

          <Grid container spacing={2} marginTop={2}>
            <Grid item xs={12}>
              <TextField
                label="Email"
                variant="outlined"
                fullWidth
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                error={Boolean(error && !email)}
                helperText={!email && error ? "Email is required" : ""}
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
                error={Boolean(error && !password)}
                helperText={!password && error ? "Password is required" : ""}
                InputLabelProps={{ style: { color: '#fff' } }}
                sx={{ input: { color: 'white' } }}
              />
            </Grid>
            <Grid item xs={12}>
              <Button
                onClick={handleLogin}
                variant="contained"
                color="primary"
                fullWidth
                sx={{ padding: '10px' }}
                disabled={loading}
              >
                {loading ? <CircularProgress size={24} color="inherit" /> : 'Login'}
              </Button>
            </Grid>
            <Grid item xs={12} textAlign="center">
              <Typography variant="body2" sx={{ color: '#fff' }}>
                Don't have an account?{' '}
                <Link component="button" onClick={handleRegisterRedirect} sx={{ color: '#1976d2' }}>
                  Create an account
                </Link>
              </Typography>
            </Grid>
          </Grid>
        </Paper>
      </Container>
    </Box>
  );
};

export default Login;
