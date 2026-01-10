/*
 * Copyright (c) 2026 Cauã Fialho
 * All Rights Reserved.
 */

import { KeyRound, Eye, EyeOff } from "lucide-react";
import {  useState } from "react";
import { api } from "../services/api";
import { LoaderCircle, TriangleAlert, ThumbsUp, ArrowBigLeft} from "lucide-react"

export default function CreateClientPage({active, setActive }) {

    //VARIÁVEIS DO FORMULARIO
    const [name, setName] = useState("");
    const [password, setPassword] = useState("");

    //VARIÁVEIS DE SISTEMA
    const [error, setError] = useState("");
    const [isError, setIsError] = useState(false);
    const [isSucess, setIsSucess] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [isPasswordVisible, setIsPasswordVisible] = useState(false);

    //ICONES
    const Icon = isPasswordVisible ? Eye : EyeOff;
    const IconAlert = isError ? TriangleAlert : ThumbsUp;
    
    // GERADOR DE SENHAS
    function generatePassword(length = 12) {
        const charset =
            "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789@#$%";

        const values = new Uint32Array(length);
        window.crypto.getRandomValues(values);

        return Array.from(values, v => charset[v % charset.length]).join("");
    }


    //=================FUNÇÕES================//

    //CADASTRO
 function cadastro(e) {
  e.preventDefault();

  setIsLoading(true);
  setIsError(false);
  setIsSucess(false);

  api.post('/cadastro-cliente.php', { name, password })
    .then(res => {
    
    console.log(res.data);
    setIsSucess(true);
    setActive(false);
    setError("Cliente cadastrado com sucesso!");
    })
    .catch(err => {
      setIsError(true);
      setError(err.response?.data?.message || "Erro ao cadastrar");
    })
    .finally(() => {
      setIsLoading(false);
    });
}


    return (
        <div >
            {/* LOADING */}
            <div className={isLoading ? "loading" : "none"}>
                <LoaderCircle color="white" width={100} height={100} className="icon-spin"/>
            </div>
            
            {/* AVISO */}
            <div className="aviso-pai" style={{width: '100vw', height: '100%', display: 'flex',  justifyContent: 'center'}}>
                <div className={(isError ? "aviso" : isSucess ? "sucess" : "none")}>
                    <h1><IconAlert width={100} height={100} color="white"/></h1>
                    <p>{error}</p>
                    <p onClick={() => {setIsError(false); if(isSucess){setIsSucess(false); setActive(true)}else{setActive(false)}}} className="voltar-aviso"><ArrowBigLeft width={30} height={30} /> {isError ? "Voltar" : isSucess ? "Ok" : ""}</p>
                </div>
            </div>

            {/* FORMULARIO */}
            <div className={`createPage createPage-client ${active ? "active" : ""}`} style={{zIndex:'0'}}>
                <form action="" onSubmit={cadastro}>
                    <div className="formulario">
                        <div className="nomes-createClient">
                            <span>Nome do Cliente:</span>
                            <input type="text" name="nome" id="nome" className="recebido" value={name} onChange={(event) => setName(event.target.value)}/>
                        </div>
                        <div className="senhas-pai">

                            <div className="senhas">
                                <span>Senha:</span>
                                <input type={isPasswordVisible ? "text" : "password"} name="senha" id="senha" className="recebido senha" value={password} onChange={(event) => setPassword(event.target.value)} />
                            </div>
                            
                            <div style={{display: 'flex', flexDirection: 'row', alignItems: 'center', gap: '10px' }}>
                                <div className="recebido eye" style={{display: 'flex', alignItems: 'center'}}> <Icon width={31} height={31}  onClick={() => setIsPasswordVisible(!isPasswordVisible)}/> </div>
                                <div className="recebido gerar" onClick={() => setPassword(generatePassword(12))}><KeyRound width={31} height={31}/></div>
                            </div>
                        </div>

                        <div className="buttons-create-and-back">
                            <button type="submit"  className="recebido criar"><h3>Criar tarefa</h3></button>
                            <div  className="recebido voltar" onClick={() => {setActive(true)}}><h3>voltar</h3></div>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    )
}