/*
 * Copyright (c) 2026 Cauã Fialho
 * All Rights Reserved.
 */

import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import {  RouterProvider } from 'react-router-dom'
import './style/style.css'
import App from './App.jsx'
import TaskPage from './pages/TaskPage.jsx'

import router from './router.jsx'



createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>,
)
