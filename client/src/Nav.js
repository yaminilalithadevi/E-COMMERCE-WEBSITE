import React from "react";
import {Link, useNavigate} from 'react-router-dom'

const Nav=()=>{
    const auth =localStorage.getItem('user')
   console.log("auth==",auth)
    const navigate=useNavigate()
    const logout=()=>{
    localStorage.clear();
    navigate('/register')
 }


    return(
        <div>
            {
                auth ?

                <ul className="nav-ul">
                <li> <Link to='/home'> Products </Link> </li>
                <li> <Link to='/add'>Add Products </Link> </li>
                <li> <Link to='/profile'> Profile </Link> </li>
                <li> <Link to='/cart/product_id'>Cart </Link>   </li>
                <li> <Link  onClick={logout}  to='/logout'>Logout  </Link></li>
                </ul>
                :
                <ul className="nav-ul">  
                    <li> <Link to='/register'> Sign In </Link></li>
                  <li> <Link to='/login'>Login </Link></li>
                </ul>

            }
           </div>
    )
}

export default Nav;

// <div>
// <ul className="nav-ul">
// <li> <Link to='/'> Products </Link> </li>
// <li> <Link to='/add'>Add Products </Link> </li>
// <li> <Link to='update'>Update Products </Link> </li>
// <li> <Link to='/logout'> Logout </Link></li>
// <li> <Link to='/profile'> Profile </Link> </li>

// </ul>

// </div>