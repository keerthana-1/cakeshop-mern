import { useContext } from "react";
import { cartItemType } from "../../services/apiCart";
import {CartContext} from "../../ui/CartContext";

function CartItem({data}:{data:cartItemType} ){

    const CartProviderValues = useContext(CartContext);
    if(!CartProviderValues){
        return
    }
    
    const {state,dispatch}=CartProviderValues;
    const existingCartItem = state.cartItems.find(
        (item) => item.cakeName === data.cakeName)

   function handleIncrement(){
    if(existingCartItem && existingCartItem?.quantity<10){
    dispatch({"type":"ADD_TO_CART","payload":{"cakeName":data.cakeName,"message":data.message,"price":data.price,"quantity":1}})
    }
    }

   function handleDecrement(){
    if(existingCartItem && existingCartItem?.quantity>1){
    dispatch({"type":"ADD_TO_CART","payload":{"cakeName":data.cakeName,"message":data.message,"price":data.price,"quantity":-1}})
    }}

   function handleDelete(){
    dispatch({"type":"DELETE_FROM_CART","payload":data.cakeName})
   }

    return (

        <div className="max-w-5xl mx-auto bg-white shadow-md rounded-lg overflow-hidden flex items-center justify-between mt-4">
            <div className="p-4">
            <h3 className="text-lg font-medium italic text-gray-800 pl-4 pr-4">{data.quantity}&nbsp;&nbsp; x <span className="text-lg font-semibold text-gray-800 pl-4"> {data.cakeName}</span> </h3>
            </div>
            <div className="flex ">
                <div className="flex items-center mr-8">
                    
                     <button className="pr-4" onClick={handleDecrement}>-</button><p className="pr-4">{existingCartItem?.quantity}</p><button onClick={handleIncrement}>+</button>
                </div>
                <button className="pr-4" onClick={handleDelete}>❌</button>
            </div>
        </div>
    )
}

export default CartItem;