import { Link } from "react-router-dom";
import { useContext, useState } from "react";
import { LoginContext } from "./LoginContext";
import '@fortawesome/fontawesome-free/css/all.min.css';
import {CartContext} from "./CartContext";


function Header(){

    const LoginProviderValues=useContext(LoginContext);
    const CartProviderValues=useContext(CartContext);
    
    const [activeTab, setActiveTab] = useState('home');

    // Function to update the active tab
    const handleTabClick = (tabName:string) => {
      setActiveTab(tabName);
    };
  

    if(!LoginProviderValues || !CartProviderValues){
        return null
    }
    const {username,isLogin} = LoginProviderValues;

    const {state} = CartProviderValues;

    return (
        <header className=" flex items-center justify-between bg-pink-200 fixed top-0 left-0 w-full z-50">
        <div className="flex items-center">
          <div className="pt-5 pb-5 ml-5 flex items-center">
            <Link to="/"><img src="/logo.jpg" height="40px" width="40px" alt="Logo" /></Link>
            <h1 className="text-3xl font-serif ml-4">caKe shop</h1> {/* Aligning title beside logo */}
          </div>
        </div>
        
        {/* Navbar Links */}
       
      
        {/* User section */}
        <div className="flex items-center mr-10">

        {!isLogin && (
        <nav className="flex items-center mr-auto ml-10 space-x-8">
          <a
            href="/#home"
            onClick={() => handleTabClick('home')}
            className={`text-lg cursor-pointer ${
              activeTab === 'home' ? 'underline' : ''
            }`}
          >
            Home
          </a>
          <a
            href="/#about"
            onClick={() => handleTabClick('about')}
            className={`text-lg cursor-pointer ${
              activeTab === 'about' ? 'underline' : ''
            }`}
          >
            About
          </a>
          <a
            href="/#reviews"
            onClick={() => handleTabClick('reviews')}
            className={`text-lg cursor-pointer ${
              activeTab === 'reviews' ? 'underline' : ''
            }`}
          >
            Reviews
          </a>
        </nav>
      )}

          <div className="pr-8">
            {isLogin && <p >{username}</p>}
          </div>
          <div>
            {isLogin && (
              <Link className="nav-item nav-link flex items-center cursor-pointer" to="/cart">
                <i className="fa fa-cart-plus text-xl"></i>
                <span className="ml-1 cart-items">{state ? state.totalItems : 0}</span>
              </Link>
            )}
          </div>
        
          {!isLogin && <Link to="/login" onClick={() => handleTabClick('login')}
            className={`text-lg cursor-pointer ${
              activeTab === 'login' ? 'underline' : ''
            }`}>Login/Register</Link>}
        </div>
      </header>
    )
}

export default Header;

