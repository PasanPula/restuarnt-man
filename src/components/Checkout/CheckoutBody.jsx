import { useState } from 'react'
import { BiLock } from "react-icons/bi";
import { ImSpinner3 } from "react-icons/im";
import { motion } from "framer-motion";
import { useCartContext } from '../../context/CartContext/CartProvider';
import { toast } from "react-toastify";
import { emptyCart } from '../../util/utilFunctions';
import PaymentSelector from './PaymentSelector';
import CardForm from './CardForm';
import CheckoutFooter from './CheckoutFooter';


const CheckoutBody = ({action}) => {

  const [{ checkoutData, cartTotal, paymentMethod, cartItems }, cartDispatch] = useCartContext();
  const [{ menuItems }] = useCartContext();
  const [loading, setLoading] = useState(false);

  const completePayment = () => {
    if(!checkoutData) return toast.error("Complete payment info")
    setLoading(true);
    setTimeout(async () => {
      setLoading(false);
      emptyCart(cartItems, menuItems, cartDispatch);
      action(false);
      toast.success("Order completed successfuly with payment. Thank you for your patronage.", {
        position: "top-center",
        autoClose: 6000
      });
    }, 3000);
  };

  return (
    <div className="w-full h-full rounded-t-[2rem]  bg-cartBg flex flex-col">
    {/* Payment Selectors */}
    <PaymentSelector />
    {/* payment form  */}
    <div className="min-h-[50vh] mt-5">
      {paymentMethod === "mobile_money" ? <CardForm /> : <CardForm />}
      <div className="flex items-center justify-center w-full my-2">
        <p className="text-gray-300">
          Amount Due:{" "}
          <span className="font-bold text-white">{`Rs.${cartTotal}`}</span>{" "}
        </p>
      </div>
      {/* pay now button */}

      <div className="flex items-center justify-center w-full mt-4">
        <motion.button
          onClick={completePayment}
          whileTap={{ scale: 0.95 }}
          className="flex items-center justify-center gap-2 w-[90%] p-2 rounded-full bg-gradient-to-tr from-orange-400 to-orange-600 hover:from-orange-600 hover:to-orange-400 transition-all duration-75 ease-in-out text-gray-50 text-lg my-2 hover:shadow-lg"
        >
          {!loading && <BiLock className="" />}
          {!loading ? (
            "PAY NOW"
          ) : (
            <ImSpinner3 className="animate animate-spin" />
          )}
        </motion.button>
      </div>
    </div>
    <CheckoutFooter />
  </div>
  )
}

export default CheckoutBody