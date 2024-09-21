import { CartContext } from "../../ui/CartContext";
import {  cartType, insertCart } from "../../services/apiCart";

import { OrderContext } from "../../ui/OrderContext";
import { LoginContext } from "../../ui/LoginContext";
import { useContext } from "react";
import ShippingDetails from "./ShippingDetails";
import PaymentDetails from "./PaymentDetails";
import { Link } from "react-router-dom";

function Checkout(){

    const CartProviderValues = useContext(CartContext);
    const LoginProviderValues = useContext(LoginContext);
    const OrderProviderValues = useContext(OrderContext);

    if(!CartProviderValues || !LoginProviderValues || !OrderProviderValues){
        return
    }

    const {state,dispatch}=CartProviderValues;
    const {username}=LoginProviderValues;
    const {state:order_state,dispatch:order_dispatch}=OrderProviderValues
    
    function handleCart(){
    try{
        const cart:cartType={
            cartid: state.cartid,
            username:username,
            cartItems:state.cartItems,
            totalItems:state.totalItems,
            totalPrice:state.totalPrice
        }
        insertCart(cart)
        dispatch({"type":"CLEAR_CART"})
    }
    catch(err){
        console.log(err);
    }

    }

    function handleBackClick(){
        order_dispatch({ type: "SET_SHIPPING", payload: true });
    }

    const shipping=(state.totalPrice*15)/100;
    const taxes=(state.totalPrice*5)/100;
    const total=state.totalPrice+shipping+taxes;

    return (
        <div className="grid grid-cols-[3fr_1fr] m-20">
            <div className="mr-10">
            <div className="bg-white shadow-md" style={{"height":"600px"}}>
                <div className="flex space-x-4 justify-center pt-10">
                    <div className={` flex space-x-4 ${order_state.is_shipping ? 'text-pink-500 font-bold text-xl' : 'text-gray-400'}`}>
                    <p>Shipping</p>
                    <div className="w-72 pt-4">
                    <hr></hr>
                    </div>
                    </div>
                    
                    <div className={` ${!order_state.is_shipping ? 'text-pink-500 font-bold text-xl' : 'text-gray-400'}`}>
                    <p>Payment</p>
                    </div>
                    
                </div> 
                <div className="pt-10">  
                {order_state.is_shipping && <ShippingDetails></ShippingDetails>}
                {!order_state.is_shipping && <PaymentDetails handleClick={handleCart} handleBackClick={handleBackClick}></PaymentDetails>}
                </div>  
            </div>
            </div>
        
            <div  className="bg-white shadow-md h-64 pt-5 pl-5 pr-5">
                <div className="pb-2">
                    <p className="text-3xl font-bold">Order Summary</p>
                </div>
                <hr></hr>
                <div className="flex pt-2 justify-between pb-2">
                <p> {state.totalItems} item(s) in cart</p>
                <Link to="/cart" className="text-pink-500 underline">Details</Link>
                </div>
                <hr></hr>
                <div className="pt-2 pb-2">
                    <div className="flex justify-between">
                        <p>Order Subtotal</p>
                        <p>$ {state.totalPrice.toFixed(2)}</p>
                    </div>
                    <div className="flex justify-between">
                        <p>Shipping Charges</p>
                        <p>$ {shipping.toFixed(2)}</p>
                    </div>
                    <div className="flex justify-between">
                        <p>taxes</p>
                        <p>$ {taxes.toFixed(2)}</p>
                    </div>
                </div>
                <hr></hr>
                <div className=" flex justify-between pt-3">
                    <p className="text-2xl font-bold">Order Total</p>
                    <p className="text-2xl font-bold">$ {total.toFixed(2)}</p>
                </div>
            </div>
            </div>
       
       
    )
}

export default Checkout;