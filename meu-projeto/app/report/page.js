"use client";
import Image from 'next/image'
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation"
import { useState } from "react"
import { useEffect } from 'react';
import styles from './page.module.css'
import LoadingOverlay from "../components/LoadingOverlay"

import WhatshotIcon from '@mui/icons-material/Whatshot'; //FOGO
import PlaceIcon from '@mui/icons-material/Place'; //LOCALIZAÇÃO
import CameraAltIcon from '@mui/icons-material/CameraAlt'; //CAMERA
import ErrorOutlineIcon from '@mui/icons-material/ErrorOutline'; //WARN
import WarningIcon from '@mui/icons-material/Warning';

import capturarLocalizacao from "../services/geoLocation";


export default function Home() {

  const {register, handleSubmit, setValue, formState: { errors }} = useForm()
  const router = useRouter()
  const [loading, setLoading] = useState(false)
  const [latitude, setLatitude] = useState();
  const [longitude, setLongitude] = useState();
  const [previewImagem, setPreviewImagem] = useState(null);

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
      <div className={styles.header}>
        <h4 className={styles.headerTitle} >
          <WhatshotIcon className={styles.iconPendente} sx={{ fontSize: 20 , color: '#fd0000'}}/>
          Denunciar Incêndio
        </h4>
        <p className={styles.headerDescription}>Preencha as informações abaixo de forma rápida e objetiva</p>
      </div>
      {/*-------------------*/}


      {/* INICIO DO FORMULÁRIO*/}
      <form className={styles.form} onSubmit={handleSubmit(onSubmit)}>

      {/*TIPO DE INCÊNCIO*/}
        <div className={styles.field}>
          <h4 className={styles.fieldTitle}>Tipo de Incêndio</h4>        

          <select className={styles.select}
            {...register("tipoIncendio", {
            required: "Selecione o tipo de incêndio"
          })}>
            <option value="">Selecione o tipo</option>
            <option value="residencial">🏠 Residencial</option>
            <option value="comercial">🏬 Comercial</option>
            <option value="florestal">🌲 Florestal</option>
            <option value="urbano">🏙️ Urbano</option>
            <option value="rural">🌾 Rural</option>
            
          </select>

          {errors.tipoIncendio && (
          <p className={styles.errors}>{errors.tipoIncendio.message}</p>
        )}
        </div>
        {/*-------------------*/}
        
        {/*LOCALIZAÇÃO*/}
        <div className={styles.locationSection}>
          <h4>
            <PlaceIcon className={styles.iconPendente} sx={{ fontSize: 17 , color: '#000000'}}/>
            Localização
          </h4>
          <button
            onClick={() => capturarLocalizacao(setValue, setLatitude, setLongitude)}
            className={styles.locationButton}
            type="button">
            <PlaceIcon className={styles.iconPendente} sx={{ fontSize: 17 , color: '#000000'}}/>
            Capturar minha localização
          </button>

          {errors.latitude && (
          <p className={styles.errors}>{errors.latitude.message}</p>
          )}

          {latitude && longitude && (
          <div className={styles.locationInfo}>
            <p className={styles.locationTitle}>
              ✓ Localização capturada
            </p>

          <div className={styles.locationCoords}>
            Latitude: {latitude}
          </div>

          <div className={styles.locationCoords}>
            Longitude: {longitude}
          </div>
          </div>
)}

          <input type="hidden" {...register("latitude", {required: "Capture sua localização"})} />
          <input type="hidden" {...register("longitude", {required: "Capture sua localização"})} />

        </div>
        {/*-------------------*/}
        
        {/*IMAGEM*/}
        <div className={styles.photoSection}>
          <h4>
            <CameraAltIcon className={styles.iconPendente} sx={{ fontSize: 17 , color: '#000000'}}/>
            Foto do Incêndio
          </h4>
            <label  className={previewImagem ? styles.photoInputs : `${styles.photoInput} ${styles.photoInputs}`}>
              {previewImagem ? (<img src={previewImagem} alt="Prévia da imagem" className={styles.previewImage}/>) 
              : (
              <>
                <CameraAltIcon className={styles.iconPendente} sx={{ fontSize: 50, color: '#00000065' }}/>
                <p>Clique para tirar foto ou selecionar</p>
              </> 
              )}

          <input style={{ display: "none" }} type="file" accept="image/*"
            {...register("imagem", {
            required: "Insira uma Imagem"})}
            onChange={(e) => {
            const file = e.target.files?.[0];

            if (file) {
              const imageUrl = URL.createObjectURL(file);
              setPreviewImagem(imageUrl);
            }}}
          />

        </label>

          {errors.imagem && (
          <p className={styles.errors}>{errors.imagem.message}</p>
        )}

        </div>
        {/*-------------------*/}

        {/*DESCRIÇÃO DA SITUAÇÃO*/}
        <div className={styles.descriptionSection}>
          <h4>Descrição da Situação</h4>
          <textarea
            className={styles.descriptionInput}
            placeholder="Ex: Incêndio de grandes proporções com risco de se espalhar para casas vizinhas..."
            {...register("descricao", {
            required: "Descreva a situação"
  })}/>

          {errors.descricao && (
          <p className={styles.errors}>{errors.descricao.message}</p>
        )}
        </div>
        {/*-------------------*/}

        {/*Pessoas no local*/}
        
        <div className={styles.riskAlert}>
          <input type="checkbox" {...register("pessoasEmRisco")} class={styles.riskCheckbox}/>
            <div className={styles.riskContent}>
              <h2 className={styles.riskTitle}>
                <WarningIcon className={styles.iconPendente} sx={{ fontSize: 14 , color: '#c20303'}}/>
                Há pessoas no local em risco?</h2>
              <p className={styles.riskDescription}>Marque esta opção se houver pessoas presas, feridas ou em perigo iminente.
              Isso aumentará automaticamente a gravidade para <strong>ALTA PRIORIDADE</strong>.
              </p>
            </div>
        </div>
        
        {/*INFORMAÇÃO IMPORTANTE*/}
        <div className={styles.warningBox}>
          <ErrorOutlineIcon className={styles.iconPendente} sx={{ fontSize: 17 , color: '#b1780e'}}/>
          <h4>Informação importante</h4>
          <p>Denúncias falsas podem resultar em responsabilização legal. Certifique-se de que as informações são verdadeiras.</p>
        </div>

        {/* BOTÃO CANCELAR E ENVIAR DENUNCIA*/}
        <div className={styles.actions}>
          <button type="button" className={styles.cancelButton} onClick={() => {router.push("/dashboard")}}>Cancelar</button>
          <button className={styles.submitButton} type='submit'>Enviar Denúncia</button>
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
