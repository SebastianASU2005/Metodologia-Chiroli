import { useShallow } from "zustand/shallow"
import { tareaStore } from "../store/tareaStore"
import { editarTarea, eliminarTareaId, getAllTareas, postNuevaTarea } from "../http/tarea";
import { ITarea } from "../types/ITarea";
import Swal from "sweetalert2";




export const useTarea=()=>{
    const{tareas,setArrayTareas,agregarNuevaTarea,eliminarTareaArray,editarTareaArray}=tareaStore(useShallow((state)=>({
        tareas:state.tareas,
        setArrayTareas:state.setArrayTareas,
        agregarNuevaTarea:state.agregarNuevaTarea,
        eliminarTareaArray:state.eliminarTareaArray,
        editarTareaArray:state.editarTareaArray
    })))
    const getTareas=async()=>{
            const data= await getAllTareas();
            if(data) setArrayTareas(data);
    
        };
    
        const crearTarea=async(nuevaTarea:ITarea)=>{
            agregarNuevaTarea(nuevaTarea)
            try {
                await postNuevaTarea(nuevaTarea)
                Swal.fire("Tarea creada exitosamente :)")
            } catch (error) {
                eliminarTareaArray(nuevaTarea.id!)
                console.log("error al crear tarea ", error)
            }
        }
        const edicionTarea=async(tareaEditada:ITarea)=>{
            const estadoPrevio=tareas.find((el)=>el.id===tareaEditada.id);
            editarTareaArray(tareaEditada)
            
            try {
                await editarTarea(tareaEditada)
                Swal.fire("Tarea editada exitosamente :)")
            } catch (error) {
                if (estadoPrevio) editarTareaArray(estadoPrevio)
                console.log("error al editar tarea ",error)
                
            }
        }
        const borrarTarea=async(idTarea:string)=>{
            const estadoPrevio=tareas.find((el)=>el.id===idTarea);
            const confirm = await Swal.fire({
                title:"Estas seguro?",
                text:"Esta accion es irreversible",
                icon:"warning",
                showCancelButton:true,
                confirmButtonText:"Si, eliminar",
                cancelButtonText:"Cancelar"
            })
            if (!confirm.isConfirmed) return;
            eliminarTareaArray(idTarea)
            try {
                await eliminarTareaId(idTarea)
                Swal.fire("Tarea eliminada exitosamente :)")
            } catch (error) {
                if (estadoPrevio) agregarNuevaTarea(estadoPrevio)
                console.log("error al eliminar tarea ",error)
            }
        }
    return{
        getTareas,
        crearTarea,
        edicionTarea,
        borrarTarea,
        tareas
        
    }
}