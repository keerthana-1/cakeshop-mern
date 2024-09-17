function Footer(){
    return (

        <div className="bg-pink-200 h-60 w-full text-center pt-10">
            <div className="flex items-center justify-evenly">
                <div>
                <h4 className="text-lg font-semibold pb-3">Contact Us</h4>
                <p className="pb-1">123 Sweet Street, Dessert City</p>
                <p className="pb-1">Phone: +1 234 567 890</p>
                <p className="pb-2">Email: info@cakestore.com</p>
                <div className="flex space-x-4 justify-center">
                    <a href="#"><i className="fab fa-facebook"></i></a>
                    <a href="#"><i className="fab fa-instagram"></i></a>
                    <a href="#"><i className="fab fa-twitter"></i></a>
                </div>
                </div>
                <div>
                <h4 className="text-lg font-semibold pb-3">Operating Hours</h4>
                <p className="pb-1">Monday - Friday: 9 AM - 7 PM</p>
                <p className="pb-1">Saturday: 10 AM - 5 PM</p>
                <p className="pb-2">Sunday: Closed</p>
                </div>

                <div>
                <h4 className="text-lg font-semibold pb-3">Subscribe</h4>
                <p className="pb-2">Get the latest updates and offers directly to your inbox!</p>
                <form>
                    <input type="email" placeholder="Enter your email" className="p-2 rounded" />
                    <button type="submit" className="p-2 bg-pink-500 text-white rounded">Subscribe</button>
                </form>
            </div>
            </div>
            

           
        </div>
    );
}

export default Footer;