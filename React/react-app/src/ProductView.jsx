import { useEffect, useState } from "react"

function ProductView({product_id}){
  const [product, setProduct] = useState({})

  useEffect(()=>{
    fetch(`http://localhost:2023/products/${product_id}`)
    .then((response) => response.json())
    .then((data)=>{
      setProduct(data)
    })
  }, [product_id])

  return (
    <div>
      <h3>{product_id}</h3>
      <p>{product.name}</p>
    </div>
  )
}

export default ProductView