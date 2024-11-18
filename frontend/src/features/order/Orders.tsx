import { useContext, useEffect, useState } from "react";
import { getAllUserOrders, orderType } from "../../services/apiOrder";
import { LoginContext } from "../../ui/LoginContext";
import { Loader } from "../../ui/Loader";
import { cartType, getCart } from "../../services/apiCart";
import { useNavigate } from "react-router-dom";

function OrderDetails() {
  const LoginProviderValues = useContext(LoginContext);
  const [loading, setLoading] = useState(true);
  const [orders, setOrders] = useState<orderType[] | null>(null);
  const [cartData, setCartData] = useState<{ [orderId: string]: cartType | null }>({});
  const navigate = useNavigate();

  if (!LoginProviderValues) {
    return null;
  }

  const { username } = LoginProviderValues;

  useEffect(() => {
    async function fetchOrdersAndCarts() {
      try {
        const orderData = await getAllUserOrders(username);
        setOrders(orderData);

        const cartPromises = orderData.map(async (order: { cart_id: string; order_id: string; }) => {
          if (order.cart_id) {
            const cart = await getCart(order.cart_id);
            return { orderId: order.order_id, cart };
          }
          return { orderId: order.order_id, cart: null };
        });

        const cartResults = await Promise.all(cartPromises);
        const cartMap = cartResults.reduce(
            (acc: { [orderId: string]: cartType | null }, { orderId, cart }: { orderId: string, cart: cartType | null }) => ({
              ...acc,
              [orderId]: cart
            }),
            {} as { [orderId: string]: cartType | null }
          );
        setCartData(cartMap);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    }

    fetchOrdersAndCarts();
  }, [username]);

  if (loading) return <Loader />;

  return (
    <div className="ml-32 mr-32 mb-32 ">
      <div className="pb-7">
        <button
          className="pt-14 text-lg text-pink-500"
          onClick={() => navigate("/menu")}
        >
          <span className="text-xl">&#8249;</span>Back to Menu
        </button>
      </div>
      <div className="p-10 bg-white shadow-md h-auto">
        {orders &&
          orders.map((order, key) => (
            <div key={key}>
              <div className="flex justify-between">
                <p className=" pt-10 text-2xl font-bold">
                  Order #{order.order_id}
                </p>
                <div className="bg-pink-500 w-64 h-10 rounded-3xl text-center">
                  <p className="text-xl font-bold pt-1 text-white">
                    status: {order.status}
                  </p>
                </div>
              </div>

              <div>
                {cartData[order.order_id]?.cartItems.map((cart_item, idx) => (
                  <div key={idx} className="pt-10">
                    <div className="flex">
                      <div className="pr-10">
                        <img
                          className="w-32 h-32 image-cover"
                          src={`http://localhost:3000/images/${cart_item.image}`}
                        />
                      </div>
                      <div>
                        <p className="text-xl font-bold">{cart_item.cakeName}</p>
                        <p>
                          {cart_item.quantity} x {cart_item.price}
                        </p>
                        {cart_item.message && (
                          <p className="text-lg">
                            Message on cake: {cart_item.message}
                          </p>
                        )}
                        {cart_item.toppings.map((topping, idx) => (
                          <p key={idx}>{topping}</p>
                        ))}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
      </div>
    </div>
  );
}

export default OrderDetails;
