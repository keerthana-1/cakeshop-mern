import { useContext, useEffect, useState } from "react"
import { cakeType, getCakes } from "../../services/apiCakes"
import { Loader } from "../../ui/Loader";
import MenuCard from "./MenuCard";
import { FilterContext } from "../../ui/FilterContext";
import Filters from "../../ui/Filters";

function Menu(){

    const [cakes,setCakes]=useState<cakeType[]|null>();
    const [loading, setLoading] = useState(true);

    const filterProviderValues=useContext(FilterContext);

    if(!filterProviderValues){
      throw new Error("FilterContext must be used within a FilterProvider");
    }

    const { flavor, category, price } = filterProviderValues;
    //console.log(flavor,category,price)

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

    const filteredCakes = cakes && cakes.filter(cake => {
      return (
        (flavor ? cake.flavor.includes(flavor) : true) &&
        (category ? cake.category === category : true) &&
        (price ? cake.price <= price : true)
      );
  });

    return (
       <div className="pt-4">
        <Filters />
         <div className="min-h-screen mx-10 pt-4">
       
        <div className="grid grid-cols-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {filteredCakes && filteredCakes.map((cake, index) => (
            <MenuCard key={index} menuItem={cake} />
          ))}
        </div>
      </div>
      </div>
        
    )
}

export default Menu