import { useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom'
import { Icon, Dropdown } from 'semantic-ui-react'
import {LoginContext} from './LoginContext';
import { getUser, userType } from '../services/apiUsers';

function UserProfile(){

    const navigate = useNavigate();
    const LoginProviderValues=useContext(LoginContext);

    const trigger = (
        <Icon name='user circle' />
      )
    
    if(!LoginProviderValues){
        return null
    }

    const {isLogin,setIsLogin,username,isAdmin,isGoogleLogin,setIsGoogleLogin} = LoginProviderValues;
    const [user,setUser] = useState<userType|null>(null);

    useEffect(()=>{
        async function fetchData() {
            try{

                const data= await getUser(username)
                setUser(data)
                
            }
            catch(err){
                console.log(err)
            }
            
        }
        fetchData()
    },[username])

    function handleProfileClick(){
        navigate("./updateprofile")
    }

    function handleOrdersClick(){
        navigate("./orders")
    }

    function handleLogout(){
        setIsLogin(false);
        setIsGoogleLogin(false);
        navigate("/")
    }

    const options = [
        { key: 'name', text: `Hello, ${user?.name}`, className:'break-words'},
        { key: 'profile', text: 'Profile', onClick: handleProfileClick },
        { key: 'my-orders', text: 'Orders', onClick: handleOrdersClick },
        { key: 'help', text: 'Help'},
        { key: 'sign-out', text: 'Logout', onClick: handleLogout},
      ]

      const Adminoptions = [
        { key: 'name', text: `Hello, ${user?.name}` },
        { key: 'profile', text: 'Profile', onClick: handleProfileClick },
        { key: 'sign-out', text: 'Logout', onClick: handleLogout},
      ]

    return(
        <div>
        {(isLogin || isGoogleLogin) && <div>
            <Dropdown trigger={trigger} options={options}/>
            </div>
        }

        {isAdmin && <div>
            <Dropdown trigger={trigger} options={Adminoptions}/>
            </div>
        }

        </div>
    )


}

export default UserProfile;