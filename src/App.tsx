
import React from 'react';
import { useRoutes } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext';
import { Toaster } from '@/components/ui/sonner';
import { routes } from './routes';
import { AuthHandler } from './components/auth/AuthHandler';

function App() {
  const routeElements = useRoutes(routes);
  
  return (
    <AuthProvider>
      <AuthHandler>
        {routeElements}
      </AuthHandler>
      <Toaster />
    </AuthProvider>
  );
}

export default App;
