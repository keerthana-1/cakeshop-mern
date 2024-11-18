import { FormEvent, useEffect, useState } from "react";
import Button from "../../ui/Button";
import { categoryType, flavorType, getCategories, getFlavors } from "../../services/apiCakes";
import { Loader } from "../../ui/Loader";
import { Link } from "react-router-dom";

export default function AddCake(){

    const [flavors, setFlavors] = useState<flavorType[] | undefined>();
    const [categories, setCategories] = useState<categoryType[] | undefined>();
    const [loading, setLoading] = useState(true);
    const [image, setImage] = useState<File | null>(null);

    const [name,setName]=useState("");
    const [description,setDescription]=useState("");
    const [category,setCategory]=useState("");
    const [price,setPrice]=useState(0);
    const [flavor,setFlavor]=useState("");

    useEffect(() => {
        async function fetchData() {
          try {
            const data = await getFlavors();
            setFlavors(data);
            const cats = await getCategories();
            setCategories(cats);
          } catch (err) {
            console.log(err);
          } finally {
            setLoading(false);
          }
        }
    
        fetchData();
      }, []);

      async function handleSubmit(e: FormEvent) {
        e.preventDefault();
      
        if (!image) {
          alert("Please upload an image.");
          return;
        }
      
        const formData = new FormData();
        formData.append("image", image); // The image file
        formData.append("name", name); // Cake details
        formData.append("description", description);
        formData.append("flavor", flavor);
        formData.append("category", category);
        formData.append("price", price.toString());
      
        try {
          const res = await fetch("http://localhost:3000/createCake", {
            method: "POST",
            body: formData, // Send the FormData object
          });
      
          if (!res.ok) throw new Error("Failed to create cake");
      
          await res.json();

          alert("Cake Added Successfully!");

          setCategory("");setFlavor("");setDescription("");setImage(null);
          setName("");setPrice(0);

        } catch (err) {
          console.error(err);
          alert("Error adding cake");
        }
      }
      

    if (loading) return <Loader></Loader>;
    
    return (
        <div className="flex items-center justify-center pt-16">
        <div className="w-full max-w-lg">
        
        <div className="mb-5 text-pink-500">
            <Link  className="hover:underline" to="/adminHome"> <span className="text-xl">&#8249;</span> Back</Link>
        </div>
        
        <form className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4" onSubmit={handleSubmit}>
        <p className="block text-gray-700 text-3xl text-center font-bold mb-2">Add Item</p>

          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" >
              Name
            </label>
            <input onChange={(e)=>setName(e.target.value)} className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="email" type="text" placeholder="Name" value={name}/>
          </div>
          <div className="mb-6">
            <label className="block text-gray-700 text-sm font-bold mb-2">
              Description
            </label>
            <input onChange={(e)=>setDescription(e.target.value)} className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline" id="password" type="text" value={description}/>
           </div>
           <div className="mb-6">
            <label className="block text-gray-700 text-sm font-bold mb-2">
              Category
            </label>
            <select value={category}
              className='border border-pink-200 p-3 rounded-3xl'
              onChange={(e) => setCategory(e.target.value)}
            >
              {categories?.map((category, index) => (
                <option value={category.category} key={index}>
                  {category.category}
                </option>
              ))}
            </select>
            </div>
           <div className="mb-6">
            <label className="block text-gray-700 text-sm font-bold mb-2">
              flavor
            </label>
            <select value={flavor}
              className='border border-pink-200 p-3 rounded-3xl'
              onChange={(e) => setFlavor(e.target.value)}
            >
              {flavors?.map((flavor, index) => (
                <option value={flavor.flavor} key={index}>
                  {flavor.flavor}
                </option>
              ))}
            </select>   </div>
           <div className="mb-6">
            <label className="block text-gray-700 text-sm font-bold mb-2">
              Price
            </label>
            <input onChange={(e)=>setPrice(e.target.valueAsNumber)} className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline" id="phone" type="number" placeholder="price" value={price}/>
           </div>

           <div className="mb-6">
            <label className="block text-gray-700 text-sm font-bold mb-2">Image</label>
            <input
              type="file"
              accept="image/*"
              onChange={(e) => setImage(e.target.files ? e.target.files[0] : null)}
            />
          </div>


          <div className="flex items-center justify-between">
            <Button> Add </Button>
          </div>
        </form>
      </div>
      </div>
    )
}
