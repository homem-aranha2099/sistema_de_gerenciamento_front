/*
 * Copyright (c) 2026 Cauã Fialho
 * All Rights Reserved.
 */

import { CirclePlusIcon } from "lucide-react";

export default function TaskPageAddTaskButton({setActive}) {


    return (
        <div className="taskPageAddTaskButton-pai" onClick={() => {setActive(false)}}>
            <button className="taskPageAddTaskButton">
                <h1>adicionar</h1>
                <CirclePlusIcon className="add" width={70} height={70} />
            </button>
        </div>
    )
}