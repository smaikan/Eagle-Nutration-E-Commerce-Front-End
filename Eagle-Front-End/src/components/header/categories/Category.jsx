import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import Openwindow from '../openwindow';

const Category = ({children,path}) => {
    const [hover,setHover] = useState(false);
  
   
    
  return ( 
    <Link to={path} onMouseOver={()=>setHover(true)} onMouseOut={()=>setHover(false)} 
    className=' px-4 relative justify-center items-center flex min-h-full flex-col  cursor-pointer'>
        
    {children}
    <div
        className={`transition-all duration-200 ease-in-out absolute bottom-0 h-1 bg-white rounded-full 
          ${hover ? ' w-full' : 'w-0'}`
        }
      />
       
       
    </Link>
   
 
    
  )
}

export default Category