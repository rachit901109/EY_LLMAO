import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import { extendTheme } from '@chakra-ui/react';
import { ChakraProvider } from '@chakra-ui/react'
// Import Font Awesome styles and library
import { library } from '@fortawesome/fontawesome-svg-core';
import { fas } from '@fortawesome/free-solid-svg-icons';
const customTheme = extendTheme({
    config: {
      initialColorMode: 'light',
      useSystemColorMode: false,
    },
  });
  
// Add the icons to the library
library.add(fas);

ReactDOM.createRoot(document.getElementById('root')!).render(
    <ChakraProvider theme={customTheme}>
    <App />
    </ChakraProvider>,
)
