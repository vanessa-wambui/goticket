import './App.css';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import Signin from './components/Signin';
import Signup from './components/Signup';
import Addproducts from './components/Addproducts';
import Getproducts from './components/Getproducts';
import Makepayment from './components/Makepayment';
import Notfound from './components/Notfound';
import Navbar from './components/Navbar';

function App() {
  return (
    <Router>
      <div className="App">
      <header className="App-header">
        <h2>Welcome to GoTicket</h2>
       </header>
       <Navbar/>
        <nav>
        <Link to="/" className='btn btn-primary btn-sm m-2'>Home</Link>
        <Link to="/addproducts" className='btn btn-primary btn-sm m-2'>Add Products</Link>
        <Link to="/signin" className='btn btn-primary btn-sm m-2'>Signin</Link>
        <Link to="/signup" className='btn btn-primary btn-sm m-2'>Sign up</Link>
        
      </nav>
       <Routes>
        <Route path='/' element= {<Getproducts />} />
        <Route path='/signin' element= {<Signin/> } />
        <Route path='/signup' element= {<Signup />} />
        <Route path='/addproducts' element= {<Addproducts/>} />
        <Route path='/makepayment' element={<Makepayment/>} />
        <Route path='*' element= {<Notfound />} />
       </Routes>
    </div>
    </Router>
  )
}  
export default App