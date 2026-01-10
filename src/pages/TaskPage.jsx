/*
 * Copyright (c) 2026 Cauã Fialho
 * All Rights Reserved.
 */

import Nav from "../Nav.jsx";
import TaskPageResumo from "./TaskPageResumo.jsx";
import TaskPageAddTaskButton from "./TaskPageAddTaskButton.jsx";
import TaskPageTasks from "./TaskPageTasks.jsx";
import CreatePage from "../create/CreatePage.jsx";
import { Calendar } from "react-calendar"
import {  useState  } from "react";
import {useOutletContext} from "react-router-dom";





export default function TaskPage() {

    const {tarefas} = useOutletContext();





    const [active, setActive] = useState(true);
    const [alterId, setAlterId] = useState("");

    const [data, setData] = useState();

    const handleClickDay = (value) => {
        const year = value.getFullYear();
        const month = String(value.getMonth() + 1).padStart(2, '0');
        const day = String(value.getDate()).padStart(2, '0');

        setData(`${year}-${month}-${day}`);
        setActive(false);
    }

    
    

    return (
        <div >
            <Nav />
            <CreatePage data={data}  active={active} setActive={setActive} alterId={alterId}  /> 
            
            <br />
            
            <main className="mainTaskPage" >
                <TaskPageResumo />
                <TaskPageAddTaskButton setActive={setActive} />

                <br />
                <div className="calendar" >
                    
                    <Calendar
                        onClickDay={handleClickDay}


                        tileClassName={({ date, view }) => {
                            if (view !== 'month') return null;

                            const data = date.toISOString().split('T')[0];

                            return tarefas.some(t => t.date_limit === data)
                                ?'tarefa'
                                : null;
                        }}

                        tileContent={({ date, view }) => {
                            if (view !== 'month') return null;

                            const data = date.toISOString().split('T')[0];

                            return tarefas.some(t => t.date_limit === data)
                                ? <span>tarefa</span>
                                : null;
                        }}
                    
                    />
                </div>
                <br />
            <TaskPageTasks setActive={setActive} setAlterId={setAlterId} />
            </main>
        </div>
    )
}

