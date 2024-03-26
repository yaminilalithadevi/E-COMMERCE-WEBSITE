//import logo from './logo.svg';
import RegistrationForm from './components/usersignup/register'
import Login from './components/userlogin/login'
import Addproducts from './components/productsform/addproducts'
import Home from './components/home/home'
import ProductDisplay from './components/home/productdisplay'
import Cart from './components/cart/Cart'

import UpdateProduct from './components/UpdateProduct'
import './App.css';
//import signup from "../src/components/register"
import {BrowserRouter,Routes,Route,} from 'react-router-dom'
import  Nav from './Nav'
import PrivateComponent from './components/PrivateComponent'
function App() {
  return (
    <BrowserRouter>
 <Nav/>
 
 <Routes>
 <Route path='/' element={<Home/>}> </Route> 
 <Route element={<PrivateComponent/>}>

  
 <Route path='/' element={<RegistrationForm/>}> </Route>    
  <Route path='/home' element={<Home/>}> </Route>  
  <Route path='/add' element={<Addproducts/>}> </Route>  
  <Route path='/add/update/:id' element={<UpdateProduct/>}> </Route>  
  <Route path='/logout' element={<Home/>}> </Route>  
  <Route path='/profile' element={<h1>Profile Component</h1>}> </Route>  
  <Route  path='/home/product/:id' element={<ProductDisplay/>} ></Route>
  <Route path='/cart/:id' element={<Cart/>} > </Route>
  <Route  path='/register/login' element ={<Login/>}>  </Route> 
    </Route>

   
   <Route  path='/login' element ={<Login/>}>  </Route>
   <Route  path='/register' element ={<RegistrationForm/>}>  </Route> 
 </Routes>
 </BrowserRouter>
);
}

export default App;

{/* <Route  path='/register' element ={<RegistrationForm/>}>  </Route>
  <Route  path='/login' element ={<Login/>}>  </Route>
  <Route  path='/add' element={<Addproducts/>}>   </Route>
  <Route  path='/home'  element={<Home/>}></Route> */}
  