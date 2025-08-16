import React from 'react'
import Item from './item'


const Items = ({text,item}) => {
  return (
    <div className='flex flex-col items-center'>
        <span className='text-gray-600 text-2xl bold underline font-bold inline-block py-12'>{text}</span>
       <div className='pt-12 max-w-[80%] bg-gray-300 rounded-2xl'><Item item={item}/></div>  </div>
  )
}

export default Items