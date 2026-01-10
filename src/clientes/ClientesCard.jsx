/*
 * Copyright (c) 2026 Cauã Fialho
 * All Rights Reserved.
 */

import {Trash2} from 'lucide-react';
import { useOutletContext }  from 'react-router-dom';
import {api} from '../services/api';


export default function ClientesCard() {

    const {clients, tarefas} = useOutletContext([]);

        if(clients.message !== undefined) {
        return(
            <div className='clientesCard-pai' style={{flexDirection: 'column', alignItems: 'center', textAlign: 'center'}}>
                <h1>{clients.message}</h1>
                <p>{clients.textmessage}</p>
            </div>
        )
        }

        function handleDelete(id, name) {
            const confirmed = window.confirm(
                `Tem certeza que deseja excluir o cliente ${name}?`
            );
    
            if (!confirmed) return;
    
            const payload = {
                id,
                isDeleted: true
            }
    
            api.post('/is-deleted-client.php', payload)
            .then(res => {
                alert(res.data.message);
            })
            .catch(err => {
                alert(err.response.data.message);
            })
        }

    return(
        <div className='clientesCard-pai'>



        {
        clients.sort((a, b) => a.name.localeCompare(b.name)).map(cliente => {

            const tarefasDoCliente = tarefas.filter(tarefa => tarefa.clientId === cliente.id);
            const pendentes = tarefasDoCliente.filter(tarefa => tarefa.iscompleted === false);
            const concluidas = tarefasDoCliente.filter(tarefa => tarefa.iscompleted === true);


            return(
                <div key={cliente.id} className='clienteCard'>
                    <div className='clientes-tarefas-pai'>
                        <div className='clientes-tarefas'>
                            <h1>{cliente.name}</h1>
                            <h3>Quantidade de tarefas: {tarefasDoCliente.length}</h3>
                        </div>
                        <Trash2 onClick={() => handleDelete(cliente.id, cliente.name)} style={{cursor: 'pointer', borderRadius: '5px', color: 'rgba(255, 255, 255, 0.842)', padding: '4px ', backgroundColor: '#f47777'}} className='trash' width={30} height={30}/>

                    </div>
                    <div className='pendentes-concluidas'>
                        <div className='pendentes tarefa-cp'>
                            <p>pendentes</p>
                            <h1>{pendentes.length}</h1>
                        </div>
                        <div className='concluidas tarefa-cp'>
                            <p>concluidas</p>
                            <h1>{concluidas.length}</h1>
                        </div>
                    </div>
                </div>
            )
        }




        )}

        
        </div>
    
    
    )
}


