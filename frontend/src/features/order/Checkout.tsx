import { CartContext } from "../../ui/CartContext";
import {  cartType, insertCart } from "../../services/apiCart";

import { OrderContext } from "../../ui/OrderContext";
import { LoginContext } from "../../ui/LoginContext";
import { useContext } from "react";
import ShippingDetails from "./ShippingDetails";
import PaymentDetails from "./PaymentDetails";

function Checkout(){

    const CartProviderValues = useContext(CartContext);
    const LoginProviderValues = useContext(LoginContext);
    const OrderProviderValues = useContext(OrderContext);

    if(!CartProviderValues || !LoginProviderValues || !OrderProviderValues){
        return
    }

    const {state,dispatch}=CartProviderValues;
    const {username}=LoginProviderValues;
    const {state:order_state}=OrderProviderValues
    
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
        alert("order placed")
        dispatch({"type":"CLEAR_CART"})
    }
    catch(err){
        console.log(err);
    }

    }

    return (
            <div className="pt-6">
                {order_state.is_shipping && <ShippingDetails></ShippingDetails>}
                {!order_state.is_shipping && <PaymentDetails handleClick={handleCart}></PaymentDetails>}
            </div>
       
    )
}

export default Checkout;