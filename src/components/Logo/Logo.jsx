import React from 'react'
import { Link } from 'react-router';
// import logo from "../../assets/images/logo.png"
 import logo from "../../assets/images/ecommerce.png"


const Logo = () => {
    return (
      <Link to ="/">
        <div className = "flex items-center w-16 h-16">
       <img  className ="w-16 h-16 rounded-full object-cover "
       src={logo} alt="" />
      <h3 className="text-3xl 
        font-bold ms-2. text-indigo-700">
        MicroTask</h3>
        </div>
      </Link>
    );
};

export default Logo;