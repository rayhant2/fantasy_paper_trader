import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'

import './index.css'
import { RouterProvider, createBrowserRouter} from 'react-router-dom'
import RegisterPage from './routes/RegisterPage.jsx';
import LoginPage from './routes/LoginPage.jsx';
import StockPage from './routes/StockPage.jsx';
import PortfolioPage from './routes/PortfolioPage.jsx'
import Navbar from './components/Navbar.jsx';


const router = createBrowserRouter([
  {path: '/', element: <App />},
  {path: '/register', element: <RegisterPage />},
  {path: '/login', element: <LoginPage />},
  {path: '/stocks', element: <StockPage />},
  {path: '/portfolio', element: <PortfolioPage />}
])

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>,
)
