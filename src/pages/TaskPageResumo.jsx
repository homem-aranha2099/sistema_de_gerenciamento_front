/*
 * Copyright (c) 2026 Cauã Fialho
 * All Rights Reserved.
 */

import { useOutletContext } from 'react-router-dom';

export default function TaskPageResumo() {

    const { tarefas } = useOutletContext();
    console.log(tarefas);

    
    const alta = tarefas.filter(tarefa => tarefa.priority === 'alta').length;
    const media = tarefas.filter(tarefa => tarefa.priority === 'media').length;
    const baixa = tarefas.filter(tarefa => tarefa.priority === 'baixa').length;
    const total = tarefas.length;
    

    return (
        <div className="taskPageResumo">
            <div className="alta"><p>Alta Prioridade</p><h3>{alta}</h3></div>
            <div className="media"><p>Média Prioridade</p><h3>{media}</h3></div>
            <div className="baixa"><p>Baixa Prioridade</p><h3>{baixa}</h3></div>
            <div className="total"><p>Total no Mês</p><h3>{total}</h3></div>
        </div>
    )
}