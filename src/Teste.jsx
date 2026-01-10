/*
 * Copyright (c) 2026 Cauã Fialho
 * All Rights Reserved.
 */

import { useEffect } from "react";
import { api } from "./services/api";
import Nav from "./Nav.jsx";

export default function Teste() {

    useEffect(() => {
    api.get('/me.php')
        .then(res => console.log(res.data))
        .catch(() => console.log("Não logado"));
    }, []);

    return (
        <div>
            <Nav/>
        </div>
    )
}