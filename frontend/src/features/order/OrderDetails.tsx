import { useContext, useEffect, useState } from "react";
import { getUserOrder, orderType } from "../../services/apiOrder";
import { LoginContext } from "../../ui/LoginContext";
import { Loader } from "../../ui/Loader";
import { cartType, getCart } from "../../services/apiCart";
import { useNavigate } from "react-router-dom";

function OrderDetails() {
  const LoginProviderValues = useContext(LoginContext);
  const [orderLoading, setOrderLoading] = useState(true); 
  const [cartLoading, setCartLoading] = useState(true);
  const [order, setOrder] = useState<orderType | null>(null);
  const [cart, setCart] = useState<cartType | null>(null);
  const navigate = useNavigate();

  if (!LoginProviderValues) {
    return null;
  }

  const { username } = LoginProviderValues;

  useEffect(() => {
    async function fetchOrder() {
      try {
        console.log("Fetching order for:", username);
        const data = await getUserOrder(username);
        console.log("Order data fetched:", data);
        setOrder(data);
      } catch (err) {
        console.error("Error fetching order:", err);
      } finally {
        setOrderLoading(false); 
      }
    }
    fetchOrder();
  }, [username]);

  useEffect(() => {
    async function fetchCart() {
      try {
        if (order) {
          console.log("Fetching cart for order:", order.cart_id);
          const cartData = await getCart(order.cart_id);
          console.log("Cart data fetched:", cartData);
          setCart(cartData);
        }
      } catch (err) {
        console.error("Error fetching cart:", err);
      } finally {
        setCartLoading(false); 
      }
    }
    if (order) fetchCart();
  }, [order]);

  
  if (orderLoading || cartLoading) return <Loader />;

  
  if (!order || !cart) {
    return (
      <div className="m-32">
        <p>No order or cart data available.</p>
      </div>
    );
  }

  return (
    <div className="m-32">
      <div className="pb-7">
        <button className="pt-14 text-lg text-pink-500" onClick={() => navigate("/menu")}>
          <span className="text-xl">&#8249;</span>Back to Menu
        </button>
      </div>
      <div className="p-10 bg-white shadow-md h-auto">
        <div className="flex justify-between">
          <p className="text-3xl font-bold">Your Order #{order.order_id} is Confirmed</p>
          <div className="bg-pink-500 w-64 h-10 rounded-3xl text-center">
            <p className="text-xl font-bold pt-1 text-white">Status: {order.status}</p>
          </div>
        </div>

        <div>
          {cart.cartItems.map((cart_item, key) => (
            <div key={key} className="pt-10">
              <div className="flex">
                <div className="pr-10">
                  <img className="w-32 h-32 image-cover" src={`http://localhost:3000/images/${cart_item.image}`} alt="Cake" />
                </div>
                <div>
                  <p className="text-xl font-bold">{cart_item.cakeName}</p>
                  <p>
                    {cart_item.quantity} x {cart_item.price}
                  </p>
                  {cart_item.message && <p className="text-lg">Message on cake: {cart_item.message}</p>}
                  {cart_item.toppings.map((topping, key) => (
                    <p key={key}>{topping}</p>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default OrderDetails;
