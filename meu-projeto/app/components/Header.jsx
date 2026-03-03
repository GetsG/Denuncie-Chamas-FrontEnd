"use client";
import styles from "./Header.module.css"
import Logo from '../../public/logo.png';
import Image from "next/image";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { LogOut } from "@deemlol/next-icons";

export default function Header() {

    const [nome, setNome] = useState("");
    const router = useRouter();

    useEffect(() => {
        const token = localStorage.getItem("token");

        if (token) {
            const payload = JSON.parse(atob(token.split(".")[1]));
            setNome(payload.nome);
        }
    }, []);

    function handleLogout() {
        localStorage.removeItem("token");
        router.push("/");
  }

  return (
    <header className={styles.Header}>
        <div className={styles.left}>
            <Image className={styles.logo} src={Logo} alt="Logo Denuncie Chamas"/>
        <div className={styles.title}>
            <h1>Denuncie Chamas</h1>
            <p>Olá, {nome}</p>
        </div>
        </div>

        <button className={styles.buttonLogout} onClick={handleLogout}> <LogOut size={24} color="#0a0909" /> Sair</button>
        
    </header>
  )
}