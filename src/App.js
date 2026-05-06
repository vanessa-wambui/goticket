import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';

import Signin from './components/Signin';
import Signup from './components/Signup';
import Addproducts from './components/Addproducts';
import Getproducts from './components/Getproducts';
import Makepayment from './components/Makepayment';
import Notfound from './components/Notfound';
import Navbar from './components/Navbar';
import Aboutus from './components/Aboutus';

// --- NEW IMPORTS FOR CART FUNCTIONALITY ---
import { CartProvider } from './components/CartContext';
import Cart from './components/Cart';
import Shop from './components/Shop';
import Additem from './components/Additem';


function App() {
  return (
    // 1. WRAP THE ENTIRE APP IN CARTPROVIDER SO THE NAVBAR COUNTER WORKS EVERYWHERE
    <CartProvider>
      <Router>
        <div className="App">
          
          {/* Navbar stays at the top on all pages */}
          <Navbar/>
          
          <Routes>
            <Route path='/' element={<Getproducts />} />
            <Route path='/signin' element={<Signin />} />
            <Route path='/signup' element={<Signup />} />
            <Route path='/addproducts' element={<Addproducts />} />
            <Route path='/makepayment' element={<Makepayment />} />
            <Route path='/aboutus' element={<Aboutus />} />
            <Route path='/shop' element={<Shop/>} />
            <Route path='/additem' element={<Additem/>} />
            
            {/* 2. ADD THE NEW CART ROUTE */}
            <Route path='/cart' element={<Cart />} />
            
            <Route path='*' element={<Notfound />} />
          </Routes>
          
        </div>
      </Router>
    </CartProvider>
  )
}  

export default App;