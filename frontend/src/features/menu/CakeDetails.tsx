import { FormEvent, useContext, useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { cakeType, getCakeWithName } from "../../services/apiCakes";
import { Loader } from "../../ui/Loader";
import Button from "../../ui/Button";
import { LoginContext } from "../../ui/LoginContext";
// import {  getCartId } from "../../services/apiCart";
import {CartContext} from "../../ui/CartContext";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function CakeDetails(){

    const {cake}=useParams<{cake:string}>();
    const [loading,setLoading]=useState(true);
    const [cakeDetails,setCakeDetails]=useState<cakeType|undefined>()
    const [message,setMessage]=useState("")
    const [qty,setQty]=useState(1)
    const [toppings,setToppings] = useState<string[]>([]);
    const topping_list = ['Sprinkles', 'Chocolate Chips', 'Whipped Cream', 'Fresh Berries'];
    const LoginProviderValues = useContext(LoginContext)
    const CartProviderValues = useContext(CartContext)

    useEffect(()=>{
        async function fetchCakeDetails(){
            try{
                 const data = await getCakeWithName(cake)
                 setCakeDetails(data)   
                
            }
            catch(err){
                console.log(err)
            }
            finally{
                setLoading(false)
            }
        }
        fetchCakeDetails()
    },[cake])

    const handleToppingChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { value, checked } = e.target;
        if (checked) {
          setToppings([...toppings, value]);
        } else {
          setToppings(toppings.filter(topping => topping !== value));
        }
      };

      
    async function handleClick(e:FormEvent){
        e.preventDefault();
        if (!cakeDetails || !LoginProviderValues || !CartProviderValues) {
            return;
        }

        const { username } = LoginProviderValues;
        const { state, dispatch } = CartProviderValues;

        const cart_data = state

        if(cart_data && Array.isArray(cart_data) && cart_data.length > 0){
            if(state.cartid===""){
                dispatch({"type":"UPDATE_CARTID","payload":{"username":username,"cartid":cart_data[0].cartid}})
            }
        }
        else{
            const now=new Date()
            const cart_id= `${now.getFullYear()}${String(now.getMonth() + 1).padStart(2, '0')}${String(now.getDate()).padStart(2, '0')}${String(now.getHours()).padStart(2, '0')}${String(now.getMinutes()).padStart(2, '0')}${String(now.getSeconds()).padStart(2, '0')}${String(now.getMilliseconds()).padStart(3, '0')}`
            dispatch({"type":"UPDATE_CARTID","payload":{"username":username,"cartid":cart_id}})
        }


       dispatch({"type":"ADD_TO_CART","payload":{"cakeName":cakeDetails.name,"message":message,"quantity":qty,"price":cakeDetails.price,"toppings":toppings}})
       toast("Item added to cart!")
    
    }


    if(loading) return (<Loader></Loader>)

    return (
        
        <div className="grid grid-cols-2 h-screen}">
            <div className="pl-5"> 
            <div className="pt-10 ">
                <div className="mb-5 text-pink-500">
                <Link  className="hover:underline" to='/menu'> <span className="text-xl">&#8249;</span> Back</Link>
                </div>
                <img className="w-full h-2/3 object-cover" src={`../${cakeDetails?.image}`}></img>
            </div>
            <div className="font-thin italic pt-3 text-sm">
                <p>* All cakes are vegan and gluten-free </p>
            </div>
            </div>
            <div className="pl-10 pr-10">
            <ToastContainer hideProgressBar={true} position="bottom-center" toastClassName="default-toast"></ToastContainer>
      
                <form>
                <div className="font-bold text-3xl text-stone-700 pt-10">
                <h3>{cakeDetails?.name}</h3>
                </div>
                <div className="font-thin italic pt-4">
                <p>{cakeDetails?.description}</p>
                </div>

                <div>
                <p className="font-semibold pt-8 text-pink-500 text-3xl">💰{cakeDetails?.price.toFixed(2)}</p>
                <p className="font-thin text-pink-500 italic text-sm">+ shipping charges</p>
                </div>
               
                {/* <div className="font-semibold italic pt-4">
                <p>Flavor - {cakeDetails?.flavor}</p>
                </div> */}

               
                <div className="flex items-center pt-10">
                <label className="block text-gray-700 text-base font-semibold mb-2 mr-2">Add a Message 📜 : </label>
                <input onChange={(e)=>setMessage(e.target.value)} className="shadow appearance-none border rounded w-auto py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" type="text" id="message" name="message" value={message}></input>
                </div>
                <div className="flex items-center pt-8">
                <label className="block text-gray-700 text-base font-semibold mb-2 mr-2">Select Quantity: </label>
                <input onChange={(e)=>setQty(e.target.valueAsNumber)} className="shadow appearance-none border rounded w-auto py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" type="number" min="1" max="10" step="1" value={qty}></input>
                </div>
                <div className=" pt-8">
                <label className="block text-gray-700 text-base font-semibold mb-4 mr-2">Choose Toppings:</label>
                <div className="grid grid-cols-2 gap-2">
                    {topping_list.map((topping, index) => (
                    <div key={index} className="flex items-center">
                        <input
                        type="checkbox"
                        value={topping}
                        onChange={handleToppingChange}
                        className="mr-2"
                        />
                        <label className="text-gray-700">{topping}</label>
                    </div>
                    ))}
                </div>
                </div>
              
                <div className="flex items-center pt-8">
                    <Button onClick={handleClick}>Add to Cart</Button>
                </div>             
                </form>
            </div>
        </div>
      
    )
}

export default CakeDetails;