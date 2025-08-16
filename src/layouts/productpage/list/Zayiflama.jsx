import { useEffect } from 'react';
import Item from '../../../components/items/item'
import Productlist from '../../../components/productlist'
import { useZayiflamaProducts } from '../../../redux/Hooks';

const Zayiflama = () => {
   useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  const Zayiflamaitem = useZayiflamaProducts()
 
  return (
    <div><Productlist item={Zayiflamaitem} text='ZAYIFLAMA'/></div>
  )
}

export default Zayiflama