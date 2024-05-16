import React, { useState, useEffect } from 'react';
import { Container, Typography, Grid, Card, CardContent, CardMedia } from '@mui/material';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const ProductPage = () => {
  const [products, setProducts] = useState([]);
  const token = localStorage.getItem('token');

  const navigate = useNavigate();

  useEffect(() => {
    const fetchProducts = async () => {
      try {

        if(!token){
            navigate('/')
            return;
        }
        

        const config = {
            headers: {
              'x-auth-token': token
            }
          };
        const response = await axios.get('http://localhost:5000/api/products',config);
        console.log(response);
        setProducts(response.data);
      } catch (error) {
        console.error('Error fetching products:', error);
      }
    };

    fetchProducts();
  }, []);

  return (
    <Container maxWidth="md">
      <Typography variant="h4" align="center" gutterBottom>
        All Products
      </Typography>
      <Grid container spacing={3}>

        {products.map((product) => (


          <Grid item key={product._id} xs={12} sm={6} md={4}>
                {console.log()}

            <Card>
              <CardMedia
                component="img"
                height="200"
                image={`http://localhost:5000/${product.pictures[0]?.replace(/\\/g, '/')}`}
                alt={product.name}
              />
              <CardContent>
                <Typography gutterBottom variant="h6" component="div">
                  {product.name}
                </Typography>
                <Typography variant="body2" color="textSecondary">
                  Price: ${product.price} | Quantity: {product.quantity}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
};

export default ProductPage;
