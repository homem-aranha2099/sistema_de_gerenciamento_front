/*
 * Copyright (c) 2026 Cauã Fialho
 * All Rights Reserved.
 */

import { createBrowserRouter } from 'react-router-dom';
import App from './App.jsx';
import Inicio from './Inicio.jsx';
import TaskPage from './pages/TaskPage.jsx';
import Clientes from './clientes/Clientes.jsx';
import Usuarios from './usuarios/Usuarios.jsx';
import Login from './conta/Login.jsx';
import Cadastro from './conta/Cadastro.jsx';
import Teste from './Teste.jsx';
import LoginClient from './conta/LoginClient.jsx';



const router = createBrowserRouter([

  {
    element: <App />,
    children: [
      { index: true, element: <Login /> },
      { path: 'inicio', element: <Inicio /> },
      { path: 'tarefas', element: <TaskPage /> },
      { path: 'clientes', element: <Clientes /> },
      { path: 'usuarios', element: <Usuarios /> },
      { path: 'mensagens', element: <Inicio /> },
      { path: 'cadastro', element: <Cadastro />},
      { path: 'teste', element: < Teste/>},
      { path: 'login-cliente', element: <LoginClient /> },
    ],
  }

]);
export default router;