import axios from 'axios';
import React, { useEffect, useState } from 'react'
import Loader from './Loader';
import { useNavigate } from 'react-router-dom';
import Footer from './Footer';
import Mycarousel from './Mycarousel';

const Getproducts = () => {

  //initialize our hookks to help you manage the state of your spplication

  const[products, setProducts] = useState([]);
  const[loading, setLoading] = useState(false);
  const[error,setError] = useState("");

  //declare the navigate hook
  const navigate = useNavigate()

  //below we specify the image base url
  const img_url ="https://vanessawambui.alwaysdata.net/static/images/"

  //create a function to help you fetch products from the api
  const fetchProducts = async() => {
    try{

      //4. update the loading hook
      setLoading(true)
      //5.  Interact with your endpoint for fetching the products
      const response = await axios.get("https://vanessawambui.alwaysdata.net/api/getproducts")

      // Update the products hook with the response given from the api

      setProducts(response.data)

      //7. set the loading hook back to default
      setLoading(false)


    }
    catch(error){
      //if there is an error , set the loading hook back to default
      setLoading(false)

      //update the error hook with a meesage
      setError(error.message)

    }
  }
  //we shall use the use effect hook that automatically rerenders new features incase of any changes
  useEffect(() => {
    fetchProducts()
  },[]);

  //console.log(products)

  return (
    
      <div className='row'>
      <h3 className='text-primary'>Available Movies</h3>
      <Mycarousel/>
      {loading && <Loader/>}
      <h4 className='text-danger'>{error}</h4>

      {/*map products from api to user interphase*/}

      {products.map((product)   =>  (
           <div className="col-md-3 justify-content-center mb-3 " >
       <div className="card shadow cod">
         <img
          src={img_url + product.product_photo}
          alt="product name"
          className='product_img mt-4 cod' />

         <div className="card-body cod">
          <h5 className='text-primary'>
            {product.product_name}
          </h5>

          <p className="text-dark">{product.product_description.slice(0, 100)}... </p>

          <h4 className="text-info">Kes {product.product_cost}</h4>

          <button className="btn btn-outline-info" onClick={() => navigate("/makepayment", {state : {product}})} >Buy Ticket</button>
         </div>

       </div>
      </div>
      )  )}

      <Footer/>


   
    </div>
    



  
    

   
      

    
  )
}

export default Getproducts;
