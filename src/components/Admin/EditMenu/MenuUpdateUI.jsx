import { useRef } from "react";
import { BiCategory, BiFoodMenu } from "react-icons/bi";
import {
  MdDeleteOutline,
  MdOutlineDataSaverOn,
  MdOutlineFastfood,
  MdOutlineFoodBank,
  MdOutlineCancel,
  MdOutlineProductionQuantityLimits,
} from "react-icons/md";
import { ImSpinner3 } from "react-icons/im";
import { IoMdAddCircleOutline } from "react-icons/io";
import { GiTakeMyMoney } from "react-icons/gi";
import { motion } from "framer-motion";
import { toast } from "react-toastify";
import { useEffect, useState } from "react";
import CategorySelect from "../AddMenu/CategorySelect";
import { MenuCategories } from "../../../configs/Constants/MenuCategories";
import Loader from "../../Loader/Loader";
import UploadImage from "../AddMenu/UploadImage";
import { updateMenuItem, addAddon, fetchMenuData } from "../../../api/api";
import { useMenuContext } from "../../../context/MenuContext/MenuProvider";


const MenuUpdateUI = ({currentFoodItem, setShowItemEdit}) => {
  const [title, setTitle] = useState(currentFoodItem.title);
  const [price, setPrice] = useState(currentFoodItem.price);
  const [image, setImage] = useState(currentFoodItem.imageURL);
  const [category, setCategory] = useState(currentFoodItem.category);
  const [loading, setLoading] = useState(false);
  const [quantity, setQuantity] = useState(currentFoodItem.qty);
  const [description, setDescription] = useState(currentFoodItem.description);
  const [loaderMessage, setLoadermessage] = useState("Please Wait.. Menu Item is Updating.");
  const componentRef = useRef();
  const [addonLoading, setLaddonLoading] = useState(false);
  const [{ menuItems }, dispatch] = useMenuContext();


  const [addonTitle, setaddonTitle] = useState("");
  const [addonPrice, setaddonPrice] = useState("");
  const [addons, setAddons] = useState(currentFoodItem.customize); 
  const [addonIds, setAddonsIds] = useState(currentFoodItem.customize.map(item => item._id));

  const setAddon = async () => {
      if (addonTitle && addonPrice) {
        setLaddonLoading(true);
        const newAddon = {
          option: addonTitle,
          price: parseFloat(addonPrice),
        };

        const resData = await addAddon(newAddon);

        if(resData && !addonIds.includes(resData._id)){
          setAddons([...addons, resData]);
          setAddonsIds([...addonIds, resData._id]);
          setaddonTitle("");
          setaddonPrice("");
          setLaddonLoading(false);
          toast.success('Addon Created Sucessfully');
        }
        else {
          toast.error("Addon Already Exist");
          setLaddonLoading(false);
        }

      } else {
        toast.error("Please enter addon name and price");
      }
  };

    const saveItem = async () => {
      if (!title || !price || !category || !quantity || !description || !image) {
        toast.error("Please fill in all the required fields");
        return;
      }

    setLoading(true)
      
    const dishData = {
      title,
      price: parseFloat(price),
      qty: parseInt(quantity),
      category,
      description,
      imageURL: image,
      customize: addonIds,
    };

    if(await updateMenuItem(dishData,currentFoodItem._id)) {
        setTitle("");
        setPrice("");
        setImage(null);
        setCategory("");
        setQuantity("");
        setDescription("");
        setAddons([]);
        await fetchMenuData(dispatch);
        setLoading(false);
        setShowItemEdit(false);
    }
  }

  function deleteImage() {
    setImage(null);
  }

  function deleteAddon(addon) {

    let arr = addons.filter((item) => item._id !== addon._id);
    setAddons(arr);
    let idArr = addonIds.filter((item) =>  item !== addon._id);
    setAddonsIds(idArr);

  }

  useEffect(() => {
    if (componentRef.current) {
      componentRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, []);
 

  return (
    <motion.div ref={componentRef} initial={{ opacity: 0, x: 200 }}
    animate={{ opacity: 1, x: 0 }}
    exit={{ opacity: 0, x: 200 }} className="items-center justify-center w-full h-fullflex">
    <div className="flex flex-col items-center justify-center w-full gap-4 p-4 border border-gray-300 rounded-lg ">
    {loading ? (
          <Loader progress={loaderMessage} />
        ) : (
    <>
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
                    onClick={() => deleteImage()}
                  >
                    <MdDeleteOutline className="text-white" />
                  </motion.button>
                </div>
              </>
            ) : (
             <UploadImage
                setImage={setImage}
              />
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
            className="flex flex-col items-center px-3 py-1 text-white bg-green-500 rounded"
            onClick={() => setAddon()}
          >
            {addonLoading ?  <ImSpinner3 className="animate animate-spin" /> : <> <IoMdAddCircleOutline/> Add  </>}
          </motion.button>
        </div>

        {/* Display Addons */}
        {addons.length > 0 && (
              <div className="p-4 mt-4 border">
                <h2 className="mb-2 text-lg font-semibold">Addons:</h2>
                <ul className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
                  {addons.map((addon, index) => (
                    <>
                      <div
                        key={index}
                        className="flex flex-row items-center justify-between p-2 border rounded-lg md:flex-row hover:shadow-md"
                      >
                        <div className="items-center md:flex">
                          <span className="text-lg font-semibold">
                            {addon.option}
                          </span>
                          <span className="ml-2 text-gray-600">
                            - Rs.{addon.price.toFixed(2)}
                          </span>
                        </div>
                        <button
                          className="mt-2 text-red-500 cursor-pointer hover:text-red-700 md:ml-4 md:mt-0"
                          onClick={() => {
                            deleteAddon(addon);
                          }}
                        >
                          {" "}
                          <MdDeleteOutline
                            size={25}
                            className="text-red-500 cursor-pointer"
                          />
                        </button>
                      </div>
                    </>
                  ))}
                </ul>
              </div>
            )}

      <div className="flex flex-col items-center justify-around w-full gap-2 md:flex-row">

      <motion.button
          whileHover={{ scale: 1.1 }}
          className="flex flex-row-reverse items-center justify-center w-full gap-2 px-12 py-2 mx-auto ml-0 text-lg text-white bg-red-600 border-none rounded outline-none md:ml-auto md:w-auto"
          onClick={() =>setShowItemEdit(false)}
        >
          <MdOutlineCancel /> Cancel
        </motion.button>

        <motion.button
          whileHover={{ scale: 1.1 }}
          className="flex flex-row-reverse items-center justify-center w-full gap-2 px-12 py-2 mx-auto ml-0 text-lg text-white border-none rounded outline-none bg-primeGold md:ml-auto md:w-auto"
          onClick={() => saveItem()}
        >
          <MdOutlineDataSaverOn /> Update
        </motion.button>
      </div>

      </> )}

    </div> 
  </motion.div>
  )
}

const validateNumber = (value) => {
  if (isNaN(value)) {
    toast.error("Please enter a valid number", { toastId: 123 });
    return "";
  }
  return value;
};

export default MenuUpdateUI;