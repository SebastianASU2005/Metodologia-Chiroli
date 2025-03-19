import { FC, useEffect, useState } from "react"
import { tareaStore } from "../../../store/tareaStore"
import styles from "./ListTareas.module.css"
import { getAllTareas } from "../../../http/tarea"
import { CardList } from "../Cardlist/CardList"
import { ITarea } from "../../../types/ITarea"
import { Modal } from "../Modal/Modal"
import { useTarea } from "../../../hooks/useTarea"

export const ListTareas=()=>{
    const{getTareas,tareas}=useTarea();

    
    const setTareaActiva =tareaStore((state)=>state.setTareaActiva)
    
    

    useEffect(()=>{
        getTareas()
    },[])
    const [openModalTarea,setOpenModalTarea]=useState(false);
    const handleOpenModalEdit=(tarea:ITarea)=>{
        setTareaActiva(tarea)
        setOpenModalTarea(true)
    }
    const handleCloseModal=()=>{
        setOpenModalTarea(false)
    }
    return(
        <>
        <div className={styles.containerPrincipalListTareas}>
            <div className={styles.containerTitleAndButton}>
            <h3>Lista de tareas</h3>
            <button onClick={()=>{setOpenModalTarea(true)}}>Agregar Tarea</button>
            </div>
            <div className={styles.containerListTareas}>{
            tareas.length>0?
            tareas.map((el)=>(
                <CardList 
                handleOpenModalEdit={handleOpenModalEdit}
                tarea={el}/>
            )):<div>No hay tareas</div>}</div>
        </div>
        {openModalTarea&&<Modal handleCloseModal={handleCloseModal}/>}
        </>
        
    )
}