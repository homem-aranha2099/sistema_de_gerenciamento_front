/*
 * Copyright (c) 2026 Cauã Fialho
 * All Rights Reserved.
 */

import { useOutletContext } from 'react-router-dom';

export default function ResumoDia() {

        const { tarefas } = useOutletContext();
        const alto = tarefas.filter(tarefa => tarefa.priority === 'alta').length;
        const medio = tarefas.filter(tarefa => tarefa.priority === 'media').length;
        const baixo = tarefas.filter(tarefa => tarefa.priority === 'baixa').length;
        const total = tarefas.length;

    return (
        <div>
            
            <div className="resumoDia">
                <h3>Resumo de Hoje</h3>
                <div className="resumoMatinal">
                    <div className="alta"><p>Alta Prioridade</p><h3>{alto}</h3></div>
                    <div className="media"><p>Média Prioridade</p><h3>{medio}</h3></div>
                    <div className="baixa"><p>Baixa Prioridade</p><h3>{baixo}</h3></div>
                    <div className="total"><p>Total no Dia</p><h3>{total}</h3></div>
                    <div className="hoje">Você não tem tarefas para hoje</div>
                </div>
            </div>
        </div>
    )
}