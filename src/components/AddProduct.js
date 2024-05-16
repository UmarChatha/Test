import React, { useState, useEffect } from 'react';
import { Container, Typography, TextField, Button, Grid, Card, CardMedia } from '@mui/material';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

import { toast } from 'react-toastify';

const AddProduct = () => {
  const [formData, setFormData] = useState({
    name: '',
    price: '',
    quantity: '',
    pictures: []
  });
  const [error, setError] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    if (!localStorage.getItem('token')) {
      navigate('/');
    }
  }, []);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleFileChange = (e) => {
    const files = Array.from(e.target.files);
    console.log(files.length);
    setFormData({ ...formData, pictures: files });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const token = localStorage.getItem('token');

    try {
      const config = {
        headers: {
          'Content-Type': 'multipart/form-data',
          'x-auth-token': token
        }
      };

      const formDataObj = new FormData();
      formDataObj.append('name', formData.name);
      formDataObj.append('price', formData.price);
      formDataObj.append('quantity', formData.quantity);
      formData.pictures.forEach(file => formDataObj.append('pictures', file));

      await axios.post('http://localhost:5000/api/products', formDataObj, config);
      toast.success('Product uploaded successfully!');
      navigate('/products');
    } catch (err) {
      setError(err.response.data.errors[0].msg);
    }
  };

  return (
    <Container maxWidth="xs">
      <Typography variant="h4" align="center" gutterBottom>
        Add Product
      </Typography>
      <form onSubmit={handleSubmit}>
        <TextField
          fullWidth
          label="Name"
          name="name"
          value={formData.name}
          onChange={handleChange}
          margin="normal"
          required
        />
        <TextField
          fullWidth
          label="Price"
          name="price"
          type="number"
          value={formData.price}
          onChange={handleChange}
          margin="normal"
          required
        />
        <TextField
          fullWidth
          label="Quantity"
          name="quantity"
          type="number"
          value={formData.quantity}
          onChange={handleChange}
          margin="normal"
          required
        />
        <input
          type="file"
          accept="image/*"
          onChange={handleFileChange}
          multiple
        />
        <Grid container spacing={1}>
          {formData.pictures.map((file, index) => (
            <Grid item key={index}>
              <Card>
                <CardMedia
                  component="img"
                  image={URL.createObjectURL(file)}
                  alt={`Image ${index + 1}`}
                />
              </Card>
            </Grid>
          ))}
        </Grid>
        {error && <Typography color="error" variant="body2" gutterBottom>{error}</Typography>}
        <Grid container justifyContent="center" spacing={2}>
          <Grid item>
            <Button variant="contained" color="primary" type="submit" margin= "10px">
              Add Product
            </Button>
          </Grid>
        </Grid>
      </form>
    </Container>
  );
};

export default AddProduct;
