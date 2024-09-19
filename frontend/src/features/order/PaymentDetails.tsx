import Button from "../../ui/Button";
import { useState,useContext, FormEvent } from "react";
import { OrderContext } from "../../ui/OrderContext";
import { useNavigate } from "react-router-dom";
import { CartContext } from "../../ui/CartContext";
import { insertOrder, orderType } from "../../services/apiOrder";
import { LoginContext } from "../../ui/LoginContext";

interface PaymentDetailsProps {
    handleClick: () => void; 
    handleBackClick:() => void;
}


function PaymentDetails({handleClick,handleBackClick}: PaymentDetailsProps){

    const inputStyle="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
    const labelStyle="block text-gray-700 text-sm font-bold mb-2 text-left"

    const [cardNumber,setCardNumber]=useState("")
    const [name,setName]=useState("")
    const [security,setSecurity]=useState("")
    const [expiry,setExpiry]=useState("")
    const navigate = useNavigate();

    const OrderProviderValues = useContext(OrderContext);
    const CartProviderValues = useContext(CartContext);
    const LoginProviderValues = useContext(LoginContext);
    
    if(!OrderProviderValues || !CartProviderValues || !LoginProviderValues){
        return
    }
    const {state,dispatch}=OrderProviderValues;
    const {state:cart_state}=CartProviderValues;
    const {username}=LoginProviderValues;

    function handleOrder(e:FormEvent){
        e.preventDefault()
        dispatch({"type":"UPDATE_PAYMENT","payload":{"card_number":cardNumber,"expiry":expiry,"name":name,"security_code":security}})
        handleClick()
        const now=new Date()
        const order_id= `${now.getFullYear()}${String(now.getMonth() + 1).padStart(2, '0')}${String(now.getDate()).padStart(2, '0')}${String(now.getHours()).padStart(2, '0')}${String(now.getMinutes()).padStart(2, '0')}${String(now.getSeconds()).padStart(2, '0')}${String(now.getMilliseconds()).padStart(3, '0')}`

        const order:orderType={
            order_id: order_id,
            cart_id:cart_state.cartid,
            username: username,
            shipping_data: {
                name: state.shipping_details.name,
                phone: state.shipping_details.phone,
                address: state.shipping_details.address,
                delivery: state.shipping_details.delivery
            },
            payment_data: {
                card_number: cardNumber,
                name: name,
                security_code: security,
                expiry: expiry
            },
            status: "ordered"
        }
        insertOrder(order)
        navigate("/orderdetails")
    }

    return (
        <div className="flex justify-center items-center">
        <div className="w-1/2">
        <form className="space-y-4">
            <div className=" mb-4">
                <label className={labelStyle}>Card Number</label>
                <input onChange={(e)=>setCardNumber(e.target.value)} type="text" className={inputStyle} value={cardNumber}/>
            </div>

            <div className=" mb-4">
                <label className={labelStyle}>Name</label>
                <input onChange={(e)=>setName(e.target.value)} type="text" className={inputStyle} value={name}/>
            </div>

            <div className=" mb-4">
                <label className={labelStyle}>Security Code</label>
                <input onChange={(e)=>setSecurity(e.target.value)} type="text" className={inputStyle} value={security}/>
            </div>

            <div className=" mb-4">
                <label className={labelStyle}>Expiry Date</label>
                <input onChange={(e)=>setExpiry(e.target.value)} type="date" className={inputStyle} value={expiry}/>
            </div>
           
        </form>
        <div className="flex justify-between pt-10">
            <Button onClick={handleBackClick}>Back</Button>
            <Button onClick={handleOrder}>Place Order</Button>
            </div>
        
    </div>
    </div>
    )
}

export default PaymentDetails;