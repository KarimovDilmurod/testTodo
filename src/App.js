import React,{useState,useEffect} from "react";
import { StyleSheet,css } from "aphrodite";
import { db } from "./firebase";
import {collection , onSnapshot, query} from 'firebase/firestore'
import './App.css'
import { Formik } from "./components/Formik";
import { TodoList } from "./Todo/TodoList";
import 'react-datepicker/dist/react-datepicker.css'

function App() {
  const [list,setList] = useState([])
  useEffect(()=> {
    const q = query(collection(db,'todos'))
    const asd = onSnapshot(q, (query,(quer)=> {
    let arrayTodo = []
    quer.forEach(doc => {
      arrayTodo.push({...doc.data(),id: doc.id})
      });
      setList(arrayTodo)
    }))
    return ()=> asd
  },[])

  return (
    <div className={css(styles.container)}>
      <div className={css(styles.todoContainer)}>
        <div>
          <h1 className={styles.text}>Test Todo</h1>
        </div>

        <Formik  />

        <TodoList list={list} />
      </div>
    </div>
  );
}
export default App;

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    height: '100vh',
    justifyContent: 'start',
    alignItems: 'center',
    flexDirection: 'column',
    background: '#CACFD2',
  },
  text: {
    color:'#fff',
    fontSize: '28em',
    fontWeight: 'bold',
  },
  todoContainer: {
    display: 'flex',
    padding: '1rem',
    background: 'white',
    borderRadius: '0.5rem',
    marginTop:'2rem',
    width: '40rem',
    flexDirection: 'column',
    textAlign:'center',
  }
})