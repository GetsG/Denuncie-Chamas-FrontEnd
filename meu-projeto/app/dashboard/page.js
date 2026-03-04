'use client'
import { useEffect } from "react"
import { useState } from "react"
import styles from "./page.module.css"

export default function Dashboard(){

    //VERIFICAR SE O TOKEN ESTÁ ARMAZENADO NO STORAGE
    useEffect(() => {const token = localStorage.getItem("token")
    if (!token) {
    router.push("/login")
    }}, [])

    const [total, setTotal] = useState(0)
    const [pendentes, setPendentes] = useState(0)
    const [emAndamento, setEmAndamento] = useState(0)
    const [gravidadeAlta, setGravidadeAlta] = useState(0)

    return(
        <div className={styles.container}>

            {/* Titulo e subtitulo */}
            <div className={styles.dashboardTitleSection}>
                <h2>Dashboard</h2>
                <p>Visão geral das suas denúncias</p>
            </div>
            {/* ------------------------------------ */}

            {/* Dashboard Status */}
            <div className={styles.dashboardStats}>
                <section>
                    <h4>Total de Denúncias</h4>
                    <p>{total}</p>
                </section>

                <section>
                    <h4>Pendentes</h4>
                    <p>{pendentes}</p>
                </section>

                <section>
                    <h4>Em Andamento</h4>
                    <p>{emAndamento}</p>
                </section>

                <section>
                    <h4>Gravidade Alta</h4>
                    <p>{gravidadeAlta}</p>
                </section>
            </div>
            {/* ------------------------------------ */}

            {/* Dashboard Ações */}
            <div className={styles.dashboardActions}>
                <button>
                    <h4>Nova Denúncia</h4>
                    <p>Registrar um novo incêndio</p>
                </button>

                <button>
                    <h4>Minhas Denúncias</h4>
                    <p>Ver todas as denúncias</p>
                </button>
            </div>
            {/* ------------------------------------ */}

            {/* Denuncias Recentes */}
            <div className={styles.recentDenuncias}>
                <div className={styles.containerTitleRecentDenuncias}>
                    <h4>Denúncias Recentes</h4>
                    <p>Suas últimas 5 denúncias registradas</p>
                </div>
                

            </div>
            {/* ------------------------------------ */}


            
        </div>
    )
}