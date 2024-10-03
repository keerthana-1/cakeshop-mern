import { useNavigate } from "react-router-dom";
import Button from "../../ui/Button";
import CakeFlavorChart from "./CakeFlavorChart";
import CakeTypeChart from "./CakeTypeChart";
import UserStatistics from "./UserStatistics";

function AdminHome(){

    const navigate = useNavigate();

    return (
        <div className="bg-pink-200">
         <div className="p-8 min-h-screen">
      
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Number of Users */}
                <div className="bg-white rounded-lg p-6 h-auto">
                <UserStatistics></UserStatistics>
                </div>

                 {/* Update Order Status */}
                 <div className="bg-white rounded-lg p-6 h-auto">
                    <h3 className="text-xl font-semibold mb-4">Update Order Status</h3>
                    <Button onClick={()=>navigate("/listorders")}>Update Order Status</Button>
                
                </div>

                {/* Add/Update Cakes */}
                <div className="bg-white rounded-lg p-6 h-auto">
                <h3 className="text-xl font-semibold mb-4">Manage Cake Availability</h3>
                  <div className="flex gap-10">
                    <Button>Add Cake</Button>
                    <Button>View/Update Cake Availability</Button>
                  </div>
                  <div className="flex gap-3 pt-3">
                    <CakeFlavorChart></CakeFlavorChart>
                    <CakeTypeChart></CakeTypeChart>
                  </div>
                </div>

                {/* Order Statistics */}
                <div className="bg-white rounded-lg p-6 h-auto">
                    <h3 className="text-xl font-semibold mb-4">Order Statistics</h3>
                    <p className="text-4xl font-bold mb-2">50</p>
                    <p className="text-gray-500 mb-4">Orders in Progress</p>
                    <p className="text-4xl font-bold mb-2">200</p>
                    <p className="text-gray-500">Orders Completed</p>
                </div>

               
            </div>
            </div>
        </div>
    )

}

export default AdminHome;