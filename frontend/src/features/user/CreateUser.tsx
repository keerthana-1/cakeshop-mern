import { FormEvent, useState } from "react"
import Button from "../../ui/Button";
import { useNavigate } from "react-router-dom";
import { createUser, getUser } from "../../services/apiUsers";

function CreateUser(){

    const navigate=useNavigate();

    async function handleSubmit(e:FormEvent){
        e.preventDefault();
        const user={
            email:email,
            password:password,
            name:name,
            address:address,
            phone:phone

        }
        const data=await getUser(email)
        if(data){
          alert("username already exists")
          return
        }
        await createUser(user)
        alert("Registration Succesful!")
        navigate('/login')
    }

    const [email,setEmail]=useState("")
    const [password,setPassword]=useState("")
    const [name,setName]=useState("")
    const [address,setAddress]=useState("")
    const [phone,setPhone]=useState("")
    
    return (
        <div className="flex items-center justify-center pt-6">
        <div className="w-full max-w-lg">
        
        <form className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4" onSubmit={handleSubmit}>
        <p className="block text-gray-700 text-3xl text-center font-bold mb-2">Register New User</p>

          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" >
              Email
            </label>
            <input onChange={(e)=>setEmail(e.target.value)} className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="email" type="text" placeholder="Email" value={email}/>
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
            <Button> Sign Up</Button>
          </div>
        </form>
      </div>
      </div>
)
}

export default CreateUser;