import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import './index.css'
import App from './App.tsx'
import { ToastContainer } from 'react-toastify';
import { AuthProvider } from "./context/authContext.tsx";
import 'react-toastify/dist/ReactToastify.css';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
   <BrowserRouter>
    <AuthProvider>
      <App />
    </AuthProvider>
    <ToastContainer
      position="bottom-right"
      autoClose={4000}
      hideProgressBar={false}
      newestOnTop
      closeOnClick
      pauseOnHover
      draggable
      theme="colored"
    />
   </BrowserRouter>
  </StrictMode>,
)
