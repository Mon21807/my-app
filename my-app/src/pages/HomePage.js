// src/pages/HomePage.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Box, Grid, Select, Spinner, Text } from '@chakra-ui/react';
import ProductCard from '../components/ProductCard';

const HomePage = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [sort, setSort] = useState('');
  const [category, setCategory] = useState('');

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get('/api/products');
        setProducts(response.data);
        setLoading(false);
      } catch (err) {
        setError('Failed to fetch products');
        setLoading(false);
      }
    };
    fetchProducts();
  }, []);

  const handleSort = (e) => {
    setSort(e.target.value);
    if (e.target.value === 'asc') {
      setProducts([...products].sort((a, b) => a.price - b.price));
    } else if (e.target.value === 'desc') {
      setProducts([...products].sort((a, b) => b.price - a.price));
    }
  };

  const handleCategory = (e) => {
    setCategory(e.target.value);
    if (e.target.value) {
      setProducts(products.filter((product) => product.category === e.target.value));
    }
  };

  if (loading) return <Spinner />;
  if (error) return <Text>{error}</Text>;

  return (
    <Box>
      <Select placeholder="Sort by Price" onChange={handleSort} value={sort}>
        <option value="asc">Ascending</option>
        <option value="desc">Descending</option>
      </Select>
      <Select placeholder="Filter by Category" onChange={handleCategory} value={category}>
        <option value="Men">Men</option>
        <option value="Women">Women</option>
        <option value="Kids">Kids</option>
        <option value="Home Decor">Home Decor</option>
      </Select>
      <Grid templateColumns="repeat(auto-fill, minmax(200px, 1fr))" gap={6}>
        {products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </Grid>
    </Box>
  );
};

export default HomePage;
