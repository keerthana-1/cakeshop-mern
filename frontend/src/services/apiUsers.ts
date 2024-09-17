const API_URL="http://localhost:3000"

export interface userType{
    email:string;
    password:string;
    name:string;
    address:string;
    phone:string;
}

export async function getUser(username:string){
  const res = await fetch(`${API_URL}/getUser/${username}`)
  if(!res.ok) throw Error("couldn't find user")
  const data = await res.json();
  console.log(data)
  return data;
}

export async function getPassword(username:string){
    const res = await fetch(`${API_URL}/getPassword/${username}`)
    if(!res.ok) throw Error("couldn't find user")
    const data = await res.json();
    console.log(data)
    return data;
}

export async function updatePassword(username:string,password:string){
    try {
        const res = await fetch(`${API_URL}/updatePassword/${username}`, {
          method: 'POST',
          body: JSON.stringify({password}),
          headers: {
            'Content-Type': 'application/json',
          },
        });
    
        if (!res.ok) throw Error();
        const { data } = await res.json();
        return data;
      } catch {
        throw Error('Failed updating password');
      }
}

export async function createUser(user:userType){
    try {
        const res = await fetch(`${API_URL}/createUser`, {
          method: 'POST',
          body: JSON.stringify(user),
          headers: {
            'Content-Type': 'application/json',
          },
        });
    
        if (!res.ok) throw Error();
        const { data } = await res.json();
        return data;
      } catch {
        throw Error('Failed creating user');
      }
}