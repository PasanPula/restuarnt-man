import { BiCategory, BiFoodMenu } from "react-icons/bi";
import {
  MdDeleteOutline,
  MdOutlineDataSaverOn,
  MdOutlineFastfood,
  MdOutlineFoodBank,
  MdOutlineProductionQuantityLimits,
} from "react-icons/md";
import { GiTakeMyMoney } from "react-icons/gi";
import { motion } from "framer-motion";
import { toast } from "react-toastify";
import { useState } from "react";
import CategorySelect from "./CategorySelect";
import { MenuCategories } from "../../../configs/Constants/MenuCategories";
import Loader from "../../Loader/Loader";
import UploadImage from "./UploadImage";
import { addMenuItem } from "../../../api/api";

const AddMenu = () => {
  const [title, setTitle] = useState("");
  const [price, setPrice] = useState("");
  const [image, setImage] = useState(null);
  const [category, setCategory] = useState("");
  const [loading, setLoading] = useState(false);
  const [quantity, setQuantity] = useState("");
  const [description, setDescription] = useState("");
  const [loaderMessage, setLoadermessage] = useState("");

  const [addonTitle, setaddonTitle] = useState("");
  const [addonPrice, setaddonPrice] = useState("");
  const [addons, setAddons] = useState([]); 

    const addAddon = () => {
      if (addonTitle && addonPrice) {
        const newAddon = {
          option: addonTitle,
          price: parseFloat(addonPrice),
        };
        setAddons([...addons, newAddon]);
        setaddonTitle("");
        setaddonPrice("");
      } else {
        toast.error("Please enter addon name and price");
      }
    };

    const saveItem = async () => {
      if (!title || !price || !category || !quantity || !description) {
        toast.error("Please fill in all the required fields");
        return;
      }
      
    const dishData = {
      title,
      price: parseFloat(price),
      qty: parseInt(quantity),
      category,
      description,
      imageURL:"https://example.com/pork_fried_rice.jpg",
      customize: addons,
    };

    if(await addMenuItem(dishData)) {
        setTitle("");
        setPrice("");
        setImage(null);
        setCategory("");
        setQuantity("");
        setDescription("");
        setAddons([]);
      toast.success("Dish saved successfully!");
    }
  }


  return (
    <div className="items-center justify-center w-full h-fullflex">
    <div className="flex flex-col items-center justify-center w-full gap-4 p-4 border border-gray-300 rounded-lg ">
      <div className="flex w-full gap-2 py-3 border-b border-gray-300 -tems-center">
        <MdOutlineFastfood className="text-xl text-gray-600" />
        <input
          type="text"
          required
          placeholder="Enter food name"
          autoFocus
          className="w-full h-full pl-2 bg-transparent border-none outline-none text-textColor placeholder:text-gray-400"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
      </div>

      <div className="flex flex-col items-center w-full gap-3 md:flex-row">
        <div className="flex items-center w-full gap-2 py-2 border-b border-gray-300">
          <BiCategory className="text-xl text-gray-600" />
          <CategorySelect
            categories={MenuCategories}
            action={setCategory}
            selected={category}
          />
        </div>
        <div className="flex items-center w-full gap-2 py-2 border-b border-gray-300">
          <MdOutlineProductionQuantityLimits className="text-2xl text-gray-600" />
          <input
            type="text"
            required
            placeholder="Quantity"
            autoFocus
            className="w-full h-full pl-2 bg-transparent border-none outline-none text-textColor placeholder:text-gray-400"
            value={quantity}
            onChange={(e) => setQuantity(validateNumber(e.target.value))}
          />
        </div>
      </div>
      <div className="group flex justify-center items-center flex-col border-2 border-dotted border-gray-300 w-full h-[225px]  md:h-[420px] round-lg">
        {loading ? (
          <Loader progress={loaderMessage} />
        ) : (
          <>
            {image ? (
              <>
                <div className="relative h-full">
                  <img
                    src={image}
                    alt="uploaded food"
                    className="object-cover w-full h-full"
                  />
                  <motion.button
                    whileTap={{ scale: 1.1 }}
                    whileHover={{ scale: 1.2 }}
                    title="Remove Photo"
                    className="absolute p-2 text-xl transition-all duration-500 ease-in-out bg-red-500 rounded-full outline-none cursor-pointer bottom-3 right-3 md:p-5 hover:shadow-md"
                    // onClick={() => deleteImage()}
                  >
                    <MdDeleteOutline className="text-white" />
                  </motion.button>
                </div>
              </>
            ) : (
             <UploadImage
                action={setImage}
                progressHandler={setLoadermessage}
                promise={setLoading}
              />
            )}
          </>
        )}
      </div>
      <div className="flex flex-col items-center w-full gap-3 md:flex-row">
        <div className="flex items-center w-full gap-2 py-2 border-b border-gray-300">
          <GiTakeMyMoney className="text-2xl text-gray-600" />
          <input
            type="text"
            required
            placeholder="Price"
            autoFocus
            className="w-full h-full pl-2 bg-transparent border-none outline-none text-textColor placeholder:text-gray-400"
            value={price}
            onChange={(e) => setPrice(validateNumber(e.target.value))}
          />
        </div>
      </div>
      <div className="flex w-full gap-2 py-3 border-b border-gray-300 -tems-center">
        <BiFoodMenu className="text-xl text-gray-600" />
        <input
          type="text"
          required
          placeholder="Short Description"
          autoFocus
          className="w-full h-full pl-2 bg-transparent border-none outline-none text-textColor placeholder:text-gray-400"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
      </div>

      {/* Addon Input Section */}
      <div className="flex items-center w-full gap-2 py-2 border-b border-gray-300">
          <input
            type="text"
            required
            placeholder="Addon Name"
            className="w-full h-full pl-2 bg-transparent border-none outline-none text-textColor placeholder:text-gray-400"
            value={addonTitle}
            onChange={(e) => setaddonTitle(e.target.value)}
          />
          <input
            type="text"
            required
            placeholder="Addon Price"
            className="w-full h-full pl-2 bg-transparent border-none outline-none text-textColor placeholder:text-gray-400"
            value={addonPrice}
            onChange={(e) => setaddonPrice(validateNumber(e.target.value))}
          />
          <motion.button
            whileTap={{ scale: 1.1 }}
            className="px-3 py-1 text-white bg-green-500 rounded"
            onClick={addAddon}
          >
            Add Addon
          </motion.button>
        </div>

        {/* Display Addons */}
        {addons.length > 0 && (
          <div className="p-4 mt-4 border">
            <h2 className="mb-2 text-lg font-semibold">Addons:</h2>
            <ul>
              {addons.map((addon, index) => (
                <li key={index}>
                  {addon.name} - ${addon.price.toFixed(2)}
                </li>
              ))}
            </ul>
          </div>
        )}

      <div className="flex items-center justify-center w-full">
        <motion.button
          whileHover={{ scale: 1.1 }}
          className="flex flex-row-reverse items-center justify-center w-full gap-2 px-12 py-2 ml-0 text-lg text-white bg-orange-500 border-none rounded outline-none md:ml-auto md:w-auto"
          onClick={() => saveItem()}
        >
          <MdOutlineDataSaverOn /> Save
        </motion.button>
      </div>
    </div>
  </div>
  )
}

const validateNumber = (value) => {
  if (isNaN(value)) {
    toast.error("Please enter a valid number", { toastId: 123 });
    return "";
  }
  return value;
};

export default AddMenu