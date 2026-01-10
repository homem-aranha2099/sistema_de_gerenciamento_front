/*
 * Copyright (c) 2026 Cauã Fialho
 * All Rights Reserved.
 */

import Nav from "../Nav.jsx"
import ClientesCard from "./ClientesCard.jsx"
import ClientesCreateClienteButton from "./ClientesCreateClienteButton.jsx"
import CreateClientPage from "../create/CreateClientPage.jsx"
import { useState } from "react";
import { useOutletContext } from "react-router-dom";

export default function Clientes(){




    const [active, setActive] = useState(true);

    const {clients} = useOutletContext([]);

        if(clients.message !== undefined) {
        return(
            <>
                <Nav />
                <div className='clientesCard-pai' style={{flexDirection: 'column', alignItems: 'center', textAlign: 'center', justifyContent: 'center', height: '77vh', maxHeight: '77vh'}}>
                    <h1>{clients.message}</h1>
                    <p>{clients.textmessage}</p>
                </div>
            </>
            )
        }
        
    return(
        <div >
            <Nav />
            <CreateClientPage setActive={setActive} active={active}/>
            <br />
            <main >
                <div className="top-clientes">
                    <h1>Gerenciar Clientes</h1>
                    <ClientesCreateClienteButton setActive={setActive} active={active}/>
                </div>
                <br />
                <div className="mainClientes">
                    <ClientesCard/>
                </div>
            </main>
        </div>
    )
}