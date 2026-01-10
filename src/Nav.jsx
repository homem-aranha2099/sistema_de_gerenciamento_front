/*
 * Copyright (c) 2026 Cauã Fialho
 * All Rights Reserved.
 */

import { Building2, UsersRound, NotebookText, UserRound, Home, MessageCircle, Settings } from "lucide-react";
import { useEffect, useState } from "react";
import {api} from "./services/api" 
import { useOutletContext } from "react-router-dom";

export default function Nav() {

    const [name, setName] = useState("");
    const [position, setPosition] = useState("");
    const [img, setImg] = useState("");

    const {logout} = useOutletContext();

    useEffect(() => {
        api.get('/me.php')
            .then(res => {
                setName(res.data.name);
                setPosition(res.data.role);
                setImg(res.data.img);
            })
            .catch(() => console.log("Nao logado"))
    })

    return (
        <div>
            <nav className="navTop">
                <ul>
                    <li className="building"> <div><h1>Sistema de Gerenciamento</h1> <p>gerenciamento empresarial</p></div> </li>
                    <div className="mount">
                        <li className="hourGlass"></li>
                        <li className="user" ><img width={40} height={40} src={!img ? 'https://cdn-icons-png.flaticon.com/512/149/149071.png' : img} alt="" /><div>{name.length <= 15? name : name.substring(0, 12) + "..."} <p> {position}</p></div></li>
                        <li className="exit" onClick={() => logout()}>Sair</li>
                    </div>
                </ul>
            </nav>
            <nav className="navSide">
                <ul>
                    <li><a href="/inicio"><Home size={20} /><p>Inicio</p></a></li>
                    <li><a href="/tarefas"><NotebookText size={20} /><p>Tarefas</p></a></li>
                    <li style={position === 'Administrador' || position === 'Colaborador' ? {} : {display: 'none'}}><a href="/clientes"><UsersRound size={20} /><p>Clientes</p></a></li>
                    <li style={position === 'Administrador' ? {}: {display: 'none'}}><a href="/usuarios"><UserRound size={20} /><p>Usuários</p></a></li>
                    <li><a href="/mensagens"><MessageCircle size={20} /><p>Mensagens</p></a></li>
                    <li><a href="/teste"><Settings size={20} /><p>Configurações</p></a></li>
                </ul>
            </nav>
        </div>
    )
}