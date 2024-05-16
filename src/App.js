import React from 'react';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from './components/login';
import AddProduct from './components/AddProduct';
import ProductPage from './components/products';
import 'react-toastify/dist/ReactToastify.css';

const App = () => {
  return (

    <BrowserRouter>
      <Routes>
          <Route index  path="/" element={<Login></Login>} />
          <Route  path="/add-product" element={<AddProduct/>} />
          <Route  path="/products" element={<ProductPage/>} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
