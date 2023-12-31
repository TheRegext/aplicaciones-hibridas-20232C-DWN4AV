import { useState, useEffect } from "react"
import ProductView from "./ProductView"
import { Link, useNavigate } from "react-router-dom"


function ProductsList({}){
  const [products, setProducts] = useState([])
  const [error, setError] = useState("")
  const [product_id, setProductId] = useState(0)
  const navigate = useNavigate()

  useEffect(()=>{
    fetch('http://localhost:2023/products',{
      method: 'GET',
      headers: {
        'auth-token': localStorage.getItem('token')
      }
    })
    .then((response) =>{
      if(response.ok){
        return response.json()
      }
      else if(response.status == 401){
        navigate('/login', {replace: true})
        return {}
      }
    })
    .then((data) =>{
      setProducts(data)
    })  

    return ()=>{
      console.log("Se ejecuta cuando se desmonta el componente")
    }

  }, []) // ejecuta solamente cuando se monta el componente

  // actualizaciones
  useEffect(()=>{
    console.log("Cambiar la variable ")
  }, [products])

  const handleError = ()=>{
    setError("Error generado de forma manual")
  }


  return (
  <>
    <h3>Lista de Productos</h3>
    {error}
      <button onClick={handleError}>Mensaje</button>
    <div className="products-list">
    <ul>
    {
      products.map((product) => 
      <li key={product._id}>
        <Link to={`/products/${product._id}`}>{product.name}</Link>
      </li>)
    }
    </ul>
    <ProductView product_id={product_id} />
    </div>
  </>
  )
}

export default ProductsList


