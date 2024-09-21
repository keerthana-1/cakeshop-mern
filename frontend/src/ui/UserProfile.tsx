import { useContext } from 'react';
import { useNavigate } from 'react-router-dom'
import { Icon, Dropdown } from 'semantic-ui-react'
import {LoginContext} from './LoginContext';

function UserProfile(){

    const navigate = useNavigate();
    const LoginProviderValues=useContext(LoginContext);

    const trigger = (
        <Icon name='user circle' />
      )
    
    if(!LoginProviderValues){
        return null
    }

    const {setIsLogin} = LoginProviderValues;

    function handleProfileClick(){
        navigate("./updateprofile")
    }

    function handleOrdersClick(){
        navigate("./orders")
    }

    function handleLogout(){
        setIsLogin(false);
        navigate("/")
    }

    const options = [
        { key: 'name', text: 'Hello, Keerthana' },
        { key: 'profile', text: 'Profile', onClick: handleProfileClick },
        { key: 'my-orders', text: 'Orders', onClick: handleOrdersClick },
        { key: 'help', text: 'Help'},
        { key: 'sign-out', text: 'Logout', onClick: handleLogout},
      ]

    return(
        <div>
            <Dropdown trigger={trigger} options={options}/>
        </div>
    )
}

export default UserProfile;