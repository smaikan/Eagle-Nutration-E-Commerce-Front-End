import React from 'react'

const Image = ({img}) => {
  return (
    <div    style={{ backgroundImage: `url(${img})` }}  className=' bg-cover object-cover w-full h-[504px]'>
     
    </div>
    

  
  )
}

export default Image