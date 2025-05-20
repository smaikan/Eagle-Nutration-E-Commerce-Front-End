import Item from '../items/item'

const Productlist = ({text,item}) => {
  return ( <div>
    <div className=' w-[90%] justify-self-center flex flex-col items-center'>
            <div className='text-gray-600 text-5xl font-extrabold pt-12 pb-24'>{text}</div>
            <Item item={item}/>
        
    </div>
  </div>
    
  )
}

export default Productlist