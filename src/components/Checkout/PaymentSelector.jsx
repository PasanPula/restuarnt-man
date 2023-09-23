import React from 'react'
import { useCartContext } from '../../context/CartContext/CartProvider'
import { CartTypes } from '../../configs/Constants/ActionTypes';
import Visa from '../../assets/visa.png'

const PaymentSelector = () => {

  const [{paymentMethod}, cartDispatch] =  useCartContext();
  const setPaymentMethod = (method) => {
    cartDispatch({
      type: CartTypes.SET_PAYMENT_METHOD,
      paymentMethod: method,
    });
  }

  return (
    <div className="my-3 flex w-full rounded-t-[2rem] justify-between p-3">
    <div
      className={`px-2 py-1 rounded-full flex items-center justify-center ${
        paymentMethod === "COD" && "bg-white"
      }`}
    >
      <label
        htmlFor="type1"
        className={`flex items-center cursor-pointer ${
          paymentMethod === "COD" ? ' text-black ' : 'text-orange-100'} `}
        onClick={() => setPaymentMethod("COD")}
      >
        <input
          type="radio"
          className="w-5 h-5 text-orange-500 cursor-pointer form-radio"
          name="type"
          id="type1"
          checked={paymentMethod === "COD"}
        />
        <span className=' pl-2 ' >Add to Bill</span> 
      </label>
    </div>
    <div
      className={`px-2 py-1 rounded-full flex items-center justify-center ${
        paymentMethod === "bank" && "bg-white"
      }`}
    >
      <label
        htmlFor="type2"
        className="flex items-center cursor-pointer"
        onClick={() => setPaymentMethod("bank")}
      >
        <input
          type="radio"
          className="w-5 h-5 text-orange-500 cursor-pointer form-radio"
          name="type"
          id="type2"
          checked={paymentMethod === "bank"}
        />
        <img src={Visa} alt="" className="h-8 ml-3" />
      </label>
    </div>
  </div>
  )
}

export default PaymentSelector