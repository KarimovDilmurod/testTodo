import React,{useState} from "react";
import { StyleSheet,css } from "aphrodite";
import {serverTimestamp,doc, deleteDoc,updateDoc} from 'firebase/firestore'
import { db } from "../firebase";

export const TodoListItem = ({item}) => {

    const [active,setActive] = useState(false)
    const [title, setTitle] = useState(item.title)
    const today = new Date().toLocaleDateString()
    const endsDate = new Date(item.endAt).toLocaleDateString()

    const updateItem = async(e) => {
    e.preventDefault()
    await updateDoc(doc(db, 'todos', item.id), {
      title: title,
      timestamp: serverTimestamp()
    })
    setActive(false)
    } 

    const check = async (item) => {
        await updateDoc(doc(db,'todos', item.id),{
            completed: !item.completed
        })
    }

    const deliteItem = async (id) => {
        await deleteDoc(doc(db, 'todos', id))
    }

    const edite = () => {
        setActive(!active)
    }

    return(
        <div className={item.completed ? css(styles.completed) : css(styles.container) }>
            <div className={css(styles.textContent)}>
                <div className={css(styles.titleContent)}>
                    <input onChange={()=> check(item)} type="checkbox" checked={item.completed ? 'checked' : '' } className={css(styles.chek)}/>
                   
                    <h2  className={css(styles.text)}>{item.title}</h2>
                </div>
                
                <h5 className={css(styles.descriptionText)}>{item.description}</h5>
                <div className={css(styles.dateContent)}>
                {item.file? <button className={css(styles.button)}>
                    <a href={item.file} download={item.file}> downloadFile</a>
                </button> : null}
                
                <p className={today > endsDate ? css(styles.endData) : css(styles.data)}>{endsDate}</p>
                </div>
                
            </div>
            
            {active ?  
            <form onSubmit={updateItem} className={css(styles.buttonContainer)}>
                <input type="text" value={title} onChange={(e)=> setTitle(e.target.value)} className={css(styles.button)}/>
                <button typeof="submit" className={css(styles.button)}>edite</button>
            </form>
                    :
            <div className={css(styles.buttonContainer)}>
                <button className={css(styles.button)}  onClick={item.completed ? null : () => edite(item)}>edit</button>
                <button className={css(styles.button)} onClick={item.completed ? null : () => deliteItem(item.id)}>delete</button>
            </div>
            }
        </div>
    )
}

const styles = StyleSheet.create({
    container: {
        display: 'flex',
        width:'100%',
        borderRadius:'0.5rem',
        background: '#FDFEFE',
        flexDirection: 'row',
        justifyContent:'space-between',
        padding:'0.5rem 0rem 0.5rem 0.3rem',
        marginBottom: '0.5rem'
    },
    text: {
        color: '#2C3E50',
        fontSize: '0.8em',
        marginLeft: '0.5rem',
    },
    buttonContainer: {
        display: 'flex',
        justifyContent:'center',
        alignItems:'center'
    },
    button: {
        marginRight: '0.5rem',
        height: '2rem',
        cursor: 'pointer'
    },
    textContent: {
        display: 'flex',
        marginRight: '1rem',
        width:'100%',
        justifyContent:'space-between'
    },
    completed: {
        display: 'flex',
        width:'100%',
        borderRadius:'0.5rem',
        background: '#CACFD2',
        flexDirection: 'row',
        justifyContent:'space-between',
        padding:'0.5rem 0rem 0.5rem 0.3rem',
        marginBottom: '0.5rem'
    },
    titleContent: {
        display:'flex',
        flexDirection:'row',
        justifyContent:'center',
        alignItems:'center'
    },
    chek: {
        width: '1.2rem',
        alignItems:'center'
    },
    dateContent: {
        display:'flex',
        flexDirection:'row',
        justifyContent:'center',
        alignItems:'center'
    },
    descriptionText: {
        display:'flex',
        justifyContent:'flex-start',
        fontSize:'0.8em',
        alignItems:'flex-start'
    },
    endsAt: {
        display: 'flex',
        marginRight: '1rem',
        width:'100%',
        justifyContent:'space-between',
        background:'#BFC9CA',
        borderRadius:'0.5rem'
    },
    data: {
        color: '#0FBA8E'
    },
    endData: {
        color: '#C92518'
    }
})