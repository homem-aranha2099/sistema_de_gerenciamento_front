/*
 * Copyright (c) 2026 Cauã Fialho
 * All Rights Reserved.
 */

import {useState} from "react";
import {api} from "../services/api";
import { Circle, TriangleAlert, ArrowBigLeft, Eye, EyeOff, ThumbsUp, LoaderCircle } from 'lucide-react';

export default function LoginClient(){

    const [name, setNome] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const [isError, setIsError] = useState(false);
    const [isSucess, setIsSucess] = useState(false);
    const [isLoading, setIsLoading] = useState(false);

    const IconAlert = isError ? TriangleAlert : ThumbsUp;

    function login(e){
        e.preventDefault();

        setIsLoading(true);
        setIsError(false);
        setIsSucess(false);


        api.post('/login-cliente.php', {
        name,
        password
        })
        .then(res => {
        console.log(res.data);
        setIsError(false);
        setIsSucess(true);
        window.location.href = "/inicio";
        })
        .catch(err => {
        setIsError(true);
        setError(err.response?.data?.message || "Erro ao logar");
        console.log(err);
        })
        .finally(() => {
        setIsLoading(false);
        });
    }




    return(
        <div className="login-register-pai">
            <div className={isLoading ? "loading" : "none"}>
                <LoaderCircle color="white" width={100} height={100} className="icon-spin"/>
            </div>
            
            <div className={(isError ? "aviso" : "none")}>
                <h1><IconAlert width={100} height={100} color="white"/></h1>
                <p>{error}</p>
                <p onClick={() => {setIsError(false); isSucess ? window.location.href = "/" : "";}} className="voltar-aviso"><ArrowBigLeft width={30} height={30} /> {isError ? "Voltar" : isSucess ? "Voltar para o login" : ""}</p>
            </div>
            <div className="createPage login-register ">
                <form action="" onSubmit={login}>
                    <div className="formulario form-login">
                            <h1 className="titulo-login">Sistema de Gerenciamento</h1>
                            <p className="subtitulo-login">Gerenciamento empresarial de tarefas </p>

                            <label htmlFor="usuario">Usuario:</label>
                            <input className="recebido" type="text" name="email" id="email" value={name} onChange={(event) => setNome(event.target.value)} />

                            <label htmlFor="senha">Senha:</label>
                            <input className="recebido" type="password" name="senha" id="senha" value={password} onChange={(event) => setPassword(event.target.value)} />

                            <button className="entrar recebido" type="submit" >Entrar</button>
                    </div>
                </form>
            </div>
        </div>
    )
}