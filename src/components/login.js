import React, { useState } from 'react';
import { Container, Typography, TextField, Button, Grid } from '@mui/material';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';


const Login = () => {

  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const [error, setError] = useState('');

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {

      
      const res = await axios.post('http://localhost:5000/api/auth/login', formData);

      console.log(res)
      localStorage.setItem('token', res.data.token);
      navigate('/add-product'); // Redirect to add product page
    } catch (err) {
      console.log(err)
      setError(err.response.data.errors[0].msg);
    }
  };

  return (
    <Container maxWidth="xs">
      <Typography variant="h4" align="center" gutterBottom>
        Login
      </Typography>
      <form onSubmit={handleSubmit}>
        <TextField
          fullWidth
          label="Email"
          name="email"
          type="email"
          value={formData.email}
          onChange={handleChange}
          margin="normal"
          required
        />
        <TextField
          fullWidth
          label="Password"
          name="password"
          type="password"
          value={formData.password}
          onChange={handleChange}
          margin="normal"
          required
        />
        {error && <Typography color="error" variant="body2" gutterBottom>{error}</Typography>}
        <Grid container justifyContent="center" spacing={2}>
          <Grid item>
            <Button variant="contained" color="primary" type="submit">
              Login
            </Button>
          </Grid>
        </Grid>
      </form>
    </Container>
  );
};

export default Login;
