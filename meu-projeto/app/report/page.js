"use client";
import Image from 'next/image'
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation"
import { useState } from "react"
import { useEffect } from 'react';
import styles from './page.module.css'
import LoadingOverlay from "../components/LoadingOverlay"

export default function Home() {

  const {register, handleSubmit, formState: {errors}} = useForm()
  const router = useRouter()
  const [loading, setLoading] = useState(false)
  const [erro, setErro] = useState(false)

      //VERIFICAR SE O TOKEN ESTÁ ARMAZENADO NO STORAGE
      useEffect(() => {const token = localStorage.getItem("token")
      if (!token) {
      router.push("/login")
      }}, [])

        {/* Retorno do formulário */}
        const onSubmit = async (data) => {
          console.log(data)
        
            setTimeout(() => {
            router.push("/dashboard");
          }, 1500);}

  return (
    <div className={styles.container}>

      {/* TITULO E DESCRIÇÃO*/}
      <div>
        <h4>Denunciar Incêndio</h4>
        <p>Preencha as informações abaixo de forma rápida e objetiva</p>
      </div>
      {/*-------------------*/}


      {/* INICIO DO FORMULÁRIO*/}
      <form onSubmit={handleSubmit(onSubmit)}>

      {/*INPUT TIPO DE INCÊNCIO*/}
        <div>
          <h4>Tipo de Incêndio</h4>        

          <select
            {...register("tipoIncendio", {
            required: "Selecione o tipo de incêndio"
          })}>
            <option value="">Selecione o tipo</option>
            <option value="florestal">Florestal</option>
            <option value="urbano">Urbano</option>
            <option value="industrial">Industrial</option>
            <option value="residencial">Residencial</option>
          </select>

          {errors.tipoIncendio && (
          <p>{errors.tipoIncendio.message}</p>
        )}
        </div>
        {/*-------------------*/}
        
        {/*INPUT LOCALIZAÇÃO*/}
        <div>
          <h4>Localização</h4>
          <button>Capturar minha localização</button>
        </div>
        {/*-------------------*/}
        
        {/*INPUT IMAGEM*/}
        <div>
          <h4>Foto do Incêndio</h4>
          <input  type="file" accept="image/*"></input>
        </div>
        {/*-------------------*/}

        {/*INPUT DESCRIÇÃO DA SITUAÇÃO*/}
        <div>
          <h4>Descrição da Situação</h4>
          <input type='text' placeholder='Ex: Incêndio de grandes proporções com risco de se espalhar para casas vizinhas...'/>
        </div>
        {/*-------------------*/}
        
        {/*INFORMAÇÃO IMPORTANTE*/}
        <div>
          <h4>Informação importante</h4>
          <p>Denúncias falsas podem resultar em responsabilização legal. Certifique-se de que as informações são verdadeiras.</p>
        </div>

        {/* BOTÃO CANCELAR E ENVIAR DENUNCIA*/}
        <div>
          <button onClick={() => {router.push("/dashboard")}}>Cancelar</button>
          <button type='submit'>Enviar Denúncia</button>
        </div>
        {/*-------------------*/}
        

      </form>
      {/* FIM DO FORMULÁRIO*/}

      
  
    
      <>
        <LoadingOverlay show={loading} text="Entrando..." />
      </>

    </div>
  );
}
