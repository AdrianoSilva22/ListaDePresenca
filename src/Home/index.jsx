
import { useState, useEffect } from 'react'
import './style.css'
import { Card } from '../assets/Componentes/Card'

export function Home() {
  const [studentName, setStudentName] = useState('') ;
  const [students, setstudents] = useState([]) ;
const [user, setUser] = useState({ name: '', avatar: ''})
  function handleAddStudent() {
    const newStudent = {
      name: studentName,
      time: new Date().toLocaleTimeString("pt-br", {
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
      })
    }
    setstudents(prevState => [...prevState, newStudent])
  }

  useEffect(() => {
    fetch("https://api.github.com/users/adrianosilva22")
      .then(trans => trans.json())
      .then(Date => {
        setUser({
          name: Date.name,
          avatar: Date.avatar_url
        })
  })
}, [])

return (
  <div className='container'>
    <header>
      <h1> Lista de Presença</h1>
      <div>
        <strong>{user.name}</strong>
        <img className='foto' src={user.avatar} alt="foto de perfil" />
      </div>
    </header>
    <input
      onChange={e => setStudentName(e.target.value)}
      type="text"
      placeholder="Digite o nome..."
    />
    <button type="button"
      onClick={handleAddStudent}>Adicionar
    </button>
    {
      students.map(student =>
        <Card
          key={student.time}
          name={student.name}
          time={student.time}
        />)
    }
  </div>
)
}

