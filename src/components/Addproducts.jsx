import React, { useState } from 'react'
import Loader from './Loader';
import axios from 'axios';


const Addproducts = () => {
  //introduce the hooks
  const[product_name, setProductName] = useState("");
  const[product_description, setProductDescription] = useState("");
  const[product_cost, setProductCost] = useState("");
  const[product_photo, setProductPhoto] = useState("");
  

  //declare the 
  const[loading,setLoading] = useState(false);
  const[success,setSuccess] = useState("");
  const[error, setError] = useState("");

  
  


  //create the handlesum
  const handlesubmit = async (e) =>{
    e.preventDefault()

    //activate the loading hook
    setLoading(true)



    try{
      const formdata = new FormData()

      formdata.append("product_name",product_name)
      formdata.append("product_description",product_description)
      formdata.append("product_cost",product_cost)
      formdata.append("product_photo",product_photo)
      

      //interact with axios to help w
      const response = await axios.post("https://vanessawambui.alwaysdata.net/api/addproducts",formdata)
      //setloading to default
      setLoading(false)

      //update the success hook with a message
      setSuccess(response.data.message)

      //clear the hooks
      setProductName("");
      setProductDescription("");
      setProductCost("");
      setProductPhoto("");
      

      e.target.reset()

    }
    catch(error){
      //setloading to default
      setLoading(false)
      //update the setError with a message

      setError(error.message)

    }

  }
  

  return (
    <div className= "row justify-content-center mt-4">
      <div className="col-md-6 card shadow p-4">
        <h3>Welcome to add products page</h3>
        {/* bind the loading hook */}
        {loading && <Loader/>}

        <h5 className="text-success">{success}</h5>
        <h5 className="text-danger">{error}</h5>

        <form onSubmit={handlesubmit}>
          <input type="text"
          placeholder='Enter the  event name'
          className='form-control'
          required
          value={product_name}
          onChange={(e) => setProductName(e.target.value)} /> <br />

          {/* {product_name} */}

          <input type="text"
          placeholder='Enter the event description'
          className='form-control'
          required 
          value={product_description}
          onChange={(e) => setProductDescription(e.target.value)}/>  <br />

          {/* {product_description} */}

          <input type="number"
          placeholder='Enter the price of ticket '
          className='form-control'
          required
          value={product_cost}
          onChange={(e) => setProductCost(e.target.value)} />  <br />

          {/* {product_cost} */}
        


          <label className='text-primary'>Product Photo</label>
          <input type="file"
          className='form-control'
          required
          accept='image/*'
          onChange={(e) => setProductPhoto(e.target.files[0])} /> <br />

          <input type="submit"
          value="Add product"
          className='btn btn-outline-primary' />

          

        </form>
      </div>
      
    </div>
  )
}

export default Addproducts;
