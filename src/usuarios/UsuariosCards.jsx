/*
 * Copyright (c) 2026 Cauã Fialho
 * All Rights Reserved.
 */

import { Check, Trash2, TriangleAlert, ThumbsUp, LoaderCircle, ArrowBigLeft,  } from "lucide-react"
import { useOutletContext } from "react-router-dom";
import { api } from "../services/api";
import { useNavigate } from "react-router-dom";



export default function UsuariosCards() {
    const {users} = useOutletContext([]);
    const navigate = useNavigate();

    

    function handleDelete(id, name) {

        const confirmed = window.confirm(
            `Tem certeza que deseja excluir a conta de ${name}?`
        );

        if (!confirmed) return;

        const payload = {
            id,
            isDeleted: true,
            isCheck: false
        }

        api.post('/is-deleted-or-is-check.php', payload)
        .then(res => {
            console.log(res.data);
            navigate(0);
        })
        .catch(err => {
            console.log(err);
        })
    }

    function handleCheck(id, name){

        const confirmed = window.confirm(
            `Tem certeza que deseja verificar a conta de ${name}?`
        );

        if (!confirmed) return;

        const payload = {
            id,
            isDeleted: false,
            isCheck: true
        }

        api.post('/is-deleted-or-is-check.php', payload)
        .then(res => {
            console.log(res.data);
            navigate(0);
        })
        .catch(err => {
            alert(err.data.message);
        })
    }


    if(users.message !== undefined) {
        return(
            <div className='clientesCard-pai' style={{flexDirection: 'column', alignItems: 'center', textAlign: 'center', justifyContent: 'center', height: '77vh', maxHeight: '77vh'}}>
                <h1>{users.message}</h1>
                <p>{users.textmessage}</p>
            </div>
        )
    }

    return (
        <>
        {users.map(user => {

        


            return (
                    <div className="usuariosCards" key={user.id}>
                        <div className="info-user">
                            <img width={60} height={60} src={user.img ||'https://cdn-icons-png.flaticon.com/512/149/149071.png'} alt="" />
                            <div>
                                <h2>{user.name}</h2>
                                <p>{user.position}</p>
                            </div>
                        </div>

                       {user.position === 'Colaborador' && (
                       
                        <div className="buttons">
                            <button onClick={() => handleDelete(user.id, user.name)} style={{border: 'none', backgroundColor: "transparent"}} > <Trash2  width={35} height={35} className="trash"/></button>
                            <button onClick={() => handleCheck(user.id, user.name)} style={{border: 'none', backgroundColor: "transparent"}}><Check width={35} height={35}  className="check" style={user.is_check === 0 ? {color: '#35af70'} : {backgroundColor: '#35af70'}} /></button>
                        </div>
                        )
                        }
                        

                    </div>
            )
        
        })}



        </>
    )
}