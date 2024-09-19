/* flavor category price */

import { useContext, useEffect, useState } from "react";
import {
  categoryType,
  flavorType,
  getCategories,
  getFlavors,
} from "../services/apiCakes";
import { Loader } from "./Loader";
import { FilterContext } from "./FilterContext";
import Button from "./Button";
import {
  Modal,
  ModalContent,
  ModalHeader,
  Icon,
  Button as Btn,
  ModalActions,
} from "semantic-ui-react";

function Filters() {
  const [flavors, setFlavors] = useState<flavorType[] | undefined>();
  const [categories, setCategories] = useState<categoryType[] | undefined>();

  const [loading, setLoading] = useState(true);
  const filterProviderValues = useContext(FilterContext);
  const [open, setOpen] = useState(false);
  if (!filterProviderValues) {
    throw new Error("FilterContext must be used within a FilterProvider");
  }

  const { setFlavor, setCategory, setPrice } = filterProviderValues;

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

  function ClearFilters(){
    setFlavor("")
    setCategory("")
    setPrice(0)
    setOpen(false)
  }

  if (loading) return <Loader></Loader>;

  if (!flavors || !categories) return <p>no filters</p>;

  return (
    <Modal
      
      onClose={() => setOpen(false)}
      onOpen={() => setOpen(true)}
      open={open}
      trigger={
        <div className="mt-5 text-right mr-10">
        <Btn className="pink">
          <Icon name='filter' />
          Filters
        </Btn>
        </div>
      }
    >
      <ModalHeader>Filters</ModalHeader>
      <ModalContent>
        <div className=' h-14 flex justify-center pr-20'>
          <div className='pl-10 pr-20'>
            <select
              className='border border-pink-200 p-3 rounded-3xl'
              onChange={(e) => setFlavor(e.target.value)}
            >
              {flavors.map((flavor, index) => (
                <option value={flavor.flavor} key={index}>
                  {flavor.flavor}
                </option>
              ))}
            </select>
          </div>
          <div className='pr-20'>
            <select
              className='border border-pink-200 p-3 rounded-3xl'
              onChange={(e) => setCategory(e.target.value)}
            >
              {categories.map((category, index) => (
                <option value={category.category} key={index}>
                  {category.category}
                </option>
              ))}
            </select>
          </div>
          <div>
            <select
              className='border border-pink-200 p-3 rounded-3xl'
              onChange={(e) => setPrice(Number(e.target.value))}
            >
              <option value='10'>less than $10</option>
              <option value='30'>less than $30</option>
              <option value='50'>less than $50</option>
            </select>
          </div>
        </div>
      </ModalContent>
      
      <ModalActions>
      <div className="flex justify-end">
        <div>
        <Button onClick={() => setOpen(false)}>Apply</Button>
        </div>
        <div className="pl-3">
        <Button onClick={ClearFilters}>Clear</Button>
        </div>
        </div>
      </ModalActions>
      
    </Modal>
  );
}

export default Filters;
