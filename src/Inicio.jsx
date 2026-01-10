/*
 * Copyright (c) 2026 Cauã Fialho
 * All Rights Reserved.
 */

import Nav from "./Nav.jsx";
import Resumo from "./Resumo.jsx";
import ResumoDia from "./ResumoDia.jsx";
import ResumoSemanal from "./ResumoSemanal.jsx";
import { BellIcon} from "lucide-react"

export default function Inicio() {



    return (
    <div>
      <Nav />
      <br />
      <main>
        
        <div className="titleAndBell">
          <h2>Página inicial</h2>
          <div className="bell"><BellIcon /></div>
        </div>
        <br /><br />
        <Resumo />
        <br /><br />
        <ResumoDia />
        <br />
        <ResumoSemanal />
      </main>
    </div>
    )
}