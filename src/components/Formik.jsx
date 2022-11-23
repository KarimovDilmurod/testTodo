import React,{useState} from "react";
import { StyleSheet,css } from "aphrodite";
import {collection, serverTimestamp, addDoc} from 'firebase/firestore'
import { db, storage } from "../firebase";
import { ref, getDownloadURL, uploadBytesResumable } from "firebase/storage";


export const Formik = () => {
    
    const [value,setValue] = useState('')
    const [area,setArea] = useState('')
    const [selectedFile, setSelectedFile] = useState(null);
    const [startDate, setStartDate] = useState(null)
    const [endDate, setEndDate] = useState(null);
    const [loading,setLoading] = useState(false)

    const [progresspercent, setProgresspercent] = useState(0);

    console.log(progresspercent);
    console.log();

    const hendleSubmit = async (e) => {
      e.preventDefault()
        let fileUrl
        let name = (Math.random() + 1).toString(36).substring(7);
        const storageRef = ref(storage, `files/${name}`);
        const uploadTask = uploadBytesResumable(storageRef, selectedFile);
        await uploadTask.on("state_changed",
        (snapshot) => {
          const progress =
          Math.round((snapshot.bytesTransferred / snapshot.totalBytes) * 100);
          setProgresspercent(progress);
          setLoading(true)
        },
        (error) => {
        alert(error);
        },
        () => {
          getDownloadURL(uploadTask.snapshot.ref).then(async (downloadURL) => {
            fileUrl = downloadURL
            await addDoc(collection(db,'todos'),{
            title: value,
            completed: false,
            timestamp: serverTimestamp(),
            description: area,
            file: fileUrl,
            startAt: startDate,
            endAt: endDate
          })
          setValue('')
          setArea('')
          setSelectedFile(null)
          setLoading(false)
          });
        }
      ); 
    } 

    return(
      <form onSubmit={hendleSubmit }  className={css(styles.container)}>
        <div className={css(styles.inputContent)}>
          <input 
            type="text" 
            className={css(styles.input)} 
            value={value} onChange={(e)=> setValue(e.target.value)} 
          />

          <input 
            type="file" 
            className={css(styles.fileContent)}
            onChange={(e) => setSelectedFile(e.target.files[0])}
          />

          <textarea 
            type="text" 
            className={css(styles.areaContent)} 
            value={area}
            onChange={e=> setArea(e.target.value)}
          />
        </div>

        <div className={css(styles.inputContent)}>
          <div className={css(styles.dateContener)}>
            <input type="date" onChange={(e)=> setStartDate(e.target.value)}  />

            <input type="date" onChange={(e)=> setEndDate(e.target.value)} />
          </div>          
            {loading 
              ? 
              <h1>Loading...</h1> 
              :  
              <button type="submit" className={css(styles.button)} >addTodo</button>} 
          </div>
      </form>
    )
}

const styles = StyleSheet.create({
    container: {
        display: 'flex',
        background:'#ECF0F1',
        borderRadius: '0.5rem',
        padding: '0.7rem',
        justifyContent:'space-between',
        alignItems: 'center',
        flexDirection:'column',
    },
    input: {
        height: '2rem',
        marginBottom: '1rem',
        width: '100%',
        borderRadius: '0.3rem',
        fontSize: '1.2em'
    },
    button: {
        height: '2rem',
        borderRadius: '0.4rem',
        fontSize: '0.7em',
        fontWeight:'bold',
        cursor: 'pointer',
        width: '100%',
        marginTop:'0.5rem'
    },
    fileContent: {
        display:'flex',
        height: '2rem',
        marginRight: '0.4rem',
        marginBottom: '1rem',
        borderRadius: '0.3rem',
        fontSize: '0.8em',
        width: '100%',
        justifyContent:'center',
        alignItems:'center'

    },
    inputContent: {
      display:'flex',
      padding:'0.5rem',
      textAlign:'center',
      width: '25rem',
      flexDirection:'column'
      
    },
    areaContent: {
      display:'flex',
      height:'4rem',
      width: '100%',
      justifyContent:'flex-start'
    },
    buttonContent: {
      display:'flex',
      flexDirection: 'column',
      width:'100%',
    },
    dateContener: {
      display:'flex',
      width:'100%',
      justifyContent:'space-between',
      flexDirection:'row'
    }
})