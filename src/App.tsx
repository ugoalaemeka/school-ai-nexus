
import React from 'react';
import { Routes, Route, useRoutes } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext';
import { Toaster } from '@/components/ui/toaster';
import { routes } from './routes';

function App() {
  const routeElements = useRoutes(routes);
  
  return (
    <AuthProvider>
      {routeElements}
      <Toaster />
    </AuthProvider>
  );
}

export default App;
