import { useNavigate } from "react-router-dom";
import { cakeType } from "../../services/apiCakes";

function MenuCard({menuItem}:{menuItem:cakeType}){

   const navigate=useNavigate();

    function handleClick(){
        navigate(`/menu/${menuItem.name}`)
    }

    return (
        <div className="bg-white shadow-lg rounded-lg overflow-hidden" onClick={handleClick}>
        <img src={`http://localhost:3000/images/${menuItem.image}`} className="w-full h-48 object-cover" alt={menuItem.name} />
        <div className="flex items-center justify-between p-4">
          <h5 className="text-xl font-semibold mb-2">{menuItem.name}</h5>
          <p className="text-md">${menuItem.price.toFixed(2)}</p>
        </div>
      </div>
    )
}

export default MenuCard;