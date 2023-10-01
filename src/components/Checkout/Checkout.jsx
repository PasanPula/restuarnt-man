import { MdOutlineKeyboardBackspace } from "react-icons/md";
import { motion } from "framer-motion";
import { RiSecurePaymentLine } from "react-icons/ri";
import { BsShieldLock } from "react-icons/bs";
import CheckoutBody from "./CheckoutBody";

const Checkout = ({ handler }) => {
  return (
    <motion.div
      initial={{ opacity: 0, x: 200 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: 200 }}
      className="w-full h-screen md:w-[350px] bg-white md:backdrop-blur-sm flex flex-col z-[101] drop-shadow-xl fixed top-0 right-0"
    >
      <div className="flex items-center justify-between w-full p-4 bg-white cursor-pointer">
        <motion.div whileTap={{ scale: 0.8 }} onClick={() => handler(false)}>
          <MdOutlineKeyboardBackspace className="text-2xl text-textColor " />
        </motion.div>
        <motion.div
          initial={{ opacity: 0, x: 200 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: 200 }}
        >
          <p>Secured Payment</p>
        </motion.div>
        <motion.div
          whileTap={{ scale: 0.9 }}
          className="flex items-center justify-center gap-1"
          title="Secured"
        >
          <BsShieldLock className="text-xl cursor-pointer text-primeGold" />
          <RiSecurePaymentLine className="text-xl cursor-pointer text-primeGold" />
        </motion.div>
      </div>
      {/* checkout Paymount details submit Page  - CheckoutBody.jsx */}
      <CheckoutBody action={handler} />
    </motion.div>
  );
};

export default Checkout;
