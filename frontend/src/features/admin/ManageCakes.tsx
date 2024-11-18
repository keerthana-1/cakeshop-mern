import { useEffect, useState } from "react"
import { cakeType, deleteCakeWithName, getCakes } from "../../services/apiCakes"
import { Loader } from "../../ui/Loader";
import Button from "../../ui/Button";
import { Link, useNavigate } from "react-router-dom";

export default function ManageCakes(){

    const [cakes,setCakes]=useState<cakeType[]|null>();
    const [loading, setLoading] = useState(true);
    const navigate=useNavigate();

    const handleDelete = async (name: string) => {
        try {
            deleteCakeWithName(name)
            setCakes((prevCakes) => prevCakes?.filter((cake) => cake.name !== name) || null);
            alert("Cake deleted successfully");
        } catch (error) {
          console.error(error);
          alert("Error deleting cake");
        }
      };

      const handleUpdate = (name: string) => {

        navigate(`/updatecake/${name}`);
        
      };

    useEffect(()=>{

        const fetchCakes=async()=>{
            try{
            const data = await getCakes()
            console.log(data)
            setCakes(data)
            }
            catch(error){
                console.log(error)
            }
            finally{
                setLoading(false)
            }
        }
        fetchCakes();
    },[])
    

    if(loading) return <Loader></Loader>


    return (
        <div className="p-6 mt-4">

        <div className="mb-5 text-pink-500">
            <Link  className="hover:underline" to="/adminHome"> <span className="text-xl">&#8249;</span> Back</Link>
        </div>
      
      {cakes && cakes.length > 0 ? (
        <table className="table-auto w-full border-collapse border border-gray-300">
          <thead>
            <tr>
              <th className="border border-gray-300 p-2">Name</th>
              <th className="border border-gray-300 p-2">Flavor</th>
              <th className="border border-gray-300 p-2">Category</th>
              <th className="border border-gray-300 p-2">Price</th>
              <th className="border border-gray-300 p-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {cakes.map((cake) => (
              <tr key={cake.name}>
                <td className="border border-gray-300 p-2">{cake.name}</td>
                <td className="border border-gray-300 p-2">{cake.flavor}</td>
                <td className="border border-gray-300 p-2">{cake.category}</td>
                <td className="border border-gray-300 p-2">${cake.price.toFixed(2)}</td>
                <td className="border border-gray-300 p-2 text-center">
                  <Button
                    onClick={() => handleUpdate(cake.name)}
                  >
                    Update
                  </Button>&nbsp;&nbsp;
                  <Button
                    onClick={() => handleDelete(cake.name)}
                  >
                    Delete
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <div>No cakes found.</div>
      )}
    </div>
    )
}