import Button from "../../ui/Button";
import { useState,useContext, FormEvent } from "react";
import { OrderContext } from "../../ui/OrderContext";


function ShippingDetails(){

    const inputStyle="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
    const labelStyle="block text-gray-700 text-sm font-bold mb-2 text-left"
    const [name,setName]=useState("");
    const [phone,setPhone]=useState("");
    const [address,setAddress]=useState("");
    const [delivery,setDelivery]=useState("");
    
    const OrderProviderValues = useContext(OrderContext);
    if(!OrderProviderValues){
        return
    }
    const {dispatch}=OrderProviderValues;

    function nextClick(e:FormEvent){
        e.preventDefault()
        dispatch({"type":"UPDATE_SHIPPING","payload":{"name":name,"address":address,"phone":phone,"delivery":delivery,"is_shipping":false}})
    }

    return(
        <div className="flex justify-center items-center">
        <div className="w-1/2">
            <form className="space-y-4">
                <div className=" mb-4">
                    <label className={labelStyle}>Name</label>
                    <input onChange={(e)=>setName(e.target.value)} type="text" className={inputStyle} value={name} />
                </div>

                <div className="mb-4">
                    <label className={labelStyle}>Phone</label>
                    <input onChange={(e)=>setPhone(e.target.value)} type="text" className={inputStyle} value={phone} />
                </div>

                <div className=" mb-4">
                    <label className={labelStyle}>Address</label>
                    <input onChange={(e)=>setAddress(e.target.value)} type="text" className={inputStyle} value={address} />
                </div>

                <div className="  mb-4">
                    <label className={labelStyle}>Delivery Date</label>
                    <input onChange={(e)=>setDelivery(e.target.value)} type="date" className={inputStyle} value={delivery} />
                </div>
                <div className="pt-10 text-right">
                <Button onClick={nextClick}>Next</Button>
                </div>
            </form>
        </div>
        </div>
    )
}

export default ShippingDetails;