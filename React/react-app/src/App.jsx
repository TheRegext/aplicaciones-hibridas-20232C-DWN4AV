import { useState, useEffect } from 'react'
import './App.css' /// vitejs
import ProductsList from './ProductsList'
import AboutPage from './pages/AboutPage'
import ContactPage from './pages/ContactPage'
import NotFoundPage from './pages/NotFoundPage'
import ProductViewPage from './pages/ProductViewPage'
import LoginPage from './pages/LoginPage'
import RoutePrivate from './components/RoutePrivate'


import { createBrowserRouter, RouterProvider, Outlet, Link } from 'react-router-dom'

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
      {links.map((elemnto, index) => {
        if(elemnto.private && !localStorage.getItem('token')){
          return null
        }
        
        return <li key={index} className="nav-principal__item">
          <Link to={elemnto.url}>{elemnto.texto}</Link>
        </li>}
        )}
    </ul>
  </nav>
)}

const Titulo = ({children})=>{

  return (<h1>{children}</h1>)
}



const Header = () => {
  console.log("Renderizado de Header")
  const [links, setLinks] = useState([
    {url: '/', texto: 'Home', },
    {url: '/products', texto: "Productos", private:true},
    {url: '/about', texto: 'Nosotros'},
    {url: '/contact', texto: 'Contacto'},
    {url: '/faq', texto: 'FAQ'},
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


function AppMain(){
  return (
    <div>
      <Header />
      <h1>App Main</h1>
      <Outlet />
    </div>
  )
}

const route = createBrowserRouter([
  {
    path: '/',
    element: <AppMain />,
    errorElement: <NotFoundPage />,
    children:[
      {
        path: 'products',
        element: <RoutePrivate><Outlet /></RoutePrivate>,
        children:[
          {
           path: '',
           element: <ProductsList />
          },{
            path: ':idProduct',
            element: <ProductViewPage />
          }
        ]

      },
      {
        path: 'about',
        element: <AboutPage />
      },
      {
        path: 'contact',
        element: <ContactPage />
      }
    ]
  },
  {
    path: '/login',
    element: <LoginPage />
  }
])

function App(){
  return <>
    
    <RouterProvider router={route} />
  </>
}



export {
  App,
  Header,
  NavBar
}

export default App