import { useEffect, useState } from "react"
import { useParams, useNavigate } from "react-router-dom"

function ProductViewPage({}){
  const [product, setProduct] = useState({})
  const {idProduct} = useParams()
  const navigate = useNavigate()

  useEffect(()=>{
    fetch(`http://localhost:2023/products/${idProduct}`,{
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
    .then((data)=>{
      setProduct(data)
    })
  }, [idProduct])

  return (
    <div>
      <h3>{idProduct}</h3>
      <p>{product.name}</p>
      <p>{product.description}</p>
    </div>
  )
}

export default ProductViewPage