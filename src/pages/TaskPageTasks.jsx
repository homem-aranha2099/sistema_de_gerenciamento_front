/*
 * Copyright (c) 2026 Cauã Fialho
 * All Rights Reserved.
 */

import { Outlet, useOutletContext } from "react-router-dom";
import {Trash2, SquarePen} from "lucide-react"
import { api } from "../services/api";



export default function TaskPageTasks({setActive, setAlterId}) {
    const {tarefas, users, clients} = useOutletContext();

    function handleComplete(id){
      if(id === ''){
        alert('Preencha todos os campos!');
        return;
      }

      const payload = {
        id,
        isCheck: true,
        isDeleted: false
      }

      api.post('/is-deleted-tarefas-or-is-check.php', payload)
      .then(res => {
        console.log(res.data);
      })
      .catch(err => {
        console.log(err);
      })
    }

return (
  <div className="caixa-avo">
    <h1>Tarefas</h1>

    {tarefas.map(tarefa => {
      const user = users.find(user => user.id === tarefa.user_id);
      const client = clients.find(client => client.id === tarefa.client_id);
      const newDate = new Date(tarefa.date_limit).toLocaleDateString('pt-BR');

      return(
        <div key={tarefa.id} className="caixa-pai">
          <div className="caixa-1">
            <div>
              <h2 className="titulo">{tarefa.title}</h2>
              <p className="descricao">{tarefa.description}</p>
            </div>

            <div className="icons">
              <Trash2 width={30} height={30} className="apagar icon" />
              <SquarePen onClick={() => {setActive(false); setAlterId(tarefa.id);}} width={30} height={30} className="editar icon" />
            </div>
          </div>

          <div className="caixa-2">
            <div className="info data">{newDate}</div>

            <div className={`info ${tarefa.priority === 'alta' ? 'alta' : tarefa.priority === 'media' ? 'media' : 'baixa'}`}>
              {tarefa.priority}
            </div>

            <div className="info">
              {tarefa.is_completed ? 'concluida' : 'pendente'}
            </div>

            <div className="info">{user.name}</div>

            <div className="info">
              {client.name}
            </div>
          </div>

          <div className="conclusao" onClick={() => (handleComplete(tarefa.id))}>
            Marcar como Concluída
          </div>
          <br />
        </div>
      )
    })}


  </div>
);

}