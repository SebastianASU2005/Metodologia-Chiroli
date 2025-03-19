import { ChangeEvent, FC, FormEvent, useEffect, useState } from 'react'
import { tareaStore } from '../../../store/tareaStore'
import styles from './Modal.module.css'
import { ITarea } from '../../../types/ITarea'
import { useTarea } from '../../../hooks/useTarea'
type IModal={
    handleCloseModal:VoidFunction
}
const initialState:ITarea={
    titulo:"",
    descripcion:"",
    fechaLimite:""
}

export const Modal:FC<IModal> =({handleCloseModal})=>{
    const tareaActiva=tareaStore((state)=>state.tareaActiva)
    const setTareaActiva=tareaStore((state)=>state.setTareaActiva)
    const{crearTarea,edicionTarea}=useTarea()
    const [formValues,setFormValues]=useState<ITarea>(initialState)
    


    useEffect(()=>{
      if (tareaActiva!=null) setFormValues(tareaActiva)
    },[])



   const handleChange=(e:ChangeEvent<HTMLInputElement | HTMLTextAreaElement>)=>{
    const {name,value}=e.target
    setFormValues((prev)=>({...prev, [`${name}`]:value}))
   }
   const handleSubmit=(e:FormEvent)=>{
    e.preventDefault();
    if(tareaActiva){
        edicionTarea(formValues)
    }else{
        crearTarea({...formValues,id:new Date().toDateString()})

    }
    setTareaActiva(null)
    handleCloseModal()
   }

    return(
        <div className={styles.ContainerPrincipalModal}>
            <div className={styles.contentPopUp}>
            <div>
                <h3>{tareaActiva?"Editar tarea":"Crear Tarea"}</h3>
            </div>
            <form onSubmit={handleSubmit} className={styles.formContentModal}>
               <div>
                <label>Titulo</label>
               <input placeholder='Ingrese un titulo para la tarea' 
               type="text" required
               onChange={handleChange}
               value={formValues.titulo} 
               autoComplete='off' 
               name="titulo"/>
               <label>Descripcion</label>
                <textarea placeholder='Ingrese una descripcion de la tarea' 
                required onChange={handleChange}
                 value={formValues.descripcion} 
                name="descripcion"></textarea>
                <label>Fecha Limite</label>
                <input type="date" 
                required onChange={handleChange}
                 value={formValues.fechaLimite} 
                autoComplete='off' 
                name="fechaLimite"/>
               </div>
               <div className={styles.buttonCardModal}>
                <button onClick={handleCloseModal}>Cancelar</button>
                <button type='submit'>{tareaActiva?"Editar tarea":"Crear Tarea"}</button>
               </div>
            </form>
            </div>
        </div>
    )
}