import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'

import App from './App.jsx'
import { createTheme, CssBaseline, ThemeProvider } from '@mui/material'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { RouterProvider } from 'react-router-dom'
import { router } from './router/index.js'
import './index.css';
const queryClient = new QueryClient({

  defaultOptions: {
    queries: {
      staleTime: 1000 * 60 * 5, // تا ۵ دقیقه کش معتبره
      cacheTime: 1000 * 60 * 10, // تا ۱۰ دقیقه کش نگه داشته میشه
      refetchOnWindowFocus: false,
      refetchOnMount: false
    }
  }

})
const theme = createTheme({

})
createRoot(document.getElementById('root')).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <RouterProvider router={router}>
          <App />
        </RouterProvider>
      </ThemeProvider>
    </QueryClientProvider>
  </StrictMode>
)