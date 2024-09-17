import Button from "../../ui/Button";
import { Link, useNavigate } from "react-router-dom";
import { LoginContext } from "../../ui/LoginContext";
import { FormEvent, useContext } from "react";
import { getPassword } from "../../services/apiUsers";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


// type Action=
// |{type:'updateUsername',value:string}
// |{type:'updatePassword',value:string}

// function userReducer(state:userState,action:Action){
//   switch(action.type){
//     case 'updateUsername':
//       return {...state,username:action.value}
//     case 'updatePassword':
//       return {...state,username:action.value}
//     default:
//       return state
//   }
// }

// interface userState{
//   username:string;
//   password:string;
// }

function Login(){

  const navigate=useNavigate();
  // const initialState:userState={username:'',password:''}
  // const [state,dispatch]=useReducer(userReducer,initialState)
  
  const LoginProviderValues=useContext(LoginContext);
  if (!LoginProviderValues) {
    return null; // Handles the case where context is not provided
  }

  const { username, setUsername, password, setPassword,setIsLogin } = LoginProviderValues;

  async function handleLogin(e:FormEvent){
   e.preventDefault()
   console.log(username)
   const data=await getPassword(username);
   if(data.toString() === password){
      setIsLogin(true);
      navigate('/menu');
    }
    else{
      toast.error("Invalid Credentials")
      setUsername("")
      setPassword("")
    }
    
  }

    return (
        <div className="flex items-center justify-center mt-40">
          
        <div className="w-full max-w-lg">
        <ToastContainer hideProgressBar={true} position="top-center" toastClassName="error-toast"></ToastContainer>
        <form className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4" onSubmit={handleLogin}>
        <p className="block text-gray-700 text-3xl text-center font-bold mb-2">Login</p>

          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" >
              Username
            </label>
            <input onChange={(e)=>setUsername(e.target.value)} className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="username" type="text" placeholder="Username" value={username}/>
          </div>
          <div className="mb-6">
            <label className="block text-gray-700 text-sm font-bold mb-2">
              Password
            </label>
            <input onChange={(e)=>setPassword(e.target.value)} className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline" id="password" type="password" placeholder="****" value={password}/>
           </div>
          <div className="flex items-center justify-between">
            <Button> Sign In</Button>
            <Link className="inline-block align-baseline font-bold text-sm text-blue-500 hover:text-blue-800" to="/forgotpassword">
              Forgot Password?
            </Link>
          </div>
         
        </form>
        <div className="text-center flex justify-center pt-5" >
              <p>New User? <Link to="/createuser" className="font-bold text-blue-500">SignUp</Link></p>
          </div>
      </div>
     
      </div>
)
}

export default Login;