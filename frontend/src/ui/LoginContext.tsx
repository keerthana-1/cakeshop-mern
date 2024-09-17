import { createContext, useState } from "react";


interface loginContextType{
    username:string;
    setUsername:React.Dispatch<React.SetStateAction<string>>;
    password:string;
    setPassword:React.Dispatch<React.SetStateAction<string>>;
    isLogin:boolean;
    setIsLogin:React.Dispatch<React.SetStateAction<boolean>>;
}

export const  LoginContext= createContext<loginContextType|undefined>(undefined)

   
export default function LoginProvider({children}:{children:React.ReactNode}){
    const [username,setUsername]=useState("");
    const [password,setPassword]=useState("");
    const [isLogin,setIsLogin]=useState(false);
    return(
        <LoginContext.Provider value={{username,setUsername,password,setPassword,isLogin,setIsLogin}}>
            {children}
        </LoginContext.Provider>
    )
    
 }
 