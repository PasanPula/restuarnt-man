import { useState,useEffect } from 'react';
import { MdAddShoppingCart, MdDeleteForever } from "react-icons/md";
import { useCartContext } from '../../context/CartContext/CartProvider';
import { useMenuContext } from '../../context/MenuContext/MenuProvider';
import { useUserContext } from '../../context/UserContext/UserProvider';
import r4 from '../../assets/r4.png';

const OrderEditPopup = ({orderItem,setShowCustomizePopup}) => {

        const [quantity, setQuantity] = useState(orderItem.qty);
        const [comment, setComment] = useState(orderItem.comment);
        const [totalValue, setTotalValue] = useState(orderItem.totalValue);
        const [{ menuItems }, menuDispatch] =  useMenuContext()
        const [{ cartItems }, cartDispatch] =  useCartContext()
        const [{ user } ] =  useUserContext();
        const  [menuItem,setMenuItem] = useState(menuItems.filter((itm) => {
          return orderItem.menu_id === itm.id
        })[0]);
        const [selectedOptions, setSelectedOptions] = useState( 
            menuItem.customize.filter((option)=>{
                return orderItem.selectedOptions.includes(option.option_id)
            }));


        useEffect(() => {
            setTotalValue(calculateTotalValue())
        }, [selectedOptions,quantity])
        
    
        const calculateTotalValue = () => {
            let total = parseInt(menuItem.price);
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

            // let itemRemovedcart = cartItems.filter((itm) => {
            //   return !(item.item_id === itm.item_id)
            // })

            // cartDispatch({
            //     type: CartTypes.SET_CART_ITEMS,
            //     cartItems: itemRemovedcart,
            // })
            // addToCart(itemRemovedcart, menuItems,user,menuItem.id,cartDispatch,customizeData);
            setShowCustomizePopup(false);
          };

  return (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
              <div className="bg-white rounded-lg p-4 relative z-10 w-[90%] md:w-[50%] max-h-[80vh] md:max-h-[90vh] overflow-y-auto">
              <button
                  className="absolute top-2 right-2 text-gray-600 hover:text-gray-800"
                  onClick={() => setShowCustomizePopup(false)}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-6 w-6"
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
                <h3 className="text-lg font-medium mb-2">Customize Order</h3>
                <p className="text-sm text-gray-500 mb-4">Select your options below:</p>
    
                 {/* Food image, name, and price */}
                 <div className="mb-4">
                  <img
                    src={r4}
                    alt={menuItem.description}
                    className="w-40 h-40 object-contain mx-auto mb-2"
                  />
                  <p className="text-lg text-textColor font-semibold text-center">{menuItem.title}</p>
                  <p className="text-base font-semibold text-headingColor text-center">
                    <span className="text-sm text-red-600">Rs.</span> {menuItem.price}
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
                    className="w-full border rounded-lg p-2"
                    value={comment}
                    onChange={(e) => setComment(e.target.value)}
                  />
                </div>
    
                  {/* Customization options */}
                  {menuItem.customize && menuItem.customize.length > 0 && (
                  <div className="mb-4">
                    <label className="block text-sm text-gray-600">Customization Options:</label>
                    <div className="grid grid-cols-2 gap-2">
                      {menuItem.customize.map((option,index) => (
                        <label
                          key={index}
                          className="block text-sm bg-gray-100 hover:bg-gray-200 p-2 rounded-lg cursor-pointer"
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
    
                <div className=" flex flex-col ">
                    <p className="text-lg font-semibold text-headingColor mb-2">
                         Total: <span className="text-red-600">Rs. {totalValue}</span>
                     </p>
    
                    <button
                        className="bg-red-600 text-white rounded-lg px-4 py-2 hover:bg-red-800 flex flex-row justify-center p-4"
                        onClick={handleAddToCart}
                    >
                        <MdAddShoppingCart className="text-white md:text-xl" />
                        Update Cart
                    </button>
                </div>
                 
              </div>
              <div
                className="absolute inset-0 bg-gray-900/50 opacity-50 z-49"
                onClick={() => setShowCustomizePopup(false)}
              ></div>
            </div>
      )
    }

export default OrderEditPopup;