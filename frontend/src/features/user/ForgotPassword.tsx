import { FormEvent, useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { LoginContext } from "../../ui/LoginContext";
import Button from "../../ui/Button";
import { updatePassword } from "../../services/apiUsers";

function ForgotPassword(){

    const navigate=useNavigate();
    const [newPassword,setNewPassword] = useState("");
    const [confirmPassword,setConfirmPassword] = useState("");

    const LoginProviderValues=useContext(LoginContext);
    if (!LoginProviderValues) {
        return null; // Handles the case where context is not provided
      }
    
    const { username, setUsername , setPassword} = LoginProviderValues;
    

    async function handleSubmit(e:FormEvent){
        e.preventDefault()
        console.log(username)
        if(newPassword!==confirmPassword){
            alert("password doesn't match")
            return
        }
        await updatePassword(username,newPassword)
        setPassword(newPassword)
        alert("password change succesful")
        navigate('/login')
    }

      return (
          <div className="flex items-center justify-center mt-40">
          <div className="w-full max-w-lg">
          
          <form className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4" onSubmit={handleSubmit}>
          <p className="block text-gray-700 text-3xl text-center font-bold mb-2">Change Password</p>
  
            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2" >
                Email
              </label>
              <input onChange={(e)=>setUsername(e.target.value)} className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="username" type="text" placeholder="Username" value={username}/>
            </div>
            <div className="mb-6">
              <label className="block text-gray-700 text-sm font-bold mb-2">
                Password
              </label>
              <input onChange={(e)=>setNewPassword(e.target.value)} className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline" id="password" type="password" placeholder="****" value={newPassword}/>
             </div>

             <div className="mb-6">
              <label className="block text-gray-700 text-sm font-bold mb-2">
                Confirm Password
              </label>
              <input onChange={(e)=>setConfirmPassword(e.target.value)} className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline" id="confirmpassword" type="password" placeholder="****" value={confirmPassword}/>
             </div>

            <div className="text-center">
              <Button> Update Password </Button>
            </div>
          </form>
        </div>
        </div>
  )
  }
  
  export default ForgotPassword;