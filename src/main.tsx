import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import AuthProvider from './contexts/AuthContext.tsx';
import { Toaster } from 'sonner';
import { ThemeProvider } from './components/theme/ThemeProvider.tsx';
import { DEFAULT_CACHE_TIME, DEFAULT_STALE_TIME } from './utils/constant.ts';


const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 3,
      refetchOnWindowFocus: false,
      staleTime: DEFAULT_STALE_TIME,
      gcTime: DEFAULT_CACHE_TIME
    },
  },
});


createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <ThemeProvider defaultTheme='system' storageKey='vite-ui-theme'>
          <Toaster richColors position='top-right' />
          <App />
        </ThemeProvider>
      </AuthProvider>
    </QueryClientProvider>
  </StrictMode>,
)
