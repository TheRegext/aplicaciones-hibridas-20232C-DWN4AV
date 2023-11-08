import { useState, useEffect } from 'react'
import './App.css' /// vitejs
import ProductsList from './ProductsList'

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

  let j;

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
      <button onClick={handleClick}>Agregar</button>
      { links.length < 7 &&
        <Mensaje show={true}>
          Mensaje oculto
        </Mensaje>
      }
          
      <NavBar dark={true} links={links} />
    </header>
  )
}
/// Render
// Monta el componente es el primer render

// cambia el estado
// cambia el contexto (hooks)
// cambia las propiedades

// destruye 

function Mensaje({show=false, children}){

  useEffect(()=>{
    console.log("Se ejecuta cuando se monta el componente")

    return ()=>{
      console.log("Se ejecuta cuando se desmonta el componente")
    }

  }, [])


  if(show){
    return <p>{children}</p>
  }

  return null;
}


function App(){
  /// codigo javascript
  console.log("Renderizado App")

  return (
    <div>
      <Header />
      <ProductsList />
    </div>
  )
}

export {
  App,
  Header,
  NavBar
}

export default App