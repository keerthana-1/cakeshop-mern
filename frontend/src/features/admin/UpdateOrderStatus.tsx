
import {useState } from "react";

import {
  Modal,
  ModalContent,
  ModalHeader,
  Button as Btn,
  ModalActions,
} from "semantic-ui-react";

import { updateStatus } from "../../services/apiOrder";
import Button from "../../ui/Button";


interface UpdateOrderStatusProps {
    orderId: string;
    current_status: string;
  }

function UpdateOrderStatus({orderId}:UpdateOrderStatusProps) {
 
  const [open,setOpen]=useState(true);
  


  function CancelUpdate(){
    setOpen(false)
  }

  function handleUpdate(){
    try{
        updateStatus(orderId,status)
    }
    catch(err){
        console.log(err)
    }
    setOpen(false)
  }

  return (
    <>
     <div className="mt-5 text-right mr-10">
        <Btn className="pink" onClick={() => setOpen(true)}>
          Update Status
        </Btn>
     </div>
    
    <Modal
      
      onClose={() => setOpen(false)}
      onOpen={() => setOpen(true)}
      open={open}
    >
      <ModalHeader>Filters</ModalHeader>
      <ModalContent>
        <div className=' h-14 flex justify-center pr-20'>

        <div className='pl-10 pr-20'>
            <label>{orderId}</label>
        </div>
          <div className='pl-10 pr-20'>
           
          </div>
        </div>
      </ModalContent>
      
      <ModalActions>
      <div className="flex justify-end">
        <div>
        <Button onClick={handleUpdate}>Update</Button>
        </div>
        <div className="pl-3">
        <Button onClick={CancelUpdate}>Cancel</Button>
        </div>
        </div>
      </ModalActions>
      
    </Modal>
    </>
  );
}

export default UpdateOrderStatus;
