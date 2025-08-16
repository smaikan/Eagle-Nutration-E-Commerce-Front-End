
import { Navbar } from './navbar'
import { Categories } from './categories'


const Header = () => {
  return (
    <div className=' relative z-10 sticky top-0'>
    <Navbar/>
    <Categories/> 
    
    </div>
  )
}

export default Header

