import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import theme from "./theme.tsx"
import { ChakraProvider } from '@chakra-ui/react'
// Import Font Awesome styles and library
import { library } from '@fortawesome/fontawesome-svg-core';
import { fas } from '@fortawesome/free-solid-svg-icons';

// Add the icons to the library
library.add(fas);

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <ChakraProvider theme={theme}>
    <App />
    </ChakraProvider>
  </React.StrictMode>,
)
