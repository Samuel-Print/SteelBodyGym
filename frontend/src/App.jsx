import { BrowserRouter } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import AppRouter from './routes/AppRouter';
import { SearchProvider } from '@/context/SearchContext';
import './index.css';

import api from "@/api/axios";

console.log(api.defaults.baseURL);


const toastStyle = {
  background: 'var(--background)',
  color: 'var(--text)',
  border: '1px solid var(--border)',
  borderRadius: '14px',
  padding: '12px 16px',
  fontSize: '14px',
  fontWeight: 500,
  boxShadow: '0 10px 30px rgba(0,0,0,.15)',
};

function App() {
  return (
    <BrowserRouter>
      <SearchProvider>
        <AppRouter />
      </SearchProvider>
      <Toaster 
        position="top-right"
        toastOptions={{
          duration: 4000,
          style: toastStyle,
          success: { style: toastStyle },
          error: { style: toastStyle },
          loading: { style: toastStyle },
        }}
      />
    </BrowserRouter>
  );
}

export default App;