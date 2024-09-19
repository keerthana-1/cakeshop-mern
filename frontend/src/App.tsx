import { RouterProvider, createBrowserRouter } from "react-router-dom";
import Home from "./ui/Home";
import AppLayout from "./ui/AppLayout";
import Signup from "./features/user/Signup";
import Login from "./features/user/Login";
import Menu from "./features/menu/Menu";
import ForgotPassword from "./features/user/ForgotPassword";
import CreateUser from "./features/user/CreateUser";
import CakeDetails from "./features/menu/CakeDetails";
import Checkout from "./features/order/Checkout";
import Cart from "./features/cart/Cart";
import '@fontsource/poppins'; 
import 'semantic-ui-css/semantic.min.css';
import OrderDetails from "./features/order/OrderDetails";


const router=createBrowserRouter([
 { element:<AppLayout></AppLayout>,
    children:[{
      path:'/',
      element:<Home/>
    },
  {
    path:'/menu',
    element:<Menu></Menu>
  },
  {
    path:'/menu/:cake',
    element:<CakeDetails></CakeDetails>
  },
  {
    path:'/signup',
    element:<Signup></Signup>
  },
  {
    path:'/login',
    element:<Login></Login>
  },
  {
    path:'/forgotpassword',
    element:<ForgotPassword></ForgotPassword>
  },
  {
    path:'/createuser',
    element:<CreateUser></CreateUser>
  },
  {
    path:'/cart',
    element:<Cart></Cart>
  },
  {
    path:'/checkout',
    element:<Checkout></Checkout>
  },
  {
    path:'/orderdetails',
    element:<OrderDetails></OrderDetails>
  }
  ] 
}])

function App() {
  
  return (
    <RouterProvider router={router}></RouterProvider>
  )
}

export default App
