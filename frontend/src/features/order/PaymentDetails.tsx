import Button from "../../ui/Button";
import { useState,useContext, FormEvent } from "react";
import { OrderContext } from "../../ui/OrderContext";

interface PaymentDetailsProps {
    handleClick: () => void; 
}


function PaymentDetails({handleClick}: PaymentDetailsProps){

    const inputStyle="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
    const labelStyle="block text-gray-700 text-sm font-bold mb-2 text-left"

    const [cardNumber,setCardNumber]=useState("")
    const [name,setName]=useState("")
    const [security,setSecurity]=useState("")
    const [expiry,setExpiry]=useState("")

    const OrderProviderValues = useContext(OrderContext);
    if(!OrderProviderValues){
        return
    }
    const {dispatch}=OrderProviderValues;

    function handleOrder(e:FormEvent){
        e.preventDefault()
        handleClick()
        dispatch({"type":"UPDATE_PAYMENT","payload":{"card_number":cardNumber,"expiry":expiry,"name":name,"security_code":security}})
        alert("ordered")
    }

    return (
        <div className="flex justify-center items-center">
        <div className="w-1/2">
        <h1 className="text-2xl text-center font-bold mb-6">Payment Details</h1>
        <form className="space-y-4" onSubmit={handleOrder}>
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

            <Button>Place Order</Button>
        </form>

        
    </div>
    </div>
    )
}

export default PaymentDetails;