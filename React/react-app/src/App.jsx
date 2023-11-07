import { useState } from 'react'
import './App.css' /// vitejs

/// Componentes funcionales
/// Los nombres de los componentes utilizan PascalCase

/*
  () => valor_de_retorno
  () => { return valor_de_retorno }
*/

const NavBar = ({dark, links}) => 
{
  console.log("Renderizado NavBar")
  let className = 'nav-principal'

  if(dark){
    className += ' nav-principal--dark'
  }

  /// funcional
  // const liLinks = links.map((elemnto) => <li className="nav-principal__item"><a href={elemnto.url}>{elemnto.texto}</a></li>)

  /*
  /// forma estructurada
  for(let i=0; i<links?.length; i++){
    liLinks.push(<li className="nav-principal__item"><a href={links[i].url}>{links[i].texto}</a></li>)
  }
  */

  return (
  <nav>
    <ul className={className}>
      {links.map((elemnto, index) => <li key={index} className="nav-principal__item"><a href={elemnto.url}>{elemnto.texto}</a></li>)}
    </ul>
  </nav>
)}

const Titulo = ({children})=>{

  return (<h1>{children}</h1>)
}



const Header = () => {
  console.log("Renderizado de Header")
  const [links, setLinks] = useState([
    {url: '#', texto: 'Home'},
    {url: '#', texto: 'Nosotros'},
    {url: '#', texto: 'Contacto'},
    {url: '#', texto: 'FAQ'},
  ])


  // codigo javascript


  const handleClick = ()=>{

    setLinks([...links, {
      url: '#', texto: 'Nuevo',
    }]) // se vuele a renderizar el Header

  }

  return (
    <header>
      <Titulo>
        <span>Titulo de mi web!</span>
      </Titulo>
      <button onClick={handleClick} >Agregar</button>
      <p>{links.length}</p>
      <NavBar dark={true} links={links} />
    </header>
  )
}

function App(){
  /// codigo javascript
  console.log("Renderizado App")

  return (
    <div>
      <Header />
      <h2>Subtitulo</h2>
      <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ducimus, vero autem beatae recusandae asperiores minus aut sapiente molestias dolorem deleniti inventore nostrum consectetur velit animi dicta omnis iste voluptates! Praesentium.</p>
    </div>
  )
}

export {
  App,
  Header,
  NavBar
}

export default App