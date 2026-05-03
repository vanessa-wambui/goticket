import axios from 'axios';
import React, { useEffect, useState } from 'react'
import Loader from './Loader';
import { useNavigate } from 'react-router-dom';
import Footer from './Footer';
import Mycarousel from './Mycarousel';

const Getproducts = () => {

  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error,setError] = useState("");

  const navigate = useNavigate()

  const img_url ="https://vanessawambui.alwaysdata.net/static/images/"

  const fetchProducts = async() => {
    try{
      setLoading(true)
      const response = await axios.get("https://vanessawambui.alwaysdata.net/api/getproducts")
      setProducts(response.data)
      setLoading(false)
    }
    catch(error){
      setLoading(false)
      setError(error.message)
    }
  }

  useEffect(() => {
    fetchProducts()
  },[]);

  return (
    <div className='container'>
      <h3 className='text-primary text-center'>Available Movies</h3>

      <Mycarousel/>

      {loading && <Loader/>}
      <h4 className='text-danger text-center'>{error}</h4>

      <div className="row">
        {products.map((product) => (
          <div className="col-md-3  justify-content-center" key={product.id}>
            
            <div className="card"
            style={{
              backgroundColor : 'black'
            }}>
              
              <img
                src={img_url + product.product_photo}
                alt="product"
                className='product_img'
              />

              <div >
                <h5 >
                  {product.product_name}
                </h5>

                <p>
                  {product.product_description.slice(0, 100)}...
                </p>

                <h4>
                  Kes {product.product_cost}
                </h4>

                <button 
                  className="btn btn-info"
                  onClick={() => navigate("/makepayment", {state : {product}})}
                >
                  Buy Ticket
                </button>
              </div>

            </div>

          </div>
        ))}
      </div>

      <Footer/>
    </div>
  )
}

export default Getproducts;