import './App.css' /// vitejs

/// Componentes funcionales
/// Los nombres de los componentes utilizan PascalCase

/*
  () => valor_de_retorno
  () => { return valor_de_retorno }
*/

const NavBar = ({dark}) => 
{
  let className = 'nav-principal'

  if(dark){
    className += ' nav-principal--dark'
  }

  return (
  <nav>
    <ul className={className}>
      <li className="nav-principal__item"><a href="#">Home</a></li>
      <li className="nav-principal__item"><a href="#">Nosotros</a></li>
      <li className="nav-principal__item"><a href="#">Contacto</a></li>
    </ul>
  </nav>
)}

const Titulo = ({children})=>{

  return (<h1>{children}</h1>)
}

const Header = () => {
  // codigo javascript

  return (
    <header>
      <Titulo>
        <spam>Titulo de mi web!</spam>
      </Titulo>
      <NavBar dark={true} />
      <NavBar />
    </header>
  )
}

function App(){
  /// codigo javascript

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