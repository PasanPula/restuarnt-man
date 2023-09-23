import React from 'react'
import NotFoundImg from '../../assets/NotFound.svg'

const NotFound = ({text}) => {
  return (
    <div className='flex flex-col items-center justify-center w-full gap-4 p-5'>
        <img className='h-[340px]' src={NotFoundImg} alt='empty cart' />
        <p className="font-semibold text-textColor">{text}</p>
    </div>
  )
}

export default NotFound