import { useState } from "react"
import { useNavigate } from "react-router-dom"


function LoginPage(){
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const navigate = useNavigate()

  const handleEmailChange = (e)=>{
    setEmail(e.target.value) // fuerza el renderizado
  }

  const handlePasswordChange = (e) =>{
    setPassword(e.target.value)
  }

  const handleFormSubmit = (e) =>{
    e.preventDefault()

    fetch('http://localhost:2023/api/session', {
      method: 'POST',
      headers:{
        'Content-type': 'application/json'
      },
      body: JSON.stringify({email, password})
    })
    .then((res)=>res.json())
    .then((result)=>{
      localStorage.setItem('token', result.token)
      navigate('/', {replace: true})
    })
  }


  return (
    <>
      <form onSubmit={handleFormSubmit}>
        <label>
          Email: 
          <input type="email" required onChange={handleEmailChange} value={email} />
        </label>
        <br />
        <label>
          Password:
          <input id="txtPassword" type="password" required onChange={handlePasswordChange} value={password} />
        </label>
        <br />
        <button type="submit">Iniciar Sesion</button>
      </form>
    </>
  )
}


export default LoginPage