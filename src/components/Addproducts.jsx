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
  
  const styles = {
    pageBackground: {
      minHeight: '100vh',
      backgroundColor: '#0d0d0d',
      padding: '40px 20px'
    },
    cardContainer: {
      backgroundColor: '#1a1a1a',
      borderRadius: '16px',
      padding: '40px',
      maxWidth: '500px',
      margin: '0 auto',
      border: '1px solid #2a2a2a'
    },
    logoContainer: {
      textAlign: 'center',
      marginBottom: '30px'
    },
    logoText: {
      fontSize: '28px',
      fontWeight: 'bold',
      color: '#fff',
      margin: 0
    },
    logoHighlight: {
      color: '#f5c518'
    },
    input: {
      backgroundColor: '#2a2a2a',
      border: '1px solid #3a3a3a',
      color: '#fff',
      borderRadius: '8px',
      padding: '12px 16px',
      width: '100%',
      fontSize: '14px',
      transition: 'border-color 0.3s ease'
    },
    inputFocus: {
      outline: 'none',
      borderColor: '#f5c518'
    },
    label: {
      color: '#aaa',
      fontSize: '14px',
      marginBottom: '8px',
      display: 'block'
    },
    submitBtn: {
      backgroundColor: '#f5c518',
      color: '#000',
      border: 'none',
      borderRadius: '8px',
      padding: '12px',
      width: '100%',
      fontSize: '16px',
      fontWeight: '600',
      cursor: 'pointer',
      transition: 'background-color 0.3s ease'
    },
    successMsg: {
      color: '#4caf50',
      fontSize: '14px',
      textAlign: 'center',
      marginBottom: '15px'
    },
    errorMsg: {
      color: '#f44336',
      fontSize: '14px',
      textAlign: 'center',
      marginBottom: '15px'
    }
  }

  return (
    <div style={styles.pageBackground}>
      <div style={styles.cardContainer}>
        {/* GoTicket Logo */}
        <div style={styles.logoContainer}>
          <h2 style={styles.logoText}>
            Go<span style={styles.logoHighlight}>Ticket</span>
          </h2>
        </div>

        {/* bind the loading hook */}
        {loading && <Loader/>}

        {success && <h5 style={styles.successMsg}>{success}</h5>}
        {error && <h5 style={styles.errorMsg}>{error}</h5>}

        <form onSubmit={handlesubmit}>
          <div style={{ marginBottom: '20px' }}>
            <label style={styles.label}>Product Name</label>
            <input 
              type="text"
              placeholder='Enter the product name'
              style={styles.input}
              onFocus={(e) => e.target.style.borderColor = '#f5c518'}
              onBlur={(e) => e.target.style.borderColor = '#3a3a3a'}
              required
              value={product_name}
              onChange={(e) => setProductName(e.target.value)} 
            />
          </div>

          <div style={{ marginBottom: '20px' }}>
            <label style={styles.label}>Product Description</label>
            <input 
              type="text"
              placeholder='Enter the product description'
              style={styles.input}
              onFocus={(e) => e.target.style.borderColor = '#f5c518'}
              onBlur={(e) => e.target.style.borderColor = '#3a3a3a'}
              required 
              value={product_description}
              onChange={(e) => setProductDescription(e.target.value)}
            />
          </div>

          <div style={{ marginBottom: '20px' }}>
            <label style={styles.label}>Product Price</label>
            <input 
              type="number"
              placeholder='Enter the price of product'
              style={styles.input}
              onFocus={(e) => e.target.style.borderColor = '#f5c518'}
              onBlur={(e) => e.target.style.borderColor = '#3a3a3a'}
              required
              value={product_cost}
              onChange={(e) => setProductCost(e.target.value)} 
            />
          </div>

          <div style={{ marginBottom: '25px' }}>
            <label style={styles.label}>Product Photo</label>
            <input 
              type="file"
              style={{ ...styles.input, padding: '10px 16px' }}
              required
              accept='image/*'
              onChange={(e) => setProductPhoto(e.target.files[0])} 
            />
          </div>

          <button 
            type="submit"
            style={styles.submitBtn}
            onMouseOver={(e) => e.target.style.backgroundColor = '#e6b800'}
            onMouseOut={(e) => e.target.style.backgroundColor = '#f5c518'}
          >
            Add Product
          </button>
        </form>
      </div>
    </div>
  )
}

export default Addproducts;