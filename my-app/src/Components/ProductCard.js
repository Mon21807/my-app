// src/components/ProductCard.js
import React from 'react';
import { Box, Button, Text } from '@chakra-ui/react';
import { Link } from 'react-router-dom';

const ProductCard = ({ product }) => (
  <Box borderWidth="1px" borderRadius="lg" overflow="hidden" p="4">
    <Text>{product.title}</Text>
    <Text>{product.category}</Text>
    <Text>${product.price}</Text>
    <Link to={`/product/${product.id}`}>
      <Button mt="2" colorScheme="teal">More Details</Button>
    </Link>
  </Box>
);

export default ProductCard;

