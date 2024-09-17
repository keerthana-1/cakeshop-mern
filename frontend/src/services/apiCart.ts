const API_URL="http://localhost:3000"

export interface cartItemType{
    cakeName : string;
    quantity : number;
    message : string;
    price : number;
}

export interface cartType{
    cartid : string;
    username : string;
    cartItems : cartItemType[]
    totalItems : number;
    totalPrice : number; 
}

export async function getCartId(username:string):Promise<cartType[]>{
    const res = await fetch(`${API_URL}/getCartId/${username}`)
    if(!res.ok) throw Error("couldn't find cart")
    const data = await res.json();
    console.log(data)
    return data;

}

export async function insertCart(cart:cartType){
    try {
        const res = await fetch(`${API_URL}/insertCart`, {
          method: 'POST',
          body: JSON.stringify(cart),
          headers: {
            'Content-Type': 'application/json',
          },
        });
    
        if (!res.ok) throw Error();
        const { data } = await res.json();
        return data;
      } catch {
        throw Error('Failed creating cart');
      }

}




