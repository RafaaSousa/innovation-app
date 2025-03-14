'use client';

import React from 'react';
import { ChakraProvider, extendTheme } from '@chakra-ui/react';
import { CacheProvider } from '@chakra-ui/next-js';

const theme = extendTheme({
  colors: {
    brand: {
      500: '#8CC63F', 
    },
  },
});

export function Providers({ children }) {
  return (
    <CacheProvider>
      <ChakraProvider theme={theme}>{children}</ChakraProvider>
    </CacheProvider>
  );
}