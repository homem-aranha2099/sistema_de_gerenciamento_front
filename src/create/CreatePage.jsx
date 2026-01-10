/*
 * Copyright (c) 2026 Cauã Fialho
 * All Rights Reserved.
 */

import {  useEffect, useState } from "react";
import { useOutletContext } from "react-router-dom";
import {api} from "../services/api"

export default function CreatePage({active, setActive, alterId, data}) {


    const {tarefas,clients, users} = useOutletContext([]);

    const [date, setDate] = useState("");
    const [dateLimit, setDateLimit] = useState("");
    const [priority, setPriority] = useState("");
    const [client, setClient] = useState("");
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [user, setUser] = useState("");
    const [isVisible, setIsVisible] = useState(false);

    const isUpadate = Boolean(alterId);


    useEffect(() => {
        if (!alterId) return;

        const tarefa = tarefas.find(t => t.id === alterId);
        if (!tarefa) return;

        setDate(tarefa.date);
        setDateLimit(tarefa.date_limit);
        setPriority(tarefa.priority);
        setClient(tarefa.client_id);
        setTitle(tarefa.title);
        setDescription(tarefa.description);
        setUser(tarefa.user_id);
        setIsVisible(!!tarefa.is_visible);
    }, [alterId, tarefas]);

    useEffect(() => {
        if (active) {
            setDate("");
            setDateLimit("");
            setPriority("");
            setClient("");
            setTitle("");
            setDescription("");
            setUser("");
            setIsVisible(false);
        }
    },[active]);

    useEffect(() => {
        if (data) {
            setDate(data);
        }
    },[data]);
    

    function submit(e){
        e.preventDefault();

        const isVisibleBinario = isVisible ? 1 : 0;

        const payload = {
            id: alterId,
            date,
            dateLimit,
            priority,
            client,
            title,
            description,
            user,
            isVisibleBinario
        }

        api.post('/criar-atualizar-tarefa.php', payload)
        .then(res => {
            alert(res.data.message);
            setActive(false);
        })
        .catch(err => {
            alert(err.response.data.message);
        })
    }



    return (
        
        <div className={`createPage ${active ? "active" : ""}`}>
            <form action="" onSubmit={(e) => submit(e, false)}>
                <div className="formulario">
                    
                    <div className="datas">
                        <div>
                            <span>Data:</span>
                            <input value={date} onChange={(e) => setDate(e.target.value)} className="recebido recebido-datas" type="date" placeholder="dd/mm/aaaa" required  />
                        </div>
                        <div>
                            <span>Data Limite:</span>
                            <input value={dateLimit} onChange={(e) => setDateLimit(e.target.value)} className="recebido receebido-datas" type="date" placeholder="dd/mm/aaaa" required />
                        </div>
                    </div>

                    <span>Prioridade:</span>
                    <select value={priority} onChange={(e) => setPriority(e.target.value)} className="recebido recebido-select" required>
                    <option value="" disabled>Prioridade</option>
                    <option value="alta">Alta</option>
                    <option value="media">Média</option>
                    <option value="baixa">Baixa</option>
                    </select>

                    <span>Cliente:</span>
                    <select value={client} onChange={(e) => setClient(e.target.value)} className="recebido recebido-select" name="" id="" required>
                        <option value="" key={1} disabled >Selecione um cliente</option>
                        {clients.map(client => (<option key={client.id} value={client.id}>{client.name}</option>))}
                    </select>

                    <span>titulo:</span>
                    <input value={title} onChange={(e) => setTitle(e.target.value)} className="recebido recebido-titulo" type="text" placeholder="titulo" required />

                    <span>descricao:</span>
                    <textarea value={description} onChange={(e) => setDescription(e.target.value)} className="recebido recebido-textarea" type="text" placeholder="descricao" required />

                    <span>Atribuido para:</span>
                    <select value={user} onChange={(e) => setUser(e.target.value)} className="recebido recebido-select" name="" id="" required>
                        <option value="" key={1} disabled >Selecione um colaborador</option>
                        {users.map(user => (<option key={user.id} value={user.id}>{user.name}</option>))}
                    </select>

                    <div>
                        <span>tornar visivel para usuário:</span>
                        <input  checked={isVisible} onChange={(e) => setIsVisible(e.target.checked)} className="recebido" type="checkbox"/>
                    </div>
                    <div style={{display:'flex', }}>
                        <button className="recebido criar"><h3>{isUpadate ? 'Atualizar tarefa' : 'Criar tarefa'}</h3></button>
                        <div onClick={() => {setActive(true)}} className="recebido voltar"><h3>voltar</h3></div>
                    </div>
                    <br />
                </div>
            </form>
        </div>
    );
}