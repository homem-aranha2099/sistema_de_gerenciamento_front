/*
 * Copyright (c) 2026 Cauã Fialho
 * All Rights Reserved.
 */


import { StrictMode, useEffect, useState } from 'react'
import './style/style.css'
import Inicio from './Inicio.jsx'
import {   Navigate, RouterProvider } from 'react-router-dom'
import TaskPage from './pages/TaskPage.jsx'
import Nav from './Nav.jsx'
import { Outlet } from 'react-router-dom';
import {api} from './services/api'
import { useNavigate } from 'react-router-dom';




export default function App() {
  const [clients, setClients] = useState([
  ]);

  useEffect(() => {
    api.post('/clientes.php')
      .then(res => {
        setClients(res.data);
      })
      .catch(err => {
        setClients(err.response.data);
      })
  }, []);


  const [users, setUsers] = useState([]);

  useEffect(() => {
    api.post('/usuarios.php')
      .then(res => {
        setUsers(res.data);
      })
      .catch(err => {
        setUsers(err.response.data);
      })
  }, []);


  

  const [tarefas, setTarefas] = useState([]);

  useEffect(() => {
    api.post('/tarefas.php')
      .then(res => {
        setTarefas(res.data);
      })
      .catch(err => {
        setTarefas(err.response.data);
      })
  }, []);




  async function handleLogin(e, password, nome) {
    e.preventDefault();

    try {
      const res = await api.post('/login.php', {
        nome,
        password
      });

      if (res.data.success) {
        console.log('Login OK');
        // redirecionar
      } else {
        alert(res.data.message);
      }

    } catch (err) {
      console.log(err);
    }
  }

  const[ setIsAuthenticated] = useState("");
  const [ setUser] = useState("");

  const navigate = useNavigate();

  function logout() {
    api.post('/logout.php', {}, { withCredentials: true })
        .then(() => {
            // Limpa estados locais
            setUser(null);
            setIsAuthenticated(false);

            // Redireciona
            navigate('/');
        })
        .catch(err => {
            console.error('Erro ao sair:', err);
        });
  }

  api.interceptors.response.use(
  res => res,
  err => {
    if (err.response?.status === 401) {
      console.log(err.response.data.message);
    }
    return Promise.reject(err);
  }
  );


  return (
    <div>
      <Outlet context={{ tarefas, setTarefas, clients, setClients, users, setUsers,  handleLogin, logout  }} />
    </div>
  );
}