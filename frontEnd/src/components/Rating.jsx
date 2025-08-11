import React from 'react'
import { FaRegStar,FaStar ,FaStarHalfAlt  } from "react-icons/fa";

const Rating = ({value,review}) => {
  return (
    <div className='flex gap-3 flex-wrap items-center'>
        <div className='flex items-center gap-1'>
          {value >= 1 ? <FaStar className='text-yellow-500' /> : value >= 0.5 ? <FaStarHalfAlt className='text-yellow-500' /> : <FaRegStar className='text-yellow-500' />}
          {value >= 2 ? <FaStar className='text-yellow-500' /> : value >= 1.5 ? <FaStarHalfAlt className='text-yellow-500' /> : <FaRegStar className='text-yellow-500' />}
          {value >= 3 ? <FaStar className='text-yellow-500' /> : value >= 2.5 ? <FaStarHalfAlt className='text-yellow-500' /> : <FaRegStar className='text-yellow-500' />}
          {value >= 4 ? <FaStar className='text-yellow-500' /> : value >= 3.5 ? <FaStarHalfAlt className='text-yellow-500' /> : <FaRegStar className='text-yellow-500' />}
          {value >= 5 ? <FaStar className='text-yellow-500' /> : value >= 4.5 ? <FaStarHalfAlt className='text-yellow-500' /> : <FaRegStar className='text-yellow-500' />}
        </div>
        {/* <p className='text-sm my-0.5 text-gray-800 dark:text-gray-100'>review ({review})</p> */}
    </div>
  )
}

export default Rating
