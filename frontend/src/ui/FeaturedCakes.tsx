import { useNavigate } from "react-router-dom";
import Button from "./Button";
import Carousel from "./Carousel";
import '@fontsource/poppins';

function FeaturedCakes(){
    const navigate = useNavigate();
    return(
        <div>
            <div className="pt-10 pb-5">
                <p className="text-3xl text-center font-poppins ">Featured Cakes</p>
            </div>
            <div>
                <Carousel></Carousel>
            </div>
            <div className="text-center pt-5">
            <Button
                onClick={() => navigate('/menu')}>
                Order Now <span className="text-2xl">&#8250;</span>
            </Button>
            </div>
        </div>
    );
}

export default FeaturedCakes;