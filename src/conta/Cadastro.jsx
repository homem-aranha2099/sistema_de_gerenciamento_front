/*
 * Copyright (c) 2026 Cauã Fialho
 * All Rights Reserved.
 */

import {useState} from "react";
import {api} from "../services/api";
import { Circle, TriangleAlert, ArrowBigLeft, Eye, EyeOff, ThumbsUp, LoaderCircle } from 'lucide-react';


export default function Login(){

    const [name, setName] = useState("");
    const [password, setPassword] = useState("");
    const [position, setPosition] = useState("Colaborador");
    const [adminKey, setAdminKey] = useState("");

    const [error, setError] = useState("");
    const [isError, setIsError] = useState(false);
    const [isSucess, setIsSucess] = useState(false);
    const [isLoading, setIsLoading] = useState(false);

    const [isPasswordVisible, setIsPasswordVisible] = useState(false);
    const [isKeyVisible, setIsKeyVisible] = useState(false);


    const Icon = isKeyVisible ? Eye : EyeOff;
    const Icon2 = isPasswordVisible ? Eye : EyeOff;
    const IconAlert = isError ? TriangleAlert : ThumbsUp;

    function limparFormulario() {
        setName("");
        setPassword("");
        setPosition("Colaborador");
        setAdminKey("");
        setIsError(false);
        setIsLoading(false);
        setIsPasswordVisible(false);
        setIsKeyVisible(false);
    }

function cadastro(e) {
  e.preventDefault();

  // 1. Validação básica
  if (!name || !password || !position) {
    setIsError(true);
    setError("Preencha todos os campos!");
    return;
  }

  // 2. Validação de senha
  const senhaValida =
    password.length >= 8 &&
    /[A-Z]/.test(password) &&
    /[a-z]/.test(password) &&
    /\d/.test(password);

  if (!senhaValida) {
    setIsError(true);
    setError("A senha deve atender os requisitos");
    return;
  }

  // 3. Normalização

  // 4. Payload
  const payload = {
    name: name,
    password,
    position
  };

  if (position === "Administrador") {
    payload.adminKey = adminKey;
  }

  // ✅ ATIVA O LOADING ANTES DA REQUISIÇÃO
  setIsLoading(true);
  setIsError(false);
  setIsSucess(false);

  // 5. Envio
  api.post("/cadastro.php", payload)
    .then(res => {
      setIsSucess(true);
      setError(res.data.message || "Cadastro realizado com sucesso");
      limparFormulario();
    })
    .catch(err => {
      setIsError(true);
      setError(err.response?.data?.message || "Erro ao cadastrar");
    })
    .finally(() => {
      // ✅ DESATIVA O LOADING SEMPRE
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
            <div className="createPage login-register">
                <form action="" onSubmit={cadastro}>
                    <div className="formulario" >
                            <h1 className="titulo-login">Sistema de Gerenciamento</h1>
                            <p className="subtitulo-login">Gerenciamento empresarial de tarefas </p>

                            <span htmlFor="usuario">Usuario:</span>
                            <input className="recebido" type="text" name="email" id="email" value={name} onChange={(event) => setName(event.target.value)} />

                            <span htmlFor="cargo">Cargo:</span>
                            <select name="position" id="position" className="recebido" value={position} onChange={e => setPosition(e.target.value)}>
                                <option value="Colaborador">Colaborador</option>
                                <option value="Administrador">Administrador</option>
                            </select>

                            <span className={position === "Administrador" ? "" : "none"} htmlFor="">Chave de acesso do Administrador:</span>
                            <div className={position === "Administrador" ? "" : "none"} style={{display: "flex" ,alignItems: "center", justifyContent:"space-between"}}>
                                <input type={isKeyVisible ? "text" : "password"} onChange={(event) => setAdminKey(event.target.value)} value={adminKey} className={position === "Administrador" ? "recebido" : "none"} style={{width: "90%"} } name="chave" id="chave" />
                                <Icon className={position === "Administrador" ? "" : "none"}  width={30} height={30} onClick={() => setIsKeyVisible(!isKeyVisible)} style={{cursor:"pointer"}} />
                            </div>

                            
                            <span htmlFor="senha">Senha:</span>
                            <div style={{display: "flex" ,alignItems: "center", justifyContent:"space-between"}}>
                                <input style={{width: "90%"}} className="recebido" type={isPasswordVisible ? "text" : "password"} name="senha" id="senha" value={password} onChange={(event) => setPassword(event.target.value)} />
                                <Icon2 width={30} height={30} onClick={() => setIsPasswordVisible(!isPasswordVisible)} style={{cursor:"pointer"}}/>
                            </div>

                            <div className="requisitos">
                                <p >Requisitos da senha:</p>
                                <p style={password.length >= 8 ? {color: "green"} : {color: "grey"}}><Circle color={password.length >= 8 ? "green" : "red"} size={13} /> Mínimo 8 caracteres</p>
                                <p style={password.match(/[A-Z]/) ? {color: "green"} : {color: "grey"}}><Circle color={password.match(/[A-Z]/) ? "green" : "red"} size={13}  /> Mínimo 1 letra maiuscula</p>
                                <p style={password.match(/[a-z]/) ? {color: "green"} : {color: "grey"}}><Circle color={password.match(/[a-z]/) ? "green" : "red"} size={13} /> Mínimo 1 letra minuscula</p>
                                <p style={password.match(/\d/) ? {color: "green"} : {color: "grey"}}><Circle color={password.match(/\d/) ? "green" : "red"} size={13} /> Mínimo 1 número</p>
                            </div>
                            <div className={position === "Colaborador" ? "requisitos colaborador" : "none"}>
                                <p style={{color: "#a68546", fontWeight: "bold"}}><TriangleAlert color="#f9c560" /> Atenção: </p>
                                <p style={{color: "#a68546"}}>Sua conta de colaborador precisara ser aprovada por um administrador antes de poder fazer login.</p>
                            </div>

                            <button  className="entrar recebido" type="submit" >Criar</button>

                            <a className="voltar-link" href="/">Voltar para a página de login</a>
                    </div>
                </form>
            </div>
        </div>
    )
}