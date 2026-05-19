import { useState } from 'react'
import axios from "axios"


function App() {
  const [notes,setNotes]=useState([{
       title:"test title 1",
       Description:"test Description"
  },
  {
       title:"test title 2",
       Description:"test Description"
  },
  {
       title:"test title 3",
       Description:"test Description"
  },
  {
       title:"test title 4",
       Description:"test Description"
  }
  ])
  axios.get('http://localhost:8000/notes')
  .then((res)=>{
      console.log(res.data)
  })
  

  return (
    <>
    <div className="notes">
      {
        notes.map(note=>{
          return <div className="note">
        <h1>{note.title}</h1>
        <p>{note.Description}</p></div>
        })
      }
     </div></>
  )
}

export default App
