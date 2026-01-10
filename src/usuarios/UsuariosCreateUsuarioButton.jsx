/*
 * Copyright (c) 2026 Cauã Fialho
 * All Rights Reserved.
 */

import {CirclePlusIcon} from "lucide-react";



export default function UsuariosCreateUsuarioButton({setActive}){
    return(
        <div className="clienteButton" onClick={() => {setActive(false)}}>
            <CirclePlusIcon width={35} height={35}/>
            <div>Criar conta de usuário</div>
        </div>
    )
}