import React from "react";
import emptycart from '../../assets/emptyCart.svg'

const EmptyCart = () => {
  return (
    <div className="flex flex-col items-center justify-center w-full gap-4 p-5">
      <img className="h-[340px]" src={emptycart} alt="empty cart" />
      <p className="font-semibold text-textColor">Cart is empty</p>
    </div>
  );
};

export default EmptyCart;
