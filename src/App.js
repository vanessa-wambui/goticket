import './App.css';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';

import Signin from './components/Signin';
import Signup from './components/Signup';
import Addproducts from './components/Addproducts';
import Getproducts from './components/Getproducts';
import Makepayment from './components/Makepayment';
import Notfound from './components/Notfound';
import Navbar from './components/Navbar';
import Aboutus from './components/Aboutus';
import { CartProvider } from './components/CartContext';
import Cart from './components/Cart';
import Shop from './components/Shop';
import Additem from './components/Additem';
import MyActivity from './components/Myactivity';
import MakeOrderPayment from './components/MakeOrderPayment';

// ── Guard: logged-in users only ──────────────────────────────
const ProtectedRoute = ({ children }) => {
  const user = JSON.parse(localStorage.getItem("user"));
  if (!user) return <Navigate to="/signin" replace />;
  return children;
};

function App() {
  return (
    <CartProvider>
      <Router>
        <div className="App">
          <Navbar />
          <Routes>

            {/* ── Public ── */}
            <Route path='/' element={<Getproducts />} />
            <Route path='/signin' element={<Signin />} />
            <Route path='/signup' element={<Signup />} />
            <Route path='/shop' element={<Shop />} />
            <Route path='/aboutus' element={<Aboutus />} />

            {/* ── Protected (must be logged in) ── */}
            <Route path='/makepayment' element={<ProtectedRoute><Makepayment /></ProtectedRoute>} />
            <Route path='/makeorderpayment' element={<ProtectedRoute><MakeOrderPayment /></ProtectedRoute>} />
            <Route path='/cart' element={<ProtectedRoute><Cart /></ProtectedRoute>} />
            <Route path='/myactivity' element={<ProtectedRoute><MyActivity /></ProtectedRoute>} />

            {/* ── Admin (passcode protected via Navbar modal) ── */}
            <Route path='/addproducts' element={<Addproducts />} />
            <Route path='/additem' element={<Additem />} />

            <Route path='*' element={<Notfound />} />
          </Routes>
        </div>
      </Router>
    </CartProvider>
  )
}

export default App;