import { FormEvent, useContext, useEffect, useState } from "react";
import { LoginContext } from "../../ui/LoginContext";
import { getUser, updateUser, userType } from "../../services/apiUsers";
import { Loader } from "../../ui/Loader";
import { useNavigate } from "react-router-dom";
import Button from "../../ui/Button";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function UpdateProfile(){

    const LoginProviderValues = useContext(LoginContext);
    const navigate = useNavigate();
    
    if(!LoginProviderValues){
        return
    }

    const {username} = LoginProviderValues

    const [loading,setLoading]=useState(true);
    const [user,setUser] = useState<userType|null>(null);

    
    const [password,setPassword]=useState<string>("")
    const [name,setName]=useState<string>("")
    const [address,setAddress]=useState<string>("")
    const [phone,setPhone]=useState<string>("")

    useEffect(()=>{
        async function fetchData() {
            try{

                const data= await getUser(username)
                setUser(data)
                
            }
            catch(err){
                console.log(err)
            }
            finally{
                setLoading(false)
            }
            
        }
        fetchData()
    },[])

    useEffect(()=>{
        if (user) {
                    setPassword(user.password || ""); // Fallback to empty string
                    setAddress(user.address || "");
                    setPhone(user.phone || "");
                    setName(user.name || "");
                }
    },[user])


    async function handleUpdate(e: FormEvent) {
        e.preventDefault();
    
        try {
          await updateUser(username, { password, address, phone, name });
          toast("Profile Updated Successfully")
        } catch (err) {
          console.error("Failed to update profile", err);
        }
      }

    if(loading) return <Loader></Loader>

   return (

    <div className="mt-10 ml-48 mr-48">
        <div className="pb-7">
            <button className="pt-14 text-lg text-pink-500" onClick={()=>navigate("/menu")}><span className="text-xl">&#8249;</span>Back</button>
        </div>
        <div className="p-10 bg-white shadow-md h-auto">
        <ToastContainer hideProgressBar={true} position="bottom-center" toastClassName="default-toast"></ToastContainer>
      
            <form onSubmit={handleUpdate}>
                    <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2" >
                    Email
                    </label>
                    <input className="disabled shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="email" type="text" placeholder="Email" value={user?.email}/>
                </div>
                <div className="mb-6">
                    <label className="block text-gray-700 text-sm font-bold mb-2">
                    Password
                    </label>
                    <input onChange={(e)=>setPassword(e.target.value)} className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline" id="password" type="text" placeholder="****" value={password}/>
                </div>
                <div className="mb-6">
                    <label className="block text-gray-700 text-sm font-bold mb-2">
                    Name
                    </label>
                    <input onChange={(e)=>setName(e.target.value)} className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline" id="name" type="text" placeholder="name" value={name}/>
                </div>
                <div className="mb-6">
                    <label className="block text-gray-700 text-sm font-bold mb-2">
                    Address
                    </label>
                    <input onChange={(e)=>setAddress(e.target.value)} className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline" id="address" type="text" placeholder="address" value={address}/>
                </div>
                <div className="mb-6">
                    <label className="block text-gray-700 text-sm font-bold mb-2">
                    Phone
                    </label>
                    <input onChange={(e)=>setPhone(e.target.value)} className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline" id="phone" type="text" placeholder="phone number" value={phone}/>
                </div>
                <div className="flex items-center justify-between">
                    <Button> Save </Button>
                </div>
            </form>
        </div>
    </div>
   )

}

export default UpdateProfile;