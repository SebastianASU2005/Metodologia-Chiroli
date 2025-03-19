import { FC } from 'react'
import { ITarea } from '../../../types/ITarea'
import styles from './CardList.module.css'
import { useTarea } from '../../../hooks/useTarea'
type ICardList={
    tarea:ITarea
    handleOpenModalEdit:(tarea:ITarea)=>void
    
}


export const CardList:FC<ICardList>=({tarea,handleOpenModalEdit}) =>{
    const{borrarTarea}=useTarea()
    
    const eliminarTarea=()=>{
        borrarTarea(tarea.id!)
    }
    
    const editarTarea=()=>{
        handleOpenModalEdit(tarea)
    }

    return(
        <div className={styles.containerCard}>
            <div className={styles.Card}>
            <h3>Titulo: {tarea.titulo}</h3>
            <p>Descripcion: {tarea.descripcion}</p>
            <p><b>Fecha Limite: {tarea.fechaLimite}</b></p>
            </div>
            <div className={styles.CardButtons}>
                <button onClick={eliminarTarea}>eliminar</button>
                <button onClick={editarTarea}>editar</button>
            </div>
        </div>

    )

}