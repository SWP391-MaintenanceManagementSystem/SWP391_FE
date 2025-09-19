import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import AuthProvider from './contexts/AuthContext.tsx';
import { Toaster } from 'sonner';
import { SidebarProvider } from './components/ui/sidebar.tsx';
import { AppSidebar } from './components/side-bar/AppSideBar.tsx';
import MainLayout from './layout/index.tsx';


const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 3,
      refetchOnWindowFocus: false,
    },
  },
});


createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <AuthProvider>
      <QueryClientProvider client={queryClient}>
        <Toaster richColors position='top-right' />
        <App />
      </QueryClientProvider>
    </AuthProvider>
  </StrictMode>,
)
