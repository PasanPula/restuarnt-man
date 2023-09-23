import {useState,useEffect} from 'react'
import r4 from '../../assets/r4.png';
import { MdAddShoppingCart, MdDeleteForever } from "react-icons/md";
import { useMenuContext } from '../../context/MenuContext/MenuProvider';
import { useUserContext } from '../../context/UserContext/UserProvider';
import { addToCart } from '../../util/utilFunctions';
import { useCartContext } from '../../context/CartContext/CartProvider';

const MenuPopup = ({item,setShowCustomizePopup}) => {

    const { id, title, price, calories, customize,imageURL, description } = item;
    const [selectedOptions, setSelectedOptions] = useState([]);
    const [quantity, setQuantity] = useState(1);
    const [comment, setComment] = useState('');
    const [totalValue, setTotalValue] = useState(price);
    const [{ menuItems }, menuDispatch] =  useMenuContext();
    const [{ cartItems }, cartDispatch] =  useCartContext();
    const [{ user } ] =  useUserContext();


    useEffect(() => {
        setTotalValue(calculateTotalValue())
    }, [selectedOptions,quantity])
    

    const calculateTotalValue = () => {
        let total = parseInt(price);
        selectedOptions.forEach((option) => {
          total += parseInt(option.price); 
        });
        return total * quantity;
    };

    const toggleOption = (option) => {
        const updatedOptions = [...selectedOptions];
        if (updatedOptions.includes(option)) {
          updatedOptions.splice(updatedOptions.indexOf(option), 1);
        } else {
          updatedOptions.push(option);
        }
        setSelectedOptions(updatedOptions);
      };

      const handleAddToCart = () => {

        const customizeData = {
            quantity,
            selectedOptions,
            comment,
            totalValue
        }
        addToCart(cartItems, menuItems,user,id,cartDispatch,customizeData);
        setShowCustomizePopup(false);
      };


  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
          <div className="bg-white rounded-lg p-4 relative z-10 w-[90%] md:w-[50%] max-h-[80vh] md:max-h-[90vh] overflow-y-auto">
          <button
              className="absolute text-gray-600 top-2 right-2 hover:text-gray-800"
              onClick={() => setShowCustomizePopup(false)}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="w-6 h-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
            <h3 className="mb-2 text-lg font-medium">Customize Order</h3>
            <p className="mb-4 text-sm text-gray-500">Select your options below:</p>

             {/* Food image, name, and price */}
             <div className="mb-4">
              <img
                src={r4}
                alt={description}
                className="object-contain w-40 h-40 mx-auto mb-2"
              />
              <p className="text-lg font-semibold text-center text-textColor">{title}</p>
              <p className="text-base font-semibold text-center text-headingColor">
                <span className="text-sm text-primeGold">Rs.</span> {price}
              </p>
            </div>

           {/* Quantity input with +/- buttons */}
           <div className="mb-4">
              <label htmlFor="quantity" className="block text-sm text-gray-600">
                Quantity:
              </label>
              <div className="flex items-center">
                <button
                  className="bg-gray-200  rounded-l-md hover:bg-gray-300 w-[30%] p-2"
                  onClick={() => {
                    if(quantity > 1){
                        setQuantity(quantity-1)
                    }
                  }}
                >
                  -
                </button>
                <input
                  disabled
                  type="number"
                  id="quantity"
                  className="w-[70%] border rounded-md p-2 text-center"
                  value={quantity}
                  onChange={(e) => setQuantity(parseInt(e.target.value))}
                />
                <button
                  className="bg-gray-200 rounded-r-md hover:bg-gray-300 w-[30%] p-2"
                  onClick={
                    () => {
                        if(quantity < 10){
                            setQuantity(quantity+1)
                        }
                    }
                  }
                >
                  +
                </button>
              </div>
            </div>


            {/* Comment textarea */}
            <div className="mb-4">
              <label htmlFor="comment" className="block text-sm text-gray-600">
                Add a Comment:
              </label>
              <textarea
                id="comment"
                className="w-full p-2 border rounded-lg"
                value={comment}
                onChange={(e) => setComment(e.target.value)}
              />
            </div>

              {/* Customization options */}
              {customize && customize.length > 0 && (
              <div className="mb-4">
                <label className="block text-sm text-gray-600">Customization Options:</label>
                <div className="grid grid-cols-2 gap-2">
                  {customize.map((option,index) => (
                    <label
                      key={index}
                      className="block p-2 text-sm bg-gray-100 rounded-lg cursor-pointer hover:bg-gray-200"
                    >
                      <input
                        type="checkbox"
                        value={option.option}
                        checked={selectedOptions.includes(option)}
                        onChange={() => toggleOption(option)}
                        className="mr-2 cursor-pointer"
                      />
                      {option.option} (+Rs.{option.price})
                    </label>
                  ))}
                </div>
              </div>
            )}

            <div className="flex flex-col ">
                <p className="mb-2 text-lg font-semibold text-headingColor">
                     Total: <span className="text-primeGold">Rs. {totalValue}</span>
                 </p>

                <button
                    className="flex flex-row justify-center p-4 px-4 py-2 text-white rounded-lg bg-primeGold hover:bg-primeGoldDark"
                    onClick={handleAddToCart}
                >
                    <MdAddShoppingCart className="text-white md:text-xl" />
                    Add to Cart
                </button>
            </div>
             
          </div>
          <div
            className="absolute inset-0 opacity-50 bg-gray-900/50 z-49"
            onClick={() => setShowCustomizePopup(false)}
          ></div>
        </div>
  )
}

export default MenuPopup