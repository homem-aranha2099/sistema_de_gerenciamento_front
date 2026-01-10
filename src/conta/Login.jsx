/*
 * Copyright (c) 2026 Cauã Fialho
 * All Rights Reserved.
 */

import {useState} from "react";
import {api} from "../services/api";
import { Circle, TriangleAlert, ArrowBigLeft, Eye, EyeOff, ThumbsUp, LoaderCircle } from 'lucide-react';

export default function Login(){

    const [name, setNome] = useState("");
    const [password, setPassword] = useState("");

    const [error, setError] = useState("");
    const [isError, setIsError] = useState(false);
    const [isPasswordVisible, setIsPasswordVisible] = useState(false);
    const [isSucess, setIsSucess] = useState(false);
    const [isLoading, setIsLoading] = useState(false);

    let Icon = isPasswordVisible ? Eye : EyeOff;
    let IconAlert = isError ? TriangleAlert : ThumbsUp;

    function limparFormulario(){
        setNome("");
        setPassword("");
        setIsError(false);
        setIsLoading(false);
        setIsPasswordVisible(false);
    }

    function login(e){
        e.preventDefault();

        if(!name || !password){
            setIsError(true);
            setError("Preencha todos os campos!");
            return;
        }

        setIsLoading(true);
        setIsError(false);
        setIsSucess(false);

        api.post('/login.php', {
        name,
        password
        })
        .then(res => {
            setIsError(false);
            console.log(res.data);
            limparFormulario();
            window.location.href = "/inicio";
        })
        .catch(err => {
            setIsError(true);
            setError(err.response?.data?.message || "Erro ao logar");
            console.log(err);
        }).finally(() => {
            setIsLoading(false);
        });
    }




    return(
        <div className="login-register-pai">
            <div className={isLoading ? "loading" : "none"}>
                <LoaderCircle color="white" width={100} height={100} className="icon-spin"/>
            </div>
            
            <div className={(isError ? "aviso" : isSucess ? "sucess" : "none")}>
                <h1><IconAlert width={100} height={100} color="white"/></h1>
                <p>{error}</p>
                <p onClick={() => {setIsError(false); isSucess ? window.location.href = "/" : "";}} className="voltar-aviso"><ArrowBigLeft width={30} height={30} /> {isError ? "Voltar" : isSucess ? "Voltar para o login" : ""}</p>
            </div>
            <div className="createPage login-register ">
                <form action="" onSubmit={login}>
                    <div className="formulario form-login">
                        <h1 className="titulo-login">Sistema de Gerenciamento</h1>
                        <p className="subtitulo-login">Gerenciamento empresarial de tarefas </p>

                        <span htmlFor="usuario">Usuario:</span>
                        <input className="recebido" type="text" name="email" id="email" value={name} onChange={(event) => setNome(event.target.value)} />

                            <span htmlFor="senha">Senha:</span>
                            <div className="senhas2" style={{display: 'flex', alignItems: 'center', gap: '10px'}}>
                                <input style={{width: '100%'}} className="recebido senha" type={isPasswordVisible ? "text" : "password"} name="senha" id="senha" value={password} onChange={(event) => setPassword(event.target.value)} />
                                <Icon width={30} height={30} onClick={() => setIsPasswordVisible(!isPasswordVisible)} />
                            </div>

                        <button className="entrar recebido" type="submit" >Entrar</button>
                        <div className="links" style={{flexDirection: 'column', alignItems: 'center', gap:'10px'}} >
                            <a href="/cadastro">Criar conta</a>
                            <a href="/login-cliente">Entrar como cliente</a>
                        </div>

                    </div>
                </form>
            </div>
        </div>
    )
}