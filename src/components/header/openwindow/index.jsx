import React from 'react'

const Openwindow = ({setHover}) => {
  return (
    <div onMouseOver={()=>setHover(true)} onMouseOut={()=>setHover(false)} className='absolute block inset-x-0 h-screen w-full overflow-hidden'>
        <div  className='bg-white pt-4 container rounded-lg z-20 relative '> </div>
    </div>
  )
}

export default Openwindow