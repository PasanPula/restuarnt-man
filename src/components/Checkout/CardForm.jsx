import React from 'react'

const CardForm = () => {
  return (
    <div className="flex flex-col w-full p-1 px-2 rounded-lg">
    <div className="flex flex-col w-full mb-2">
      <label
        htmlFor="name"
        className="mb-1 text-sm font-bold text-gray-100"
      >
        Name on Card
      </label>
      <input
        type="text"
        id="name"
        className="w-full px-3 py-2 mb-1 text-white transition-colors border-2 border-gray-500 rounded-md focus:outline-none focus:border-orange-500 focus:text-orange-500 bg-cartItem"
        placeholder="Enter your name"
        autoComplete="off"
      />
    </div>
    <div className="flex flex-col w-full mb-2">
      <label
        htmlFor="number"
        className="mb-1 text-sm font-bold text-gray-100"
      >
        Card Number
      </label>
      <input
        type="text"
        id="number"
        className="w-full px-3 py-2 mb-1 text-white transition-colors border-2 border-gray-500 rounded-md focus:outline-none focus:border-orange-500 focus:text-orange-500 bg-cartItem"
        placeholder="Enter your number"
        autoComplete="off"
      />
    </div>
    <div className="flex justify-between w-full gap-1 mb-2">
      <div className='flex flex-col '>
      <label
        htmlFor="number"
        className="mb-1 text-sm font-bold text-gray-100"
      >
        Expiry Date
      </label>
      <input
        type="text"
        id="text"
        className="w-full px-3 py-2 mb-1 text-white transition-colors border-2 border-gray-500 rounded-md focus:outline-none focus:border-orange-500 focus:text-orange-500 bg-cartItem"
        placeholder="MM/YY"
        autoComplete="off"
      />
      </div>
      <div className='flex flex-col '>
      <label
        htmlFor="number"
        className="mb-1 text-sm font-bold text-gray-100"
      >
        CVV
      </label>
      <input
        type="text"
        id="password"
        className="w-full px-3 py-2 mb-1 text-white transition-colors border-2 border-gray-500 rounded-md focus:outline-none focus:border-orange-500 focus:text-orange-500 bg-cartItem"
        placeholder="CVV"
        autoComplete="off"
      />
      </div>
    </div>
  </div>
  )
}

export default CardForm