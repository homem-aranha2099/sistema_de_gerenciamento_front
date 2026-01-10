/*
 * Copyright (c) 2026 Cauã Fialho
 * All Rights Reserved.
 */

import { KeyRound } from "lucide-react"

export default function CreateUserPage({active, setActive}) {

    

    return (
        <div>
            
            <div className={`createPage createPage-client ${active ? "active" : ""}`}>
                <form action="">
                    <div className="formulario">
                        <div className="nomes-createClient">
                            <span>Nome do Cliente:</span>
                            <input type="text" className="recebido" />
                        </div>
                        <div className="senhas-pai">

                            <div className="senhas">
                                <span>Senha:</span>
                                <input type="password"  className="recebido senha" />
                            </div>
                            
                            <button className="recebido gerar">Gerar <KeyRound /></button>
                        </div>
                        <div>
                            <button className="recebido criar"><h3>Criar tarefa</h3></button>
                            <button  className="recebido voltar" onClick={() => {setActive(true)}}><h3>voltar</h3></button>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    )
}