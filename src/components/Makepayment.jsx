import React, { useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import Loader from './Loader'
import axios from 'axios'


const Makepayment = () => {

    //destructure the details passed from the get products component
    //the use location hook allows us to get theproperties passed from the prev component
    const {product} = useLocation().state || {}
     //declare the navigate hook
  const navigate = useNavigate()
    // console.log(product)
    //below we specify the image base url
  const img_url="https://vanessawambui.alwaysdata.net/static/images/"

  //initialize hooks to mnage the state of your app
  const[number, setNumber] = useState("");
  const[loading,setLoading] = useState(false);
  const[success,setSuccess] = useState("");
  const[error, setError] = useState("");

  //create a function that will handle the submit action
  const handlesubmit = async (e) =>{
    //prevent the site from reloading
    e.preventDefault() 

  
    //update the loading hook
    setLoading(true)

    try{
        //create a form data object
        const formdata = new FormData()

        //append the 
        formdata.append("phone", number)
        formdata.append("amount", product.product_cost)

        const response = await axios.post("https://kbenkamotho.alwaysdata.net/api/mpesa_payment", formdata)

        //set loadind to false
        setLoading(false)

        setSuccess(response.data.message)
            
    }
    catch{
        //respond to error if it is there
        setLoading(false)

        //update the error hook
        setError(error.message)
    }

  }
  

  return (
    
    
    // <button className="btn btn-outline-primary">Back to Products</button>
    <div className='row justify-content-center'>
        
        <h1 className='text-success'>Mpesa Payment - Lipa na Mpesa</h1>

          <div className="col-md-1">
            <input type="button"
            className="btn btn-primary"
            value="<- Back "
            onClick={() => navigate("/")}
             />
        </div>
        <div className="card shadow p-4 col-md-6">
            <img src={img_url + product.product_photo} alt="Product" className='product_img' />

            <div className="card-body">
            <h1 className='text-info'>{product.product_name}</h1>
            <p className="text-dark">{product.product_description}</p>

            <b className='text-success'> Kes {product.product_cost}</b>
            <br /> <br />
            <form onSubmit={handlesubmit}>

                 {/* bind the loading hook */}
                {loading && <Loader />}
                <h3 className="text-success"> {success} </h3>
                <h4 className="text-danger"> {error} </h4>
                <input type="number"
                placeholder='Enter your phone number(254XXXXXXXXX)'
                className='form-control'
                required
                value={number}
                onChange={(e) => setNumber(e.target.value)}
                /> <br />

                <input type="submit"
                value="Make payment"
                className='btn btn-success' />


            </form>
            <br />

        
        </div>
        </div>

        
    </div>

  )
}
export default Makepayment;