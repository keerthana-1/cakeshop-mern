import { useContext, useEffect, useState } from "react";
import { getUserOrder, orderType } from "../../services/apiOrder";
import { LoginContext } from "../../ui/LoginContext";
import { Loader } from "../../ui/Loader";
import { cartType, getCart } from "../../services/apiCart";

function OrderDetails(){

    const LoginProviderValues = useContext(LoginContext);
    const [loading,setLoading] = useState(true);
    const [order, setOrder] = useState<orderType|null>(null);
    const [cart, setCart] = useState<cartType|null>(null);

    if(!LoginProviderValues){
        return;
    }

    const {username} = LoginProviderValues;

    useEffect(()=>{

        async function fetchOrder(){
                try{
                    const data = await getUserOrder(username)
                    setOrder(data)
                }
                catch(err){
                    console.log(err)
                }
                finally{
                    setLoading(false)
                }
        }
        fetchOrder()

       
    },[])

    useEffect(()=>{

        async function fetchCart(){
                try{
                    if(order){ 
                        const cartData = await getCart(order.cart_id)
                        setCart(cartData);}
                }
                catch(err){
                    console.log(err)
                }
                finally{
                    setLoading(false)
                }
        }
        fetchCart()

       
    },[order])

    if(loading) return <Loader></Loader>

    return (
        <div className="m-32">
        <div className="p-10 bg-white shadow-md h-auto" >
            <div className="flex justify-between">
                <p className="text-3xl font-bold">Your Order #{order?.order_id} is Confirmed</p>
                <div className=" bg-pink-500 w-64 h-10 rounded-3xl text-center">
                <p className="text-xl font-bold pt-1 text-white">status:&nbsp;{order?.status}</p>
                </div>
            </div>    
            <div>
                {cart?.cartItems.map((cart_item,key)=>(
                    <div key={key} className="pt-10">
                        <div className="flex">
                            <div className="pr-10">
                                <img className="w-32 h-32 image-cover" src={`./${cart_item.image}`} />
                            </div>
                            <div>
                            <p className="text-xl font-bold">{cart_item.cakeName}</p>
                            <p>{cart_item.quantity}&nbsp;x&nbsp;{cart_item.price}</p>
                            {cart_item.message && <p className="text-lg">Message on cake: {cart_item.message}</p>}
                            {cart_item.toppings.map((topping,key)=>(
                                <p key={key}>{topping}</p>
                            ))}
                            </div>
                        </div>
                    </div>
                ))}
            </div>        
        </div>
        </div>
    )

}

export default OrderDetails;