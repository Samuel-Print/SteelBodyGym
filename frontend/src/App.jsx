import { BrowserRouter } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import AppRouter from './routes/AppRouter';
import './index.css';

import api from "@/api/axios";

console.log(api.defaults.baseURL);

function App() {
  return (
    <BrowserRouter>
      <AppRouter />
      <Toaster 
        position="top-right"
        toastOptions={{
          duration: 4000,
          style: {
            background: '#1e293b',
            color: '#fff',
            borderRadius: '14px',
          }
        }}
      />
    </BrowserRouter>
  );
}

export default App;