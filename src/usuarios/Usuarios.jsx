/*
 * Copyright (c) 2026 Cauã Fialho
 * All Rights Reserved.
 */

import Nav from "../Nav";
import UsuariosCreateUsuarioButton from "./UsuariosCreateUsuarioButton";
import UsuariosCards from "./UsuariosCards";
import CreateUserPage from "../create/CreateUserPage";
import{ useState } from "react";
import { useOutletContext } from "react-router-dom";





export default function Usuarios() {


    const {users} = useOutletContext([]);
    const [active, setActive] = useState(true);
    console.log(users);

    if(users.message !== undefined) {
    return(
        <>
            <Nav />
            <div className='clientesCard-pai' style={{flexDirection: 'column', alignItems: 'center', textAlign: 'center', justifyContent: 'center', height: '77vh', maxHeight: '77vh'}}>
                <h1>{users.message}</h1>
                <p>{users.textmessage}</p>
            </div>
        </>
        )
    }

    return (
        <>
            <Nav />
            <CreateUserPage active={active} setActive={setActive} />
            <div>
                <main>
                    <div className="top-clientes">
                        <h2>Gerenciar Usuários</h2>
                        <UsuariosCreateUsuarioButton active={active} setActive={setActive} />
                    </div>
                    <br />
                    <UsuariosCards active={active} setActive={setActive} />

                </main>
                
            </div>
        </>
    )
}